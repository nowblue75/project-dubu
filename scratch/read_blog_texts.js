const fs = require('fs');
const path = require('path');

const baseDir = "C:\\Users\\USER\\.gemini\\antigravity\\brain\\2fb671e4-82f0-4f72-b064-4abc1e20b32d\\scratch\\blog_texts";

if (!fs.existsSync(baseDir)) {
    console.log("blog_texts 디렉토리가 존재하지 않습니다:", baseDir);
    return;
}

const files = fs.readdirSync(baseDir);
console.log("발견된 파일 목록:", files);

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n=== 파일: ${file} ===`);
    
    // 분량이나 개수 관련 문장 매칭
    const lines = content.split('\n');
    const matchedLines = lines.filter(line => 
        line.includes('분량') || 
        line.includes('개') || 
        line.includes('인분') || 
        line.includes('만들기') ||
        line.includes('기준') ||
        line.includes('원형')
    );
    
    matchedLines.slice(0, 8).forEach(l => console.log(`  > ${l.trim()}`));
});
