const https = require('https');
const fs = require('fs');
const path = require('path');

const recipes = [
    { id: 10, logNo: 223961946339, name: '순두부 브라우니쿠키' },
    { id: 16, logNo: 224029278133, name: '순두부 단호박바스크치즈케이크' },
    { id: 17, logNo: 224035441110, name: '순두부 밤파운드케이크' },
    { id: 19, logNo: 224044280791, name: '순두부 단호박 찹쌀빵' },
    { id: 21, logNo: 224083029266, name: '순두부 슈톨렌' },
    { id: 22, logNo: 224097606202, name: '순두부 부쉬드노엘' },
    { id: 23, logNo: 224089622187, name: '순두부 블랙포레스트 컵케익' },
    { id: 24, logNo: 224103127145, name: '순두부 레몬번트케익' },
    { id: 25, logNo: 224106900867, name: '순두부 초코번트케익' },
    { id: 26, logNo: 224113782805, name: '순두부 3종케익' },
    { id: 27, logNo: 224127335052, name: '순두부 눈꽃컵케이크' },
    { id: 30, logNo: 224182208558, name: '순두부 미니초코케익' },
    { id: 31, logNo: 224197631515, name: '순두부 레몬마들렌' },
    { id: 32, logNo: 224203525984, name: '순두부 초코마들렌' },
    { id: 33, logNo: 224223083246, name: '순두부 녹차요거트파운드케익' }
];

function download(recipe) {
    const url = `https://m.blog.naver.com/PostView.naver?blogId=project_dubu&logNo=${recipe.logNo}`;
    console.log(`Downloading ${recipe.name} (${url})...`);
    
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36'
        }
    }, (res) => {
        let html = '';
        res.on('data', (chunk) => {
            html += chunk;
        });
        res.on('end', () => {
            const outPath = path.join(__dirname, `blog_${recipe.id}_${recipe.logNo}.html`);
            fs.writeFileSync(outPath, html, 'utf8');
            console.log(`Saved HTML for ${recipe.name} to ${outPath}`);
            parseContent(recipe, html);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${recipe.name}:`, err);
    });
}

function parseContent(recipe, html) {
    const startIdx = html.indexOf('se-main-container');
    if (startIdx === -1) {
        console.log(`[${recipe.name}] se-main-container not found`);
        return;
    }
    const bodyHtml = html.substring(startIdx);
    
    let text = bodyHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                       .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                       .replace(/<[^>]+>/g, '\n');
                       
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&mdash;/g, '—')
               .replace(/&#39;/g, "'")
               .replace(/&quot;/g, '"');
               
    const lines = text.split('\n')
                      .map(l => l.trim())
                      .filter(l => l.length > 0);
                      
    const cleaned = lines.join('\n');
    const outTxtPath = path.join(__dirname, `blog_${recipe.id}_${recipe.logNo}_cleaned.txt`);
    fs.writeFileSync(outTxtPath, cleaned, 'utf8');
    console.log(`Saved cleaned text to ${outTxtPath}`);
}

recipes.forEach((r, i) => {
    setTimeout(() => download(r), i * 1000); // 1초 간격으로 다운로드
});
