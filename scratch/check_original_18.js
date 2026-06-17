const { execSync } = require('child_process');

try {
    const fileContent = execSync('git show 1c9f03f:dubu_data.js', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    
    let INGREDIENT_DICT = {};
    let RECIPE_STEPS_DB = {};
    
    const evalCode = fileContent
        .replace('const PROJECTS =', 'global.PROJECTS =')
        .replace('const INGREDIENT_DICT =', 'global.INGREDIENT_DICT =')
        .replace('const RECIPE_STEPS_DB =', 'global.RECIPE_STEPS_DB =')
        .replace('const THEMES =', 'global.THEMES =');
    
    eval(evalCode);
    INGREDIENT_DICT = global.INGREDIENT_DICT;
    RECIPE_STEPS_DB = global.RECIPE_STEPS_DB;
    
    console.log('Original 18 in INGREDIENT_DICT:', !!INGREDIENT_DICT['18']);
    console.log('Original 18 in RECIPE_STEPS_DB:', !!RECIPE_STEPS_DB['18']);
} catch (e) {
    console.error(e);
}
