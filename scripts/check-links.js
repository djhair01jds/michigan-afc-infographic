#!/usr/bin/env node

/**
 * Link Checker Script
 *
 * Validates all external URLs in the AFC Rules Infographic.
 * Run manually or via scheduled GitHub Actions workflow.
 *
 * Usage:
 *   node scripts/check-links.js
 *   node scripts/check-links.js --verbose
 *   node scripts/check-links.js --json
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceFile: path.join(__dirname, '../src/components/AFCRulesInfographic.tsx'),
  timeout: 30000, // 30 seconds (web.archive.org can be slow)
  retries: 2,
  retryDelay: 2000,
  concurrency: 3, // Limit concurrent requests to avoid rate limiting
};

// Parse command line arguments
const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose') || args.includes('-v');
const JSON_OUTPUT = args.includes('--json');

/**
 * Extract all URLs from the source file
 */
function extractUrls(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Match URLs in the code (both http and https)
  const urlRegex = /https?:\/\/[^\s"'`,\)]+/g;
  const matches = content.match(urlRegex) || [];

  // Clean up URLs (remove trailing punctuation that might be code artifacts)
  const cleanedUrls = matches.map(url => {
    return url.replace(/[,;}\]]+$/, '');
  });

  // Deduplicate
  const uniqueUrls = [...new Set(cleanedUrls)];

  return uniqueUrls;
}

/**
 * Check if a URL is accessible
 */
async function checkUrl(url, retries = CONFIG.retries) {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Michigan-AFC-Infographic-LinkChecker/1.0',
      },
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    const elapsed = Date.now() - startTime;

    // Some servers don't support HEAD, try GET if we get 405
    if (response.status === 405) {
      return checkUrlWithGet(url, retries);
    }

    return {
      url,
      status: response.status,
      ok: response.ok,
      elapsed,
      error: null,
    };
  } catch (error) {
    const elapsed = Date.now() - startTime;

    // Retry on network errors
    if (retries > 0 && (error.name === 'AbortError' || error.code === 'ECONNRESET')) {
      if (VERBOSE) {
        console.log(`  Retrying ${url} (${retries} retries left)...`);
      }
      await sleep(CONFIG.retryDelay);
      return checkUrl(url, retries - 1);
    }

    return {
      url,
      status: null,
      ok: false,
      elapsed,
      error: error.message || error.name,
    };
  }
}

/**
 * Fallback to GET request for servers that don't support HEAD
 */
async function checkUrlWithGet(url, retries) {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Michigan-AFC-Infographic-LinkChecker/1.0',
      },
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    // We don't need to read the body, just check status
    const elapsed = Date.now() - startTime;

    return {
      url,
      status: response.status,
      ok: response.ok,
      elapsed,
      error: null,
    };
  } catch (error) {
    const elapsed = Date.now() - startTime;

    if (retries > 0) {
      await sleep(CONFIG.retryDelay);
      return checkUrlWithGet(url, retries - 1);
    }

    return {
      url,
      status: null,
      ok: false,
      elapsed,
      error: error.message || error.name,
    };
  }
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process URLs with limited concurrency
 */
async function checkUrlsWithConcurrency(urls, concurrency) {
  const results = [];
  const queue = [...urls];

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      if (url) {
        if (VERBOSE && !JSON_OUTPUT) {
          console.log(`Checking: ${url}`);
        }
        const result = await checkUrl(url);
        results.push(result);
      }
    }
  }

  // Start workers
  const workers = Array(concurrency).fill(null).map(() => worker());
  await Promise.all(workers);

  return results;
}

/**
 * Categorize URLs by domain for better reporting
 */
function categorizeUrls(urls) {
  const categories = {
    'michigan.gov': [],
    'web.archive.org': [],
    'michigan.adultfostercare.net': [],
    'other': [],
  };

  urls.forEach(url => {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes('michigan.gov')) {
        categories['michigan.gov'].push(url);
      } else if (hostname.includes('web.archive.org')) {
        categories['web.archive.org'].push(url);
      } else if (hostname.includes('michigan.adultfostercare.net')) {
        categories['michigan.adultfostercare.net'].push(url);
      } else {
        categories['other'].push(url);
      }
    } catch {
      categories['other'].push(url);
    }
  });

  return categories;
}

/**
 * Main function
 */
async function main() {
  if (!JSON_OUTPUT) {
    console.log('');
    console.log('===========================================');
    console.log('  Michigan AFC Infographic Link Checker');
    console.log('===========================================');
    console.log('');
  }

  // Extract URLs
  if (!JSON_OUTPUT) {
    console.log(`Reading: ${CONFIG.sourceFile}`);
  }

  const urls = extractUrls(CONFIG.sourceFile);

  if (!JSON_OUTPUT) {
    console.log(`Found ${urls.length} unique URLs\n`);
  }

  // Categorize for reporting
  const categories = categorizeUrls(urls);

  if (VERBOSE && !JSON_OUTPUT) {
    console.log('URLs by category:');
    Object.entries(categories).forEach(([category, categoryUrls]) => {
      if (categoryUrls.length > 0) {
        console.log(`  ${category}: ${categoryUrls.length}`);
      }
    });
    console.log('');
  }

  // Check all URLs
  if (!JSON_OUTPUT) {
    console.log('Checking URLs (this may take a while for archived links)...\n');
  }

  const results = await checkUrlsWithConcurrency(urls, CONFIG.concurrency);

  // Separate results
  const passed = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  // Output results
  if (JSON_OUTPUT) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      total: results.length,
      passed: passed.length,
      failed: failed.length,
      results: results,
    }, null, 2));
  } else {
    console.log('');
    console.log('===========================================');
    console.log('  Results');
    console.log('===========================================');
    console.log('');

    if (failed.length > 0) {
      console.log(`BROKEN LINKS (${failed.length}):`);
      console.log('');
      failed.forEach(result => {
        console.log(`  ✗ ${result.url}`);
        if (result.status) {
          console.log(`    Status: ${result.status}`);
        }
        if (result.error) {
          console.log(`    Error: ${result.error}`);
        }
        console.log('');
      });
    }

    console.log('-------------------------------------------');
    console.log(`Total:  ${results.length} URLs`);
    console.log(`Passed: ${passed.length} ✓`);
    console.log(`Failed: ${failed.length} ${failed.length > 0 ? '✗' : '✓'}`);
    console.log('-------------------------------------------');

    if (VERBOSE && passed.length > 0) {
      console.log('');
      console.log('WORKING LINKS:');
      passed.forEach(result => {
        console.log(`  ✓ ${result.url} (${result.status}, ${result.elapsed}ms)`);
      });
    }
  }

  // Exit with error code if any links failed
  process.exit(failed.length > 0 ? 1 : 0);
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
