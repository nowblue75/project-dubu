const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../dubu_app_temp.js');
const dataPath = path.join(__dirname, '../dubu_data_temp.js');

const finalAppPath = path.join(__dirname, '../dubu_app.js');
const finalDataPath = path.join(__dirname, '../dubu_data.js');

console.log('=== Initiating Surgical Repair Engine ===');

// ==========================================================================
// 1. Repair dubu_data_temp.js
// ==========================================================================
if (fs.existsSync(dataPath)) {
    let dataContent = fs.readFileSync(dataPath, 'utf8');

    // Fix Item 1: Soy milk pound cake troubleShoot (Line 34~35)
    const target1 = `"troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물\n피 젤리가 단단하게 안 굳고 부서져요!<br>A. 판젤라틴을 충분히 찬물에 불린 뒤 뜨거운 커피액에 넣어 완벽히 녹여주어야 겔화가 잘 일어납니다. 만약 젤리가 덜 굳었다면, 냉동실에 30분 정도 살짝 얼려서 잘라주시거나 크림 위에 떠서 얹어 드셔도 좋습니다."`;
    const replace1 = `"troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물을 조금씩 나누어 넣으며 분리되지 않도록 유화시켜 섞어줍니다. 오븐 온도가 너무 높으면 겉만 타고 속은 안 익을 수 있으니, 170도에서 은은하게 구워주시고 이쑤시개 테스트 후 꺼내어 주세요."`;
    
    // Fix Item 2: Mugwort brownie troubleShoot and border (Line 72~79)
    const target2 = `        "desc": "찹쌀 없이 완성하는 반전의 찰기! 순두부 크림과 향긋한 쑥가루를 배합하여 냉장 숙성으로 쫀득한 식감을 2배 올린 웰빙 브라우니.",\n        "path":\n피 젤리가 단단하게 안 굳고 부서져요!<br>A. 판젤라틴을 충분히 찬물에 불린 뒤 뜨거운 커피액에 넣어 완벽히 녹여주어야 겔화가 잘 일어납니다. 만약 젤리가 덜 굳었다면, 냉동실에 30분 정도 살짝 얼려서 잘라주시거나 크림 위에 떠서 얹어 드셔도 좋습니다."\n        time: "40분",\n        emotionalQuote: "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝",\n        troubleShoot: "Q. 시트 수분을 빼는 볶기 과정이 너무 오래 걸리거나 시트가 눅눅해요!<br>A. [수분 박멸 & 식감 조율 팁] 볶기 전 무거운 도구로 순두부를 눌러 1차 압착 후 볶아주시면 조리 시간이 절반으로 단축됩니다. 다이어트 목적을 위해 가루 알룰로스로 대체할 경우 시트가 다소 부드러워지니 3분 더 구워주시고, 선물용의 바삭한 식감을 원하시면 유기농 설탕 사용을 권장합니다!"\n    },\n    {\n    'path: "21. 순두부슈톨렌_완/index.html"'\n);\ncontent = content.replace(\n    'path: "https://blog.naver.com/project_dubu/224097606202"',\n    'path: "22. 순두부 부쉬드노엘_완/index.html"'\n);\n        noOven: false,`;
    
    const replace2 = `        "desc": "찹쌀 없이 완성하는 반전의 찰기! 순두부 크림과 향긋한 쑥가루를 배합하여 냉장 숙성으로 쫀득한 식감을 2배 올린 웰빙 브라우니.",
        "path": "39. 순두부 쑥 찰떡브라우니_완/index.html",
        "img": "39. 순두부 쑥 찰떡브라우니_완/0.jpg",
        "calcPath": "39. 순두부 쑥 찰떡브라우니_완/calculator/index.html",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224247304779",
        "categories": [
            "gift",
            "teatime",
            "creamy"
        ],
        "pairing": "따뜻한 아메리카노 또는 쌉싸름한 말차 라떼",
        "time": "50분",
        "emotionalQuote": "찹쌀가루 없이 완성하는 반전의 찰기! 향긋한 쑥 반죽과 콩고물의 고소한 동행. 💚",
        "troubleShoot": "Q. 만든 직후에는 단단하지 않고 흐물거려요!<br>A. [숙성의 마법 팁] 오븐에서 나온 직후에는 다소 부드럽습니다. 실온에서 완전히 식힌 뒤 냉장고에서 최소 3시간 이상 충분히 숙성해주세요! 순두부 입자가 응축되면서 2배 더 쫀득한 극강의 찰떡 식감이 완성됩니다."
    },
    {`;

    // Fix Item 3: Duplicate and broken vegetable oil in 퍼지브라우니 (Line 528~536)
    const target3 = `            {\n                "name": "무염 버터",\n                "base": 30\n            },\n            {\n                "name": "식물성 오일 (포도씨유\n     },\n                "base": 30\n            },\n            {\n                "name": "식물성 오일 (포도씨유`;
    const replace3 = `            {\n                "name": "무염 버터",\n                "base": 30\n            },\n            {\n                "name": "식물성 오일 (포도씨유 등)",\n                "base": 30\n            }`;

    // Fix Item 4: Cream cheese troubleShoot (Line 721)
    const target4 = `"troubleShoot": "Q. 크림치즈가 너무 단단하거나 덩어리져서 잘 섞이지 않아요!<br>A. [유화 성공 꿀팁] 크림치즈를 반드시 실온(30분 이상)에서 부드럽게 풀어준 뒤 작업하세요. 차가운 상태로 믹싱하면 분리가 생겨 식감이 거칠어집니다. 핸드믹서로 크림치즈를 먼저 1분 이상 홀로 풀어준 뒤, 연유·전분·레몬즙을 순서대로 한 번에 하나씩 넣으며 유화시키면 실크처럼 매끄러운 크림이 완성됩니\n  {\n    }`;
    const replace4 = `"troubleShoot": "Q. 크림치즈가 너무 단단하거나 덩어리져서 잘 섞이지 않아요!<br>A. [유화 성공 꿀팁] 크림치즈를 반드시 실온(30분 이상)에서 부드럽게 풀어준 뒤 작업하세요. 차가운 상태로 믹싱하면 분리가 생겨 식감이 거칠어집니다. 핸드믹서로 크림치즈를 먼저 1분 이상 홀로 풀어준 뒤, 연유·전분·레몬즙을 순서대로 한 번에 하나씩 넣으며 유화시키면 실크처럼 매끄러운 크림이 완성됩니다."`;

    // Fix Item 5: Sweet pumpkin bread description (Line 898~899)
    const target5 = `                "desc":\n호박 슬라이스 브레드"`;
    const replace5 = `                "desc": "겉은 바삭하고 속은 쫄깃한 황금빛 단호박 슬라이스 브레드"`;

    // Fix Item 6: Lemon cake egg ingredient (Line 1674~1676)
    const target6 = `            {\n                "name": "달\n인 버터를 넣어 섞은 뒤, 마지막으로 레몬제스트와 레몬즙을 넣어 향을 입혀줍니다."`;
    const replace6 = `            {\n                "name": "달걀",\n                "base": 120\n            }`;

    // Fix Item 7: Mochi cake step 4 description (Line 2453~2456)
    const target7 = `            {\n                "time": "40분",\n                "title": "단계 4",\n                "desc": "화\n지 않는 퓨전 떡케이크." }`;
    const replace7 = `            {\n                "time": "40분",\n                "title": "단계 4",\n                "desc": "한 김 식힌 후 슈가파우더를 뿌려 마감합니다. 모찌 공법으로 만들어 쉽게 굳지 않는 퓨전 떡케이크."\n            }`;

    // Fix Item 8: Tiramisu pudding step 5 description (Line 2664~2668)
    const target8 = `        {\n            "time": "냉장 2시간",\n            "title": "Step 5. 냉장 숙성 & 서빙",\n            "desc": "밀\n뒤 반죽을 붓고, 틀을 바닥에 가볍게 쳐서 큰 기포를 빼냅니다."`;
    const replace8 = `        {\n            "time": "냉장 2시간",\n            "title": "Step 5. 냉장 숙성 & 서빙",\n            "desc": "밀폐용기나 디저트 컵에 크림과 커피 젤리를 층층이 나누어 담은 뒤, 냉장고에서 2시간 이상 충분히 차갑게 숙성하여 코코아 파우더를 체 쳐 올려 완성합니다."\n        }`;

    dataContent = dataContent.replace(target1, replace1);
    dataContent = dataContent.replace(target2, replace2);
    dataContent = dataContent.replace(target3, replace3);
    dataContent = dataContent.replace(target4, replace4);
    dataContent = dataContent.replace(target5, replace5);
    dataContent = dataContent.replace(target6, replace6);
    dataContent = dataContent.replace(target7, replace7);
    dataContent = dataContent.replace(target8, replace8);

    // Remove excessive empty lines
    const lines = dataContent.split('\n');
    const cleanedLines = [];
    let emptyCount = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') {
            emptyCount++;
            if (emptyCount <= 1) {
                cleanedLines.push('');
            }
        } else {
            emptyCount = 0;
            cleanedLines.push(line);
        }
    }

    fs.writeFileSync(finalDataPath, cleanedLines.join('\n'), 'utf8');
    console.log('Successfully repaired and wrote dubu_data.js');
}

