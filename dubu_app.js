






































    
    slides[heroSlideIndex].classList.add('active');
}

// 4.5초 주기로 메인 룩북 화보를 교차 페이드인합니다.
setInterval(rotateHeroSlide, 4500);

// ==========================================================================
// 3. Atelier Focus Stage (몰입형 3D 계산기 및 3대 감성 탭)
// ==========================================================================
// 지능형 테마 생성기: 레시피의 ID, 카테고리, 경로, 제목을 분석하여 다채로운 시즌/테마별 가죽 표지 및 책등 색상을 반환합니다.
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
        // 크리스마스 테마: 포레스트 그린(딥 트리 초록) 가죽 표지로 단일 통일하여 톤앤매너 일치
        return {
            themeColor: '#0e4a27',
            themeGlow: 'rgba(15, 74, 41, 0.35)',
            accentColor: '#e5a93b', // 고급스러운 웜 골드 악센트
            spineColor1: '#072513',
            spineColor2: '#0e4a27',
            spineTextColor: '#ffd79e'
        };
    }

    // 2. 할로윈 (Halloween / Midnight Spooky)
    const isHalloween = 
        path.includes('할로윈') || 
        title.includes('단호박') || 
        [4, 15, 18, 9].includes(id);

    if (isHalloween) {
        // 할로윈 테마: 미드나잇 퍼플(스푸키 보라) 가죽 표지로 단일 통일하여 톤앤매너 일치
        return {
            themeColor: '#4d1d59',
            themeGlow: 'rgba(141, 45, 171, 0.35)',
            accentColor: '#ffd700', // 웜 골드 악센트
            spineColor1: '#2c0e35',
            spineColor2: '#4d1d59',
            spineTextColor: '#eed5ff'
        };
    }

    // 3. 발렌타인데이 / 화이트데이 / 로맨틱 테마 (Romantic Valentine / Hearts)
    const isRomantic = 
        path.includes('발렌타인') || 
        path.includes('화이트데이') || 
        title.includes('바크초콜릿') || 
        title.includes('초코케익') || 
        title.includes('초코마들렌') || 
        [37, 30, 31, 32].includes(id);

    if (isRomantic) {
        if (id === 37 || id === 30) {
            // 러블리 버건디/장미 테마
            return {
                themeColor: '#6c1524',
                themeGlow: 'rgba(197, 43, 71, 0.22)',
                accentColor: '#fcc2cd',
                spineColor1: '#3d0a13',
                spineColor2: '#6c1524',
                spineTextColor: '#ffe6eb'
            };
        } else {
            // 로맨틱 로즈 브라운/핑크 테마
            return {
                themeColor: '#5c382f',
                themeGlow: 'rgba(224, 143, 126, 0.2)',
                accentColor: '#fcd3c1',
                spineColor1: '#361f19',
                spineColor2: '#5c382f',
                spineTextColor: '#fff0eb'
            };
        }
    }

    // 4. 설날-추석 / 명절 / 전통 감성 테마 (Traditional / Nostalgia)
    const isTraditional = 
        path.includes('명절') || 
        path.includes('수능') || 
        title.includes('흑임자') || 
        title.includes('쑥') || 
        title.includes('단팥') || 
        title.includes('모찌') || 
        categories.includes('nostalgia') || 
        [39, 38, 17, 16, 33, 8, 35, 12, 11].includes(id);

    if (isTraditional) {
        if (title.includes('쑥') || categories.includes('soymilk')) {
            // 그윽한 쑥/말차 포레스트 가죽 테마
            return {
                themeColor: '#2b3d2b',
                themeGlow: 'rgba(85, 125, 85, 0.2)',
                accentColor: '#d6cba0',
                spineColor1: '#172417',
                spineColor2: '#2b3d2b',
                spineTextColor: '#e5debf'
            };
        } else {
            // 앤틱 오커 황토색/가을 단풍 가죽 테마
            return {
                themeColor: '#614023',
                themeGlow: 'rgba(189, 131, 79, 0.2)',
                accentColor: '#e0c897',
                spineColor1: '#3b2512',
                spineColor2: '#614023',
                spineTextColor: '#ebdaba'
            };
        }
    }

    // 5. 카테고리별 다채로운 테마들
    // creamy (부드러운 민트 계열)
    if (categories.includes('creamy')) {
        return {
            themeColor: '#163b32',
            themeGlow: 'rgba(40, 117, 99, 0.18)',
            accentColor: '#e5d1a8',
            spineColor1: '#0a211b',
            spineColor2: '#163b32',
            spineTextColor: '#ebdcb8'
        };
    }
    // cloud (폭신한 하늘색/파스텔 자두 계열)
    if (categories.includes('cloud')) {
        return {
            themeColor: '#2c2e4f',
            themeGlow: 'rgba(84, 91, 158, 0.18)',
            accentColor: '#dfd2e5',
            spineColor1: '#181930',
            spineColor2: '#2c2e4f',
            spineTextColor: '#eae1ed'
        };
    }
    // fudgy (묵직한 초콜릿/진흙 계열)
    if (categories.includes('fudgy')) {
        return {
            themeColor: '#4f271a',
            themeGlow: 'rgba(145, 75, 51, 0.18)',
            accentColor: '#f0dfbe',
            spineColor1: '#2b140c',
            spineColor2: '#4f271a',
            spineTextColor: '#faedd2'
        };
    }
    // teatime (로열 골든 옐로우 계열)
    if (categories.includes('teatime')) {
        return {
            themeColor: '#5c4b26',
            themeGlow: 'rgba(163, 134, 72, 0.18)',
            accentColor: '#f2e5bc',
            spineColor1: '#362b14',
            spineColor2: '#5c4b26',
            spineTextColor: '#faf3d9'
        };
    }

    // 6. 기본 테마 (앤틱 브라운)
    return {
        themeColor: '#3a1d11',
        themeGlow: 'rgba(197, 160, 89, 0.15)',
        accentColor: '#c5a059',
        spineColor1: '#251109',
        spineColor2: '#3a1d11',
        spineTextColor: '#ebd090'
    };
}

function openFocusStage(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    // 공통 테마 생성기 호출로 시즌 및 테마별 가죽 표지 색상 획득
    const theme = getRecipeTheme(recipe);

    // 마법책 테마 클래스 상시 적용 및 가죽 표지 색상 동적 매핑
    const board = overlay.querySelector('.atelier-focus-board');
    if (board) {
        board.classList.add('magic-book-theme');
        if (theme) {
            board.style.setProperty('--magic-book-color', theme.themeColor);
            board.style.setProperty('--magic-book-glow', theme.themeGlow);
            board.style.setProperty('--magic-book-accent', theme.accentColor);
        } else {
            // 폴백 디폴트 고풍스러운 앤틱 브라운 테마
            board.style.setProperty('--magic-book-color', '#3a1d11');
            board.style.setProperty('--magic-book-glow', 'rgba(197, 160, 89, 0.15)');
            board.style.setProperty('--magic-book-accent', '#c5a059');
        }
    }

    // 모달을 열 때 항상 첫 번째 재료 계산기 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 이미지 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // 테마 연동 스타일링 (웹툰 화보 연출 효과)
    if (theme) {
        titleEl.style.color = theme.themeColor;
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = theme.themeGlow;
            diffPill.style.color = theme.themeColor;
            diffPill.style.borderColor = theme.themeColor;
        }
    } else {
        titleEl.style.color = '';
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = '';
            diffPill.style.color = '';
            diffPill.style.borderColor = '';
        }
    }

    // 2. 가이드 데이터 바인딩
    let difficulty = "보통 🟡";
    let bakingTip = "오븐 예열 170℃ / 25분";
    let cheers = "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";
    let isYield = false;
    
    if (recipe.id === 40) {
        difficulty = "오란다 대 3개 분량 🍞";
        bakingTip = "180°C 예열 → 170°C / 40분 (콩물 마무리 + 하루 숙성 권장)";
        cheers = "다음 날이 진짜입니다! 하루 숙성 후 먹는 그 촉촉함과 고소함은 레시피의 진짜 얼굴이에요. ☀️";
        isYield = true;
    } else if (recipe.id === 39) {
        difficulty = "오란다 대 틀 1개 분량 🍞";
        bakingTip = "중탕 예열 150℃ / 140℃ 60분 (뜸 10분)";
        cheers = "순두부 물기를 짜지 않고 그대로 사용하여, 촉촉함과 꾸덕함이 극대화되는 특별한 레시피입니다. 🖤";
        isYield = true;
    } else if (recipe.id === 38) {
        difficulty = "보통 🟡";
        bakingTip = "오븐 예열 180℃ / 160℃ 30~35분";
        cheers = "향긋한 쑥과 찰기가 만든 한국적 쫀득함! 부모님 선물용 부동의 1위 레시피랍니다. 🌿";
    } else if (recipe.id === 37) {
        difficulty = "쉬움 🟢";
        bakingTip = "오븐 예열 165℃ / 25분";
        cheers = "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝";
    } else if (recipe.id === 36) {
        difficulty = "쉬움 🟢";
        bakingTip = "냉장실 냉각 / 4시간";
        cheers = "사르르 사그라지는 두부 크림의 극상 부드러움! 컵에 소복히 담으면 더욱 기쁩니다. 🍮";
    } else if (recipe.id === 35) {
        difficulty = "어려움 🔴";
        bakingTip = "오븐 예열 180℃ / 160℃ 50~55분";
        cheers = "명절의 기품을 한껏 높여주는 굳지 않는 비법 모찌떡케이크, 정성으로 완성해 보아요! 🧧";
    } else if (recipe.id === 17) {
        difficulty = "쉬움 🟢";
        bakingTip



"    const diffPill = document.getElementById('focus-recipe-difficulty');\n    if (BASE_YIELDS[recipeId]) {\n        if (diffPill) diffPill.style.display = 'inline-flex';\n        updateDynamicYieldDisplay(recipeId, 1.0);\n    } else {\n        if (diffPill) diffPill.style.display = 'none';\n    }"





    let troubleHTML = "";
    if (rawTrouble.includes("Q.") && rawTrouble.includes("A.")) {
        const parts = rawTrouble.split("<br>");
        const qText = parts[0].replace("Q.", "").trim();
        const aText = parts[1] ? parts[1].replace("A.", "").trim() : "";
        
        troubleHTML = `
            <div class="trouble-qa-card" style="display: flex; flex-direction: column; gap: 10px;">
                <div class="trouble-question" style="font-weight: 700; color: #D32F2F; margin-bottom: 4px; font-size: 0.88rem; display: flex; align-items: flex-start; gap: 8px;">
                    <span style="background: #E53935; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">Q</span>
                    <span style="word-break: keep-all; line-height: 1.4;">${qText}</span>
                </div>
                <div class="trouble-answer" style="background: white; border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #2C3E50; line-height: 1.6; display: flex; align-items: flex-start; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
                    <span style="background: var(--dubu-mint-accent); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">A</span>
                    <span style="word-break: keep-all; font-weight: 500;">${aText}</span>















































                        <i class="fa-solid fa-cookie-bite" style="font-size: 0.85rem;"></i> 
                        <span>프로젝트 두부 공식 채널 가기 ↗</span>
                    </a>
                </div>
            `;
        }
    }

    // 3. 재료 목록 세팅 (첫 번째 재료는 내 순두부 양으로 하이라이트)
    const ingredients = INGREDIENT_DICT[recipeId] || [
        { name: "순두부 베이스", base: 100 },
        { name: "박력분 / 대체분", base: 100 },
        { name: "유기농 설탕", base: 50 }
    ];

    const anchorIngredient = ingredients[0];
    document.getElementById('focus-anchor-label').innerText = anchorIngredient.name;
    
    const anchorInput = document.getElementById('focus-anchor-input');
    anchorInput.value = anchorIngredient.base;
    anchorInput.setAttribute('data-base', anchorIngredient.base);

    // 순두부 앵커 체크박스 초기화
    const anchorParent = document.querySelector('.primary-anchor-box');
    if (anchorParent) {
        anchorParent.classList.remove('checked-row');
        const circle = anchorParent.querySelector('.ing-check-circle');
        if (circle) circle.classList.remove('checked');
    }

    // 나머지 재료들 리스트화
    const listContainer = document.getElementById('focus-ingredients-list');
    listContainer.innerHTML = '';

    for (let i = 1; i < ingredients.length; i++) {
        const ing = ingredients[i];
        const row = document.createElement('div');
        row.className = 'focus-ingredient-calc-row';
        row.innerHTML = `
            <div class="ing-check-circle" onclick="toggleIngCheck(this)"></div>
            <span class="focus-ing-name">${ing.name}</span>
            <div class="focus-ing-input-wrapper">
                <input type="number" class="focus-ing-input" 
                       data-base="${ing.base}" 
                       value="${ing.base}" 
                       oninput="onFocusIngredientChange(this)">
                <span class="focus-ing-unit">g</span>
            </div>
        `;
        listContainer.appendChild(row);
    }

