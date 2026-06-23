const { execSync } = require('child_process');
const { PHOTOBOOKS } = require('../dubu_data.js');

console.log("=== Git 실제 화보집 vs PHOTOBOOKS 객체 비교 검사 시작 ===");

let gitFiles = [];
try {
    const stdout = execSync('git ls-files', { encoding: 'utf8' });
    gitFiles = stdout.split('\n').map(f => f.trim()).filter(Boolean);
} catch (e) {
    console.error("git ls-files 실행 실패:", e.message);
    process.exit(1);
}

// 1. git ls-files 중 '화보집/0'을 포함하는 파일들의 폴더명 추출
const gitPhotobookFolders = [];
gitFiles.forEach(f => {
    // 예: "1. 순두부크림치즈_완/화보집/0.jpeg"
    if (f.includes('화보집/0')) {
        const parts = f.split('/화보집/');
        if (parts.length > 0) {
            const folderName = parts[0];
            if (!gitPhotobookFolders.includes(folderName)) {
                gitPhotobookFolders.push(folderName);
            }
        }
    }
});

console.log(`\n[1. Git에 올라간 화보집 폴더 목록 (총 ${gitPhotobookFolders.length}개)]`);
gitPhotobookFolders.sort().forEach(f => console.log(`- ${f}`));

// 2. PHOTOBOOKS 객체에 있는 폴더 목록 추출
const pbFolders = Object.values(PHOTOBOOKS).map(info => info.folder);
console.log(`\n[2. PHOTOBOOKS 객체에 기재된 폴더 목록 (총 ${pbFolders.length}개)]`);
pbFolders.sort().forEach(f => console.log(`- ${f}`));

// 3. Git에는 있으나 PHOTOBOOKS에는 누락된 폴더 찾기
const missingInPb = gitPhotobookFolders.filter(f => !pbFolders.includes(f));

console.log(`\n==================================================`);
console.log(`비교 완료: Git에는 존재하나 dubu_data.js의 PHOTOBOOKS 객체에 누락된 폴더는 총 ${missingInPb.length}개입니다.`);
if (missingInPb.length > 0) {
    console.log("\n[PHOTOBOOKS 객체 누락 폴더 목록]");
    missingInPb.forEach(f => console.log(`- ${f}`));
} else {
    console.log("\nGit에 올라간 모든 화보집 폴더가 PHOTOBOOKS 객체에 완벽하게 기재되어 있습니다!");
}
