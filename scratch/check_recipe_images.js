const fs = require('fs');
const path = require('path');
const vm = require('vm');

// dubu_data.js 읽기
const dataCode = fs.readFileSync(path.join(__dirname, '../dubu_data.js'), 'utf8');

// 실행 컨텍스트 생성 및 실행
const context = {};
vm.createContext(context);
// PROJECTS를 마지막 식의 평가값으로 받기 위해 뒤에 붙여줌
const PROJECTS = vm.runInContext(dataCode + "\n; PROJECTS;", context);

console.log(`총 레시피 개수: ${PROJECTS.length}`);

const missingImages = [];

PROJECTS.forEach(recipe => {
    const imgPath = recipe.img;
    if (!imgPath) {
        console.log(`[오류] ID ${recipe.id} (${recipe.title}): 이미지가 정의되지 않음`);
        missingImages.push({ id: recipe.id, title: recipe.title, error: 'No image defined' });
        return;
    }
    
    // 절대 경로 계산
    const absolutePath = path.join(__dirname, '..', imgPath);
    if (!fs.existsSync(absolutePath)) {
        console.log(`[존재하지 않음] ID ${recipe.id} (${recipe.title}): ${imgPath}`);
        missingImages.push({ id: recipe.id, title: recipe.title, path: imgPath });
    }
});

if (missingImages.length === 0) {
    console.log("모든 레시피의 이미지 파일이 로컬에 존재합니다!");
} else {
    console.log(`총 ${missingImages.length}개의 존재하지 않는 이미지 발견.`);
}