"    // 4. 동적 순서 타임라인 빌드\n    const stepsList = RECIPE_STEPS_DB[recipeId] || DEFAULT_RECIPE_STEPS;\n    const timelineContainer = document.getElementById('focus-steps-timeline');\n    if (timelineContainer) {\n        timelineContainer.innerHTML = stepsList.map((step, idx) => {\n            return `\n                <div class=\"timeline-step-item\" data-step-idx=\"${idx}\" onclick=\"highlightTimelineStep(this); toggleTimelineStepComplete(this, ${stepsList.length});\">\n                    <div class=\"timeline-step-badge\">\n                        <span class=\"step-num-text\">${idx + 1}</span>\n                        <i class=\"fa-solid fa-check step-check-icon\" style=\"display: none;\"></i>\n                    </div>\n                    <div class=\"timeline-step-content\">\n                        <div class=\"step-header-row\" style=\"display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 6px;\">\n                            <h4 class=\"timeline-step-title\">${step.title}</h4>\n                            <span class=\"step-time-pill\" style=\"font-size: 0.8rem; font-weight: 700; color: var(--magic-book-color); background: rgba(58,105,88,0.08); padding: 4px 10px; border-radius: 12px;\"><i class=\"fa-regular fa-clock\"></i> ${step.time}</span>\n                        </div>\n                        <p class=\"timeline-step-desc\" style=\"font-size: 0.85rem; color: #5D6D7E; line-height: 1.5; margin: 0; word-break: keep-all;\">${step.desc}</p>\n                    </div>\n                </div>\n            `;\n        }).join('');\n    }"
    // 탭 상태 및 진행률 게이지 리셋
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. 레시피 다운로드 & 블로그 & 룩북 버튼 이벤트 바인딩
    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, difficulty, bakingTip, cheers);
    };
    
    // 블로그 버튼: 레시피 blogUrl 연동
    const blogBtn = document.getElementById('focus-btn-blog');
    if (blogBtn) {
        if (recipe.blogUrl) {
            blogBtn.href = recipe.blogUrl;
            blogBtn.style.opacity = '1';
            blogBtn.style.pointerEvents = 'auto';
        } else {
            blogBtn.href = '#';
            blogBtn.style.opacity = '0.45';
            blogBtn.style.pointerEvents = 'none';
        }
    }
    
    // 룩북 버튼: 레시피 path 연동
    const lookbookBtn = document.getElementById('focus-btn-lookbook');
    if (lookbookBtn) {
        const id = Number(recipe.id);
        const isChristmas = [20, 21, 22, 23, 24, 25, 26].includes(id);
        const isHalloween = [4, 9, 15, 18].includes(id);
        
        if (recipe.path || isChristmas || isHalloween) {
            // 버튼 활성화 스타일 복원
            lookbookBtn.style.opacity = '1';
            lookbookBtn.style.pointerEvents = 'auto';
            lookbookBtn.onclick = () => { closeFocusStage(); };
            
            // 크리스마스 및 할로윈 레시피에 대해 이전에 만들어 둔 룩북(스페셜 화보북) 화면으로 연동
            if (isChristmas) {
                // Vol 번호는 id + 1 매핑
                lookbookBtn.href = `../[이벤트] 성탄절_스페셜_화보북/index.html#vol${id + 1}`;
            } else if (isHalloween) {
                if (id === 4) lookbookBtn.href = `../[이벤트] 할로윈_스페셜_화보북/index.html#vol4`;
                else if (id === 9) lookbookBtn.href = `../[이벤트] 할로윈_스페셜_화보북/index.html`; // 9번 브라우니쿠키
                else if (id === 15) lookbookBtn.href = `../[이벤트] 할로윈_스페셜_화보북/index.html#vol16`;
                else if (id === 18) lookbookBtn.href = `../[이벤트] 할로윈_스페셜_화보북/index.html#vol19`;
            } else {
                lookbookBtn.href = recipe.path;
            }
        } else {
            // 룩북 경로가 누락된 경우 비활성화
            lookbookBtn.href = '#';
            lookbookBtn.style.opacity = '0.45';
            lookbookBtn.style.pointerEvents = 'none';
        }
    }

    // 6. 오버레이 활성화
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 7. 재료가 스크롤 없이 모두 한눈에 보일 때의 자연스러운 높이를 측정하여 좌우 카드 높이를 동일하게 고정
    const leftCard = document.querySelector('.focus-stage-left');
    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 기존 인라인 높이 초기화
        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // 렌더링이 완료된 후 높이를 정확히 측정하기 위해 짧은 타임아웃 실행
        setTimeout(() => {
            if (window.innerWidth > 900) { // 데스크톱 모드에서만 높이 동일화 적용
                const naturalHeight = rightCard.offsetHeight;
                if (naturalHeight > 0) {
                    leftCard.style.height = `${naturalHeight}px`;
                    rightCard.style.height = `${naturalHeight}px`;
                }
            }
        }, 60);
    }
}

function toggleIngCheck(circleEl) {
    circleEl.classList.toggle('checked');
    const parent = circleEl.closest('.focus-ingredient-calc-row') || circleEl.closest('.primary-anchor-box');
    if (parent) {
        parent.classList.toggle('checked-row');
    }
}

function switchFocusTab(tabId) {
    const tabCalcBtn = document.getElementById('btn-tab-calc');
    const tabStepsBtn = document.getElementById('btn-tab-steps');
    const tabTroubleBtn = document.getElementById('btn-tab-trouble');
    
    const contentCalc = document.getElementById('focus-tab-calc-content');
    const contentSteps = document.getElementById('focus-tab-steps-content');
    const contentTrouble = document.getElementById('focus-tab-trouble-content');
    
    if (!tabCalcBtn || !tabStepsBtn || !tabTroubleBtn || !contentCalc || !contentSteps || !contentTrouble) return;

    tabCalcBtn.classList.remove('active');
    tabStepsBtn.classList.remove('active');
    tabTroubleBtn.classList.remove('active');
    
    contentCalc.style.display = 'none';
    contentSteps.style.display = 'none';
    contentTrouble.style.display = 'none';

    if (tabId === 'calc') {
        tabCalcBtn.classList.add('active');
        contentCalc.style.display = 'flex';
    } else if (tabId === 'steps') {
        tabStepsBtn.classList.add('active');
        contentSteps.style.display = 'flex';
    } else if (tabId === 'trouble') {
        tabTroubleBtn.classList.add('active');
        contentTrouble.style.display = 'flex';
    }
}

function highlightTimelineStep(itemEl) {
    const siblings = itemEl.parentNode.querySelectorAll('.timeline-step-item');
    siblings.forEach(el => el.classList.remove('highlighted'));
    itemEl.classList.add('highlighted');
}

function toggleTimelineStepComplete(itemEl, totalSteps) {
    itemEl.classList.toggle('completed');
    const checkIcon = itemEl.querySelector('.step-check-icon');
    const numText = itemEl.querySelector('.step-num-text');
    
    if (itemEl.classList.contains('completed')) {
        if (checkIcon) checkIcon.style.display = 'block';
        if (numText) numText.style.display = 'none';
    } else {
        if (checkIcon) checkIcon.style.display = 'none';
        if (numText) numText.style.display = 'block';
    }
    
    updateTimelineProgress(itemEl.parentNode, totalSteps);
}

function resetTimelineProgress(totalSteps) {
    const textEl = document.getElementById('focus-progress-text');
    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `0 / ${totalSteps} 단계 완료 (0%)`;
        barEl.style.width = '0%';
    }
}

function updateTimelineProgress(timelineContainer, totalSteps) {
    const completedCount = timelineContainer.querySelectorAll('.timeline-step-item.completed').length;
    const percent = Math.round((completedCount / totalSteps) * 100);
    
    const textEl = document.getElementById('focus-progress-text');
    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `${completedCount} / ${totalSteps} 단계 완료 (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }
}

function closeFocusStage() {
    const overlay = document.getElementById('atelier-focus-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // 마법책 테마 클래스 제거 및 리셋
        const board = overlay.querySelector('.atelier-focus-board');
        if (board) {
            board.classList.remove('magic-book-theme');
        }
    }
}

// ==========================================================================
// 4. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "오란다 대 {x}개 분량 🍞", baseCount: 3 },
    39: { template: "오란다 대 {x}개 분량 🍞", baseCount: 1 },






































































































function renderArchive(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;
    
    // 마법서 강제 닫기
    closeMagicBook();

    // 볼륨(ID) 순서대로 오름차순 정렬하여 책장에 왼쪽에서 오른쪽으로 흐르도록 정돈
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">검색 결과에 맞는 레시피가 없습니다.</div>`;
        return;
    }
    
    isDragging: false,
    startX: 0,
    scrollStartX: 0,
    minX: -1400,
    maxX: 0,
    animationFrameId: null,
    isEngineInitialized: false
};

