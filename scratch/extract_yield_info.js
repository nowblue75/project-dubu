const fs = require('fs');
const path = require('path');

const scratchDir = 'c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/scratch';
const files = fs.readdirSync(scratchDir);

const yieldKeywords = ['분량', '틀', '개입', '원형', '사각', '오란다', '정사각', '개분', '개 기준', '판 기준', '개 분량'];

files.forEach(file => {
    if (file.startsWith('blog_') && file.endsWith('_cleaned.txt')) {
        const filePath = path.join(scratchDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        console.log(`=== File: ${file} ===`);
        
        // Find lines matching keywords
        let count = 0;
        lines.forEach((line, idx) => {
            const hasKeyword = yieldKeywords.some(kw => line.includes(kw));
            if (hasKeyword && line.length < 150) {
                console.log(`[Line ${idx+1}]: ${line.trim()}`);
                count++;
            }
        });
        if (count === 0) {
            // print first 5 lines
            console.log("No keywords. First 5 lines:");
            console.log(lines.slice(0, 5).join('\n'));
        }
        console.log("\n");
    }
});
