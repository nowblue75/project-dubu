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
    console.log("PROJECTS list:");
    evalSandbox.PROJECTS.forEach(p => {
        console.log(`ID: ${p.id} | Title: ${p.title} | Path: ${p.path} | Img: ${p.img}`);
    });
} catch(e) {
    console.error("Error evaluating dubu_data.js:", e);
}
