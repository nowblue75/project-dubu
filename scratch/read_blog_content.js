const fs = require('fs');

const content = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/.system_generated/steps/2295/content.md', 'utf8');
const lines = content.split('\n');

console.log("Searching for keywords in content.md...");
lines.forEach((line, idx) => {
    if (line.includes('재료') || line.includes('다크') || line.includes('순두부') || line.includes('오븐') || line.includes('바닐라')) {
        // Only print lines that look like actual text and aren't too long HTML blocks
        const clean = line.replace(/<[^>]*>/g, '').trim();
        if (clean.length > 5 && clean.length < 200) {
            console.log(`[Line ${idx+1}]: ${clean}`);
        }
    }
});
