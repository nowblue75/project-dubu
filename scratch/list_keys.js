const fs = require('fs');

const dataContent = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/dubu_data.js', 'utf8');

const evalSandbox = {};
let codeToEval = dataContent
    .replace('const PROJECTS =', 'evalSandbox.PROJECTS =')
    .replace('const THEMES =', 'evalSandbox.THEMES =')
    .replace('const MASTERS =', 'evalSandbox.MASTERS =')
    .replace('const INFOGRAPHICS =', 'evalSandbox.INFOGRAPHICS =')
    .replace('const MASTER_QUOTES =', 'evalSandbox.MASTER_QUOTES =')
    .replace('const MASTER_STORY =', 'evalSandbox.MASTER_STORY =')
    .replace('const MASTER_BOOKS =', 'evalSandbox.MASTER_BOOKS =')
    .replace('const TEXTURE_PAIRS =', 'evalSandbox.TEXTURE_PAIRS =')
    .replace('const TEXTURE_UNIVERSE =', 'evalSandbox.TEXTURE_UNIVERSE =')
    .replace('const INGREDIENT_DICT =', 'evalSandbox.INGREDIENT_DICT =')
    .replace('const RECIPE_STEPS_DB =', 'evalSandbox.RECIPE_STEPS_DB =');

try {
    eval(codeToEval);
    console.log("INGREDIENT_DICT keys:", Object.keys(evalSandbox.INGREDIENT_DICT).sort((a,b)=>a-b));
    if (evalSandbox.RECIPE_STEPS_DB) {
        console.log("RECIPE_STEPS_DB keys:", Object.keys(evalSandbox.RECIPE_STEPS_DB).sort((a,b)=>a-b));
    } else {
        console.log("RECIPE_STEPS_DB is undefined");
    }
} catch(e) {
    console.error("Error evaluating dubu_data.js:", e);
}
