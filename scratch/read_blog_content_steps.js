const fs = require('fs');

const content = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/2fb671e4-82f0-4f72-b064-4abc1e20b32d/.system_generated/steps/2295/content.md', 'utf8');
const lines = content.split('\n');

for (let i = 2328; i <= 2410; i++) {
    const line = lines[i];
    if (line) {
        const clean = line.replace(/<[^>]*>/g, '').trim();
        if (clean.length > 0) {
            console.log(`[Line ${i+1}]: ${clean}`);
        }
    }
}
