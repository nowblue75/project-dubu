const fs = require('fs');

const code = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/dubu_data.js', 'utf8');

let INGREDIENT_DICT = {};
let RECIPE_STEPS_DB = {};

try {
    const evalCode = code
        .replace('const PROJECTS =', 'global.PROJECTS =')
        .replace('const INGREDIENT_DICT =', 'global.INGREDIENT_DICT =')
        .replace('const RECIPE_STEPS_DB =', 'global.RECIPE_STEPS_DB =')
        .replace('const THEMES =', 'global.THEMES =');
    
    eval(evalCode);
    INGREDIENT_DICT = global.INGREDIENT_DICT;
    RECIPE_STEPS_DB = global.RECIPE_STEPS_DB;
} catch (e) {
    console.error(e);
}

console.log('INGREDIENT_DICT keys:', Object.keys(INGREDIENT_DICT).sort((a,b)=>Number(a)-Number(b)));
console.log('RECIPE_STEPS_DB keys:', Object.keys(RECIPE_STEPS_DB).sort((a,b)=>Number(a)-Number(b)));
