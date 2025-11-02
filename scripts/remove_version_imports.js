#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, '..');
const patterns = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'];
const ignore = ['**/node_modules/**', '**/build/**', '**/dist/**', '**/.git/**'];

const versionedImportRegex = /(['"])((?:@?[^'"@]+(?:\/[^'"@]+)*)?)@(\d+\.\d+\.\d+(?:[-.\w]*)?)(['"])/g;
// Explanation: captures '"', then optional scoped package or path (group2), then @version (group3), then closing quote

console.log('Scanning files and replacing versioned imports...');
let totalFiles = 0;
let totalReplacements = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: root, absolute: true, ignore });
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!versionedImportRegex.test(content)) return;
    totalFiles++;
    // backup
    const bak = file + '.bak';
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, content, 'utf8');

    const newContent = content.replace(versionedImportRegex, (m, q1, pkg, ver, q2) => {
      // If pkg is empty (shouldn't), leave unchanged
      if (!pkg || pkg.trim() === '') return m;
      totalReplacements++;
      return `${q1}${pkg}${q2}`;
    });

    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Patched:', path.relative(root, file));
  });
});

console.log(`Done. Files changed: ${totalFiles}, replacements: ${totalReplacements}`);
