const fs = require('fs');
const path = require('path');

const rootDir = 'C:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부';
const dubuDataPath = path.join(rootDir, 'dubu_data.js');
let dataContent = fs.readFileSync(dubuDataPath, 'utf8');

// ES6 const/let을 var로 우회 치환하여 sandbox 속성으로 노출시킴
dataContent = dataContent.replace(/const PROJECTS\s*=/g, 'var PROJECTS =');

const vm = require('vm');
const sandbox = { window: {}, console: console };
const ctx = vm.createContext(sandbox);

try {
    vm.runInContext(dataContent, ctx);
} catch (e) {
    console.error("VM Run Error:", e);
}

const PROJECTS = sandbox.PROJECTS || sandbox.window.PROJECTS;
if (!PROJECTS) {
    console.error("PROJECTS is not defined in sandbox.");
    process.exit(1);
}

console.log(`Loaded ${PROJECTS.length} projects from dubu_data.js`);

const photobooks = {};

PROJECTS.forEach(p => {
    if (p.id === 'coming-soon' || p.id === 39) return;
    
    const files = fs.readdirSync(rootDir);
    const targetPrefix = p.id + '.';
    const matchedDir = files.find(file => {
        try {
            const fullPath = path.join(rootDir, file);
            const isDir = fs.statSync(fullPath).isDirectory();
            const parts = file.split('.');
            const firstPart = parts[0].trim();
            return isDir && (file.startsWith(targetPrefix) || firstPart === String(p.id));
        } catch(e) {
            return false;
        }
    });

    if (matchedDir) {
        const pbPath = path.join(rootDir, matchedDir, '화보집');
        if (fs.existsSync(pbPath) && fs.statSync(pbPath).isDirectory()) {
            const subFiles = fs.readdirSync(pbPath);
            const has0 = subFiles.find(f => f.startsWith('0.jpg') || f.startsWith('0.jpeg'));
            const has1 = subFiles.find(f => f.startsWith('1.jpg') || f.startsWith('1.jpeg'));
            const has2 = subFiles.find(f => f.startsWith('2.jpg') || f.startsWith('2.jpeg'));
            
            if (has0 && has1 && has2) {
                photobooks[p.id] = {
                    folder: matchedDir,
                    images: [has0, has1, has2]
                };
            }
        }
    }
});

console.log("Found photobooks count:", Object.keys(photobooks).length);

const formattedData = `// 2. 화보집 릴리즈 아카이브 정적 데이터베이스
const PHOTOBOOKS = ${JSON.stringify(photobooks, null, 4)};

// 플랫폼 전체 공통 모듈 전역 바인딩
if (typeof window !== 'undefined') {
    window.PROJECTS = PROJECTS;
    window.PHOTOBOOKS = PHOTOBOOKS;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROJECTS, PHOTOBOOKS };
}
`;

fs.writeFileSync(path.join(rootDir, 'scratch/photobooks_db.js'), formattedData, 'utf8');
console.log("Successfully wrote scratch/photobooks_db.js");
