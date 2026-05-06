#!/usr/bin/env node

/**
 * Update Cloudflare DNS: Remove A records and add CNAME for Firebase
 */

const https = require('https');
require('dotenv').config({ path: '.env.local' });

const CUSTOM_DOMAIN = 'michigan.adultfostercare.net';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const FIREBASE_TARGET = 'michigan-afc-jds.web.app';

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function listDNSRecords() {
  console.log('📋 Listing existing DNS records...');
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records?name=${CUSTOM_DOMAIN}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await makeRequest(options);
    console.log(`✅ Found ${response.result.length} existing records\n`);
    return response.result;
  } catch (error) {
    console.error('❌ Error listing DNS records:', error.message);
    return [];
  }
}

async function deleteDNSRecord(recordId, type, content) {
  console.log(`🗑️  Deleting ${type} record: ${content}`);
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    await makeRequest(options);
    console.log('   ✅ Deleted\n');
    return true;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return false;
  }
}

async function createCNAMERecord() {
  console.log(`🔧 Creating CNAME record: ${CUSTOM_DOMAIN} → ${FIREBASE_TARGET}`);

  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const data = {
    type: 'CNAME',
    name: CUSTOM_DOMAIN,
    content: FIREBASE_TARGET,
    proxied: false, // Must be false for Firebase
    ttl: 1 // Auto TTL
  };

  try {
    const response = await makeRequest(options, data);
    console.log('✅ CNAME record created successfully\n');
    return response.result;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('⚠️  CNAME record already exists\n');
      return null;
    }
    throw error;
  }
}

async function main() {
  console.log('🌐 Updating Cloudflare DNS for Firebase\n');
  console.log('========================================\n');

  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    console.error('❌ Error: Missing Cloudflare credentials in .env.local');
    process.exit(1);
  }

  try {
    // List existing records
    const existingRecords = await listDNSRecords();

    // Delete A records and any existing CNAME records
    const recordsToDelete = existingRecords.filter(r =>
      (r.type === 'A' || r.type === 'CNAME') && r.name === CUSTOM_DOMAIN
    );
    for (const record of recordsToDelete) {
      await deleteDNSRecord(record.id, record.type, record.content);
    }

    // Create CNAME record
    await createCNAMERecord();

    console.log('✅ DNS update complete!\n');
    console.log('📊 New DNS configuration:');
    console.log(`   CNAME ${CUSTOM_DOMAIN} → ${FIREBASE_TARGET}\n`);
    console.log('⏳ DNS propagation may take 1-2 minutes...');
    console.log('🔍 Verify with: nslookup michigan.adultfostercare.net 8.8.8.8\n');
    console.log('🔥 Go back to Firebase Console and click "Verify" again');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
