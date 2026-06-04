const fs = require('fs');

// Read dubu_data.js and evaluate PROJECTS
const dataContent = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/컨텐츠작업/프로젝트 두부/dubu_data.js', 'utf8');

// We can extract PROJECTS array by finding the start of const PROJECTS
const evalSandbox = {};
// We'll wrap in a function or just replace 'const PROJECTS' with 'evalSandbox.PROJECTS'
let codeToEval = dataContent
    .replace('const PROJECTS =', 'evalSandbox.PROJECTS =')
    .replace('const THEMES =', 'evalSandbox.THEMES =')
    .replace('const MASTERS =', 'evalSandbox.MASTERS =')
    .replace('const INFOGRAPHICS =', 'evalSandbox.INFOGRAPHICS =')
    .replace('const MASTER_QUOTES =', 'evalSandbox.MASTER_QUOTES =')
    .replace('const MASTER_STORY =', 'evalSandbox.MASTER_STORY =')
    .replace('const MASTER_BOOKS =', 'evalSandbox.MASTER_BOOKS =')
    .replace('const TEXTURE_PAIRS =', 'evalSandbox.TEXTURE_PAIRS =')
    .replace('const TEXTURE_UNIVERSE =', 'evalSandbox.TEXTURE_UNIVERSE =');

try {
    eval(codeToEval);
    console.log("ID mapping:");
    evalSandbox.PROJECTS.forEach(p => {
        console.log(`${p.id}: ${p.title} (hasTroubleShoot: ${!!(p.troubleShoot && p.troubleShoot.includes('Q.'))})`);
    });
} catch(e) {
    console.error("Error evaluating dubu_data.js:", e);
}