function renderArchive(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;
    
    // 마법서 강제 닫기
    closeMagicBook();

    // 볼륨(ID) 순서대로 오름차순 정렬하여 책장에 왼쪽에서 오른쪽으로 흐르도록 정돈
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">검색 결과에 맞는 레시피가 없습니다.</div>`;
        return;
    }
    
    // 책이 늘어나도 서가가 세로로 길어지지 않게 2개 층(2 Rows)으로 책을 나눕니다.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 책등 테마 색
                37: "순두부 화이트<br>바크초콜릿",
                36: "순두부<br>티라미수푸딩",
                35: "순두부 모찌떡<br>케이크",
                34: "순두부 얼그레이<br>그릭스콘",
                33: "순두부 녹차요거트<br>파운드케익",
                30: "순두부<br>미니초코케익",
                28: "순두부<br>시나몬롤",
                26: "순두부<br>눈꽃컵케이크",
                25: "순두부 3종케익",
                24: "순두부 초코<br>번트케익",
                23: "순두부 레몬<br>번트케익",
                22: "순두부 블랙포레스트<br>컵케익",
                21: "순두부<br>부쉬드노엘",
                20: "순두부<br>슈톨렌",
                19: "투톤 순두부<br>타르트",
                18: "순두부 단호박<br>찹쌀빵",
                17: "순두부 코코넛<br>단팥구움바",
                16: "순두부 밤<br>파운드케이크",
                15: "순두부 단호박<br>바스크 치즈케이크",
                12: "순두부 크림치즈<br>롤케익",
                11: "순두부 치즈스콘",
                10: "순두부 레몬케이크",
                9: "순두부<br>브라우니쿠키",
     











                22: "순두부 블랙포레스트<br>컵케익",
                21: "순두부<br>부쉬드노엘",
                20: "순두부<br>슈톨렌",
                19: "투톤 순두부<br>타르트",
                18: "순두부 단호박<br>찹쌀빵",
                17: "순두부 코코넛<br>단팥구움바",
                16: "순두부 밤<br>파운드케이크",
                15: "순두부 단호박<br>바스크 치즈케이크",
                12: "순두부 크림치즈<br>롤케익",
                11: "순두부 치즈스콘",
                10: "순두부 레몬케이크",
                9: "순두부<br>브라우니쿠키",
                8: "순두부 찹쌀모찌<br>케이크",
                7: "순두부 크림치즈<br>쿠키",
                6: "얼그레이<br>순두부 케이크",
                5: "순두부 황치즈<br>휘낭시에",
                4: "순두부<br>퍼지브라우니",
                3: "순두부 바스크<br>치즈케이크",
                2: "순두부 크림치즈<br>티라미수",
                1: "순두부 크림치즈"
            };

            // 타이틀 길이별 폰트 스타일 지정 및 긴 타이틀 두 줄 처리
            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // 두 줄로 개행된 경우 폰트 간격과 라인높이 정밀 세팅
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 고정된 넉넉한 책등 두께
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px 높이의 자연스러운 입체 변차

            const customStyles = `width: ${width}px; height: ${height}px;`;

            booksHtml += `
                <div class="book-card" id="book-card-${p.id}" style="${customStyles}" onclick="openFocusStage(${p.id})">
                    <div class="book-spine ${themeClass}">
                        <div class="spine-vol">${magicSymbol} VOL.${p.id}</div>
                        <div class="spine-title" style="${titleStyle}">${displayTitle}</div>
                        <div class="spine-icon"><i class="fa-solid ${iconClass}"></i></div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="shelf-row" id="shelf-row-${shelfNum}">
                <div class="shelf-row-backlight"></































            
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.transform = `scale(${scale})`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            sparklesContainer.appendChild(star);
        }
        wrapper.insertBefore(sparklesContainer, wrapper.firstChild);
    }

    // 데이터가 변경되었으므로 가로 스크롤 범위 재계산
    setTimeout(() => {
        recalculateBookshelfBounds();
    }, 100);

    // 인터랙션 제어 엔진 구동
    if (!bookshelfState.isEngineInitialized) {
        initBookshelfEngine();
    }
}

function recalculateBookshelfBounds() {
    const wrapper = document.querySelector('.bookshelf-wrapper');
    const row1 = document.getElementById('shelf-row-1');
    const row2 = document.getElementById('shelf-row-2');
    
    if (!wrapper) return;
    
    // 임시로 under-flow를 제거하고 원래의 max-content 너비를 산출
    if (row1) row1.classList.remove('under-flow');
    if (row2) row2.classList.remove('under-flow');
    
    const wrapperWidth = wrapper.offsetWidth;
    const rowWidth = Math.max(
        row1 ? row1.scrollWidth : 0,
        row2 ? row2.scrollWidth : 0
    );
    
    if (rowWidth > wrapperWidth - 80) {
        // 책장이 wrapper보다 길 때 스크롤 범위 설정
        bookshelfState.minX = wrapperWidth - rowWidth - 60; // 약간의 패딩 오프셋
        if (row1) row1.style.width = 'max-content';







































    }
    
    const rows = document.querySelectorAll('.focus-ingredient-calc-row');
    rows.forEach(row => {
        const nameEl = row.querySelector('.focus-ing-name');
        const inputEl = row.querySelector('.focus-ing-input');
        if (nameEl && inputEl) {
            const name = nameEl.innerText.trim();
            const value = inputEl.value.trim();
            if (name && value) {
                ingredientText += `- ${name}: ${value}g\n`;
            }
        }
    });

    // 2. 분량 정보 수집 (예: "분량: 오란다 대 3개 분량 📦")
    const yieldEl = document.getElementById('focus-recipe-difficulty');
    let yieldText = yieldEl ? yieldEl.innerText.trim() : '';
    if (yieldText.includes('난이도:')) {
        yieldText = '';
    } else {
        yieldText = yieldText.replace('분량:', '').trim();
    }
    
    // 3. 복사할 텍스트 템플릿 구성
    let copyText = `[프로젝트 두부] ${title} 레시피 💌\n\n`;
    if (yieldText) {
        copyText += `■ 기준 분량: ${yieldText}\n`;
    }
    if (ingredientText) {
        copyText += `■ 맞춤 계량 재료:\n${ingredientText}\n`;












    render();
    
    setTimeout(() => {
        particles.forEach(p => p.speed = p.speed * 1.5);
    }, 4000);
}

function shareRecipe(event, title) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // 1. 현재 화면에 표시된 재료 명칭과 계산된 계량값 수집
    const anchorLabel = document.getElementById('focus-anchor-label')?.innerText || '';
    const anchorInput = document.getElementById('focus-anchor-input');
    const anchorValue = anchorInput ? anchorInput.value : '';
    
    let ingredientText = '';
    if (anchorLabel && anchorValue) {
        ingredientText += `- ${anchorLabel}: ${anchorValue}g\n`;
    }
    
    const rows = document.querySelectorAll('.focus-ingredient-calc-row');
    rows.forEach(row => {
        const nameEl = row.querySelector('.focus-ing-name');
        const inputEl = row.querySelector('.focus-ing-input');
        if (nameEl && inputEl) {
            const name = nameEl.innerText.trim();
            const value = inputEl.value.trim();
            if (name && value) {
                ingredientText += `- ${name}: ${value}g\n`;
            }
        }
    });

    // 2. 분량 정보 수집 (예: "분량: 오란다 대 3개 분량 📦")
    const yiel

























        textArea.value = copyText;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert(`💌 [레시피 및 맞춤 계량 복사 완료]\n\n"${title}" 레시피 링크와 현재 화면의 맞춤 계산 계량값이 클립보드에 안전하게 복사되었습니다.`);
            } else {
                alert(`❌ 링크 복사 실패: 직접 브라우저 주소창의 링크를 복사해 주세요.`);
            }
        } catch (e) {
            alert(`❌ 링크 복사 실패: 직접 브라우저 주소창의 링크를 복사해 주세요.`);
        }
        document.body.removeChild(textArea);
    });
}

function toggleUnwrap(event, id) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const cards = document.querySelectorAll('.showcase-card');
    const targetCard = document.getElementById('card-' + id);
    
    cards.forEach(card => {
        if (card !== targetCard) {
            card.classList.remove('unwrapped');
        }
    });
    
    if (targetCard) {
        targetCard.classList.toggle('unwrapped');
        if (targetCard.classList.contains('unwrapped')) {
            setTimeout(() => {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 450);
        }
    }
}

// ==========================================================================
// 6. 클래식 아카이브 검색 엔진 & 큐레이션 쇼케이스
// ==========================================================================
// ==========================================================================
// 6. 3D 책꽂이 및 마법 소환서(Magic Spellbook) 엔진 (v25.0 - Harry Potter Theme)
// ==========================================================================
// 전역 3D 책장 제어 상태 객체
let bookshelfState = {
    targetX: 0,
    currentX: 0,
    isDragging: false,
    startX: 0,
    scrollStartX: 0,
    minX: -1400,
    maxX: 0,
    animationFrameId: null,
    isEngineInitialized: false
};

function renderArchive(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;
    
    // 마법서 강제 닫기
    closeMagicBook();

    // 볼륨(ID) 순서대로 오름차순 정렬하여 책장에 왼쪽에서 오른쪽으로 흐르도록 정돈
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">검색 결과에 맞는 레시피가 없습니다.</div>`;
        return;
    }
    
    // 책이 늘어나도 서가가 세로로 길어지지 않게 2개 층(2 Rows)으로 책을 나눕니다.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 공통 테마 생성기 호출로 시즌 및 테마별 책등 색상 세트 획득
            const theme = 










            const magicSymbol = magicSymbols[seed % magicSymbols.length];

            // 각 디저트별 의미 단위(단어 경계)를 유지하는 수동 줄바꿈 매핑 사전
            const SPINE_TITLE_MAP = {
                40: "순두부 콩물<br>파운드케익",
                39: "순두부<br>흑임자 테린",
                38: "순두부 쑥<br>찰떡브라우니",
                37: "순두부 화이트<br>바크초콜릿",
                36: "순두부<br>티라미수푸딩",
                35: "순두부 모찌떡<br>케이크",
                34: "순두부 얼그레이<br>그릭스콘",
                33: "순두부 녹차요거트<br>파운드케익",
                30: "순두부<br>미니초코케익",
                28: "순두부<br>시나몬롤",
                26: "순두부<br>눈꽃컵케이크",
                25: "순두부 3종케익",
                24: "순두부 초코<br>번트케익",
                23: "순두부 레몬<br>번트케익",
                22: "순두부 블랙포레스트<br>컵케익",
                21: "순두부<br>부쉬드노엘",
                20: "순두부<br>슈톨렌",
                19: "투톤 순두부<br>타르트",
                18: "순두부 단호박<br>찹쌀빵",
                17: "순두부 코코넛<br>단팥구움바",
                16: "순두부 밤<br>파운드케이크",
                15: "순두부 단호박<br>바스크 치즈케이크",
                12: "순두부 크림치즈<br>롤케익",
                11: "순두부 치즈스콘",
                10: "순두부 레몬케이크",
                9: "순두부<br>브라우니쿠키",
                8: "순두부 찹쌀모찌<br>케이크",
                7: "순두부 크림치즈<br>쿠키",
                6: "얼그레이<br>순두부 케이크",
                5: "순두부 황치즈<br>휘낭시에",
                4: "순두부<br>퍼지브라우니",
                3: "순두부 바스크<br>치즈케이크",
                2: "순두부 크림치즈<br>티라미수",
                1: "순두부 크림치즈"
            };

            // 타이틀 길이별 폰트 스타일 지정 및 긴 타이틀 두 줄 처리
            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // 두 줄로 개행된 경우 폰트 간격과 라인높이 정밀 세팅
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 고정된 넉넉한 



























    container.innerHTML = html;

    // 은하수 별빛 돔 파티클 동적 생성
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';

        const numStars = Math.floor(Math.random() * 20) + 40; // 40~60개 은하수 별빛
        for (let sIdx = 0; sIdx < numStars; sIdx++) {
            const star = document.createElement('span');
            star.className = 'star-sparkle';
            if (Math.random() < 0.25) star.classList.add('star-large');
            
            const top = (Math.random() * 96 + 2).toFixed(2);
            const left = (Math.random() * 96 + 2).toFixed(2);
            const scale = (Math.random() * 0.8 + 0.6).toFixed(2);
            const delay = (Math.random() * 5).toFixed(2);
            const duration = (Math.random() * 3 + 2.5).toFixed(2);
            
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.transform = `scale(${scale})`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            sparklesContainer.appendChild(star);
        }
        wrapper.insertBefore(sparklesContainer, wrapper.firstChild);
    }

    // 데이터가 변경되었으므로 가로 스크롤 범위 재계산
    setTimeout(() => {
        recalculateBookshelfBounds();
    }, 100);

    // 인터랙션 제어 엔진 구동
    if (!bookshelfState.isEngineInitialized) {
        initBookshelfEngine();
    }
}

