const fs = require('fs');
const path = require('path');

// dubu_data.js 로드하여 PROJECTS 배열 가져오기
const dataPath = path.join(__dirname, '..', 'dubu_data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// 브라우저 전용 const PROJECTS = [...] 코드를 Node.js에서 읽을 수 있도록 변환
dataContent = dataContent.replace('const PROJECTS =', 'module.exports =');
// 뒷부분에 있을 수 있는 THEMES나 다른 변수 선언부 제거 또는 주석 처리하여 module.exports만 살림
const projectsExportIndex = dataContent.indexOf('module.exports =');
const themesIndex = dataContent.indexOf('const THEMES =');
if (themesIndex !== -1) {
    dataContent = dataContent.substring(0, themesIndex);
}

// 임시 파일로 내보낸 뒤 require로 가져옴
const tempFilePath = path.join(__dirname, 'temp_dubu_data.js');
fs.writeFileSync(tempFilePath, dataContent, 'utf8');

const PROJECTS = require(tempFilePath);
fs.unlinkSync(tempFilePath); // 임시 파일 삭제

const rootDir = path.join(__dirname, '..');
const activeBooks = [];
const pendingBooks = [];

PROJECTS.forEach(p => {
    if (p.id === 'coming-soon' || p.id === 44) {
        // 커밍순(Vol.44 자색고구마스콘)은 제외
        return;
    }
    const folderPart = p.path ? p.path.split('/')[0] : '';
    if (!folderPart) {
        pendingBooks.push({ id: p.id, title: p.title, reason: "path 미정의" });
        return;
    }
    const dirPath = path.join(rootDir, folderPart);
    if (!fs.existsSync(dirPath)) {
        pendingBooks.push({ id: p.id, title: p.title, reason: `폴더(${folderPart}) 없음` });
        return;
    }
    const pbPath = path.join(dirPath, '화보집');
    if (!fs.existsSync(pbPath) || !fs.statSync(pbPath).isDirectory()) {
        pendingBooks.push({ id: p.id, title: p.title, reason: "화보집 폴더 없음" });
        return;
    }

    const has0 = fs.existsSync(path.join(pbPath, '0.jpg')) ? '0.jpg' : (fs.existsSync(path.join(pbPath, '0.jpeg')) ? '0.jpeg' : null);
    const has1 = fs.existsSync(path.join(pbPath, '1.jpg')) ? '1.jpg' : (fs.existsSync(path.join(pbPath, '1.jpeg')) ? '1.jpeg' : null);
    const has2 = fs.existsSync(path.join(pbPath, '2.jpg')) ? '2.jpg' : (fs.existsSync(path.join(pbPath, '2.jpeg')) ? '2.jpeg' : null);

    if (has0 && has1 && has2) {
        activeBooks.push({ id: p.id, title: p.title, folder: folderPart, images: [has0, has1, has2] });
    } else {
        const missing = [];
        if (!has0) missing.push("0.jpg/jpeg");
        if (!has1) missing.push("1.jpg/jpeg");
        if (!has2) missing.push("2.jpg/jpeg");
        pendingBooks.push({ id: p.id, title: p.title, reason: `화보 이미지 누락 (${missing.join(', ')})` });
    }
});

console.log("====================================================");
console.log(`총 레시피 개수(Vol.44 제외): ${PROJECTS.filter(p => p.id !== 44).length}개`);
console.log(`활성화된 화보집 개수: ${activeBooks.length}개`);
console.log(`준비중(비활성) 화보집 개수: ${pendingBooks.length}개`);
console.log("====================================================");
console.log("\n[활성화된 화보집 목록]");
activeBooks.sort((a,b) => b.id - a.id).forEach(b => {
    console.log(`- Vol.${b.id} ${b.title} (${b.folder}) -> [${b.images.join(', ')}]`);
});

console.log("\n[준비중(비활성) 화보집 목록]");
pendingBooks.sort((a,b) => b.id - a.id).forEach(b => {
    console.log(`- Vol.${b.id} ${b.title} -> 사유: ${b.reason}`);
});
