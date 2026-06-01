"// 지능형 테마 생성기: 레시피의 ID, 카테고리, 경로, 제목을 분석하여 다채로운 시즌/테마별 가죽 표지 및 책등 색상을 반환합니다.
function getRecipeTheme(recipe) {
    if (!recipe) {
        return {
            themeColor: '#3a1d11', // 가죽 표지 기본색 (딥 앤틱 브라운)
            themeGlow: 'rgba(197, 160, 89, 0.15)',
            accentColor: '#c5a059',
            spineColor1: '#251109', // 책등 외곽 그라디언트 1
            spineColor2: '#3a1d11', // 책등 가죽 메인 2
            spineTextColor: '#ebd090'
        };
    }

    const id = Number(recipe.id);
    const path = recipe.path || '';
    const categories = recipe.categories || [];
    const title = recipe.title || '';

    // 1. 크리스마스 / 성탄절 (Christmas / Winter Wonderland)
    const isChristmas = 
        path.includes('성탄절') || 
        path.includes('크리스마스') || 
        title.includes('슈톨렌') || 
        title.includes('부쉬드노엘') || 
        title.includes('블랙포레스트') || 
        title.includes('눈꽃') || 
        [20, 21, 22, 23, 24, 25, 26].includes(id);

    if (isChristmas) {
        // 크리스마스는 홀수/짝수 ID에 따라 트리 그린과 성탄 레드를 교차 적용하여 시각적 다양성 극대화
        if (id % 2 === 0) {
            // 딥 크리스마스 그린 테마
            return {
                themeColor: '#12301c',
                themeGlow: 'rgba(46, 117, 72, 0.25)',
                accentColor: '#e5a93b', // 화려한 골드 악센트
                spineColor1: '#0a1d11',
                spineColor2: '#12301c',
                spineTextColor: '#ffd79e'
            };
        } else {
            // 딥 크리스마스 레드 테마
            return {
                themeColor: '#7a1921',
                themeGlow: 'rgba(191, 54, 66, 0.25)',
                accentColor: '#ebd090', // 부드러운 황동 악센트
                spin
<truncated 7819 bytes>