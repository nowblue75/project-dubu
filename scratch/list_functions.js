const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'dubu_app.js');
if (!fs.existsSync(filePath)) {
    console.error('dubu_app.js not found');
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('=== Function definitions in dubu_app.js ===');
lines.forEach((line, index) => {
    if (line.includes('function ') && !line.trim().startsWith('//')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
