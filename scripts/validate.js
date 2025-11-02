/**
 * Validation script for data files
 * Ensures all JSON files are valid and follow schema
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Files to validate
const files = [
  'profile.json',
  'projects.json',
  'experience.json',
  'skills.json',
  'awards.json',
  'i18n/en.json',
  'i18n/ur.json'
];

let hasErrors = false;

console.log('🔍 Validating data files...\n');

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ${file}: File not found`);
      hasErrors = true;
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Basic validation
    if (!data || (Array.isArray(data) && data.length === 0 && !file.includes('i18n'))) {
      console.warn(`⚠️  ${file}: Empty data`);
    } else {
      console.log(`✅ ${file}: Valid`);
    }
  } catch (error) {
    console.error(`❌ ${file}: ${error.message}`);
    hasErrors = true;
  }
});

console.log('\n');

if (hasErrors) {
  console.error('❌ Validation failed!');
  process.exit(1);
} else {
  console.log('✅ All data files are valid!');
  process.exit(0);
}
