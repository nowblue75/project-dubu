const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataCode = fs.readFileSync(path.join(__dirname, '../dubu_data.js'), 'utf8');
const context = {};
vm.createContext(context);
const PROJECTS = vm.runInContext(dataCode + "\n; PROJECTS;", context);

const targetIds = [7, 8, 9, 11, 12, 13];

targetIds.forEach(id => {
    const recipe = PROJECTS.find(p => p.id === id);
    if (recipe) {
        console.log(`\n=== ID ${id}: ${recipe.title} ===`);
        console.log(`설명(desc): ${recipe.desc || '없음'}`);
        console.log(`한마디(emotionalQuote): ${recipe.emotionalQuote || '없음'}`);
        console.log(`대처법(troubleShoot): ${recipe.troubleShoot || '없음'}`);
    } else {
        console.log(`ID ${id} 레시피를 찾을 수 없습니다.`);
    }
});
