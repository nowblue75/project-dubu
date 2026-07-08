const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const targetId = 'G-F0K7V5CECE';

const excludeDirs = [
    '.git',
    'node_modules',
    '.gemini',
    'ver1.0',
    'ver1.1',
    'ver1.2',
    'ver1.3',
    'ver1.4',
    'ver1.5',
    'scratch',
    'Resolve Project Library'
];

function shouldProcess(filePath) {
    const baseName = path.basename(filePath);
    if (baseName.startsWith('blog_')) return false;
    
    const relative = path.relative(rootDir, filePath);
    const parts = relative.split(path.sep);
    for (const part of parts) {
        if (excludeDirs.includes(part)) {
            return false;
        }
    }
    return true;
}

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath, callback);
        } else if (stat.isFile() && path.extname(fullPath).toLowerCase() === '.html') {
            callback(fullPath);
        }
    }
}

let modifiedFiles = 0;
let totalReplacements = 0;

walk(rootDir, (filePath) => {
    if (!shouldProcess(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // 기존에 G-XXXXXXXXXX 또는 잘못 삽입되었을 수 있는 임시 ID들을 감지
    // 정규식: G-[A-Z0-9]{10} (단, G-F0K7V5CECE는 제외)
    const regex = /G-[A-Z0-9]{10}/g;
    
    let matches = content.match(regex);
    if (matches) {
        // 이미 교체 완료된 값(G-F0K7V5CECE)인지 확인
        const needsUpdate = matches.some(m => m !== targetId);
        if (needsUpdate) {
            let replacedCount = 0;
            const newContent = content.replace(regex, (match) => {
                if (match !== targetId) {
                    replacedCount++;
                    totalReplacements++;
                    return targetId;
                }
                return match;
            });
            
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`[UPDATE] Updated GA ID in: ${path.relative(rootDir, filePath)} (${replacedCount} occurrences)`);
            modifiedFiles++;
        }
    }
});

console.log(`\n치환 완료! 수정된 파일: ${modifiedFiles}개, 총 치환 횟수: ${totalReplacements}회`);
