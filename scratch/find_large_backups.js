const fs = require('fs');
const path = require('path');

const extractedDir = 'c:\\Users\\USER\\OneDrive\\Desktop\\컨텐츠작업\\프로젝트 두부\\.gemini\\extracted_recovery_all';
if (!fs.existsSync(extractedDir)) {
    console.log('Extracted recovery directory not found.');
    process.exit(1);
}

const files = fs.readdirSync(extractedDir);
const largeFiles = [];

files.forEach(file => {
    const filePath = path.join(extractedDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && stat.size > 5000) {
        largeFiles.push({ name: file, size: stat.size });
    }
});

// Sort by size descending
largeFiles.sort((a,b) => b.size - a.size);

console.log(`Found ${largeFiles.length} files larger than 5KB.`);
console.log('Top 40 largest backup files:');
largeFiles.slice(0, 40).forEach(f => {
    console.log(`File: ${f.name} | Size: ${f.size} bytes`);
});
