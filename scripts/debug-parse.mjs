import { readFileSync } from 'fs';
const src = readFileSync('src/components/AFCRulesInfographic.tsx', 'utf8');
const startMarker = 'const detailedChanges = {';
const startIdx = src.indexOf(startMarker);
let depth = 0, endIdx = startIdx + startMarker.length - 1;
for (let i = startIdx + startMarker.length - 1; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
let block = src.slice(startIdx + 'const detailedChanges = '.length, endIdx + 1);
block = block.replace(/icon:\s*([A-Z][a-zA-Z]+),/g, 'icon: "$1",');
block = block.replace(/\/\/[^\n]*/g, '');

// Find lines where single-quote count is odd (potential apostrophe issue)
const lines = block.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const sq = (line.match(/'/g) || []).length;
  if (sq > 0 && sq % 2 !== 0) {
    console.log(`Line ${i} odd single-quotes (${sq}): ${line.trim().slice(0, 120)}`);
  }
}