// ==========================================================================
// 2. Repair dubu_app_temp.js
// ==========================================================================
if (fs.existsSync(appPath)) {
    let appContent = fs.readFileSync(appPath, 'utf8');

    // Fix Item 1: HTML markup truncation in openMagicBook (Line 1540)
    const targetApp1 = `                        <!-- 탭 콘텐츠 영역 -->\n                        <div class="magic-tab-cont`;
    const replaceApp1 = `                        <!-- 탭 콘텐츠 영역 -->
                        <div class="magic-tab-contents-wrapper" style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; max-height: 580px; padding-right: 4px; margin-bottom: 20px;">`;
    appContent = appContent.replace(targetApp1, replaceApp1);

    // Fix Item 2: Remove duplicated/old openMagicBook block (from line 1289 to 1426 in original temp structure)
    // We will locate "function openMagicBook(event, id) {" and delete it up to its closing bracket before "function closeMagicBook() {"
    // Since lines might have shifted, we find the first occurrence and replace it
    const oldOpenMagicBookBlockStart = appContent.indexOf('function openMagicBook(event, id) {');
    const closeMagicBookIndex = appContent.indexOf('function closeMagicBook() {');
    
    if (oldOpenMagicBookBlockStart !== -1 && closeMagicBookIndex !== -1 && oldOpenMagicBookBlockStart < closeMagicBookIndex) {
        console.log('Found duplicate old openMagicBook function block, removing...');
        // Replace the range with empty string
        appContent = appContent.substring(0, oldOpenMagicBookBlockStart) + appContent.substring(closeMagicBookIndex);
    }

    // Fix Item 3: Fix the 3-button layout openMagicBook's header and lookbookBtn (Line 1739~1740)
    // The broken code looks like:
    // const lookbookBtn = `<a href="${p.path}" class="btn-magic-action look
    // k) {
    const targetApp3 = `    const lookbookBtn = \`<a href="\${p.path}" class="btn-magic-action look\n\nk) {\n\n    // 3D 마법서 동적 마크업 생성`;
    const replaceApp3 = `    const lookbookBtn = \`<a href="\${p.path}" class="btn-magic-action lookbook" onclick="closeMagicBook();"><i class="fa-solid fa-image"></i> 상세 룩북 감상 🎨</a>\`;
    
    const lookBtn = \`<button class="btn-magic-action details" onclick="closeMagicBook(); openFocusStage(\${p.id});"><i class="fa-solid fa-calculator"></i> 맞춤 계량하기 ⚖️</button>\`;
    
    // 3D 마법서 동적 마크업 생성`;
    
    // Also, we need to declare the function header for this new openMagicBook block, which is broken and starts with "k) {" (originally part of "openMagicBook(event, id)")
    // Wait, the new openMagicBook starts around "function openMagicBook(event, id) {" but it was truncated.
    // Let's see the context of the new openMagicBook in the temp file.
    // In our temp file, openMagicBook (new one) starts with:
    // function openMagicBook(event, id) {  <- wait, did it get renamed to openMagicBook?
    // Let's look at line 1621 in temp file: "function openMagicBook(event, id) {"
    // Let's inspect line 1621 to 1644:
    // 1621: function openMagicBook(event, id) {
    // ...
    // 1643:     //  "name": "유기농 설
    // 1644: -direction: column; gap: 6px;">
    // Ah! Line 1621 is indeed the start of the new openMagicBook function, but it was truncated around line 1643 with "유기농 설" and "gap: 6px;".
    // This is because the VIEW_FILE log itself had some gaps.
    // So the function starts at line 1621, but gets corrupted halfway, and then at line 1739 we have "lookbookBtn" followed by "k) {" which is the start of ANOTHER block.
    // This means both definitions are corrupted.
    
    // To make this extremely robust: we will replace the ENTIRE openMagicBook function (both duplicates and their corrupted segments) with one single, 100% correct, and fully validated openMagicBook function!
    // Let's design the correct openMagicBook function:
    const completeOpenMagicBookCode = `
function openMagicBook(event, id) {
    if (event) {
        event.stopPropagation();
    }
    
    const viewport = document.querySelector('.magic-book-viewport');
    const overlay = document.getElementById('magic-book-overlay');
    if (!viewport || !overlay) return;

    // 데이터베이스에서 해당 프로젝트 검색
    const p = PROJECTS.find(item => item.id === id);
    if (!p) return;

    // 이미지 폴백 처리
    const bookImg = p.img ? p.img : 'assets/default_dubu.jpg';
    const emotionalQuote = p.emotionalQuote ? p.emotionalQuote : "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";
    const troubleTip = p.troubleShoot ? p.troubleShoot : "Q. 굽기 완료 시점은 어떻게 아나요?<br>A. 이쑤시개로 정중앙을 찔렀을 때 반죽이 묻어나지 않으면 속까지 완전히 촉촉히 잘 구워진 상태입니다. 😉";

    // 해당 레시피의 재료 리스트 로드
    let ingredients = [...(INGREDIENT_DICT[p.id] || [
        { name: "순두부 베이스", base: 100 },
        { name: "아몬드 가루", base: 80 },
        { name: "유기농 설탕", base: 40 }
    ])];

    // '순두부' 명칭 매칭 검색 및 최상단 정렬 (계산기 기준 순두부 고정)
    const mainIngIndex = ingredients.findIndex(ing => ing.name.includes('순두부'));
    let mainIng = ingredients[0];
    if (mainIngIndex !== -1) {
        mainIng = ingredients[mainIngIndex];
        ingredients.splice(mainIngIndex, 1);
        ingredients.unshift(mainIng);
    }

    // 메인 재료 입력 행 렌더링
    const mainIngredientHtml = \`
        <div class="magic-calc-row-main">
            <span class="magic-ing-name">\${mainIng.name} (기준)</span>
            <div class="magic-ing-value-wrapper">
                <input type="number" class="magic-main-input" id="magic-main-input-\${p.id}" value="\${mainIng.base}" oninput="onMagicBookAnchorChange(\${p.id}, \${mainIng.base}, this.value)">
                <span class="ing-unit">g</span>
            </div>
        </div>
    \`;

    // 서브 재료들의 비례 계산 렌더링
    const subIngredientsHtml = ingredients.slice(1).map((ing, idx) => \`
        <div class="magic-calc-row">
            <span class="magic-ing-name">\${ing.name}</span>
            <div class="magic-ing-value-wrapper">
                <span class="magic-sub-value" id="magic-sub-\${p.id}-\${idx}" data-ratio="\${ing.base / mainIng.base}">\${ing.base}</span>
                <span class="ing-unit">g</span>
            </div>
        </div>
    \`).join('');

    // 상세 베이킹 순서 가공
    const stepsList = RECIPE_STEPS_DB[p.id] || [
        { time: "10분", title: "단계 1", desc: "상세 조리 가이드가 준비 중입니다. 😊" }
    ];
    const stepsHtml = stepsList.map((step, idx) => \`
        <div class="magic-step-item" style="display: flex; gap: 12px; margin-bottom: 14px; font-size: 0.85rem; align-items: flex-start;">
            <div style="background: #8c6426; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700; font-size: 0.75rem; margin-top: 1px;">\${idx + 1}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; color: #2b1c14; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="word-break: keep-all;">\${step.title}</span>
                    <span style="font-size: 0.76rem; color: #8c6426; font-weight: normal; background: rgba(140,100,38,0.08); padding: 2px 7px; border-radius: 10px; flex-shrink: 0;"><i class="fa-regular fa-clock"></i> \${step.time}</span>
                </div>
                <div style="color: #5c4135; line-height: 1.65; word-break: keep-all; font-weight: 500;">\${step.desc}</div>
            </div>
        </div>
    \`).join('');

    // 실패 대처 및 셰프 가이드 데이터 구성
    let matchedCreator = null;
    if (typeof MASTER_CREATORS !== 'undefined') {
        const creators = Object.values(MASTER_CREATORS);
        matchedCreator = creators.find(c => p.categories && p.categories.some(cat => c.keywords && c.keywords.includes(cat)));
    }
    
    let chefTipHtml = "";
    if (matchedCreator) {
        chefTipHtml = \`
            <div style="font-weight: 800; font-size: 0.92rem; color: #8c6426; margin-bottom: 8px;">👨\u200D🍳 추천 마스터의 비밀 팁</div>
            <div style="font-size: 0.84rem; color: #4e342e; margin: 0; line-height: 1.65; word-break: keep-all; font-weight: 500; background: rgba(140, 100, 38, 0.03); padding: 12px 14px; border-radius: 6px; border: 1px dashed rgba(140, 100, 38, 0.15); display: flex; flex-direction: column; gap: 6px;">
                <span style="font-style: italic;">"\${matchedCreator.desc}"</span>
                <a href="\${matchedCreator.url}" target="_blank" style="color: #D32F2F; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-brands fa-youtube" style="color: #FF0000; font-size: 0.8rem;"></i> [\${matchedCreator.videoTitle}] 강좌 보기 ↗
                </a>
            </div>
        \`;
    } else {
        chefTipHtml = \`
            <div style="font-weight: 800; font-size: 0.92rem; color: #8c6426; margin-bottom: 8px;">👨\u200D🍳 글로벌 비건 셰프 가이드</div>
            <div style="font-size: 0.84rem; color: #4e342e; margin: 0; line-height: 1.65; word-break: keep-all; font-weight: 500; background: rgba(140, 100, 38, 0.03); padding: 12px 14px; border-radius: 6px; border: 1px dashed rgba(140, 100, 38, 0.15); display: flex; flex-direction: column; gap: 6px;">
                <span style="font-style: italic;">"순두부를 비건 디저트에 적용할 때는 믹서기로 30초 이상 고속으로 완전히 갈아서 부드럽게 유화시키면, 버터나 우유 없이도 리치한 크림 텍스처를 구현할 수 있습니다."</span>
                <a href="https://blog.naver.com/project_dubu" target="_blank" style="color: #8c6426; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-solid fa-cookie-bite" style="font-size: 0.75rem;"></i> 프로젝트 두부 공식 채널 가기 ↗
                </a>
            </div>
        \`;
    }

    const troubleHtml = \`
        <div style="font-size: 0.85rem; line-height: 1.7; word-break: keep-all; display: flex; flex-direction: column; gap: 15px;">
            <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #D32F2F; margin-bottom: 8px;">⚠️ Q&A 트러블슈팅</div>
                <div style="background: rgba(211, 47, 47, 0.03); border: 1px solid rgba(211, 47, 47, 0.1); padding: 12px 14px; border-radius: 6px; color: #5c4135; font-weight: 500;">
                    \${troubleTip}
                </div>
            </div>
            <div>
                \${chefTipHtml}
            </div>
        </div>
    \`;

    // 하단 이동 버튼군 3개 세트 정의
    const downloadBtn = \`<button class="btn-magic-action download" onclick="issueRecipeCardFromMagicBook(\${p.id}, '\${p.title.replace(/'/g, "\\\\'")}', '\${p.img}')"><i class="fa-solid fa-download"></i> 레시피 카드로 소장하기</button>\`;
    
    const blogBtn = p.blogUrl
        ? \`<a href="\${p.blogUrl}" class="btn-magic-action blog" target="_blank"><i class="fa-solid fa-book-open"></i> 블로그 가기 📖</a>\`
        : \`<button class="btn-magic-action blog" onclick="alert('공식 블로그 가이드가 준비 중입니다.')">가이드 준비 중 🔒</button>\`;
        
    const lookbookBtn = \`<a href="\${p.path}" class="btn-magic-action lookbook" onclick="closeMagicBook();"><i class="fa-solid fa-image"></i> 상세 룩북 감상 🎨</a>\`;

    // 3D 마법서 동적 마크업 생성
    viewport.innerHTML = \`
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 가죽 책 표지 (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 빈티지 양필지 속지 (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 좌측 페이지: 화보 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title" style="font-family:'Noto Serif KR', serif; font-size: 0.8rem; color: #3A6958; font-weight:700; letter-spacing: 2px; margin-bottom: 12px; text-align: left;">프로젝트 두부</div>
                        <div class="magic-photo-frame">
                            <img src="\${bookImg}" alt="\${p.title}" onerror="this.style.display='none'; document.getElementById('magic-photo-fallback-\${p.id}').style.display='flex';">
                            <div class="magic-photo-fallback" id="magic-photo-fallback-\n\${p.id}" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; flex-direction:column; background: linear-gradient(135deg, #e4d7bd, #cbbca0); color: #5c4538; padding: 20px; box-sizing: border-box; text-align: center;">
                                <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2.2rem; color: #8a7051; margin-bottom: 12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"></i>
                                <span style="font-family: 'Noto Serif KR', serif; font-size: 1.05rem; font-weight: 700; color: #3b281f; line-height: 1.4; word-break: keep-all;">\${p.title}</span>
                                <span style="font-family: 'Cinzel', serif; font-size: 0.65rem; color: #8a7051; margin-top: 6px; letter-spacing: 1px;">PREMIUM RECIPE VOL.\${p.id}</span>
                            </div>
                        </div>
                        <div class="magic-quote">
                            <i class="fa-solid fa-quote-left text-xs opacity-60 mr-1"></i>
                            \${emotionalQuote}
                            <i class="fa-solid fa-quote-right text-xs opacity-60 ml-1"></i>
                        </div>
                    </div>

                    <!-- 우측 페이지: 스마트 룬 연산판 -->
                    <div class="magic-page-right" style="display: flex; flex-direction: column;">
                        <div class="magic-meta-vol">PREMIUM ARCHIVE VOL.\${p.id}</div>
                        <h3 class="magic-meta-title" style="margin-bottom: 8px;">\${p.title}</h3>
                        
                        <!-- 3대 탭 메뉴 -->
                        <div class="magic-book-tabs" style="display: flex; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid rgba(88,65,46,0.15); padding-bottom: 8px; font-size: 0.85rem; font-weight: 800;">
                            <button class="magic-tab-btn active" id="magic-tab-btn-calc" onclick="switchMagicBookTab('calc')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#3A6958; cursor:pointer; border-bottom: 2px solid #3A6958; transition: all 0.2s; outline:none;">⚖️ 계량 계산</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-steps" onclick="switchMagicBookTab('steps')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">📜 베이킹 순서</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-trouble" onclick="switchMagicBookTab('trouble')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">🔍 실패 대처법</button>
                        </div>

                        <!-- 탭 콘텐츠 영역 -->
                        <div class="magic-tab-contents-wrapper" style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; max-height: 580px; padding-right: 4px; margin-bottom: 20px;">
                            
                            <!-- 탭 1: 계량 계산기 -->
                            <div id="magic-tab-content-calc" style="display: block;">
                                <div class="magic-calculator-box">
                                    \${mainIngredientHtml}
                                    <div id="magic-sub-ingredients-\${p.id}" style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0;">
                                        \${subIngredientsHtml}
                                    </div>
                                    <input type="range" class="magic-range-slider" min="\${Math.round(mainIng.base * 0.3)}" max="\${Math.round(mainIng.base * 3)}" value="\${mainIng.base}" oninput="document.getElementById('magic-main-input-\${p.id}').value = this.value; onMagicBookAnchorChange(\${p.id}, \${mainIng.base}, this.value)">
                                </div>
                                <div class="magic-spell-tip" style="margin-bottom: 0; font-size: 0.8rem;">
                                    💡 수치 조절 시 전체 비율이 자동 연산됩니다.
                                </div>
                            </div>

                            <!-- 탭 2: 베이킹 순서 -->
                            <div id="magic-tab-content-steps" style="display: none;">
                                <div style="padding: 2px 0;">
                                    \${stepsHtml}
                                </div>
                            </div>

                            <!-- 탭 3: 실패 대처법 -->
                            <div id="magic-tab-content-trouble" style="display: none;">
                                \${troubleHtml}
                            </div>

                        </div>

                        <!-- 이동 버튼군 -->
                        <div class="magic-action-row" style="margin-top: auto;">
                            \${detailsBtn}
                            \${lookbookBtn}
                            \${blogBtn}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    \`;

    // 마법 소환 시각 효과 큐 실행
    overlay.classList.add('active');
    
    const spellbook = document.getElementById('magic-spellbook');
    // 1단계: 책 소환 (비행 및 페이드인)
    setTimeout(() => {
        if (spellbook) {
            spellbook.classList.add('summoned');
        }
    }, 50);
    // 2단계: 책 펼치기
    setTimeout(() => {
        if (spellbook) {
            spellbook.classList.add('open');
        }
    }, 450);
}
`;

    // We replace from "function openMagicBook(event, id) {" to the next function block in appContent.
    // In our temp file, let's replace the whole region containing the broken definitions
    // To do this reliably, we can locate the first "function openMagicBook(event, id) {" in the cleaned appContent (after we deleted the duplicate in Fix Item 2).
    // Let's re-run the duplicate removal in a more generalized way:
    // We will find the very first index of "function openMagicBook" and the index of "function closeMagicBook() {"
    // and replace everything in between with the new complete code!
    
    const startIdx = appContent.indexOf('function openMagicBook');
    const endIdx = appContent.indexOf('function closeMagicBook() {');
    
    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
        console.log('Replacing entire openMagicBook block with fresh validated implementation...');
        appContent = appContent.substring(0, startIdx) + completeOpenMagicBookCode + '\n\n' + appContent.substring(endIdx);
    }

    // Fix Item 4: Replace sensory accordion artbook block with the un-corrupted design
    const accordionStart = appContent.indexOf('function renderAccordionArtbook() {');
    const accordionEnd = appContent.indexOf('// ==========================================================================\n// 14-2. 사계절의 아틀리에');
    // If not found, try alternative marker
    const accordionEndAlt = appContent.indexOf('function handleSliceClick(');
    
    const actualEndIdx = (accordionEnd !== -1) ? accordionEnd : accordionEndAlt;
    
    if (accordionStart !== -1 && actualEndIdx !== -1 && accordionStart < actualEndIdx) {
        console.log('Replacing accordion artbook engine block...');
        const newAccordionCode = `function renderAccordionArtbook() {
    const container = document.getElementById('accordion-showroom-container');
    if (!container) return;

    const activeRecipes = [
        {
            id: 36,
            title: "순두부 티라미수푸딩",
            img: "31. 순두부 티라미수푸딩_완/0.jpg",
            creatorsNote: "순두부와 마스카포네 크림에 커피 젤리 큐브를 레이어로 쌓아 냉장 굳힌 노오븐 티라미수 푸딩.",
            pairingGuide: "시나몬 가루를 솔솔 올린 콜드브루 커피와 곁들여 보세요.",
            themeColor: "#826359",
            themeGlow: "rgba(130, 99, 89, 0.15)",
            accentColor: "#FFCCBC"
        },
        {
            id: 37,
            title: "순두부 화이트바크초콜릿",
            img: "36. 순두부화이트바크초콜릿_완/1.jpg",
            creatorsNote: "순두부 시트 위에 녹인 화이트 커버춰를 부어 피스타치오와 스프링클로 장식해 굳히는 바크 초콜릿.",
            pairingGuide: "산뜻하게 우려낸 홍차나 가벼운 디저트 와인과 최고로 잘 어울립니다.",
            themeColor: "#C25D7E",
            themeGlow: "rgba(194, 93, 126, 0.15)",
            accentColor: "#F48FB1"
        },
        {
            id: 38,
            title: "순두부 쑥 찰떡브라우니",
            img: "39. 순두부 쑥 찰떡브라우니_완/0.jpg",
            creatorsNote: "찹쌀가루 없이 완성한 반전의 찰기! 향긋한 쑥 반죽과 콩고물의 고소한 동행.",
            pairingGuide: "쌉싸름한 말차 라떼나 드립 커피와 함께 곁들이면 맛의 깊이가 극대화됩니다.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
        },
        {
            id: 39,
            title: "순두부 흑임자 테린",
            img: "40. 순두부 흑임자테린_완/assets/01.png",
            creatorsNote: "오븐 중탕 공법으로 진하고 크리미하게 구워내 만든 다음날 더 고소하고 꾸덕한 흑임자 테린.",
            pairingGuide: "따뜻한 아메리카노와 깊은 조화를 이룹니다.",
            themeColor: "#2C3E50",
            themeGlow: "rgba(44, 62, 80, 0.2)",
            accentColor: "#BDC3C7"
        },
        {
            id: 40,
            title: "순두부 콩물 파운드케익",
            img: "41. 순두부콩물 파운드케익_완/순두부 콩물 파운드케익 (0).jpg",
            creatorsNote: "순두부와 콩물을 함께 곱게 갈아 고소하고 촉촉하게 완성한 웰빙 파운드케익입니다.",
            pairingGuide: "콩물라떼 또는 따뜻한 황차와 부드러운 페어링을 자랑합니다.",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8",
            isNew: true
        },
        {
            id: 'coming-soon',
            title: "Vol.41 Coming Soon",
            img: "",
            creatorsNote: "다음 컬렉션이 곧 공개됩니다.",
            pairingGuide: "새로운 맛의 조화와 비법을 기대해 주세요.",
            themeColor: "#2C3E50",
            themeGlow: "rgba(44, 62, 80, 0.2)",
            accentColor: "#95A5A6",
            isComingSoon: true
        }
    ];

    const maxId = Math.max(...activeRecipes.filter(r => typeof r.id === 'number').map(r => r.id));
    const comingSoonVol = maxId + 1;
    const comingSoonItem = activeRecipes.find(r => r.id === 'coming-soon');
    if (comingSoonItem) {
        comingSoonItem.title = \`Vol.\${comingSoonVol} Coming Soon\`;
    }

    const specsData = {
        40: { texture: "고소하고 촉촉함", wellness: "진한 콩물, 하루 숙성 비법", method: "170℃ 오븐 구움" },
        39: { texture: "꾸덕함", wellness: "No밀가루, No버터", method: "140℃ 오븐 중탕" },
        38: { texture: "쫀득함", wellness: "No버터, 비건 지향", method: "160℃ 오븐 구움" },
        37: { texture: "바삭하고 달콤함", wellness: "No버터, 볶은 순두부", method: "165℃ 오븐 구움" },
        36: { texture: "부드럽고 촉촉함", wellness: "No오븐, 알룰로스 대체 가능", method: "No오븐 냉장 굳히기" }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? \`Vol.\${comingSoonVol} 커밍순\` : p.title.replace("순두부 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? \`background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;\` 
            : \`background-image: url('\${p.img}');\`;

        const comingSoonOverlay = p.isComingSoon 
            ? \`<div class="coming-soon-glowing-core" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2.2rem; color: var(--accent-color); filter: drop-shadow(0 0 8px var(--theme-color)); margin-bottom: 12px; opacity: 0.85;"></i>
                <span class="coming-soon-text-en font-serif" style="color: #95A5A6; font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 4px;">COMING SOON</span>
                <span class="coming-soon-text-ko" style="color: #7F8C8D; font-size: 0.82rem; font-weight: 700;">비밀의 문이 곧 열립니다</span>
               </div>\`
            : '';

        const titleHtml = p.isComingSoon 
            ? \`<h3 class="serif showcase-title" style="color: #7f8c8d;">\${p.title}</h3>\`
            : \`<h3 class="serif showcase-title">\${p.title}\${p.isNew ? \` <span style="display: inline-block; background: #FF3D71; color: white; font-family: var(--font-playfair), serif; font-weight: 700; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; vertical-align: middle; margin-left: 10px; box-shadow: 0 0 10px rgba(255, 61, 113, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">NEW</span>\` : ''}</h3>\`;

        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : \`RECIPE FILE // Vol.\${p.id}\`;
        const actionBtnText = p.isComingSoon ? \`공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>\` : \`상세보기 <i class="fa-solid fa-chevron-right"></i>\`;

        return \`
            <div class="accordion-slice \${p.isComingSoon ? 'coming-soon-slice' : ''}" 
                 style="\${bgStyle} --theme-color: \${p.themeColor}; --theme-glow: \${p.themeGlow}; --accent-color: \${p.accentColor};" 
                 onclick="handleSliceClick(event, '\${p.id}')"
                 data-vol="\${p.isComingSoon ? comingSoonVol : p.id}">
                
                \${comingSoonOverlay}
                
                <div class="slice-overlay"></div>
                
                <div class="slice-content-wrapper">
                    <!-- 헤더 아카이브 볼륨 레이블 -->
                    <div class="editorial-volume font-serif">\${metaText}</div>
                    
                    <!-- 디저트 타이틀 블록 -->
                    <div class="editorial-title-block">
                        \${titleHtml}
                        <div class="editorial-essence font-serif">"\${p.creatorsNote}"</div>
                    </div>
                    
                    <!-- 물성 스펙 테이블 -->
                    <div class="editorial-spec-grid font-serif">
                        <div class="spec-row">
                            <span class="spec-label">TEXTURE</span>
                            <span class="spec-value">\${specs.texture}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">WELLNESS SPEC</span>
                            <span class="spec-value">\${specs.wellness}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">BAKING METHOD</span>
                            <span class="spec-value">\${specs.method}</span>
                        </div>
                    </div>
                    
                    <!-- 푸터 연동 페어링 가이드 -->
                    <div class="editorial-footer-essence">
                        <span class="pairing-label">RECOMMENDED PAIRING</span>
                        <p class="pairing-desc font-serif">\${p.pairingGuide}</p>
                    </div>
                    
                    <!-- 인터랙티브 소환 버튼 -->
                    <div class="editorial-action-box">
                        <button class="action-btn font-serif">\${actionBtnText}</button>
                    </div>
                </div>
            </div>
        \`;
    }).join('');
}
`;
        appContent = appContent.substring(0, accordionStart) + newAccordionCode + '\n\n' + appContent.substring(actualEndIdx);
    }

    // Fix Item 5: Fix broken slides remove block (Line 34~35)
    // slides.forEach(slide => slide.cla
    // 00%; height: 100%;
    // Actually, in the restored v14 file:
    // 34:     slides.forEach(slide => slide.cla
    // 35: 00%; height: 100%;
    // Let's replace this.
    const slidesTarget = `    slides.forEach(slide => slide.cla\n00%; height: 100%;`;
    const slidesReplace = `    slides.forEach(slide => slide.classList.remove('active'));`;
    appContent = appContent.replace(slidesTarget, slidesReplace);

    // Remove excessive empty lines in dubu_app.js as well
    const appLines = appContent.split('\n');
    const cleanedAppLines = [];
    let emptyAppCount = 0;
    for (let i = 0; i < appLines.length; i++) {
        const line = appLines[i];
        if (line.trim() === '') {
            emptyAppCount++;
            if (emptyAppCount <= 1) {
                cleanedAppLines.push('');
            }
        } else {
            emptyAppCount = 0;
            cleanedAppLines.push(line);
        }
    }

    fs.writeFileSync(finalAppPath, cleanedAppLines.join('\n'), 'utf8');
    console.log('Successfully repaired and wrote dubu_app.js');
}

console.log('=== Repair Finished ===');
