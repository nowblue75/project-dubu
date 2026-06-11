const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. dubu_data.js 로드하여 PROJECTS 데이터 확보
const dataCode = fs.readFileSync(path.join(__dirname, '../dubu_data.js'), 'utf8');
const context = {};
vm.createContext(context);
const PROJECTS = vm.runInContext(dataCode + "\n; PROJECTS;", context);

// 2. 현재 dubu_app.js에 정의된 BASE_YIELDS 키 리스트
const appCode = fs.readFileSync(path.join(__dirname, '../dubu_app.js'), 'utf8');
const yieldMatch = appCode.match(/const BASE_YIELDS = \{([\s\S]*?)\};/);
let currentYieldKeys = [];
if (yieldMatch) {
    // 키 추출
    const lines = yieldMatch[1].split('\n');
    lines.forEach(l => {
        const m = l.match(/^\s*(\d+):/);
        if (m) currentYieldKeys.push(Number(m[1]));
    });
}
console.log("현재 정의된 YIELD 키 목록:", currentYieldKeys);

// 3. PROJECTS 중 BASE_YIELDS에 없는 것 조사
const missingRecipes = PROJECTS.filter(p => !currentYieldKeys.includes(p.id));
console.log(`\nYIELD 정의가 없는 레시피 (${missingRecipes.length}개):`);

missingRecipes.forEach(recipe => {
    console.log(`\n--- ID ${recipe.id}: ${recipe.title} ---`);
    console.log(`폴더 경로: ${recipe.path}`);
    
    // 해당 레시피 폴더의 index.html 찾기
    if (recipe.path) {
        const htmlPath = path.join(__dirname, '..', recipe.path);
        if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            // html에서 분량 관련 키워드 검색 (예: "분량", "개수", "만들기", "yield", "serve")
            const lines = htmlContent.split('\n');
            const matchedLines = lines.filter(line => 
                line.includes('분량') || 
                line.includes('개') || 
                line.includes('인분') || 
                line.includes('기준') || 
                line.includes('yield')
            );
            console.log("HTML에서 찾은 힌트:");
            matchedLines.slice(0, 10).forEach(ml => console.log(`  > ${ml.trim().substring(0, 120)}`));
        } else {
            console.log("index.html 파일이 로컬에 존재하지 않습니다.");
        }
    }
});