function recalculateBookshelfBounds() {
    const wrapper = document.querySelector('.bookshelf-wrapper');




































































































    const handleDragEnd = () => {
        if (!bookshelfState.isDragging) return;
        bookshelfState.isDragging = false;
        
        // 최종적으로 정해진 스크롤 범위를 벗어나지 않도록 복원
        bookshelfState.targetX = Math.max(bookshelfState.minX, Math.min(bookshelfState.targetX, bookshelfState.maxX));
    };

    // 마우스 이벤트 바인딩
    wrapper.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // 터치 이벤트 바인딩 (모바일 대응)
    wrapper.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    window.addEventListener('touchend', handleDragEnd);

    // 2. 마우스 휠 스크롤 등록 (휠을 굴릴 때 가로 스크롤로 매끄럽게 편입)
    wrapper.addEventListener('wheel', (e) => {
        // 브라우저 기본 세로 스크롤 방지
        e.preventDefault();
        
        const delta = e.deltaY || e.deltaX;
        let newX = bookshelfState.targetX - delta * 1.5; // 휠 속도 감도 조절
        
        // 범위를 벗어나지 않게 clamping
        bookshelfState.targetX = Math.max(bookshelfState.minX, Math.min(newX, bookshelfState.maxX));
    }, { passive: false });

    // 3. 실시간 3D 아치 투사 렌더 루프
    const update3D = () => {
        // 스무스 보간(Lerp): 현재 위치를 타겟 위치로 10%씩 매치시킴 (관성 효과)
        bookshelfState.currentX += (bookshelfState.targetX - bookshelfState.currentX) * 0.12;

        const row1 = document.getElementById('shelf-row-1');
        const row2 = document.getElementById('shelf-row-2');
        
        let wrapperWidth = wrapper.offsetWidth;
        if (wrapperWidth <= 0) {














































function openFocusStage(recipeId) {
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    // 모달을 열 때 항상 첫 번째 재료 계산기 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 이미지 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // 테마 연동 스타일링 (웹툰 화보 연출 효과)
    const theme = RECIPE_THEMES[recipeId];
    if (theme) {
        titleEl.style.color = theme.themeColor;
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = theme.themeGlow;
            diffPill.style.color = theme.themeColor;
            diffPill.style.borderColor = theme.themeColor;
        }
    } else {
        titleEl.style.color = '';
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = '';
            diffPill.style.color = '';
            diffPill.style.borderColor = '';
        }
    }

    // 2. 가이드 데이터 바인딩






    
    // 리사이즈 시 범위를 다시 재정렬
    window.addEventListener('resize', recalculateBookshelfBounds);

    bookshelfState.isEngineInitialized = true;
}

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
        { name: "유기농 설











    let troubleHTML = "";
    if (rawTrouble.includes("Q.") && rawTrouble.includes("A.")) {
        const parts = rawTrouble.split("<br>");
        const qText = parts[0].replace("Q.", "").trim();
        const aText = parts[1] ? parts[1].replace("A.", "").trim() : "";
        
        troubleHTML = `
            <div class="trouble-qa-card" style="display: flex; flex-direction: column; gap: 10px;">
                <div class="trouble-question" style="font-weight: 700; color: #D32F2F; margin-bottom: 4px; font-size: 0.88rem; display: flex; align-items: flex-start; gap: 8px;">
                    <span style="background: #E53935; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">Q</span>
                    <span style="word-break: keep-all; line-height: 1.4;">${qText}</span>
                </div>
                <div class="trouble-answer" style="background: white; border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #2C3E50; line-height: 1.6; display: flex; align-items: flex-start; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
                    <span style="background: var(--dubu-mint-accent); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">A</span>
                    <span style="word-break: keep-all; font-weight: 500;">${aText}</span>
                </div>
            </div>
        `;
    } else {
        troubleHTML = `
            <div style="font-size: 0.8rem; color: #5D6D7E; line-height: 1.6; word-break: keep-all;">
                ${rawTrouble}
            </div>
        `;
    }
    document.getElementById('focus-recipe-trouble-text').innerHTML = troubleHTML;

    const proBox = document.getElementById('focus-recipe-pro-box');
    if (proBox) {
        let matchedCreator = null;
        if (typeof MASTER_CREATORS !== 'undefined') {
            const creators = Object.values(MASTER_CREATORS);
            matchedCreator = creators.find(c => recipe.categories && recipe.categories.some(cat => c.keywords && c.keywords.includes(cat)));
        }
        
        if (matchedCreator) {
            proBox.innerHTML = `
                <div style="font-weight: 800; font-size: 0.88rem; color: var(--dubu-mint-accent); margin-bottom: 6px;">
                    👨‍🍳 추천 마스터의 감성 비밀 팁
                </div>
                <div style="font-size: 0.82rem; color: #4E342E; margin: 0; line-height: 1.6; word-break: keep-all; font-weight: 500; background: rgba(58, 105, 88, 0.03); padding: 12px 14px; border-radius: 8px; border: 1px dashed rgba(58, 105, 88, 0.15); display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                <a href="${matchedCreator.url}" target="_blank" style="color: #D32F2F; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-brands fa-youtube" style="color: #FF0000; font-size: 0.8rem;"></i> [${matchedCreator.videoTitle}] 강좌 보기 ↗
                </a>
            </div>
        `;
    } else {
        chefTipHtml = `
            <div style="font-weight: 800; font-size: 0.92rem; color: #8c6426; margin-bottom: 8px;">👨‍🍳 글로벌 비건 셰프 가이드</div>
            <div style="font-size: 0.84rem; color: #4e342e; margin: 0; line-height: 1.65; word-break: keep-all; font-weight: 500; background: rgba(140, 100, 38, 0.03); padding: 12px 14px; border-radius: 6px; border: 1px dashed rgba(140, 100, 38, 0.15); display: flex; flex-direction: column; gap: 6px;">
                <span style="font-style: italic;">"순두부를 비건 디저트에 적용할 때는 믹서기로 30초 이상 고속으로 완전히 갈아서 부드럽게 유화시키면, 버터나 우유 없이도 리치한 크림 텍스처를 구현할 수 있습니다."</span>
                <a href="https://blog.naver.com/project_dubu" target="_blank" style="color: #8c6426; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-solid fa-cookie-bite" style="font-size: 0.75rem;"></i> 프로젝트 두부 공식 채널 가기 ↗
                </a>
            </div>
        `;
    }

    const troubleHtml = `
        <div style="font-size: 0.85rem; line-height: 1.7; word-break: keep-all; display: flex; flex-direction: column; gap: 15px;">
            <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #D32F2F; margin-bottom: 8px;">⚠️ Q&A 트러블슈팅</div>
                <div style="background: rgba(211, 47, 47, 0.03); border: 1px solid rgba(211, 47, 47, 0.1); padding: 12px 14px; border-radius: 6px; color: #5c4135; font-weight: 500;">
                    ${troubleTip}
                </div>
            </div>
            <div>
                ${chefTipHtml}
            </div>
        </div>
    `;

    // 하단 이동 버튼군 3개 세트 정의
    const downloadBtn = `<button class="btn-magic-action download" onclick="issueRecipeCardFromMagicBook(${p.id}, '${p.title.replace(/'/g, "\\'")}', '${p.img}')"><i class="fa-solid fa-download"></i> 레시피 카드로 소장하기</button>`;
    
    const blogBtn = p.blogUrl
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank"><i class="fa-solid fa-book-open"></i> 블로그 가기 📖</a>`
        : `<button class="btn-magic-action blog" onclick="alert('공식 블로그 가이드가 준비 중입니다.')">가이드 준비 중 🔒</button>`;
        
    const lookbookBtn = `<a href="${p.path}" class="btn-magic-action look

    // 3D 마법서 동적 마크업 생성
    viewport.innerHTML = `
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
                            <img src="${bookImg}" alt="${p.title}" onerror="this.style.display='none'; document.getElementById('magic-photo-fallback-${p.id}').style.display='flex';">
                            <div class="magic-photo-fallback" id="magic-photo-fallback-${p.id}" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; flex-direction:column; background: linear-gradient(135deg, #e4d7bd, #cbbca0); color: #5c4538; padding: 20px; box-sizing: border-box; text-align: center;">
                       value="${ing.base}" 
                       oninput="onFocusIngredientChange(this)">
                <span class="focus-ing-unit">g</span>
            </div>
        `;
        listContainer.appendChild(row);
    }

    // 4. 동적 순서 타임라인 빌드
    const stepsList = RECIPE_STEPS_DB[recipeId] || DEFAULT_RECIPE_STEPS;
    const timelineContainer = document.getElementById('focus-steps-timeline');
    if (timelineContainer) {
        timelineContainer.innerHTML = stepsList.map((step, idx) => {
            return `
                <div class="timeline-step-item" data-step-idx="${idx}" onclick="highlightTimelineStep(this)">
                    <div class="step-num-circle">
                        <span class="step-num-text">${idx + 1}</span>
                    </div>
                    <div class="step-content-box">
                        <div class="step-header-row">
                            <h4 class="step-title-text">${step.title}</h4>
                            <span class="step-time-pill"><i class="fa-regular fa-clock"></i> ${step.time}</span>
                        </div>
                        <p class="step-desc-text">${step.desc}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 탭 상태 및 진행률 게이지 리셋
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. 레시피 다운로드 & 블로그 & 룩북 버튼 이벤트 바인딩
    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromF


































    const leftCard = document.querySelector('.focus-stage-left');
    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 기존 인라인 높이 초기화
        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // 렌더링이 완료된 후 높이를 정확히 측정하기 위해 짧은 타임아웃 실행
        setTimeout(() => {
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

function closeMagicBook() {
    const spellbook = document.getElementById('magic-spellbook');
    const overlay = document.getElementById('magic-book-overlay');
    
    if (spellbook) {
        spellbook.classList.remove('open');
        spellbook.classList.remove('summoned');
    }

    setTimeout(() => {
        if (overlay) {
            overlay.classList.remove('active');
        }
        const viewport = document.querySelector('.magic-book-viewport');
        if (viewport) viewport.innerHTML = ''; // 리소스 정리
    }, 500);
}

function switchMagicBookTab(tabId) {
    const tabs = ['calc', 'steps', 'trouble'];
    tabs.forEach(t => {
        const btn = document.getElementById(`magic-tab-btn-${t}`);
        const content = document.getElementById(`magic-tab-content-${t}`);
        if (btn) {
            btn.classList.remove('active');
            btn.style.opacity = '0.6';
            btn.style.color = '#5c4135';
            btn.style.borderBottom = 'none';
        }
        if (content) {
            content.style.display = 'none';
        }
    });

    const activeBtn = document.getElementById(`magic-tab-btn-${tabId}`);
    const activeContent = document.getElementById(`magic-tab-content-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.opacity = '1';




































    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `${completedCount} / ${totalSteps} 단계 완료 (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }
}

function closeFocusStage() {
    const overlay = document.getElementById('atelier-focus-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// 4. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "오란다 대 {x}개 분량 🍞", baseCount: 3 },
    39: { template: "오란다 대 {x}개 분량 🍞", baseCount: 1 },
    38: { template: "찰떡브라우니 {x}판 분량 🌿", baseCount: 1 },
    37: { template: "화이트 바크초콜릿 {x}판 분량 🍫", baseCount: 1 },
    36: { template: "티라미수 {x}컵 분량 🍮", baseCount: 2 },
    35: { template: "모찌떡 케이크 {x}호 1개 분량 🎂", baseCount: 1 },
    17: { template: "코코넛 단팥구움바 {x}개 분량 🥥", baseCount: 4 }










































































































































































                            <h4 class="serif back-title">${p.title}</h4>
                            <p class="back-subtitle">어떤 숫자를 바꾸든 비례 계산됩니다</p>
                        </div>
                        
                        <div class="calculator-inputs-area">
                            ${ingredientsInputHtml}
                        </div>
                        
                        <div class="practical-guide-board">
                            <div class="guide-pills-row">
                                <span class="guide-pill difficulty">
                                    ${isYield ? `<i class="fa-solid fa-box-open"></i> 분량: ${difficulty}` : `<i class="fa-solid fa-gauge-simple-high"></i> 난이도: ${difficulty}`}
                                </span>
                                <span class="guide-pill temperature"><i class="fa-solid fa-temperature-half"></i> ${bakingTip}</span>
                            </div>
                            <p class="guide-cheers">"${cheers}"</p>
                        </div>
                        
                        <div class="card-back-action-bar">
                            <button class="btn-issue-card" onclick="issueRecipeCard(${p.id}, '${p.title.replace(/'/g, "\\'")}', '${p.img}')">
                                <i class="fa-solid fa-receipt"></i> 레시피 발행 📄




    }
}

// ==========================================================================
// 14. Sensory Accordion Artbook - 더 아이보리 캔버스 동적 렌더링 엔진
// ==========================================================================
// ==========================================================================
// 14. Sensory Accordion Artbook - 더 아이보리 캔버스 동적 렌더링 엔진
// ==========================================================================
function renderAccordionArtbook() {
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
            img: "39. 순두부 쑥 찰떡브라우니_완/assets/7.jpg",
            creatorsNote: "순두부와 국산 참쑥가루를 섞어 쫀득한 식감으로 구운 브라우니. 냉장 숙성하면 더욱 쫀득합니다.",
            pairingGuide: "따뜻한 유기농 우롱차나 두유와 환상적인 페어링을 자랑합니다.",
            themeColor: "#4E6B56",
            creatorsNote: "순두부와 흑임자 페이스트, 화이트 커버춰를 배합하여 오븐 중탕으로 구운 테린.",
            pairingGuide: "쌉싸름한 말차 라떼나 드립 커피와 함께 곁들이면 맛의 깊이가 극대화됩니다.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
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






    if (comingSoonItem) {
        comingSoonItem.title = `Vol.${comingSoonVol} Coming Soon`;
    }

    const specsData = {
        40: { texture: "고소하고 촉촉함", wellness: "진한 콩물, 하루 숙성 비법", method: "170℃ 오븐 구움" },
        39: { texture: "꾸덕함", wellness: "No밀가루, No버터", method: "140℃ 오븐 중탕" },
        38: { texture: "쫀득함", wellness: "No버터, 비건 지향", method: "160℃ 오븐 구움" },
        37: { texture: "바삭하고 달콤함", wellness: "No버터, 볶은 순두부", method: "165℃ 오븐 구움" },
        36: { texture: "부드럽고 촉촉함", wellness: "No오븐, 알룰로스 대체 가능", method: "No오븐 냉장 굳히기" }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 커밍순` : p.title.replace("순두부 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? `background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;` 
            : `background-image: url('${p.img}');`;

        const comingSoonOverlay = p.isComingSoon 
            ? `<div class="coming-soon-glowing-core" sty









        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `상세보기 <i class="fa-solid fa-chevron-right"></i>`;

        return `
            <div class="accordion-slice ${p.isComingSoon ? 'coming-soon-slice' : ''}" ${p.isComingSoon ? `data-vol="${comingSoonVol}"` : ''} onclick="handleSliceClick(event, ${typeof p.id === 'string' ? `'${p.id}'` : p.id})" style="--theme-color: ${p.themeColor}; --theme-glow: ${p.themeGlow}; --accent-color: ${p.accentColor};">
                <div class="slice-body-wrapper">
                    <!-- Fullscreen background image -->
                    <div class="slice-bg" style="${bgStyle}">
                        ${comingSoonOverlay}
                    </div>
                    
                    <!-- Collapsed vertical/horizontal title view -->
                    <div class="slice-collapsed-overlay">
                        <span class="collapsed-title font-serif">${shortTitle}</span>
                        <span class="collapsed-badge" style="background-color: ${p.themeColor};"></span>
                    </div>
 
                    <!-- Active Tactical HUD overlay content -->
                    <div class="slice-active-hud">



















                            <div class="spec-row">
                                <span class="spec-label">TEXTURE</span>
                                <span class="spec-value">${specs.texture}</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">WELLNESS SPEC</span>
                                <span class="spec-value">${specs.wellness}</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">BAKING METHOD</span>
                                <span class="spec-value">${specs.method}</span>
                            </div>
                        </div>
 
                        <!-- Footer Overlay Block -->
                        <div class="hud-footer">
                            <div class="hud-essence">
                                <span class="essence-label">[CREATOR_NOTE]</span>
                                <span class="essence-desc font-serif">"${p.creatorsNote}"</span>
                            </div>
                            <div class="hud-action">
                                <button class="action-btn hud-btn font-serif">
                                    ${actionBtnText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function handleSliceClick(event, projectId) {
    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = window.getComputedStyle(slice).flexGrow >= 4;

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {









// ==========================================================================
function renderSeasonalEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = THEMES.map(theme => `
        <div class="film-strip-card theme-card-${theme.id}" onclick="openTheme('${theme.id}')">
            <div class="film-strip-img-wrapper">
                <span class="film-strip-badge">${theme.tag}</span>
                <img src="${theme.img}" alt="${theme.title}">
            </div>
            <div class="film-strip-body">
                <div class="film-strip-header">
                    <h3 class="film-strip-title serif">${theme.icon} ${theme.title}</h3>
                    <button class="film-strip-go-btn" aria-label="이벤트 열기">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// 🎬 [신설] 극장식 인터랙티브 갤러리 애니메이션 엔진 (Cinematic Engine)
// ==========================================================================
let cinematicCanvas = null;
let cinematicCtx = null;
let cinematicAnimId = null;
let currentThemeId = '';
let mousePos = { x: 0, y: 0 };
let particles = [];
let transitionProgress = 0;
let isTransitioning = false;

// 파티클 클래스 정의
class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 8 + (type === 'heart' ? 12 : 3);
        this.speedX = Math.random() * 2 - 1;
        this.speedY = type === 'snow' ? Math.random() * 1.5 + 0.5 : Math.random() * -2 - 0.5;
        this.opacity = 1;
        this.fade = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fade;
        if (this.type === 'snow') {
            this.angle += this.spin;
















































































































function renderAccordionArtbook() {
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
            title: "순







































    
    cinematicAnimId = requestAnimationFrame(animateCinematic);
}

function openTheme(themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    currentThemeId = themeId;
    
    if (!cinematicCanvas) {
        initCinematicCanvas();
    }
    
    const stage = document.getElementById('cinematic-stage');
    if (!stage) return;
    
    if (cinematicAnimId) {
        cancelAnimationFrame(cinematicAnimId);
    }
    particles = [];
    isTransitioning = true;
    transitionProgress = 0;
    
    stage.className = `cinematic-stage theme-${themeId}-active`;
    stage.style.display = 'flex';
    stage.style.opacity = '0';
    setTimeout(() => {
                <span style="font-family: var(--font-playfair), serif; letter-spacing: 2px; color: #FFF; font-size: 0.8rem; text-transform: uppercase; opacity: 0.6;">Coming Soon</span>
               </div>` 
            : '';

        const titleHtml = p.isComingSoon 
            ? `<h3 class="hud-main-title font-serif">Vol.${comingSoonVol} Coming Soon</h3>`
            : `<h3 class="hud-main-title font-serif">${p.title}${p.isNew ? ` <span style="display: inline-block; background: #FF3D71; color: white; font-family: var(--font-playfair), serif; font-weight: 700; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; vertical-align: middle; margin-left: 10px; box-shadow: 0 0 10px rgba(255, 61, 113, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">NEW</span>` : ''}</h3>`;

        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `상세보기 <i class="fa-solid fa-chevron-right"></i>`;

        return `
            <div class="accordion-slice ${p.isComingSoon ? 'coming-soon-slice' : ''}" ${p.isComingSoon ? `data-vol="${comingSoonVol}"` : ''} onclick="handleSliceClick(event, ${typeof p.id === 'string' ? `'${p.id}'` : p.id})" style="--theme-color: ${p.themeColor}; --theme-glow: ${p.themeGlow}; --accent-color: ${p.accentColor};">
                <div class="slice-body-wrapper">
                    <!-- Fullscreen background image -->
                    <div class="slice-bg" style="${bgStyle}">
                        ${comingSoonOverlay}
        }
    }
    
    if (subGridEl && theme.recipes) {
        subGridEl.innerHTML = theme.recipes.map(recipe => {
            return `
            <div class="cinematic-card-outer" onclick="closeCinematicStage(); openFocusStage(${recipe.id});">
                <div class="cinematic-card">
                    <div class="sub-card-img-wrapper">
                        <img src="${recipe.img}" alt="${recipe.title}" class="sub-card-img" />
                        <span class="sub-card-vol">${recipe.vol}</span>
                    </div>
                    <div class="sub-card-main">
                        <h3 class="sub-card-title">${recipe.title}</h3>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
    
    document.body.style.overflow = 'hidden';
    animateCinematic();
}

function closeCinematicStage() {
            cancelAnimationFrame(cinematicAnimId);
// ==========================================================================
// 14. Sensory Accordion Artbook - 더 아이보리 캔버스 동적 렌더링 엔진
// ==========================================================================
// ==========================================================================
// 14. Sensory Accordion Artbook - 더 아이보리 캔버스 동적 렌더링 엔진
// ==========================================================================
function renderAccordionArtbook() {
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

            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSectionId = section.id;
            }
        });

        // 예외 케이스 정밀 보정
        // 1. 스크롤이 맨 위에 매우 가깝다면 무조건 첫 번째 섹션(Home) 활성화
        if (window.scrollY < 80) {







            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
            pairingGuide: "쌉싸름한 말차 라떼나 드립 커피와 함께 곁들이면 맛의 깊이가 극대화됩니다.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
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
        comingSoonItem.title = `Vol.${comingSoonVol} Coming Soon`;
    }

    const specsData = {
        40: { texture: "고소하고 촉촉함", wellness: "진한 콩물, 하루 숙성 비법", method: "170℃ 오븐 구움" },
        39: { texture: "꾸덕함", wellness: "No밀가루, No버터", method: "140℃ 오븐 중탕" },
        38: { texture: "쫀득함", wellness: "No버터, 비건 지향", method: "160℃ 오븐 구움" },
        37: { texture: "바삭하고 달콤함", wellness: "No버터, 볶은 순두부", method: "165℃ 오븐 구움" },
        36: { texture: "부드럽고 촉촉함", wellness: "No오븐, 알룰로스 대체 가능", method: "No오븐 냉장 굳히기" }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 커밍순` : p.title.replace("순두부 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? `background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;` 
            : `background-image: url('${p.img}');`;

        const comingSoonOverlay = p.isComingSoon 
            ? `<div class="coming-soon-glowing-core" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <i c
        this.opacity = 1;
        this.fade = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fade;
        if (this.type === 'snow') {
            this.angle += this.spin;
            // 마우스 충돌 효과
            const dx = mousePos.x - this.x;
            const dy = mousePos.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                const forceX = dx / dist;
                const forceY = dy / dist;
                this.x -= forceX * 3;
                this.y -= forceY * 3;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        
        if (this.type === 'heart') {
            ctx.fillStyle = `rgba(214, 51, 132, ${this.opacity})`;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
            ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
            ctx.fill();
        } else if (this.type === 'ink') {
            ctx.fillStyle = `rgba(120, 90, 70, ${this.opacity * 0.35})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fill();



                        <div class="hud-spec-grid font-serif">
                            <div class="spec-row">
                                <span class="spec-label">TEXTURE</span>
                                <span class="spec-value">${specs.texture}</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">WELLNESS SPEC</span>
                                <span class="spec-value">${specs.wellness}</span>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">BAKING METHOD</span>
                                <span class="spec-value">${specs.method}</span>
                            </div>
                        </div>
 
                        <!-- Footer Overlay Block -->
                        <div class="hud-footer">
                            <div class="hud-essence">
                                <span class="essence-label">[CREATOR_NOTE]</span>
                                <span class="essence-desc font-serif">"${p.creatorsNote}"</span>
                            </div>
                            <div class="hud-action">
                                <button class="action-btn hud-btn font-serif">
                                    ${actionBtnText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
"    }).join('');\n\n    // 페이지 로드 시 첫 번째 슬라이스(Vol.40)를 기본 활성화(확장) 상태로 세팅\n    setTimeout(() => {\n        const firstSlice = container.querySelector('.accordion-slice');\n        if (firstSlice) {\n            firstSlice.style.flex = '5.4';\n            firstSlice.classList.add('active-expanded');\n        }\n    }, 50);\n}\n\nfunction handleSliceClick(event, projectId) {\n    const slice = event.currentTarget;\n    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');\n    const isHovered = window.getComputedStyle(slice).flexGrow >= 4;\n\n    if (isButton || isHovered) {\n        if (projectId === 'coming-soon') {\n            const vol = slice.getAttribute('data-vol') || '41';\n            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\\n\\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);\n            return;\n        }\n        openFocusStage(projectId);\n    } else {\n        document.querySelectorAll('.accordion-slice').forEach(s => {\n            if (s !== slice) {\n                s.style.flex = '1';\n                s.classList.remove('active-expanded');\n            }\n        });\n        slice.style.flex = '5.4';\n        slice.classList.add('active-expanded');\n    }\n}"
// ==========================================================================
// 14-2. 사계절의 아틀리에 시즌 특별 이벤트 렌더링
// ==========================================================================
function renderSeasonalEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = THEMES.map(theme => `
        <div class="film-strip-card theme-card-${theme.id}" onclick="openTheme('${theme.id}')">
            <div class="film-strip-img-wrapper">
                <span class="film-strip-badge">${theme.tag}</span>
                <img src="${theme.img}" alt="${theme.title}">
            </div>
            <div class="film-strip-body">
                <div class="film-strip-header">
                    <h3 class="film-strip-title serif">${theme.icon} ${theme.title}</h3>
                    <button class="film-strip-go-btn" aria-label="이벤트 열기">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// 🎬 [신설] 극장식 인터랙티브 갤러리 애니메이션 엔진 (Cinematic Engine)
// ==============================






let transitionProgress = 0;
let isTransitioning = false;

// 파티클 클래스 정의
class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 8 + (type === 'heart' ? 12 : 3);
        this.speedX = Math.random() * 2 - 1;
        this.speedY = type === 'snow' ? Math.random() * 1.5 + 0.5 : Math.random() * -2 - 0.5;
        this.opacity = 1;
        this.fade = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fade;
        if (this.type === 'snow') {
            this.angle += this.spin;
            // 마우스 충돌 효과
            const dx = mousePos.x - this.x;
            const dy = mousePos.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                const forceX = dx / dist;
                const forceY = dy / dist;
                this.x -= forceX * 3;
                this.y -= forceY * 3;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        
        if (this.type === 'heart') {
            ctx.fillStyle = `rgba(214, 51, 132, ${this.opacity})`;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);

    // 3. 파티클 업데이트 및 드로우
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.opacity <= 0 || p.y > height + 20) {
            particles.splice(i, 1);
        } else {
            p.draw(cinematicCtx);
        }
    }
    
    cinematicAnimId = requestAnimationFrame(animateCinematic);
}

function openTheme(themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    currentThemeId = themeId;
    
    if (!cinematicCanvas) {
        initCinematicCanvas();
    }
    
    const stage = document.getElementById('cinematic-stage');
    if (!stage) return;
    
    if (cinematicAnimId) {
        cancelAnimationFrame(cinematicAnimId);
    }
    particles = [];
    isTransitioning = true;
    transitionProgress = 0;
    
    stage.className = `cinematic-stage theme-${themeId}-active`;
    stage.style.display = 'flex';
    stage.style.opacity = '0';
    setTimeout(() => {
        stage.style.opacity = '1';
    }, 10);
    
    const tagEl = document.getElementById('cinematic-tag');
    const titleEl = document.getElementById('cinematic-title');
    const descEl = document.getElementById('cinematic-desc');











        }
    }
    
    if (subGridEl && theme.recipes) {
        subGridEl.innerHTML = theme.recipes.map(recipe => {
            return `
            <div class="cinematic-card-outer" onclick="closeCinematicStage(); openFocusStage(${recipe.id});">
                <div class="cinematic-card">
                    <div class="sub-card-img-wrapper">
                        <img src="${recipe.img}" alt="${recipe.title}" class="sub-card-img" />
                        <span class="sub-card-vol">${recipe.vol}</span>
                    </div>
                    <div class="sub-card-main">
                        <h3 class="sub-card-title">${recipe.title}</h3>
        if (currentThemeId === 'romantic') {
            // Melting Cream 연출: 위에서 핑크색 크림이 웨이브를 치며 흘러내려 화면을 덮음
            cinematicCtx.fillStyle = '#FFCCD5';
            cinematicCtx.beginPath();
            cinematicCtx.moveTo(0, 0);
            cinematicCtx.lineTo(width, 0);
            
            // 웨이브 형상
            const waveHeight = 40;
            const progressHeight = height * transitionProgress;
            for (let x = width; x >= 0; x -= 10) {
                const waveY = progressHeight + Math.sin((x / 50) + transitionProgress * 10) * waveHeight * (1 - transitionProgress);
                cinematicCtx.lineTo(x, waveY);
            }
            cinematicCtx.closePath();
            cinematicCtx.fill();
        } 
        else if (currentThemeId === 'traditional') {
            // Bojagi Unfolding 연출: 중앙에서 사방으로 겹친 보자기 조각이 밖으로 펴지며 열림
            cinematicCtx.fillStyle = '#E8DCC4';
            const progressHeight = (height / 2) * (1 - transitionProgress);
            const progressWidth = (width / 2) * (1 - transitionProgress);
            
            cinematicCtx.fillRect(0, 0, width, progressHeight); // Top
            cinematicCtx.fillRect(0, height - progressHeight, width, progressHeight); // Bottom
            cinematicCtx.fillRect(0, 0, progressWidth, height); // Left
            cinematicCtx.fillRect(width - progressWidth, 0, progressWidth, height); // Right
        } 
        else if (currentThemeId === 'halloween') {
            // 번쩍임 플래시 대신 고급스럽고 부드러운 암전(Fade-to-Black) 연출
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {















































        p.update();
        if (p.opacity <= 0 || p.y > height + 20) {
            particles.splice(i, 1);
        } else {
            p.draw(cinematicCtx);
        }
    }
    
    cinematicAnimId = requestAnimationFrame(animateCinematic);
}

function openTheme(themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    currentThemeId = themeId;
    
    if (!cinematicCanvas) {
        initCinematicCanvas();
    }
    
    const stage = document.getElementById('cinematic-stage');
    if (!stage) return;
    
    if (cinematicAnimId) {
        cancelAnimationFrame(cinematicAnimId);
    }
    particles = [];
    isTransitioning = true;
    transitionProgress = 0;
    
    stage.className = `cinematic-stage theme-${themeId}-active`;
    stage.style.display = 'flex';
    stage.style.opacity = '0';
    setTimeout(() => {
        stage.style.opacity = '1';
    }, 10);
    
    const tagEl = document.getElementById('cinematic-tag');
    const titleEl = document.getElementById('cinematic-title');
    const descEl = document.getElementById('cinematic-desc');
    const subGridEl = document.getElementById('cinematic-sub-grid');
    
    if (tagEl) tagEl.textContent = theme.tag || 'SEASONAL';













            return `
            <div class="cinematic-card-outer" onclick="closeCinematicStage(); openFocusStage(${recipe.id});">
                <div class="cinematic-card">
                    <div class="sub-card-img-wrapper">
                        <img src="${recipe.img}" alt="${recipe.title}" class="sub-card-img" />
                        <span class="sub-card-vol">${recipe.vol}</span>
                    </div>
                    <div class="sub-card-main">
                        <h3 class="sub-card-title">${recipe.title}</h3>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
    
    document.body.style.overflow = 'hidden';
    animateCinematic();
}

function closeCinematicStage() {
    const stage = document.getElementById('cinematic-stage');
    if (!stage) return;
    
    stage.style.opacity = '0';
    setTimeout(() => {
        stage.style.display = 'none';
        if (cinematicAnimId) {
            cancelAnimationFrame(cinematicAnimId);
            cinematicAnimId = null;
        }
        currentThemeId = '';
        particles = [];
        document.body.style.overflow = '';
    }, 500);
}

// ==========================================================================
// 15. 페이지 로드 초기화 & LNB 스크롤 옵저버
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAccordionArtbook(); 
    renderSeasonalEvents();
    renderArchive(PROJECTS);
    // renderDashboard(); // 존재하지 않는 과거 대시보드 렌더러 호출부 제거 (ReferenceError 해결)
    initCursorAura(); 
    initTilt(); 
    createAtmosphericParticles(); 

    // Sidebar LNB Scroll Link Observer 기동 (ScrollSpy & Click Lock)
    const navLinks = document.querySelectorAll('.sidebar-lnb .nav-item');
    const sections = document.querySelectorAll('section[id]');
    let isManualScrolling = false;
    let manualScrollTimer = null;

    function updateActiveNavLink() {
        if (isManualScrolling) return; // 메뉴 클릭으로 스무스 스크롤 이동 중








        }
        currentThemeId = '';
        particles = [];
        document.body.style.overflow = '';
    }, 500);
}

// ==========================================================================
// 15. 페이지 로드 초기화 & LNB 스크롤 옵저버
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAccordionArtbook(); 
    renderSeasonalEvents();
    renderArchive(PROJECTS);
    // renderDashboard(); // 존재하지 않는 과거 대시보드 렌더러 호출부 제거 (ReferenceError 해결)
    initCursorAura(); 
    initTilt(); 
    createAtmosphericParticles(); 

"    // Sidebar LNB Scroll Link Observer 기동 (ScrollSpy & Click Lock)\n    const navLinks = document.querySelectorAll('.top-sticky-header .nav-item');"
    let manualScrollTimer = null;

    function updateActiveNavLink() {
        if (isManualScrolling) return; // 메뉴 클릭으로 스무스 스크롤 이동 중일 때는 감지 일시 정지

        let activeSectionId = 'sensory-artbook'; // 기본값 (Home)
        const scrollPosition = window.scrollY + window.innerHeight / 3; // 화면의 1/3 높이 기준선

        sections.for

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 스무스 스크롤이 끝나는 시점(약 800ms) 후에 스크롤 감지 잠금 해제
            manualScrollTimer = setTimeout(() => {
                isManualScrolling = false;
                updateActiveNavLink();
            }, 800);
        if (window.scrollY < 80) {
            activeSectionId = 'sensory-artbook';
        }
        // 2. 스크롤이 맨 아래에 도달했다면 무조건 마지막 섹션(실패없는 베이킹노트) 활성화
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        if (window.scrollY + windowHeight >= documentHeight - 80) {
            activeSectionId = 'archive';
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${activeSectionId}`) {
                    link.classList.add('active');
                }
            }
        });
    }

    // 메뉴 클릭 시 즉시 active 클래스를 부여하고 스크롤 감지를 일시 잠금
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            isManualScrolling = true;
            if (manualScrollTimer) clearTimeout(manualScrollTimer);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 스무스 스크롤이 끝나는 시점(약 800ms) 후에 스크롤 감지 잠금 해제
            manualScrollTimer = setTimeout(() => {
                isManualScrolling = false;
                updateActiveNavLink();
            }, 800);
        });
    });

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // 페이지 로드 후 즉시 초기화
});



















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function openFocusStage(recipeId) {
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    // 모달을 열 때 항상 첫 번째 재료 계산기 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 이미지 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // 테마 연동 스타일링 (웹툰 화보 연출 효과)
    const theme = RECIPE_THEMES[recipeId];
    if (theme) {
        titleEl.style.color = theme.themeColor;
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = theme.themeGlow;
            diffPill.style.color = theme.themeColor;
            diffPill.style.borderColor = theme.themeColor;
        }
    } else {
        titleEl.style.color = '';
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = '';
            diffPill.style.color = '';
            diffPill.style.borderColor = '';
        }
    }

    // 2. 가이드 데이터 바인딩

























































                    <span style="word-break: keep-all; line-height: 1.4;">${qText}</span>
                </div>
                <div class="trouble-answer" style="background: white; border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: #2C3E50; line-height: 1.6; display: flex; align-items: flex-start; gap: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
                    <span style="background: var(--dubu-mint-accent); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.68rem; font-family: var(--font-playfair), serif; font-weight: 900; line-height: 1; margin-top: 2px;">A</span>
                    <span style="word-break: keep-all; font-weight: 500;">${aText}</span>
                </div>
            </div>
        `;
    } else {
        troubleHTML = `
            <div style="font-size: 0.8rem; color: #5D6D7E; line-height: 1.6; word-break: keep-all;">
                ${rawTrouble}
            </div>
        `;
    }
    document.getElementById('focus-recipe-trouble-text').innerHTML = troubleHTML;

    const proBox = document.getElementById('focus-recipe-pro-box');
    if (proBox) {
        let matchedCreator = null;
        if (typeof MASTER_CREATORS !== 'undefined') {
            const creators = Object.values(MASTER_CREATORS);
            matchedCreator = creators.find(c => recipe.categories && recipe.categories.some(cat => c.keywords && c.keywords.includes(cat)));
        }
        
        if (matchedCreator) {
            proBox.innerHTML = `
                <div style="font-weight: 800; font-size: 0.88rem; color: var(--dubu-mint-accent); margin-bottom: 6px;">
                    👨‍🍳 추천 마스터의 감성 비밀 팁
                </div>
                <div style="font-size: 0.82rem; color: #4E342E; margin: 0; line-height: 1.6; word-break: keep-all; font-weight: 500; background: rgba(58, 105, 88, 0.03); padding: 12px 14px; border-radius: 8px; border: 1px dashed rgba(58, 105, 88, 0.15); display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                    <a href="${matchedCreator.url}" target="_blank" style="color: #D32F2F; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.2s; align-self: flex-end; font-size: 0.74rem;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
                        <i class="fa-brands fa-youtube" style="color: #FF0000; font-size: 0.88rem;"></i> 
                        <span>[${matchedCreator.videoTitle}] 강좌 보기 ↗</span>
                    </a>
                </div>
            `;
        } else {
            proBox.innerHTML = `
                <div style="font-weight: 800; font-size: 0.88rem; color: var(--dubu-mint-accent); margin-bottom: 6px;">
                    👨‍🍳 
































































































    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 기존 인라인 높이 초기화
        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // 렌더링이 완료된 후 높이를 정확히 측정하기 위해 짧은 타임아웃 실행
        setTimeout(() => {
            if (window.innerWidth > 900) { // 데스크톱 모드에서만 높이 동일화 적용
                const naturalHeight = rightCard.offsetHeight;
                if (naturalHeight > 0) {
                    leftCard.style.height = `${naturalHeight}px`;
                    rightCard.style.height = `${naturalHeight}px`;
                }
            }
        }, 60);
    }
}

function toggleIngCheck(circleEl) {
    circleEl.classList.toggle('checked');
    const parent = circleEl.closest('.focus-ingredient-calc-row') || circleEl.closest('.primary-anchor-box');
    if (parent) {
        parent.classList.toggle('checked-row');
    }
}

function switchFocusTab(tabId) {
    const tabCalcBtn = document.getElementById('btn-tab-calc');
    const tabStepsBtn = document.getElementById('btn-tab-steps');
    const tabTroubleBtn = document.getElementById('btn-tab-trouble');
    
    const contentCalc = document.getElementById('focus-tab-calc-content');
    const contentSteps = document.getElementById('focus-tab-steps-content');
    const contentTrouble = document.getElementById('focus-tab-trouble-content');
    
    if (!tabCalcBtn || !tabStepsBtn || !tabTroubleBtn || !contentCalc || !contentSteps || !contentTrouble) return;

    tabCalcBtn.classList.remove('active');



















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































            div.innerHTML = `<img src="${encodeURI(node.img)}" alt="${node.title}">`;
        } else if (node.type === 'tag') {
            div.innerHTML = `<i class="fa-solid ${node.icon}"></i><span>${node.label}</span>`;
        } else {
            div.innerHTML = `<div style="font-size: 0.62rem; font-weight: 700; line-height: 1.1;">${node.label}</div>`;
        }

        div.addEventListener('click', () => {
            if (node.type === 'recipe' && activeNodeId === node.id) {
                openFocusStage(node.projectId);
            } else {
                focusUniverseNode(node.id);
            }
        });

        if (node.type === 'recipe') {
            div.addEventListener('dblclick', () => {
                openFocusStage(node.projectId);
            });
            div.title = "더블클릭하여 실시간 계산기 열기";
        }

        container.appendChild(div);
    });

    REMIX_BUBBLES.forEach(remix => {
        const bubble = document.createElement('div');
        bubble.id = `remix-bubble-${remix.id}`;
        bubble.className = 'universe-node component-node remix-bubble';
        bubble.style.width = '35px';
        bubble.style.height = '35px';



































































































































































































































































































































































































































}

function handleSliceClick(event, projectId) {
    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = window.getComputedStyle(slice).flexGrow >= 4;

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {
        document.querySelectorAll('.accordion-slice').forEach(s => {
            if (s !== slice) s.style.flex = '1';
        });
        slice.style.flex = '5.4';
    }
}

// ==========================================================================
// 14-2. 사계절의 아틀리에 시즌 특별 이벤트 렌더링
// ==========================================================================
function renderSeasonalEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = THEMES.map(theme => `
        <div class="film-strip-card theme-card-${theme.id}" onclick="openTheme('${theme.id}')">





















const RECIPE_THEMES = {
    40: { themeColor: "#7B6F55", themeGlow: "rgba(123, 111, 85, 0.12)", accentColor: "#F5E6C8" },
    39: { themeColor: "#4A4F54", themeGlow: "rgba(74, 79, 84, 0.12)", accentColor: "#78909C" },
    38: { themeColor: "#4E6B56", themeGlow: "rgba(78, 107, 86, 0.12)", accentColor: "#A5D6A7" },
    37: { themeColor: "#C25D7E", themeGlow: "rgba(194, 93, 126, 0.12)", accentColor: "#F48FB1" },
    36: { themeColor: "#826359", themeGlow: "rgba(130, 99, 89, 0.12)", accentColor: "#FFCCBC" },
    35: { themeColor: "#B5926B", themeGlow: "rgba(181, 146, 107, 0.12)", accentColor: "#FFE082" },
    17: { themeColor: "#8C324D", themeGlow: "rgba(140, 50, 77, 0.12)", accentColor: "#FFAB91" }
};

function openFocusStage(recipeId) {
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    // 모달을 열 때 항상 첫 번째 재료 계산기 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 이미지 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // 테마 연동 스타일링 (웹툰 화보 연출 효과)
    const theme = RECIPE_THEMES[recipeId];
    if (the













































    } else if (recipe.id === 35) {
        difficulty = "어려움 🔴";
        bakingTip = "오븐 예열 180℃ / 160℃ 50~55분";
        cheers = "명절의 기품을 한껏 높여주는 굳지 않는 비법 모찌떡케이크, 정성으로 완성해 보아요! 🧧";
    } else if (recipe.id === 17) {
        difficulty = "쉬움 🟢";
        bakingTip = "오븐 예열 170℃ / 30분";
        cheers = "코코넛의 바삭함 and 단팥의 든든함! 가벼운 등산이나 소풍 가기 전 최고의 영양 간식입니다. 🥥";
    }

    if (BASE_YIELDS[recipeId]) {
        updateDynamicYieldDisplay(recipeId, 1.0);
    } else {
        document.getElementById('focus-recipe-difficulty').innerHTML = `<i class="fa-solid fa-gauge-simple-high"></i> 난이도: ${difficulty}`;
    }
    document.getElementById('focus-recipe-steps').innerText = bakingTip;
    document.getElementById('focus-recipe-tip').innerText = cheers;

    // [추가] 3번째 탭: 실패 대처법 바인딩
    const rawTrouble = recipe.troubleShoot || "Q. 베이킹 과정에서 실패하거나 어려운 점이 있으신가요?<br>A. 홈베이킹 시 굽는 상태나 식감에 이상이 있다면, 공식 블로그 레시피 댓글에 사진과 함께 현상을 남겨주세요. 셰프가 빠르게 1:1 맞춤 해결법을 전해드립니다! 🌸";
    let troubleHTML = "";
    if (rawTrouble.includes("Q.") && rawTrouble.includes("A.")) {
        const parts = rawTrouble.split("<br>");
        const qText = parts[0].replace("Q.", "").trim();
        const aText = parts[1] ? parts[1].replace("A.", "").trim() : "";
        
        troubleHTML = `























































































































            `;
        }).join('');
    }

    // 탭 상태 및 진행률 게이지 리셋
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. 레시피 다운로드 & 공유 버튼 이벤트 바인딩
    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, difficulty, bakingTip, cheers);
    };
    document.getElementById('focus-btn-share').onclick = () => {
        shareRecipe(null, recipe.title);
    };

    // 6. 오버레이 활성화
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 7. 재료가 스크롤 없이 모두 한눈에 보일 때의 자연스러운 높이를 측정하여 좌우 카드 높이를 동일하게 고정











































































































































































































































                // 두 줄로 개행된 경우 폰트 간격과 라인높이 정밀 세팅
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 고정된 넉넉한 책등 두께
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px 높이의 자연스러운 입체 변차

            const customStyles = `width: ${width}px; height: ${height}px;`;

            booksHtml += `
                <div class="book-card" id="book-card-${p.id}" style="${customStyles}" onclick="openMagicBook(event, ${p.id})">
                    <div class="book-spine ${themeClass}">
                        <div class="spine-vol">${magicSymbol} VOL.${p.id}</div>
                        <div class="spine-title" style="${titleStyle}">${displayTitle}</div>
                        <div class="spine-icon"><i class="fa-solid ${iconClass}"></i></div>
                    </div>
                </div>
            `;
        }

        return `
            <div 







    html += renderShelf(shelf1Projects, 1);
    html += renderShelf(shelf2Projects, 2);

    container.innerHTML = html;

    // 은하수 별빛 돔 파티클 동적 생성
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';

        const numStars = Math.floor(Math.random() * 20) + 40; // 40~60개 은하수 별빛
        for (let sIdx = 0; sIdx < numStars; sIdx++) {
            const star = document.createElement('span');
            star.className = 'star-sparkle';
            if (Math.random() < 0.25) star.classList.add('star-large');
            
            const top = (Math.random() * 96 + 2).toFixed(2);
            const left = (Math.random() * 96 + 2).toFixed(2);
            const scale = (Math.random() * 0.8 + 0.6).toFixed(2);
            const delay = (Math.random() * 5).toFixed(2);
            const duration = (Math.random() * 3 + 2.5).toFixed(2);
            
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.transform = `scale(${scale})`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            sparklesContainer.appendChild(star);
        }
        wrapper.insertBefore(sparklesContainer, wrapper.firstChild);
    }

    // 데이터가 변경되었으므로 가로 스크롤 범위 재계산











































                <button onclick="downloadRecipeCard('${title}')" style="flex: 1; background: var(--dubu-mint-accent); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: background 0.2s; text-align: center;">
                    <i class="fa-solid fa-download"></i> 레시피 카드로 저장
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'translateY(0)';
    }, 10);

    triggerPageConfetti();
}

