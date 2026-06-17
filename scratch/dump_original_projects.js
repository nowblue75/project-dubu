const { execSync } = require('child_process');

try {
    // 1c9f03f 커밋의 dubu_data.js 파일 내용을 가져옵니다.
    const fileContent = execSync('git show 1c9f03f:dubu_data.js', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    
    // PROJECTS 정의 부분을 eval 하기 위해 환경 구축
    let PROJECTS;
    const evalCode = fileContent
        .replace('const PROJECTS =', 'global.PROJECTS =')
        .replace('const INGREDIENT_DICT =', 'global.INGREDIENT_DICT =')
        .replace('const RECIPE_STEPS_DB =', 'global.RECIPE_STEPS_DB =')
        .replace('const THEMES =', 'global.THEMES =');
    
    eval(evalCode);
    PROJECTS = global.PROJECTS;
    
    if (PROJECTS) {
        console.log(JSON.stringify(PROJECTS.map(p => ({
            originalId: p.id,
            title: p.title,
            path: p.path
        })), null, 2));
    } else {
        console.log('PROJECTS not found');
    }
} catch (e) {
    console.error('Error:', e);
}
