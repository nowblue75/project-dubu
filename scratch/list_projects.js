const fs = require('fs');

// dubu_data.js 파일에서 PROJECTS 정의 부분만 추출하거나, dubu_data.js를 통째로 읽어서 PROJECTS를 평가(eval)해봅시다.
// dubu_data.js 파일이 브라우저용 스크립트이므로 node 환경에서 require나 eval로 로드할 수 있습니다.
// 단, 브라우저 환경 전용 변수가 있을 수 있으니 가짜 환경을 구축합니다.

const code = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/dubu_data.js', 'utf8');

// const PROJECTS = [...] 형식일 것이므로, 이 변수를 전역변수로 만들어서 가져오거나 
// 간단히 eval을 이용합니다.
let PROJECTS;
try {
    // PROJECTS를 추출하기 위해 const PROJECTS = 부분을 var PROJECTS = 로 바꾸고 eval
    const evalCode = code
        .replace('const PROJECTS =', 'global.PROJECTS =')
        .replace('const INGREDIENT_DICT =', 'global.INGREDIENT_DICT =')
        .replace('const RECIPE_STEPS_DB =', 'global.RECIPE_STEPS_DB =')
        .replace('const THEMES =', 'global.THEMES =');
    
    // global 객체에 바인딩
    eval(evalCode);
    PROJECTS = global.PROJECTS;
} catch (e) {
    console.error('Eval error:', e);
}

if (PROJECTS) {
    console.log(JSON.stringify(PROJECTS.map(p => ({id: p.id, title: p.title, path: p.path})), null, 2));
} else {
    console.log('PROJECTS not found');
}