function issueRecipeCardFromFocus(id, title, img, difficulty, bakingTip, cheers) {
    const anchorInput = document.getElementById('focus-anchor-input');
    const anchorName = document.getElementById('focus-anchor-label').innerText;
    const anchorVal = parseFloat(anchorInput.value) || 0;
    const anchorBase = parseFloat(anchorInput.getAttribute('data-base')) || 1;
    const scale = anchorVal / anchorBase;
    const yieldText = getDynamicYieldText(id, scale);

    let ingredientsSummary = `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
            <span style="color: #4E342E; font-weight: 500;">${an











































                <span style="color: #4E342E; font-weight: 500;">${name}</span>
                <strong style="color: var(--dubu-mint-accent);">${val}g</strong>
            </div>
        `;
    });

    const meta = getRecipeMetadata(id);
    let finalBakingTip = meta.bakingTip;
    if (scale > 1.1) {
        finalBakingTip += " (※ 대량 조리 시 굽는 시간 추가 필요)";
    } else if (scale < 0.9) {
        finalBakingTip += " (※ 소량 조리 시 굽는 시간 단축 필요)";
    }
    openUnifiedRecipeCardModal(id, title, img, yieldText, finalBakingTip, meta.cheers, ingredientsSummary);
}

function closeRecipeCardModal() {
    const modal = document.getElementById('recipe-card-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'translateY(30px)';
        setTimeout(() => {
            modal.remove();
        }, 400);
    }
}

