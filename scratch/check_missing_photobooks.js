const fs = require('fs');
const path = require('path');
const { PHOTOBOOKS } = require('../dubu_data.js');

const rootDir = process.cwd();
const missing = [];

console.log("=== 화보집 파일 존재 여부 검사 시작 ===");

for (const [id, info] of Object.entries(PHOTOBOOKS)) {
    const folderName = info.folder;
    // 0.jpg 와 0.jpeg 둘 중 하나라도 존재하는지 체크
    // images[0] 에 적힌 파일명 외에도 0.jpg, 0.jpeg 둘 다 교차 검사
    const possibleFiles = [
        info.images[0],
        '0.jpg',
        '0.jpeg'
    ];

    let found = false;
    let checkedPaths = [];

    for (const file of possibleFiles) {
        if (!file) continue;
        const targetPath = path.join(rootDir, folderName, '화보집', file);
        checkedPaths.push(targetPath);
        if (fs.existsSync(targetPath)) {
            found = true;
            break;
        }
    }

    if (!found) {
        missing.push({
            id,
            folder: folderName,
            checked: checkedPaths
        });
    }
}

console.log(`검사 완료: 총 ${Object.keys(PHOTOBOOKS).length}개 화보집 중 누락된 화보집: ${missing.length}개`);
if (missing.length > 0) {
    console.log("\n[누락 목록]");
    missing.forEach(m => {
        console.log(`ID: ${m.id} | 폴더: ${m.folder}`);
        console.log(`- 확인한 경로 예시: ${m.checked[0]}`);
    });
} else {
    console.log("\n모든 화보집의 0번째 대표 이미지 파일이 정상적으로 존재합니다!");
}
