/**
 * Extracts the detailedChanges data from AFCRulesInfographic.tsx
 * and writes it as a structured JSON file.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = join(__dirname, '../src/components/AFCRulesInfographic.tsx');
const outPath = join(__dirname, '../afc-rules-data.json');

const src = readFileSync(srcPath, 'utf8');

// Extract the detailedChanges block
const startMarker = 'const detailedChanges = {';
const startIdx = src.indexOf(startMarker);
if (startIdx === -1) throw new Error('Could not find detailedChanges in source');

// Find matching closing brace
let depth = 0;
let endIdx = startIdx + startMarker.length - 1;
for (let i = startIdx + startMarker.length - 1; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}

let block = src.slice(startIdx + 'const detailedChanges = '.length, endIdx + 1);

// Replace icon component references with their string names (e.g., GraduationCap -> "GraduationCap")
// Pattern: icon: SomeComponent,
block = block.replace(/icon:\s*([A-Z][a-zA-Z]+),/g, 'icon: "$1",');

// Remove JS line comments, but only outside of strings
// (naive approach: skip lines where // appears after a quote)
block = block.split('\n').map(line => {
  // Find // that is NOT inside a string (single or double quoted)
  let inDouble = false, inSingle = false;
  for (let i = 0; i < line.length - 1; i++) {
    const c = line[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '/' && line[i+1] === '/' && !inDouble && !inSingle) {
      return line.slice(0, i); // strip comment
    }
  }
  return line;
}).join('\n');

// Evaluate as JS object
let data;
try {
  // Use Function constructor to evaluate the object literal safely
  data = Function('"use strict"; return (' + block + ')')();
} catch (e) {
  console.error('Parse error:', e.message);
  process.exit(1);
}

// Build structured output
const facilityMeta = {
  family: { name: "Family Home", capacity: "1-6 residents" },
  small:  { name: "Small Group Home", capacity: "7-12 residents" },
  large:  { name: "Large Group Home", capacity: "13-20 residents" },
  congregate: { name: "Congregate Facility", capacity: "21+ residents" }
};

const output = {
  meta: {
    title: "Michigan Adult Foster Care (AFC) Rules Update",
    version: "1.2.0",
    exportedAt: new Date().toISOString(),
    source: "LARA AFC Ruleset Final (2024)",
    sourceUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
    description: "Structured data for all rule changes across AFC facility types, for use in compliance planning and verification."
  },
  facilities: {}
};

for (const [facilityKey, cards] of Object.entries(data)) {
  const meta = facilityMeta[facilityKey] || {};
  output.facilities[facilityKey] = {
    name: meta.name,
    capacity: meta.capacity,
    cardCount: cards.length,
    impactSummary: {
      high: cards.filter(c => c.impact === 'high').length,
      medium: cards.filter(c => c.impact === 'medium').length,
      beneficial: cards.filter(c => c.impact === 'beneficial').length,
      none: cards.filter(c => c.impact === 'none').length,
    },
    cards: cards.map(card => ({
      id: card.id,
      icon: card.icon,
      title: card.title,
      impact: card.impact,
      oldRule: card.oldRule,
      oldRuleUrl: card.oldRuleUrl,
      newRule: card.newRule,
      newRuleUrl: card.newRuleUrl,
      oldText: card.oldText,
      newText: card.newText,
      timeline: card.timeline,
      cost: card.cost,
      action: card.action,
      source: card.source,
      visual: card.visual
    }))
  };
}

// Also write a flat array version for easier querying
output.allCards = Object.entries(output.facilities).flatMap(([facilityKey, facility]) =>
  facility.cards.map(card => ({ ...card, facilityKey, facilityName: facility.name }))
);

writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Written: ${outPath}`);
console.log(`Total cards: ${output.allCards.length}`);
for (const [k, v] of Object.entries(output.facilities)) {
  console.log(`  ${v.name}: ${v.cardCount} cards (high:${v.impactSummary.high} medium:${v.impactSummary.medium} beneficial:${v.impactSummary.beneficial} none:${v.impactSummary.none})`);
}
