const fs = require('fs');
const path = require('path');

const files = {
    41: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\449\\content.md',
    40: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\453\\content.md',
    39: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\455\\content.md',
    38: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\457\\content.md',
    37: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\459\\content.md',
};

function cleanHtml(html) {
    // 1. Script, Style 제거
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // 2. se-text-paragraph 들만 남기고 태그 정리
    const pTags = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = pRegex.exec(text)) !== null) {
        let pText = match[1].replace(/<[^>]+>/g, '').trim();
        pText = pText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—');
        if (pText) {
            pTags.push(pText);
        }
    }

    // 3. ul/li 태그 내용도 긁기
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    while ((match = liRegex.exec(text)) !== null) {
        let liText = match[1].replace(/<[^>]+>/g, '').trim();
        liText = liText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—');
        if (liText && !pTags.includes(liText)) {
            pTags.push(liText);
        }
    }
    
    return pTags.join('\n');
}

for (const [vol, filePath] of Object.entries(files)) {
    console.log(`==================================================`);
    console.log(`Vol.${vol} PARSING TARGET: ${filePath}`);
    console.log(`==================================================`);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        continue;
    }
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const cleanedText = cleanHtml(htmlContent);
    
    // 재료 부분과 만드는 법 부분 찾기
    console.log(`--- [CLEANED TEXT HIGHLIGHTS] ---`);
    const lines = cleanedText.split('\n');
    
    // [재료] 나 재료가 언급된 부분
    let printing = false;
    let printedLines = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('[재료]') || line.includes('재료 준비') || line.includes('재료공개') || line.includes('INGREDIENTS') || line.includes('[준비물]')) {
            printing = true;
            console.log(`>>> FOUND INGREDIENTS START AT LINE ${i}:`);
        }
        
        if (printing) {
            console.log(`  ${line}`);
            printedLines++;
            if (printedLines > 25 || line.includes('만드는 법') || line.includes('STEP 1') || line.includes('레시피 시작')) {
                printing = false;
                printedLines = 0;
                console.log(`>>> INGREDIENTS END`);
            }
        }
    }
    
    // [만드는 법] 또는 STEP 이 언급된 부분
    printing = false;
    printedLines = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('만드는 법') || line.includes('만드는 방법') || line.includes('STEP 1') || line.includes('조리 순서') || line.includes('공정 시작')) {
            printing = true;
            console.log(`>>> FOUND STEPS START AT LINE ${i}:`);
        }
        
        if (printing) {
            console.log(`  ${line}`);
            printedLines++;
            if (printedLines > 35 || line.includes('완성입니다') || line.includes('끝이에요') || line.includes('맛있게 드세요')) {
                printing = false;
                printedLines = 0;
                console.log(`>>> STEPS END`);
            }
        }
    }
    
    // 만약 둘 다 안 나온 경우 전체 텍스트 중 앞 50줄 출력
    if (lines.length > 0 && printedLines === 0) {
        console.log(`>>> PREVIEW FIRST 40 LINES:`);
        console.log(lines.slice(0, 40).join('\n'));
    }
}
