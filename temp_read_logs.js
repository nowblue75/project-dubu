const fs = require('fs');
const path = require('path');

const logPath39 = path.join(__dirname, 'recovered_39_logs.txt');

console.log('Deep scanning recovered_39_logs.txt...');

if (fs.existsSync(logPath39)) {
    const raw39 = fs.readFileSync(logPath39, 'utf16le');
    
    // 1. 블로그 텍스트 데이터가 들어있는지 검색 (예: blogUrl 이나 blog.naver.com)
    console.log('\nScanning for Naver Blog URLs:');
    const blogUrls = [];
    const blogRegex = /https:\/\/blog\.naver\.com\/[a-zA-Z0-9_\/]+/g;
    let match;
    while ((match = blogRegex.exec(raw39)) !== null) {
        if (!blogUrls.includes(match[0])) {
            blogUrls.push(match[0]);
        }
    }
    console.log(`Found ${blogUrls.length} unique blog URLs:`);
    console.log(blogUrls.slice(0, 10));

    // 2. dubu_data.js 관련 선언이 들어있는지 검색
    console.log('\nScanning for INGREDIENT_DICT or PROJECTS in log file content:');
    const projectMarkers = ['PROJECTS', 'INGREDIENT_DICT', 'RECIPE_STEPS_DB', 'const PROJECTS ='];
    projectMarkers.forEach(marker => {
        const index = raw39.indexOf(marker);
        if (index !== -1) {
            console.log(`  => Found marker "${marker}" at index ${index}. Preview:`);
            console.log(raw39.substring(index, index + 300));
        } else {
            console.log(`  => Marker "${marker}" not found.`);
        }
    });

    // 3. 파일 내에서 가장 큰 JSON이나 코드 덩어리 탐색
    console.log('\nChecking if there is any big Javascript/JSON object dumps...');
    const matchObject = raw39.match(/const\s+\w+\s*=\s*[\{\[]/g);
    if (matchObject) {
        console.log(`Found ${matchObject.length} variable declarations like "const X = {/[":`);
        console.log(matchObject.slice(0, 10));
    }
} else {
    console.log('recovered_39_logs.txt not found.');
}
