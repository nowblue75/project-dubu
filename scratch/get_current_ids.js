const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'dubu_data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

dataContent = dataContent.replace('const PROJECTS =', 'module.exports =');
const themesIndex = dataContent.indexOf('const THEMES =');
if (themesIndex !== -1) {
    dataContent = dataContent.substring(0, themesIndex);
}

const tempFilePath = path.join(__dirname, 'temp_get_current_ids.js');
fs.writeFileSync(tempFilePath, dataContent, 'utf8');

const PROJECTS = require(tempFilePath);
fs.unlinkSync(tempFilePath);

// 오래된 순으로 정렬하여 출력 (id 기준 오름차순)
const sorted = [...PROJECTS].sort((a,b) => a.id - b.id);
console.log(JSON.stringify(sorted.map(p => ({ id: p.id, title: p.title })), null, 4));
