const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, '../dubu_data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const runCode = content
    .replace(/const PROJECTS\s*=/g, 'global.PROJECTS =')
    .replace(/const THEMES\s*=/g, 'global.THEMES =')
    .replace(/const INGREDIENT_DICT\s*=/g, 'global.INGREDIENT_DICT =')
    .replace(/const RECIPE_STEPS_DB\s*=/g, 'global.RECIPE_STEPS_DB =')
    .replace(/const TEXTURE_GROUPS\s*=/g, 'global.TEXTURE_GROUPS =')
    .replace(/const MASTER_CHEFS\s*=/g, 'global.MASTER_CHEFS =')
    .replace(/const INFO_GRAPHIC_UNIVERSE\s*=/g, 'global.INFO_GRAPHIC_UNIVERSE =');

const context = vm.createContext(global);
vm.runInContext(runCode, context);

const sorted = [...global.PROJECTS].filter(p => p.id !== 39).sort((a, b) => a.id - b.id);
console.log("Total projects (excluding 39):", sorted.length);
sorted.forEach((p, idx) => {
    console.log(`${idx + 1}: ID=${p.id}, Title="${p.title}", Img="${p.img}", Path="${p.path}"`);
});


