const fs = require('fs');
const path = require('path');

const scratchDir = 'c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/scratch';
const files = [
    'blog_10_223961946339_cleaned.txt',
    'blog_16_224029278133_cleaned.txt',
    'blog_17_224035441110_cleaned.txt',
    'blog_19_224044280791_cleaned.txt',
    'blog_21_224083029266_cleaned.txt',
    'blog_32_224203525984_cleaned.txt' // Also print 32 again to make sure
];

const yieldKeywords = ['분량', '틀', '개입', '원형', '사각', '오란다', '정사각', '개분', '개 기준', '판 기준', '개 분량', '구 기준'];

files.forEach(file => {
    const filePath = path.join(scratchDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${file}`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    console.log(`=== File: ${file} ===`);
    lines.forEach((line, idx) => {
        const hasKeyword = yieldKeywords.some(kw => line.includes(kw));
        if (hasKeyword && line.length < 150) {
            console.log(`[Line ${idx+1}]: ${line.trim()}`);
        }
    });
    console.log("\n");
});
