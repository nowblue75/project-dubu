"// ==========================================================================
// 4. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "오란다 대 틀 {x}개 분량 🍞", baseCount: 1 },
    39: { template: "찰떡브라우니 {x}판 분량 🌿", baseCount: 1 },
    36: { template: "화이트 바크초콜릿 {x}판 분량 🍫", baseCount: 1 },
    31: { template: "티라미수 {x}컵 분량 🍮", baseCount: 2 },
    28: { template: "모찌떡 케이크 {x}호 1개 분량 🎂", baseCount: 1 },
    18: { template: "코코넛 단팥구움바 {x}개 분량 🥥", baseCount: 4 }
};

function getDynamicYieldText(recipeId, scale) {
    const yieldInfo = BASE_YIELDS[recipeId];
    if (!yieldInfo) {
        return scale === 1 ? "1배 분량" : `약 ${Math.round(scale * 10) / 10}배 분량`;
    }
    const scaledCount = Math.round(yieldInfo.baseCount * scale * 10) / 10;
    const displayCount = scale === 1 ? `${scaledCount}` : `약 ${scaledCount}`;
    return yieldInfo.template.replace("{x}", displayCount);
}

function updateDynamicYieldDisplay(recipeId, scale) {
    const yieldText = getDynamicYieldText(recipeId, scale);
    const diffPill = document.getElementById('focus-recipe-difficulty');
    if (diffPill) {
        diffPill.innerHTML = `<i class="fa-solid fa-box-open"></i> 분량: ${yieldText}`;
    }
}

function onFocusAnchorChange(inputEl) {
    const val = parseFloat(inputEl.value) || 0;
    const base = parseFloat(inputEl.getAttribute('data-base'));
    if (base === 0 || val <= 0) return;

    const scale = val / base;
    const inputs = document.querySelectorAll('.focus-ing-input');
    
    inputs.forEach(inp => {
        const b = parseFloat(inp.getAttribute('data-base'));
        const targetVal = Math.round(b * scale);
        const currentVal = parseFloat(inp.value) || 0;
        
        animateValue(inp
<truncated 1226 bytes>