function downloadRecipeCard(title) {
    alert(`💾 [레시피 저장 완료]\n\n"${title}" 맞춤 레시피 카드가 이미지 파일(PNG)로 다운로드 폴더에 저장되었습니다. 필요할 때 편하게 열어보며 베이킹에 활용해 보세요!`);
}

function triggerPageConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 10000; pointer-events: none;
    `;
    document.body.appendChild(canvas);





























































































































































































function renderArchive(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;
    
    // 마법서 강제 닫기
    closeMagicBook();

"    // 볼륨(ID) 순서대로 오름차순 정렬하여 책장에 왼쪽에서 오른쪽으로 흐르도록 정돈\n    projects.sort((a, b) => a.id - b.id);"
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">검색 결과에 맞는 레시피가 없습니다.</div>`;
        return;
    }
    
    // 책이 늘어나도 서가가 세로로 길어지지 않게 2개 층(2 Rows)으로 책을 나눕니다.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 책등 테마 색상 정하기 (가죽 텍스처와 더 매칭되도록 앤틱 조율)
            let themeClass = 'spine-theme-plum';
            if (p.categories) {
                if (p.categories.includes('fudgy')) themeClass = 'spine-theme-terracotta';
                else if (p.categories.includes('creamy')) themeClass = 'spine-theme-mint';
                else if (p.categories.includes('cloud')) themeClass = 'spine-theme-pink';
                else if (p.categories.includes('nostalgia')) themeClass = 'spine-theme-mustard';
                else if (p.categories.includes('soymilk')) themeClass = 'spine-theme-forest';
            }

            // 책 표지 아이콘 결정
            let iconClass = 'fa-cookie-bite';
            if (p.noOven) iconClass = 'fa-wind';
            else if (p.noFlour) iconClass = 'fa-wheat-awn-circle-exclamation';
            else if (p.noButter) iconClass = 'fa-cheese';

            // 마법 고서 장식 기호 결정
            const magicSymbols = ['⚜', '✦', '🜚', '🝎', '🜔', '🕮', '🜏', '🝔', '✺', '🜛'];
            const magicSymbol = magicSymbols[seed % magicSymbols.lengt

"            // 각 디저트별 의미 단위(단어 경계)를 유지하는 수동 줄바꿈 매핑 사전\n            const SPINE_TITLE_MAP = {\n                40: \"순두부 콩물<br>파운드케익\",\n                39: \"순두부<br>흑임자 테린\",\n                38: \"순두부 쑥<br>찰떡브라우니\",\n                37: \"순두부 화이트<br>바크초콜릿\",\n                36: \"순두부<br>티라미수푸딩\",\n                35: \"순두부 모찌떡<br>케이크\",\n                34: \"순두부 얼그레이<br>그릭스콘\",\n                33: \"순두부 녹차요거트<br>파운드케익\",\n                30: \"순두부<br>미니초코케익\",\n                28: \"순두부<br>시나몬롤\",\n                26: \"순두부<br>눈꽃컵케이크\",\n                25: \"순두부 3종케익\",\n                24: \"순두부 초코<br>번트케익\",\n                23: \"순두부 레몬<br>번트케익\",\n                22: \"순두부 블랙포레스트<br>컵케익\",\n                21: \"순두부<br>부쉬드노엘\",\n                20: \"순두부<br>슈톨렌\",\n                19: \"투톤 순두부<br>타르트\",\n                18: \"순두부 단호박<br>찹쌀빵\",\n                17: \"순두부 코코넛<br>단팥구움바\",\n                16: \"순두부 밤<br>파운드케이크\",\n                15: \"순두부 단호박<br>바스크 치즈케이크\",\n                12: \"순두부 크림치즈<br>롤케익\",\n                11: \"순두부 치즈스콘\",\n                10: \"순두부 레몬케이크\",\n                9: \"순두부<br>브라우니쿠키\",\n                8: \"순두부 찹쌀모찌<br>케이크\",\n                7: \"순두부 크림치즈<br>쿠키\",\n                6: \"얼그레이<br>순두부 케이크\",\n                5: \"순두부 황치즈<br>휘낭시에\",\n                4: \"순두부<br>퍼지브라우니\",\n                3: \"순두부 바스크<br>치즈케이크\"
<truncated 1771 bytes>





































            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // 두 줄로 개행된 경우 폰트 간격과 라인높이 정밀 세팅
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 고정된 넉넉한 책등 두께
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px 높이의 자연스러운 입체 변차

            const customStyles = `width: ${width}px; height: ${height}px;`;

            booksHtml += `
                <div class="book-card" id="book-card-${p.id}" style="${customStyles}" onclick="openMagicBook(event, ${p.id})">
                    <div class="book-spine ${themeClass}">
                        <div class="spine-vol">${magicSymbol} VOL.${p.id}</div>
                        <div class="spine-title" style="${titleStyle}">${displayTitle}</div>
                        <div class="spine-icon"><i class="fa-solid ${iconClass}"></i></div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="shelf-row" id="shelf-row-${shelfNum}">
                <div class="shelf-row-backlight"></div>
                ${booksHtml}
            </div>
        `;
    };

    let html = '';
    html += renderShelf(shelf1Projects, 1);
    html += renderShelf(shelf2Projects, 2);

    container.innerHTML = html;

    // 은하수 별빛 돔 파티클 동적 생성
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';



































































































































































































































            
            // Z축 깊이: 중앙(0)에 있을 때 선반 앞으로 돌출(120px), 좌우 끝으로 갈수록 선반 표면에 밀착(0px)
            // 이를 통해 음수값에 의해 책 카드가 불투명 선반 배경 뒤로 파묻히는 브라우저 3D 렌더링 버그 차단
            const translateZ = (1 - Math.abs(ratio)) * 120;
            
            // Y축 회전각: 중앙(0)일 때는 0도(평평함), 양옆으로 멀어질수록 최대 40도 꺾여 아치를 형성
            const rotateY = ratio * 40;
            
            // X축 미세 보정: 3D 곡률 굴절을 자연스럽게 살려 원형 실린더처럼 둥글게 보임
            const translateX = -ratio * Math.abs(ratio) * 38;
            
            // 중앙에 올수록 크기를 최대 1.05배, 양옆은 0.85배로 자연스럽게 돋보기 줌인
            const scale = 1.05 - Math.abs(ratio) * 0.2;
            
            // 화면 밖으로 벗어나는 책은 서서히 페이드아웃 처리
            const opacity = 1 - Math.abs(ratio) * 0.78;

            // 호버되지 않은 기본 상태일 때만 실시간 3D 아치 트랜스폼 반영
            if (!card.matches(':hover')) {
                card.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.o




























function openMagicBook(event, id) {
    if (event) {
        event.stopPropagation();
    }
    
    const viewport = document.querySelector('.magic-book-viewport');
    const overlay = document.getElementById('magic-book-overlay');
        const ingredients = INGREDIENT_DICT[p.id] || [
            { name: "순두부 베이스", base: 100 },
            { name: "박력분 / 대체분", base: 100 },
            { name: "유기농 설탕", base: 50 }
        ];

        const ingredientsInputHtml = ingredients.map(ing => `
            <div class="calculator-row">
                <span class="ing-name">${ing.name}</span>
                <div class="ing-input-wrapper">
                    <input type="number" class="ing-input" 
                           data-base="${ing.base}" 
                           data-id="${p.id}" 
                           value="${ing.base}" 
                           oninput="onIngredientChange(this, '${ing.name}')">
                    <span class="ing-unit">g</span>
                </div>
            </div>
        `).join('');

        return `
            <div class="showcase-card ${mosaicClass} ${physicsClass} fade-in-up" id="card-${p.id}" style="animation-delay: ${index * 0.08}s">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="page-peel-hint" onclick="openFocusStage(${p.id})"></div>
                        <div class="showcase-img" onclick="openFocusStage(${p.id})">
                            <img src="${p.img}" alt="${p.title}">
       


"    // 서브 재료들의 비례 계산 렌더링\n    const subIngredientsHtml = ingredients.slice(1).map((ing, idx) => `\n        <div class=\"magic-calc-row\">\n            <span class=\"magic-ing-name\">${ing.name}</span>\n            <div class=\"magic-ing-value-wrapper\">\n                <span class=\"magic-sub-value\" id=\"magic-sub-${p.id}-${idx}\" data-ratio=\"${ing.base / mainIng.base}\">${ing.base}</span>\n                <span class=\"ing-unit\">g</span>\n            </div>\n        </div>\n    `).join('');\n\n    // 상세 베이킹 순서 가공\n    const stepsList = RECIPE_STEPS_DB[p.id] || [\n        { time: \"10분\", title: \"단계 1\", desc: \"상세 조리 가이드가 준비 중입니다. 😊\" }\n    ];\n    const stepsHtml = stepsList.map((step, idx) => `\n        <div class=\"magic-step-item\" style=\"display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.78rem; align-items: flex-start;\">\n            <div style=\"background: #8c6426; color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700; font-size: 0.65rem; margin-top: 2px;\">${idx + 1}</div>\n            <div style=\"flex: 1;\">\n                <div style=\"font-weight: 700; color: #2b1c14; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: center;\">\n                    <span style=\"word-break: keep-all;\">${step.title}</span>\n                    <span style=\"font-size: 0.68rem; color: #8c6426; font-weight: normal; background: rgba(140,100,38,0.08); padding: 1px 6px; border-radius: 10px; flex-shrink: 0;\"><i class=\"fa-regular fa-clock\"></i> ${step.time}</span>\n                </div>\n                <div style=\"color: #5c4135; line-height: 1.5; word-break: keep-all; font-weight: 500;\">${step.desc}</div>\n            </div>\n        </div>\n    `).join('');\n\n    // 실패 대처 및 셰프 가이드 데이터 구성\n    let matchedCreator = null;\n    if (typeof MASTER_CREATORS !== 'un
<truncated 10929 bytes>
                            <p class="showcase-desc">${p.desc}</p>
                            ${p.emotionalQuote ? `<p class="showcase-quote" style="font-family: var(--font-playfair), serif; font-style: italic; font-size: 0.73rem; color: #8D6E63; margin-top: 10px; margin-bottom: 5px; word-break: keep-all; line-height: 1.4;"><i class="fa-solid fa-quote-left" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-right: 5px; opacity: 0.7;"></i>${p.emotionalQuote}<i class="fa-solid fa-quote-right" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-left: 5px; opacity: 0.7;"></i></p>` : ''}
                            
                            <div class="card-action-bar">
                                <button class="flip-btn" onclick="openFocusStage(${p.id})">
                                    <i class="fa-solid fa-gift"></i> 맞춤 분량 계산 🧮
                                </button>
                                <a href="${p.path}" class="detail-link" ${p.path.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    룩북 보기 📖 <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-back">
                        <div class="card-back-header">
                            <div class="back-vol">Atelier Scale</div>
                            <h4 class="serif back-title">${p.title}</h4>
                            <p class="back-subtitle">어떤 숫자를 바꾸든 비례 계산됩니다</p>
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank">블로그 가이드 📖</a>`
        : `<button class="btn-magic-action blog" onclick="alert('공식 블로그 가이드가 준비 중입니다.')">가이드 준비 중 🔒</button>`;

    // 3D 마법서 동적 마크업 생성
    viewport.innerHTML = `
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 가죽 책 표지 (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 빈티지 양필지 속지 (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 좌측 페이지: 화보 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title serif">PREMIUM RECIPE</div>
          






























    `;

"    // 하단 이동 버튼군 3개 세트 정의\n    const downloadBtn = `<button class=\"btn-magic-action download\" onclick=\"issueRecipeCardFromMagicBook(${p.id}, '${p.title.replace(/'/g, \"\\\\'\")}', '${p.img}')\"><i class=\"fa-solid fa-download\"></i> 레시피 카드로 소장하기</button>`;\n    \n    const blogBtn = p.blogUrl\n        ? `<a href=\"${p.blogUrl}\" class=\"btn-magic-action blog\" target=\"_blank\"><i class=\"fa-solid fa-book-open\"></i> 블로그 가기 📖</a>`\n        : `<button class=\"btn-magic-action blog\" onclick=\"alert('공식 블로그 가이드가 준비 중입니다.')\">가이드 준비 중 🔒</button>`;\n        \n    const lookbookBtn = `<a href=\"${p.path}\" class=\"btn-magic-action lookbook\" onclick=\"closeMagicBook();\"><i class=\"fa-solid fa-image\"></i> 룩북보기 🎨</a>`;\n\n    // 3D 마법서 동적 마크업 생성\n    viewport.innerHTML = `\n        <div class=\"magic-spellbook\" id=\"magic-spellbook\">\n            <div class=\"magic-book-body\">\n                <!-- 가죽 책 표지 (Book Cover) -->\n                <div class=\"magic-book-cover\"></div>\n\n                <!-- 빈티지 양필지 속지 (Parchment Pages) -->\n                <div class=\"magic-pages-container\">\n                    <button class=\"btn-magic-close\" onclick=\"closeMagicBook()\">&times;</button>\n                    \n                    <!-- 좌측 페이지: 화보 -->\n                    <div class=\"magic-page-left\">\n                        <div class=\"magic-page-book-title\" style=\"font-family:'Noto Serif KR', serif; font-size: 0.8rem; color: #3A6958; font-weight:700; letter-spacing: 2px; margin-bottom: 12px; text-align: left;\">프로젝트 두부</div>\n                        <div class=\"magic-photo-frame\">\n                            <img src=\"${bookImg}\" alt=\"${p.title}\" onerror=\"this.style.display='none'; document.getElementById('magic-photo-fallback-${p.id}').style.display='flex';\">\n                            <div class=\"magic-photo-fa
<truncated 6253 bytes>
            </div>
        </div>
    
    slides.forEach(slide => slide.cla



















                            <div class="magic-photo-fallback" id="magic-photo-fallback-${p.id}" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; flex-direction:column; background: linear-gradient(135deg, #e4d7bd, #cbbca0); color: #5c4538; padding: 20px; box-sizing: border-box; text-align: center;">
                                <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2.2rem; color: #8a7051; margin-bottom: 12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"></i>
                                <span style="font-family: 'Noto Serif KR', serif; font-size: 1.05rem; font-weight: 700; color: #3b281f; line-height: 1.4; word-break: keep-all;">${p.title}</span>
                                <span style="font-family: 'Cinzel', serif; font-size: 0.65rem; color: #8a7051; margin-top: 6px; letter-spacing: 1px;">PREMIUM RECIPE VOL.${p.id}</span>
                            </div>
                        </div>
                        <div class="magic-quote">
                            <i class="fa-solid fa-quote-left text-xs opacity-60 mr-1"></i>
                            ${emotionalQuote}
                            <i class="fa-solid fa-quote-right text-xs opacity-60 ml-1"></i>
                        </div>
                    </div>

                    <!-- 우측 페이지: 스마트 룬 연산판 -->
                    <div class="magic-page-right" style="display: flex; flex-direction: column;">
                        <div class="magic-meta-vol">PREMIUM ARCHIVE VOL.${p.id}</div>
                        <h3 class="magic-meta-title" style="margin-bottom: 8px;">${p.title}</h3>
                        
                        <!-- 3대 탭 메뉴 -->
                        <div class="magic-book-tabs" style="display: flex; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid rgba(88,65,46,0.15); padding-bottom: 8px; font-size: 0.85rem; font-weight: 800;">
                            <button class="magic-tab-btn active" id="magic-tab-btn-calc" onclick="switchMagicBookTab('calc')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#3A6958; cursor:pointer; border-bottom: 2px solid #3A6958; transition: all 0.2s; outline:none;">⚖️ 계량 계산</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-steps" onclick="switchMagicBookTab('steps')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">📜 베이킹 순서</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-trouble" onclick="switchMagicBookTab('trouble')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">🔍 실패 대처법</button>
                        </div>

                        <!-- 탭 콘텐츠 영역 -->
                        <div class="magic-tab-cont


















































        `).join('');

        return `
            <div class="showcase-card ${mosaicClass} ${physicsClass} fade-in-up" id="card-${p.id}" style="animation-delay: ${index * 0.08}s">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="page-peel-hint" onclick="openFocusStage(${p.id})"></div>
                        <div class="showcase-img" onclick="openFocusStage(${p.id})">
                            <img src="${p.img}" alt="${p.title}">
                            <div class="badge-container">${badgesHtml}</div>
                        </div>
                        <div class="showcase-body">
                            <div class="showcase-vol">Atelier Premium Spec</div>
                            <h3 class="serif showcase-title">${p.title}</h3>
                            <p class="showcase-desc">${p.desc}</p>
                            ${p.emotionalQuote ? `<p class="showcase-quote" style="font-family: var(--font-playfair), serif; font-style: italic; font-size: 0.73rem; color: #8D6E63; margin-top: 10px; margin-bottom: 5px; word-break: keep-all; line-height: 1.4;"><i class="fa-solid fa-quote-left" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-right: 5px; opacity: 0.7;"></i>${p.emotionalQuote}<i class="fa-solid fa-quote-right" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-left: 5px; opacity: 0.7;"></i></p>` : ''}
                            
                            <div class="card-action-bar">
                                <button class="flip-btn" onclick="openFocusStage(${p.id})">
                                    <i class="fa-solid fa-gift"></i> 맞춤 분량 계산 🧮
                                </button>
                                <a href="${p.path}" class="detail-link" ${p.path.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    룩북 보기 📖 <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-back">
                        <div class="card-back-header">
                            <div class="back-vol">Atelier Scale</div>





























}

function issueRecipeCardFromMagicBook(id, title, img) {
    const mainInput = document.getElementById(`magic-main-input-${id}`);
    if (!mainInput) return;
    
    const mainRow = mainInput.closest('.magic-calc-row-main');
    const anchorName = mainRow.querySelector('.magic-ing-name').innerText.replace(' (기준)', '');
    const anchorVal = parseFloat(mainInput.value) || 0;
    
    const p = PROJECTS.find(item => item.id === id);
    if (!p) return;
    const ingredients = INGREDIENT_DICT[id] || [];
    const mainIng = ingredients.find(ing => ing.name.includes('순두부')) || ingredients[0];
    const anchorBase = mainIng ? mainIng.base : 100;
    const scale = anchorVal / anchorBase;
    const yieldText = getDynamicYieldText(id, scale);

    let ingredientsSummary = `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
            <span style="color: #4E342E; font-weight: 500;">${anchorName}</span>
            <strong style="color: var(--dubu-mint-accent);">${anchorVal}g</strong>
        </div>
    `;

    const subRows = document.querySelectorAll(`#magic-sub-ingredients-${id} .magic-calc-row`);
    subRows.forEach(row => {
        const name = row.querySelector('.magic-ing-name').innerText;
        const val = row.querySelector('.magic-sub-value').innerText;
        ingredientsSummary += `
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
                <span style="color: #4E342E; font-weight: 500;">${name}</span>











































































































































        if (node.type === 'recipe') {
            div.innerHTML = `<img src="${encodeURI(node.img)}" alt="${node.title}">`;
        } else if (node.type === 'tag') {
            div.innerHTML = `<i class="fa-solid ${node.icon}"></i><span>${node.label}</span>`;
        } else {
            div.innerHTML = `<div style="font-size: 0.62rem; font-weight: 700; line-height: 1.1;">${node.label}</div>`;
        }

        div.addEventListener('click', () => {
            if (node.type === 'recipe' && activeNodeId === node.id) {
                openFocusStage(node.projectId);
            } else {
                focusUniverseNode(node.id);
            }
        });

        if (node.type === 'recipe') {
            div.addEventListener('dblclick', () => {
                openFocusStage(node.projectId);
            });
            div.title = "더블클릭하여 실시간 계산기 열기";
        }

        container.appendChild(div);
    });

    REMIX_BUBBLES.forEach(remix => {
        const bubble = document.createElement('div');
        bubble.id = `remix-bubble-${remix.id}`;
        bubble.className = 'universe-node component-node remix-bubble';









































































































































































































































































































































        z-index: 10000; pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const colors = ['#E2ECE9', '#FDFBF4', '#D3ECE2', '#E8DCC4', '#E6A4B4', '#FFF0F5'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 4 - 2
        });
    }

    let animationId;

    function render() {
        ctx.clearRect(0, 0, width, height);
        let active = false;

        particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.y / 30) * 0.5;
            p.angle += p.spin;

            if (p.y < height) {
                active = true;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (active) {
            animationId = requestAnimationFrame(render);





































        `;
    }).join('');
}

function handleSliceClick(event, projectId) {
    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = window.getComputedStyle(slice).flexGrow >= 4;

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {
        document.querySelectorAll('.accordion-slice').forEach(s => {
            if (s !== slice) s.style.flex = '1';
        });
        slice.style.flex = '5.4';
    }
}

// ==========================================================================
// 14-2. 사계절의 아틀리에 시즌 특별 이벤트 렌더링
// ==========================================================================
function renderSeasonalEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;














































































































































































































































































        if (theme.desc) {
            descEl.textContent = theme.desc;
            descEl.style.display = 'block';
        } else {
            descEl.textContent = '';
            descEl.style.display = 'none';
        }
    }
    
    if (subGridEl && theme.recipes) {
        subGridEl.innerHTML = theme.recipes.map(recipe => {
            return `
            <div class="cinematic-card-outer" onclick="closeCinematicStage(); openFocusStage(${recipe.id});">
                <div class="cinematic-card">
                    <div class="sub-card-img-wrapper">
                        <img src="${recipe.img}" alt="${recipe.title}" class="sub-card-img" />
                        <span class="sub-card-vol">${recipe.vol}</span>
                    </div>
                    <div class="sub-card-main">
                        <h3 class="sub-card-title">${recipe.title}</h3>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }
    
    document.body.style.overflow = 'hidden';
    animateCinematic();
}












































































































































































        ingredients.unshift(temp);
    }

    // 기준 재료 (순두부 또는 첫 번째 재료)
    const mainIng = ingredients[0];
    
    // 서브 재료들의 비례 계산 렌더링
    const subIngredientsHtml = ingredients.slice(1).map((ing, idx) => `
        <div class="magic-calc-row">
            <span class="magic-ing-name">${ing.name}</span>
            <div class="magic-ing-value-wrapper">
                <span class="magic-sub-value" id="magic-sub-${p.id}-${idx}" data-ratio="${ing.base / mainIng.base}">${ing.base}</span>
                <span class="ing-unit">g</span>
            </div>
        </div>
    `).join('');

    // 통일된 포커스 스테이지 룩북 연동 버튼
    const detailsBtn = `<button class="btn-magic-action details" onclick="closeMagicBook(); openFocusStage(${p.id});">상세 룩북 감상 👀</button>`;
    
    const blogBtn = p.blogUrl
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank">블로그 가이드 📖</a>`
        : `<button class="btn-magic-action blog" onclick="alert('공식 블로그 가이드가 준비 중입니다.')">가이드 준비 중 🔒</button>`;

    // 3D 마법서 동적 마크업 생성
    viewport.innerHTML = `
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 가죽 책 표지 (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 빈티지 양필지 속지 (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 좌측 페이지: 화보 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title serif">PREMIUM RECIPE</div>
                        <div class="magic-photo-frame">
                            <img src="${bookImg}" alt="${p.title}" onerror="this.style.display='none'; document.getElementById('magic-photo-fallback-${p.id}').style.display='flex';">
                            <div class="magic-photo-fallback" id="magic-photo-fallback-${p.id}" style="display:none; width:100%; hei








                            <i class="fa-solid fa-quote-right text-xs opacity-60 ml-1"></i>
                        </div>
                    </div>

                    <!-- 우측 페이지: 스마트 룬 연산판 -->
                    <div class="magic-page-right">
                        <div class="magic-meta-vol">PREMIUM ARCHIVE VOL.${p.id}</div>
                        <h3 class="magic-meta-title">${p.title}</h3>
                        
                        <!-- 스마트 계산 패널 -->
                        <div class="magic-calc-panel">
                            <div class="magic-calc-row-main">
                                <span class="magic-ing-name" style="font-weight:700; color:#2b1c14;">${mainIng.name} (기준)</span>
                                <div class="magic-ing-value-wrapper">
                                    <input type="number" id="magic-main-input-${p.id}" class="magic-main-input" value="${mainIng.base}" oninput="onMagicBookAnchorChange(${p.id}, ${mainIng.base}, this.value)">
                                    <span class="ing-unit" style="font-weight:700; color:#2b1c14;">g</span>
                                </div>
                            </div>
                            <div id="magic-sub-ingredients-${p.id}">
                                ${subIngredientsHtml}
                            </div>
                            <input type="range" class="magic-range-slider" min="${Math.round(mainIng.base * 0.3)}" max="${Math.round(mainIng.base * 3)}" value="${mainIng.base}" oninput="document.getElementById('magic-main-input-${p.id}').value = this.value; onMagicBookAnchorChange(${p.id}, ${mainIng.base}, this.value)">
                        </div>

                        <!-- 마법 비법 팁 -->
                        <div class="magic-spell-tip">
                            ${troubleTip}
                        </div>

                        <!-- 이동 버튼군 -->
                        <div class="magic-action-row">
                            ${detailsBtn}
                            ${blogBtn}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

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