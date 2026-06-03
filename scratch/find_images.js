const https = require('https');
const fs = require('fs');
const path = require('path');

const logNo = '224291999885';
const url = `https://m.blog.naver.com/PostView.naver?blogId=project_dubu&logNo=${logNo}`;

console.log(`Downloading ${url}...`);

https.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
}, (res) => {
    let html = '';
    res.on('data', (chunk) => {
        html += chunk;
    });
    res.on('end', () => {
        const outPath = path.join(__dirname, `blog_${logNo}.html`);
        fs.writeFileSync(outPath, html, 'utf8');
        console.log(`Saved html to ${outPath}`);
        
        // Find all images in html
        const regex = /https:\/\/postfiles\.pstatic\.net\/[^"'\s>]+/g;
        const matches = html.match(regex) || [];
        
        // Unique matches
        const uniqueMatches = [...new Set(matches)];
        console.log('Found images:');
        uniqueMatches.forEach((imgUrl, i) => {
            console.log(`[${i}] ${imgUrl}`);
        });
    });
}).on('error', (err) => {
    console.error('Error:', err);
});
