const fs = require('fs');

const files = {
    39: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\479\\content.md',
    38: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\481\\content.md',
    37: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\fe3ba6c6-dfb9-48ac-bf2c-e5807e93ce07\\.system_generated\\steps\\483\\content.md',
};

function cleanHtml(html) {
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    const pTags = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = pRegex.exec(text)) !== null) {
        let pText = match[1].replace(/<[^>]+>/g, '').trim();
        pText = pText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—').replace(/&#39;/g, "'");
        if (pText) {
            pTags.push(pText);
        }
    }

    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    while ((match = liRegex.exec(text)) !== null) {
        let liText = match[1].replace(/<[^>]+>/g, '').trim();
        liText = liText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—').replace(/&#39;/g, "'");
        if (liText && !pTags.includes(liText)) {
            pTags.push(liText);
        }
    }
    
    return pTags.join('\n');
}

for (const [vol, filePath] of Object.entries(files)) {
    console.log(`========================= Vol.${vol} =========================`);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        continue;
    }
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const cleanedText = cleanHtml(htmlContent);
    const lines = cleanedText.split('\n');
    
    console.log(`Cleaned lines: ${lines.length}`);
    
    // 재료 섹션
    let foundIng = false;
    let printed = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('[재료]') || line.includes('재료 준비') || line.includes('재료공개') || line.includes('[준비물]') || line.includes('재료 준비 (')) {
            foundIng = true;
            console.log(`>>> INGREDIENTS START AT Line ${i}:`);
        }
        if (foundIng) {
            console.log(`  ${line}`);
            printed++;
            if (printed > 20 || line.includes('만드는') || line.includes('STEP')) {
                foundIng = false;
                printed = 0;
                console.log(`>>> INGREDIENTS END`);
            }
        }
    }
    
    // 만드는법 섹션
    let foundSteps = false;
    let printedSteps = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('[만드는 법]') || line.includes('만드는 방법') || line.includes('STEP 1') || line.includes('조리법') || line.includes('공정 시작') || line.includes('조리를 시작하기')) {
            foundSteps = true;
            console.log(`>>> STEPS START AT Line ${i}:`);
        }
        if (foundSteps) {
            console.log(`  ${line}`);
            printedSteps++;
            if (printedSteps > 25 || line.includes('완성입니다') || line.includes('끝이에요') || line.includes('맛있게 드세요') || line.includes('안정화시킵니다')) {
                foundSteps = false;
                printedSteps = 0;
                console.log(`>>> STEPS END`);
            }
        }
    }
}
