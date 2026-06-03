const https = require('https');
const fs = require('fs');
const path = require('path');

const logNos = [224164987367, 224213464375];

function download(logNo) {
    const url = `https://m.blog.naver.com/PostView.naver?blogId=project_dubu&logNo=${logNo}`;
    console.log(`Downloading ${url}...`);
    
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
            const outPath = path.join(__dirname, `blog_${logNo}.html`);
            fs.writeFileSync(outPath, html, 'utf8');
            console.log(`Saved ${outPath} (${html.length} bytes)`);
            
            parseContent(logNo, html);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${logNo}:`, err);
    });
}

function parseContent(logNo, html) {
    const startIdx = html.indexOf('se-main-container');
    if (startIdx === -1) {
        console.log(`[${logNo}] se-main-container not found`);
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
    const outTxtPath = path.join(__dirname, `blog_${logNo}_cleaned.txt`);
    fs.writeFileSync(outTxtPath, cleaned, 'utf8');
    console.log(`Saved cleaned text to ${outTxtPath}`);
}

logNos.forEach(download);
