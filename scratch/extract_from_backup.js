const fs = require('fs');
const path = require('path');

const backupPath = path.join(__dirname, 'data_2dc95cf.js');
if (!fs.existsSync(backupPath)) {
    console.error('Backup file not found');
    process.exit(1);
}

const content = fs.readFileSync(backupPath, 'utf8');

// 정규식이나 문자열 검색으로 36, 37번 레시피 정보 추출
function extractSection(keyword) {
    let idx = content.indexOf(keyword);
    if (idx === -1) {
        console.log(`Keyword "${keyword}" not found`);
        return;
    }
    console.log(`=== Found "${keyword}" at position ${idx} ===`);
    // 주변 내용 출력
    console.log(content.substring(idx - 100, idx + 1000));
}

extractSection('"37":');
extractSection('"36":');
extractSection('37: [');
extractSection('36: [');
