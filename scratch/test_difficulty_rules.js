const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataCode = fs.readFileSync(path.join(__dirname, '../dubu_data.js'), 'utf8');
const context = {};
vm.createContext(context);
const dataObj = vm.runInContext(dataCode + "\n; ({ PROJECTS, RECIPE_STEPS_DB });", context);
const PROJECTS = dataObj.PROJECTS;
const RECIPE_STEPS_DB = dataObj.RECIPE_STEPS_DB;

const result = [];

PROJECTS.forEach(recipe => {
    const recipeId = recipe.id;
    const steps = RECIPE_STEPS_DB[recipeId] || [];
    
    // 텍스트 분석 대상 결합
    const descText = (recipe.desc || "") + " " + (recipe.emotionalQuote || "");
    const stepsText = steps.map(s => s.title + " " + s.desc).join(" ");
    const fullText = (descText + " " + stepsText).toLowerCase();
    
    // 1. 쉬움 판별
    const hasOneBowl = fullText.includes("원볼") || recipe.oneBowl;
    const hasMixer = fullText.includes("믹서기") || fullText.includes("믹서");
    
    // 예외 조항: 크럼블, 필링, 글레이즈, 프로스팅, 소보로, 시럽 등 별도 공정이 들어가는 경우 쉬움에서 제외
    const hasExtraProcess = fullText.includes("크럼블") || 
                             fullText.includes("필링") || 
                             fullText.includes("글레이즈") || 
                             fullText.includes("프로스팅") || 
                             fullText.includes("시럽");
    
    const isEasy = (hasOneBowl || hasMixer) && !hasExtraProcess;
    
    // 2. 어려움 판별
    let timeMinutes = 0;
    if (recipe.time) {
        const timeMatch = recipe.time.match(/(\d+)분/);
        if (timeMatch) timeMinutes = parseInt(timeMatch[1]);
    }
    const isLongTime = timeMinutes >= 50;
    const isManySteps = steps.length >= 8;
    const hasComplexProcess = fullText.includes("머랭") || fullText.includes("발효") || recipeId === 21 || recipeId === 13;
    
    const isHard = (isLongTime || isManySteps || hasComplexProcess) && !isEasy;
    
    let difficulty = "보통 🟡";
    if (isEasy) {
        difficulty = "쉬움 🟢";
    } else if (isHard) {
        difficulty = "어려움 🔴";
    }
    
    result.push({
        id: recipeId,
        title: recipe.title,
        difficulty,
        reason: isEasy ? `원볼/믹서기 사용 (${hasOneBowl ? '원볼' : ''} ${hasMixer ? '믹서기' : ''})` : (isHard ? `장시간/다단계/복잡공정 (시간:${timeMinutes}분, 단계:${steps.length}개, 별도공정:${hasExtraProcess})` : `일반 공정 또는 별도공정 존재 (별도공정:${hasExtraProcess})`)
    });
});

// 결과 정렬 출력
result.sort((a, b) => b.id - a.id).forEach(r => {
    console.log(`[Vol.${r.id}] ${r.title} ➔ ${r.difficulty} (${r.reason})`);
});
