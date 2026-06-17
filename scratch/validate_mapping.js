const fs = require('fs');

const code = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/dubu_data.js', 'utf8');

let PROJECTS, THEMES, INGREDIENT_DICT, RECIPE_STEPS_DB;

try {
    const evalCode = code
        .replace('const PROJECTS =', 'global.PROJECTS =')
        .replace('const INGREDIENT_DICT =', 'global.INGREDIENT_DICT =')
        .replace('const RECIPE_STEPS_DB =', 'global.RECIPE_STEPS_DB =')
        .replace('const THEMES =', 'global.THEMES =');
    
    eval(evalCode);
    PROJECTS = global.PROJECTS;
    THEMES = global.THEMES;
    INGREDIENT_DICT = global.INGREDIENT_DICT;
    RECIPE_STEPS_DB = global.RECIPE_STEPS_DB;
} catch (e) {
    console.error('Eval error:', e);
    process.exit(1);
}

console.log('--- 1. PROJECTS ID List ---');
const ids = PROJECTS.map(p => p.id).sort((a,b)=>a-b);
console.log(ids.join(', '));

// 중복 검사
const dupIds = ids.filter((item, index) => ids.indexOf(item) !== index);
if (dupIds.length > 0) {
    console.error('Duplicate IDs found in PROJECTS:', dupIds);
} else {
    console.log('No duplicate IDs in PROJECTS.');
}

console.log('--- 2. INGREDIENT_DICT & RECIPE_STEPS_DB Mapping Verification ---');
let hasMismatch = false;
PROJECTS.forEach(p => {
    // 자색고구마(44)는 커밍순이라서 레시피 세부가 없음
    if (p.id === 44) return;
    
    const hasIng = !!INGREDIENT_DICT[String(p.id)];
    const hasStep = !!RECIPE_STEPS_DB[String(p.id)];
    
    // isInteractive가 true인 레시피는 상세 정보가 꼭 있어야 함
    if (p.isInteractive && (!hasIng || !hasStep)) {
        console.error(`Mismatch: Recipe ID ${p.id} (${p.title}) has isInteractive: true but lacks ingredient/steps. (Ing: ${hasIng}, Steps: ${hasStep})`);
        hasMismatch = true;
    }
    
    // 만약 isInteractive가 false여도 상세가 존재하는 경우도 있음.
    // 하지만 상세가 없는데 isInteractive가 true이면 안 됨.
});

console.log('--- 3. THEMES ID Verification ---');
THEMES.forEach(t => {
    t.recipes.forEach(r => {
        const p = PROJECTS.find(proj => proj.id === r.id);
        if (!p) {
            console.error(`Theme "${t.title}" contains recipe ID ${r.id} (${r.title}) which does not exist in PROJECTS.`);
            hasMismatch = true;
        } else {
            if (p.title !== r.title) {
                console.warn(`Warning: Title mismatch in Theme "${t.title}" for ID ${r.id}. PROJECTS: "${p.title}" vs THEMES: "${r.title}"`);
            }
        }
    });
});

if (hasMismatch) {
    console.error('FAIL: Mismatches or errors detected in database mapping.');
    process.exit(1);
} else {
    console.log('SUCCESS: All database mapping rules verified successfully.');
}
