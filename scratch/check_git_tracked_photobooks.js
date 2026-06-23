const { execSync } = require('child_process');
const { PHOTOBOOKS } = require('../dubu_data.js');

console.log("=== Git 추적 중인 화보집 파일 및 폴더 검사 시작 ===");

let gitFiles = [];
try {
    const stdout = execSync('git ls-files', { encoding: 'utf8' });
    gitFiles = stdout.split('\n').map(f => f.trim()).filter(Boolean);
} catch (e) {
    console.error("git ls-files 실행 실패:", e.message);
    process.exit(1);
}

// 1. git ls-files 중 '화보집'을 포함하는 파일 필터링
const trackedPhotobookFiles = gitFiles.filter(f => f.includes('화보집'));

console.log(`\n[Git 추적 중인 화보집 관련 파일 총 ${trackedPhotobookFiles.length}개]`);
trackedPhotobookFiles.forEach(f => {
    console.log(`- ${f}`);
});

// 2. PHOTOBOOKS의 34개 폴더 중 추적되지 않는 폴더 찾기
const untrackedFolders = [];
for (const [id, info] of Object.entries(PHOTOBOOKS)) {
    const folderName = info.folder;
    // 해당 폴더 하위에 추적되고 있는 '화보집' 관련 파일이 하나라도 있는지 확인
    const hasTrackedFile = gitFiles.some(f => f.startsWith(folderName + '/'));
    if (!hasTrackedFile) {
        untrackedFolders.push({ id, folder: folderName });
    }
}

console.log(`\n==================================================`);
console.log(`검사 완료: PHOTOBOOKS의 34개 폴더 중 Git에 전혀 추적되지 않는 폴더는 총 ${untrackedFolders.length}개입니다.`);
if (untrackedFolders.length > 0) {
    console.log("\n[추적되지 않는 화보집 폴더 목록]");
    untrackedFolders.forEach(uf => {
        console.log(`ID: ${uf.id} | 폴더명: ${uf.folder}`);
    });
} else {
    console.log("\n모든 PHOTOBOOKS 폴더가 Git 저장소에서 정상적으로 추적되고 있습니다!");
}
