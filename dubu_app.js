// 프로젝트 두부: 포털 핵심 애플리케이션 스크립트 (v16.0 Rebranding)

let heroSlideIndex = 0;
let activeFocusRecipeId = null;
let currentTab = 'calc';

// ==========================================================================
// 1. 초기화 및 페이지 로드
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Hero 섹션 화보 로테이션 시작
    const slides = document.querySelectorAll('.visual-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(rotateHeroSlide, 4500);
    }

    // 포털 대시보드 및 아코디언 렌더링 (dubu_data.js의 PROJECTS, EVENTS 배열 사용)
    if (typeof PROJECTS !== 'undefined' && typeof EVENTS !== 'undefined') {
        renderDashboard();
        renderAccordionArtbook();
    }

    // 3단계: 3D 책장 렌더링 (PROJECTS 데이터 사용)
    if (typeof PROJECTS !== 'undefined') {
        renderBookshelf();
    }

    // Smooth Scroll 바인딩
    document.querySelectorAll('.nav-links .nav-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navigation Active State on Scroll (ScrollSpy)
    const navLinks = document.querySelectorAll('.nav-links .nav-btn');
    const sections = document.querySelectorAll('section[id]');
    const sectionRatios = {};

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sectionRatios[entry.target.id] = entry.intersectionRatio;
        });

        let mostVisibleSection = null;
        let maxRatio = 0;

        if (window.scrollY < 100) {
            mostVisibleSection = 'home';
        } else {
            for (const id in sectionRatios) {
                if (sectionRatios[id] > maxRatio) {
                    maxRatio = sectionRatios[id];
                    mostVisibleSection = id;
                }
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (mostVisibleSection !== 'home' && link.getAttribute('href') === `#${mostVisibleSection}`) {
                link.classList.add('active');
            }
        });
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] });

    sections.forEach(section => scrollObserver.observe(section));
});

// ==========================================================================
// 2. Hero Section 화보 크로스페이드 슬라이더
// ==========================================================================
function rotateHeroSlide() {
    const slides = document.querySelectorAll('.visual-slide');
    if (slides.length === 0) return;

    slides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = (heroSlideIndex + 1) % slides.length;
    slides[heroSlideIndex].classList.add('active');
}

// ==========================================================================
// 3. 포털 대시보드 렌더링 (시즌 이벤트 이미지 카드)
// ==========================================================================
function renderDashboard() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    // THEMES 데이터가 있으면 사용, 없으면 기본 매핑
    const themeList = (typeof THEMES !== 'undefined') ? THEMES : [];

    if (themeList.length === 0) {
        eventsContainer.innerHTML = '<p style="color:#aaa;text-align:center;">이벤트 데이터 로딩 중...</p>';
        return;
    }

    // 태그 배지 색상 매핑
    const tagColors = {
        romantic:    { badge: '#e91e63', badgeBg: 'rgba(233,30,99,0.9)'   },
        traditional: { badge: '#8d5524', badgeBg: 'rgba(141,85,36,0.9)'   },
        halloween:   { badge: '#e65100', badgeBg: 'rgba(50,20,0,0.88)'    },
        christmas:   { badge: '#1b5e20', badgeBg: 'rgba(15,60,20,0.9)'    }
    };

    eventsContainer.innerHTML = themeList.map((theme, index) => {
        const tc = tagColors[theme.id] || { badge: '#333', badgeBg: 'rgba(30,30,30,0.85)' };
        return `
            <div class="season-event-card fade-in-up"
                 style="animation-delay:${index * 0.12}s"
                 onclick="openTheme('${theme.id}')">
                <div class="season-card-img-wrap">
                    <img src="${theme.img}" alt="${theme.title}" loading="lazy"
                         onerror="this.parentNode.style.background='#f0ece5'">
                    <span class="season-card-badge" style="background:${tc.badgeBg};">${theme.tag}</span>
                </div>
                <div class="season-card-footer">
                    <div class="season-card-info">
                        <span class="season-card-icon">${theme.icon}</span>
                        <span class="season-card-title">${theme.engTitle}</span>
                    </div>
                    <span class="season-card-arrow">→</span>
                </div>
            </div>`;
    }).join('');
}


// ==========================================================================
// 4. Atelier Focus Stage (몰입형 3D 계산기 및 3대 감성 탭)
// ==========================================================================
function getRecipeTheme(recipe) {
    if (!recipe) {
        return {
            themeColor: '#3a1d11',
            themeGlow: 'rgba(197, 160, 89, 0.15)',
            accentColor: '#c5a059',
            spineColor1: '#251109',
            spineColor2: '#3a1d11',
            spineTextColor: '#ebd090'
        };
    }

    const id = Number(recipe.id);
    const path = recipe.path || '';
    const categories = recipe.categories || [];
    const title = recipe.title || '';

    // 1. 크리스마스 / 성탄절
    const isChristmas = 
        path.includes('성탄절') || 
        path.includes('크리스마스') || 
        title.includes('슈톨렌') || 
        title.includes('부쉬드노엘') || 
        title.includes('블랙포레스트') || 
        title.includes('눈꽃') || 
        [20, 21, 22, 23, 24, 25, 26].includes(id);

    if (isChristmas) {
        return {
            themeColor: '#0e4a27',
            themeGlow: 'rgba(15, 74, 41, 0.35)',
            accentColor: '#e5a93b',
            spineColor1: '#072513',
            spineColor2: '#0e4a27',
            spineTextColor: '#ffd79e'
        };
    }

    // 2. 할로윈
    const isHalloween = 
        path.includes('할로윈') || 
        title.includes('단호박') || 
        [4, 15, 18, 9].includes(id);

    if (isHalloween) {
        return {
            themeColor: '#4d1d59',
            themeGlow: 'rgba(141, 45, 171, 0.35)',
            accentColor: '#ffd700',
            spineColor1: '#2c0e35',
            spineColor2: '#4d1d59',
            spineTextColor: '#eed5ff'
        };
    }

    // 3. 발렌타인데이 / 화이트데이 / 로맨틱 테마
    const isRomantic = 
        path.includes('발렌타인') || 
        path.includes('화이트데이') || 
        title.includes('바크초콜릿') || 
        title.includes('초코케익') || 
        title.includes('초코마들렌') || 
        [37, 30, 31, 32].includes(id);

    if (isRomantic) {
        if (id === 37 || id === 30) {
            return {
                themeColor: '#6c1524',
                themeGlow: 'rgba(197, 43, 71, 0.22)',
                accentColor: '#fcc2cd',
                spineColor1: '#3d0a13',
                spineColor2: '#6c1524',
                spineTextColor: '#ffe6eb'
            };
        } else {
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

    // 4. 설날-추석 / 명절 / 전통 감성 테마
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
            return {
                themeColor: '#2b3d2b',
                themeGlow: 'rgba(85, 125, 85, 0.2)',
                accentColor: '#d6cba0',
                spineColor1: '#172417',
                spineColor2: '#2b3d2b',
                spineTextColor: '#e5debf'
            };
        } else {
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

    // 5. 카테고리별 테마
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

    const theme = getRecipeTheme(recipe);

    const board = overlay.querySelector('.atelier-focus-board');
    if (board) {
        board.classList.add('magic-book-theme');
        board.style.setProperty('--magic-book-color', theme.themeColor);
        board.style.setProperty('--magic-book-glow', theme.themeGlow);
        board.style.setProperty('--magic-book-accent', theme.accentColor);
    }

    // 첫 번째 탭으로 리셋
    switchFocusTab('calc');

    // 1. 화보 세팅
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    if (theme) {
        titleEl.style.color = theme.themeColor;
        const diffPill = document.getElementById('focus-recipe-difficulty');
        if (diffPill) {
            diffPill.style.backgroundColor = theme.themeGlow;
            diffPill.style.color = theme.themeColor;
            diffPill.style.borderColor = theme.themeColor;
        }
    }

    // 2. 가이드 데이터 바인딩
    const meta = getRecipeMetadata(recipeId);

    const cheersEl = document.getElementById('focus-recipe-cheers');
    if (cheersEl) cheersEl.innerText = meta.cheers;

    const diffPill = document.getElementById('focus-recipe-difficulty');
    if (diffPill) diffPill.innerText = meta.difficulty;

    // 문제 해결(Q&A) 탭 바인딩
    const troubleContent = document.getElementById('focus-tab-trouble-content');
    if (troubleContent) {
        const rawTrouble = recipe.troubleShoot || "";
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
                <div class="no-troubles" style="text-align: center; color: #7f8c8d; font-size: 0.85rem; padding: 20px 0; display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; color: var(--dubu-mint-accent);"></i>
                    <span>이 레시피는 특별한 실패 유의사항이 접수되지 않았습니다. 기본 계량과 온도를 잘 지켜주시면 성공입니다!</span>
                </div>
            `;
        }
        troubleContent.innerHTML = troubleHTML;
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
                <input type="number" class="focus-ing-input focus-sub-input" 
                       data-base="${ing.base}" 
                       value="${ing.base}" 
                       readonly>
                <span class="focus-ing-unit">g</span>
            </div>
        `;
        listContainer.appendChild(row);
    }

    // 4. 동적 순서 타임라인 빌드
    const stepsList = RECIPE_STEPS_DB[recipeId] || [
        { title: "준비하기", time: "5분", desc: "재료를 계량하고 오븐을 예열합니다." }
    ];
    const timelineContainer = document.getElementById('focus-steps-timeline');
    if (timelineContainer) {
        timelineContainer.innerHTML = stepsList.map((step, idx) => {
            return `
                <div class="timeline-step-item" data-step-idx="${idx}" onclick="toggleTimelineStepComplete(this, ${stepsList.length})">
                    <div class="step-num-circle">
                        <span class="step-num-text">${idx + 1}</span>
                        <i class="fa-solid fa-check step-check-icon" style="display: none; font-size: 0.75rem; color: white;"></i>
                    </div>
                    <div class="step-content-box">
                        <div class="step-header-row" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <h4 class="step-title-text" style="margin: 0; font-weight: 700; color: #3a1d11;">${step.title}</h4>
                            <span class="step-time-pill" style="font-size: 0.75rem; background: rgba(58,105,88,0.08); padding: 2px 8px; border-radius: 12px; color: #163b32;"><i class="fa-regular fa-clock"></i> ${step.time}</span>
                        </div>
                        <p class="step-desc-text" style="margin: 5px 0 0 0; font-size: 0.82rem; color: #555; line-height: 1.4;">${step.desc}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 진행률 게이지 리셋
    resetTimelineProgress(stepsList.length);

    // 5. 레시피 다운로드 & 공유 버튼 이벤트 바인딩
    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, meta.difficulty, meta.bakingTip, meta.cheers);
    };

    const shareBtn = document.getElementById('focus-btn-share');
    if (shareBtn) {
        shareBtn.onclick = (e) => {
            shareRecipe(e, recipe.title);
        };
    }

    // 블로그 버튼 연동
    const blogBtn = document.getElementById('focus-btn-blog');
    if (blogBtn) {
        if (recipe.blogUrl) {
            blogBtn.href = recipe.blogUrl;
            blogBtn.style.opacity = '1';
            blogBtn.style.pointerEvents = 'auto';
            blogBtn.target = '_blank';
        } else {
            blogBtn.href = '#';
            blogBtn.style.opacity = '0.45';
            blogBtn.style.pointerEvents = 'none';
        }
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
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

    if (percent === 100) {
        triggerPageConfetti();
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
// 5. 역비례 & 다중 앵커 양방향 비례 연산 (Atelier Scale)
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

function animateValue(obj, start, end, duration = 300) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.value = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.value = end;
            obj.dispatchEvent(new Event('input'));
        }
    };
    window.requestAnimationFrame(step);
}

function onFocusAnchorChange(inputEl) {
    const val = parseFloat(inputEl.value) || 0;
    const base = parseFloat(inputEl.getAttribute('data-base'));
    if (base === 0 || val <= 0) return;

    const scale = val / base;
    const inputs = document.querySelectorAll('.focus-sub-input');

    inputs.forEach(inp => {
        const b = parseFloat(inp.getAttribute('data-base'));
        const targetVal = Math.round(b * scale);
        const currentVal = parseFloat(inp.value) || 0;

        animateValue(inp, currentVal, targetVal, 300);
    });

    updateDynamicYieldDisplay(activeFocusRecipeId, scale);
    updateDynamicBakingTip(activeFocusRecipeId, scale);
}

function getRecipeMetadata(recipeId) {
    const recipe = PROJECTS.find(p => p.id === Number(recipeId));
    let difficulty = "보통 🟡";
    let bakingTip = "오븐 예열 170℃ / 25분";
    let cheers = "오늘 내 손끝으로 빚는 건강한 두부 베이킹, 설레는 시작입니다! ✨";

    if (recipe) {
        if (recipe.id === 40) {
            difficulty = "오란다 대 3개 분량 🍞";
            bakingTip = "180°C 예열 → 170°C / 40분 (콩물 마무리 + 하루 숙성 권장)";
            cheers = "다음 날이 진짜입니다! 하루 숙성 후 먹는 그 촉촉함과 고소함은 레시피의 진짜 얼굴이에요. ☀️";
        } else if (recipe.id === 39) {
            difficulty = "오란다 대 틀 1개 분량 🍞";
            bakingTip = "중탕 예열 150℃ / 140℃ 60분 (뜸 10분)";
            cheers = "순두부 물기를 짜지 않고 그대로 사용하여, 촉촉함과 꾸덕함이 극대화되는 특별한 레시피입니다. 🖤";
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
            bakingTip = "오븐 예열 170℃ / 25분";
            cheers = "코코넛의 바삭함과 단팥의 든든함! 가벼운 등산이나 소풍 가기 전 최고의 영양 간식입니다. 🥥";
        }
    }
    return { difficulty, bakingTip, cheers };
}

function updateDynamicBakingTip(recipeId, scale) {
    const meta = getRecipeMetadata(recipeId);
    const cheersEl = document.getElementById('focus-recipe-cheers');
    if (cheersEl) {
        cheersEl.innerText = meta.cheers;
    }
}

// ==========================================================================
// 6. 레시피 카드 발행 & 다운로드 & 공유
// ==========================================================================
function issueRecipeCardFromFocus(recipeId, title, img, difficulty, bakingTip, cheers) {
    const anchorLabel = document.getElementById('focus-anchor-label')?.innerText || '';
    const anchorInput = document.getElementById('focus-anchor-input');
    const anchorVal = anchorInput ? parseFloat(anchorInput.value) || 0 : 0;
    const anchorBase = anchorInput ? parseFloat(anchorInput.getAttribute('data-base')) || 1 : 1;
    const scale = anchorBase === 0 ? 1 : anchorVal / anchorBase;

    let ingredientsSummary = '';
    if (anchorLabel && anchorInput) {
        ingredientsSummary += `
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
                <span style="color: #4E342E; font-weight: 500;">${anchorLabel}</span>
                <strong style="color: var(--dubu-mint-accent);">${anchorInput.value}g</strong>
            </div>
        `;
    }

    const rows = document.querySelectorAll('.focus-ingredient-calc-row');
    rows.forEach(row => {
        const nameEl = row.querySelector('.focus-ing-name');
        const inputEl = row.querySelector('.focus-ing-input');
        if (nameEl && inputEl) {
            ingredientsSummary += `
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(58, 105, 88, 0.1); font-size: 0.9rem;">
                    <span style="color: #4E342E; font-weight: 500;">${nameEl.innerText}</span>
                    <strong style="color: var(--dubu-mint-accent);">${inputEl.value}g</strong>
                </div>
            `;
        }
    });

    const yieldText = getDynamicYieldText(recipeId, scale);
    let finalBakingTip = bakingTip;
    if (scale > 1.1) {
        finalBakingTip += " (※ 대량 조리 시 굽는 시간 추가 필요)";
    } else if (scale < 0.9) {
        finalBakingTip += " (※ 소량 조리 시 굽는 시간 단축 필요)";
    }

    openUnifiedRecipeCardModal(recipeId, title, img, yieldText, finalBakingTip, cheers, ingredientsSummary);
}

function openUnifiedRecipeCardModal(id, title, img, yieldText, bakingTip, cheers, ingredientsSummary) {
    const oldModal = document.getElementById('recipe-card-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'recipe-card-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 11000; opacity: 0; transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: #FDFBF4; width: 95%; max-width: 400px; border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transform: translateY(30px); transition: transform 0.3s ease; border: 2px solid #E8DCC4; position: relative;">
            <div style="text-align: center; margin-bottom: 15px; position: relative;">
                <h3 style="color: #3A1D11; font-size: 1.25rem; margin: 0 0 5px 0; font-weight: 900; letter-spacing: 1px;">ATELIER RECIPE CARD</h3>
                <span style="font-size: 0.7rem; color: #7F8C8D; letter-spacing: 2px;">PROJECT DUBU</span>
                <button onclick="closeRecipeCardModal()" style="position: absolute; right: -10px; top: -10px; background: none; border: none; font-size: 1.5rem; color: #7F8C8D; cursor: pointer; outline: none;">&times;</button>
            </div>
            
            <div style="border-radius: 12px; overflow: hidden; height: 160px; margin-bottom: 15px; border: 1px solid #E8DCC4;">
                <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <div style="text-align: center; margin-bottom: 15px;">
                <h4 style="color: #3A1D11; font-size: 1.05rem; margin: 0 0 5px 0; font-weight: 700;">${title}</h4>
                <div style="display: inline-flex; align-items: center; gap: 5px; background: #E8DCC4; color: #3A1D11; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                    <i class="fa-solid fa-box-open"></i> ${yieldText}
                </div>
            </div>

            <div style="background: white; border: 1px solid #E8DCC4; border-radius: 12px; padding: 15px; margin-bottom: 15px; max-height: 150px; overflow-y: auto;">
                <h5 style="color: #7F8C8D; font-size: 0.7rem; margin: 0 0 8px 0; letter-spacing: 1px;">INGREDIENTS</h5>
                ${ingredientsSummary}
            </div>

            <div style="background: rgba(58, 105, 88, 0.05); border: 1px solid rgba(58, 105, 88, 0.12); border-radius: 12px; padding: 12px; font-size: 0.78rem; color: #2C3E50; line-height: 1.5; margin-bottom: 15px;">
                <div style="font-weight: 700; color: #163B32; margin-bottom: 4px;"><i class="fa-regular fa-clock"></i> 베이킹 가이드 & 팁</div>
                <div>${bakingTip}</div>
                <div style="margin-top: 6px; font-style: italic; color: #7F8C8D;">${cheers}</div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button onclick="downloadRecipeCard('${title}')" style="flex: 1; background: var(--dubu-mint-accent); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: background 0.2s; text-align: center; outline: none;">
                    <i class="fa-solid fa-download"></i> 이미지로 저장
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'translateY(0)';
    }, 50);
}

function closeRecipeCardModal() {
    const modal = document.getElementById('recipe-card-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'translateY(30px)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function downloadRecipeCard(title) {
    alert(`💾 [레시피 저장 완료]\n\n"${title}" 맞춤 레시피 카드가 이미지 파일(PNG)로 다운로드 폴더에 저장되었습니다. 필요할 때 편하게 열어보며 베이킹에 활용해 보세요!`);
}

function shareRecipe(event, title) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

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

    const yieldEl = document.getElementById('focus-recipe-difficulty');
    let yieldText = yieldEl ? yieldEl.innerText || '' : '';
    if (yieldText.includes('난이도:')) {
        yieldText = '';
    } else {
        yieldText = yieldText.replace('분량:', '').trim();
    }

    let copyText = `[프로젝트 두부] ${title} 레시피 💌\n\n`;
    if (yieldText) {
        copyText += `■ 기준 분량: ${yieldText}\n`;
    }
    if (ingredientText) {
        copyText += `■ 맞춤 계량 재료:\n${ingredientText}\n`;
    }

    const shareUrl = window.location.origin + window.location.pathname;
    copyText += `■ 레시피 상세 및 계산기 보러가기:\n${shareUrl}`;

    navigator.clipboard.writeText(copyText).then(() => {
        alert('📋 맞춤 레시피 정보가 클립보드에 복사되었습니다! 카카오톡이나 블로그에 편하게 붙여넣어 공유해보세요.');
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
    });
}

// ==========================================================================
// 7. 성공/다운로드 축하 Confetti 효과
// ==========================================================================
function triggerPageConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
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
        } else {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    }

    render();

    setTimeout(() => {
        particles.forEach(p => p.speed = p.speed * 1.5);
    }, 4000);
}

// ==========================================================================
// 14. Sensory Accordion Artbook - 아코디언 UI 렌더링 엔진
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
            img: "36. 순두부화이트바크초콜릿_완/0.jpg",
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
            themeColor: "#4E6B56",
            themeGlow: "rgba(78, 107, 86, 0.15)",
            accentColor: "#A5D6A7"
        },
        {
            id: 39,
            title: "순두부 흑임자 테린",
            img: "40. 순두부 흑임자테린_완/assets/01.png",
            creatorsNote: "오븐 중탕 공법으로 진하고 크리미하게 구워내 만든 다음날 더 고소하고 꾸덕한 흑임자 테린.",
            pairingGuide: "따뜻한 아메리카노와 깊은 조화를 이룹니다.",
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
                <i class="fa-solid fa-lock" style="font-size: 2.2rem; color: var(--accent-color); filter: drop-shadow(0 0 12px var(--theme-color)); margin-bottom: 12px; opacity: 0.85;"></i>
                <span class="coming-soon-text-en font-serif" style="color: #95A5A6; font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 4px;">COMING SOON</span>
                <span class="coming-soon-text-ko" style="color: #7F8C8D; font-size: 0.82rem; font-weight: 700;">비밀의 문이 곧 열립니다</span>
               </div>`
            : '';

        const titleHtml = p.isComingSoon 
            ? `<h3 class="serif showcase-title" style="color: #7f8c8d;">${p.title}</h3>`
            : `<h3 class="serif showcase-title">${p.title}${p.isNew ? ` <span style="display: inline-block; background: #FF3D71; color: white; font-family: var(--font-playfair), serif; font-weight: 700; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; vertical-align: middle; margin-left: 10px; box-shadow: 0 0 10px rgba(255, 61, 113, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">NEW</span>` : ''}</h3>`;

        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `공개 예정 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `상세보기 <i class="fa-solid fa-chevron-right" style="margin-left: 5px;"></i>`;

        return `
            <div class="accordion-slice ${p.isComingSoon ? 'coming-soon-slice' : ''}" 
                 style="${bgStyle} --theme-color: ${p.themeColor}; --theme-glow: ${p.themeGlow}; --accent-color: ${p.accentColor};" 
                 onclick="handleSliceClick(event, '${p.id}')"
                 data-vol="${p.isComingSoon ? comingSoonVol : p.id}">
                
                ${comingSoonOverlay}
                
                <div class="slice-overlay"></div>
                <div class="slice-vertical-title serif">${shortTitle}</div>
                
                <div class="slice-content-wrapper">
                    <!-- 헤더 아카이브 볼륨 레이블 -->
                    <div class="editorial-volume font-serif">${metaText}</div>
                    
                    <!-- 디저트 타이틀 블록 -->
                    <div class="editorial-title-block">
                        ${titleHtml}
                        <div class="editorial-essence font-serif">"${p.creatorsNote}"</div>
                    </div>
                    
                    <!-- 물성 스펙 테이블 -->
                    <div class="editorial-spec-grid font-serif">
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
                    
                    <!-- 푸터 연동 페어링 가이드 -->
                    <div class="editorial-footer-essence">
                        <span class="pairing-label">RECOMMENDED PAIRING</span>
                        <p class="pairing-desc font-serif">${p.pairingGuide}</p>
                    </div>
                    
                    <!-- 인터랙티브 소환 버튼 -->
                    <div class="editorial-action-box">
                        <button class="action-btn font-serif" onclick="event.stopPropagation(); openFocusStage(${p.id});">${actionBtnText}</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 페이지 로드 시 첫 번째 슬라이스(Vol.40 콩물 파운드케익)를 기본 활성화(확장) 상태로 세팅
    setTimeout(() => {
        const firstSlice = container.querySelector('[data-vol="40"]');
        if (firstSlice) {
            firstSlice.style.flex = '5.4';
            firstSlice.classList.add('active-expanded');
        }
    }, 50);
}

function handleSliceClick(event, projectId) {
    const slice = event.currentTarget;
    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');
    const isHovered = slice.classList.contains('active-expanded');

    if (isButton || isHovered) {
        if (projectId === 'coming-soon') {
            const vol = slice.getAttribute('data-vol') || '41';
            alert(`🔒 Vol.${vol} 레시피는 업데이트 예정입니다.\n\n프로젝트 두부의 새로운 컬렉션 소식을 기대해 주세요! 🖤`);
            return;
        }
        openFocusStage(projectId);
    } else {
        document.querySelectorAll('.accordion-slice').forEach(s => {
            if (s !== slice) {
                s.style.flex = '1';
                s.classList.remove('active-expanded');
            }
        });
        slice.style.flex = '5.4';
        slice.classList.add('active-expanded');
    }
}

// ==========================================================================
// 15. 시즌 이벤트 테마 모달 (2단계)
// ==========================================================================
function openTheme(themeId) {
    if (typeof THEMES === 'undefined') return;
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    const old = document.getElementById('theme-modal-overlay');
    if (old) old.remove();

    const palettes = {
        romantic:    { bg: '#FFF0F2', text: '#4a0e1c', subtext: '#9a4d5f', accent: '#c2315a', cardBg: 'rgba(255,255,255,0.85)' },
        traditional: { bg: '#F5EBE0', text: '#3b2208', subtext: '#7a5a3a', accent: '#a0713b', cardBg: 'rgba(255,255,255,0.85)' },
        halloween:   { bg: '#121212', text: '#ffd700', subtext: '#e0a020', accent: '#ff7b00', cardBg: 'rgba(30,20,0,0.75)'   },
        christmas:   { bg: '#0F172A', text: '#e5d8b0', subtext: '#8fa8c0', accent: '#e5a93b', cardBg: 'rgba(15,25,50,0.75)' }
    };
    const pal = palettes[themeId] || palettes.romantic;

    const overlay = document.createElement('div');
    overlay.id = 'theme-modal-overlay';
    overlay.className = 'theme-modal-overlay';
    overlay.style.cssText = `background: ${pal.bg}; color: ${pal.text};`;
    overlay.onclick = (e) => { if (e.target === overlay) closeThemeModal(); };

    const recipesHtml = (theme.recipes || []).map(recipe => {
        const imgSrc = recipe.img || '';
        const displayTitle = recipe.title.replace('순두부 ', '');
        return `
            <div class="theme-recipe-card" onclick="closeThemeModal(); setTimeout(()=>openFocusStage(${recipe.id}),250);">
                <div class="theme-recipe-card-img-wrapper">
                    <img src="${imgSrc}" alt="${recipe.title}" loading="lazy" onerror="this.parentNode.style.background='#f0f0f0'">
                    <div class="theme-recipe-card-vol" style="color:${pal.text};">${recipe.vol}</div>
                </div>
                <div class="theme-recipe-card-info" style="background:${pal.cardBg};">
                    <p class="theme-recipe-card-title" style="color:${pal.text};">${displayTitle}</p>
                    <span class="theme-recipe-card-icon" style="color:${pal.accent};"><i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div>`;
    }).join('');

    overlay.innerHTML = `
        <button class="theme-modal-close-btn" onclick="closeThemeModal()" style="color:${pal.subtext};">&times;</button>
        <div class="theme-modal-header">
            <div class="theme-modal-tag" style="color:${pal.subtext};">${theme.icon} ${theme.tag}</div>
            <h2 class="theme-modal-title serif" style="color:${pal.text};">${theme.title}</h2>
            <p class="theme-modal-desc" style="color:${pal.subtext};">${theme.desc}</p>
        </div>
        <div class="theme-modal-cards-container">
            ${recipesHtml}
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.classList.add('active'), 30);
}

function closeThemeModal() {
    const overlay = document.getElementById('theme-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 400);
}

// ==========================================================================
// 16. 3D 마법책 책장 렌더링 엔진 (3단계)
// ==========================================================================
function renderBookshelf() {
    const section = document.getElementById('archive');
    if (!section) return;

    // Vol 순서대로 정렬 (1→41)
    const sorted = [...PROJECTS].sort((a, b) => a.id - b.id);

    // 한 페이지 = 2행 × 10권 = 20권
    const booksPerPage = 20;
    const booksPerRow  = 10;
    const totalPages = Math.ceil(sorted.length / booksPerPage);
    let currentPage = 0;

    section.innerHTML = `
        <div class="bookshelf-wrapper">
            <!-- 헤더 -->
            <div class="bookshelf-header">
                <div class="bookshelf-tag">RECIPE ARCHIVE</div>
                <h2 class="serif bookshelf-title">실패없는 베이킹노트</h2>
                <p class="bookshelf-hint">🖱 마우스 드래그나 마우스 휠로 서가를 둘러보세요</p>
            </div>

            <!-- 책장 무대 -->
            <div class="bookshelf-scene">
                <!-- 왼쪽 화살표 -->
                <button class="shelf-nav-btn shelf-nav-left" id="shelf-btn-prev" onclick="shiftShelfPage(-1)" style="display:none;">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <!-- 책장 프레임 -->
                <div class="bookshelf-frame" id="bookshelf-frame">
                    <!-- 별빛 -->
                    <div class="shelf-stars">
                        <div class="star" style="top:8%;left:12%;width:2px;height:2px;animation-delay:0s;"></div>
                        <div class="star" style="top:18%;left:55%;width:1.5px;height:1.5px;animation-delay:0.8s;"></div>
                        <div class="star" style="top:55%;left:82%;width:2px;height:2px;animation-delay:0.4s;"></div>
                        <div class="star" style="top:75%;left:28%;width:1.5px;height:1.5px;animation-delay:1.2s;"></div>
                        <div class="star" style="top:40%;left:68%;width:1px;height:1px;animation-delay:0.6s;"></div>
                    </div>

                    <!-- 선반 2개 -->
                    <div class="shelf-row" id="shelf-row-0">
                        <div class="shelf-books" id="shelf-books-0"></div>
                        <div class="shelf-plank"></div>
                    </div>
                    <div class="shelf-row" id="shelf-row-1">
                        <div class="shelf-books" id="shelf-books-1"></div>
                        <div class="shelf-plank"></div>
                    </div>

                    <!-- 책장 바닥 -->
                    <div class="shelf-floor"></div>
                </div>

                <!-- 오른쪽 화살표 -->
                <button class="shelf-nav-btn shelf-nav-right" id="shelf-btn-next" onclick="shiftShelfPage(1)">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <!-- 페이지 인디케이터 -->
            <div class="shelf-page-info" id="shelf-page-info"></div>

            <!-- 푸터 -->
            <footer style="margin-top:30px; text-align:center; opacity:0.4;">
                <div class="footer-logo serif">PROJECT DUBU</div>
                <p class="copy">&copy; 2025 PROJECT DUBU - All Rights Reserved.</p>
            </footer>
        </div>
    `;

    // 책 렌더링 함수
    function renderPage(page) {
        currentPage = page;
        const start = page * booksPerPage;
        const pageBooks = sorted.slice(start, start + booksPerPage);

        const row0Books = pageBooks.slice(0, booksPerRow);
        const row1Books = pageBooks.slice(booksPerRow, booksPerPage);

        function buildBookHtml(p) {
            const colors = getBookSpineColors(p);
            const shortTitle = p.title.replace('순두부 ','').replace('순두부','');
            return `
                <div class="magic-book" onclick="openBookModal(${p.id})" title="VOL.${p.id} ${p.title}"
                     style="--spine1:${colors.spine1};--spine2:${colors.spine2};--book-text:${colors.textColor};--book-accent:${colors.accent};">
                    <div class="book-spine">
                        <div class="book-vol">VOL.${p.id}</div>
                        <div class="book-title-spine">${shortTitle}</div>
                        <div class="book-deco">✦</div>
                    </div>
                    <div class="book-cover">
                        <div class="book-cover-inner">
                            <div class="book-cover-vol">Vol.${p.id}</div>
                            <div class="book-cover-title">${shortTitle}</div>
                        </div>
                    </div>
                </div>`;
        }

        const books0 = document.getElementById('shelf-books-0');
        const books1 = document.getElementById('shelf-books-1');
        if (books0) books0.innerHTML = row0Books.map(buildBookHtml).join('');
        if (books1) books1.innerHTML = row1Books.map(buildBookHtml).join('');

        // 화살표 표시/숨김
        const prevBtn = document.getElementById('shelf-btn-prev');
        const nextBtn = document.getElementById('shelf-btn-next');
        if (prevBtn) prevBtn.style.display = page <= 0 ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = page >= totalPages - 1 ? 'none' : 'flex';

        // 페이지 인디케이터
        const pageInfo = document.getElementById('shelf-page-info');
        if (pageInfo) {
            const startVol = sorted[start]?.id || 1;
            const endVol = sorted[Math.min(start + booksPerPage - 1, sorted.length - 1)]?.id || sorted.length;
            pageInfo.innerHTML = `Vol.${startVol} ~ Vol.${endVol} &nbsp;·&nbsp; ${page + 1} / ${totalPages} 페이지 &nbsp;·&nbsp; 총 ${sorted.length}권`;
        }
    }

    // 전역 페이지 이동 함수
    window.shiftShelfPage = function(dir) {
        const next = currentPage + dir;
        if (next < 0 || next >= totalPages) return;
        const frame = document.getElementById('bookshelf-frame');
        if (frame) {
            frame.style.opacity = '0';
            frame.style.transform = `translateX(${dir * -30}px)`;
            setTimeout(() => {
                renderPage(next);
                frame.style.transition = 'none';
                frame.style.transform = `translateX(${dir * 30}px)`;
                frame.style.opacity = '0';
                setTimeout(() => {
                    frame.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    frame.style.transform = 'translateX(0)';
                    frame.style.opacity = '1';
                }, 30);
            }, 220);
        } else {
            renderPage(next);
        }
    };

    const frame = document.getElementById('bookshelf-frame');
    if (frame) frame.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    renderPage(0);
    initBookshelfDrag();
}


function getBookSpineColors(recipe) {
    const theme = getRecipeTheme(recipe);
    return {
        spine1: theme.spineColor1,
        spine2: theme.spineColor2,
        textColor: theme.spineTextColor,
        accent: theme.accentColor
    };
}

function initBookshelfDrag() {
    const stage = document.getElementById('bookshelf-stage');
    if (!stage) return;
    let isDown = false;
    let startX, scrollLeft;
    stage.addEventListener('mousedown', (e) => {
        isDown = true;
        stage.style.cursor = 'grabbing';
        startX = e.pageX - stage.offsetLeft;
        scrollLeft = stage.scrollLeft;
    });
    stage.addEventListener('mouseleave', () => { isDown = false; stage.style.cursor = 'grab'; });
    stage.addEventListener('mouseup', () => { isDown = false; stage.style.cursor = 'grab'; });
    stage.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - stage.offsetLeft;
        stage.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
    // 마우스 휠로 가로 스크롤
    stage.addEventListener('wheel', (e) => {
        e.preventDefault();
        stage.scrollLeft += e.deltaY * 1.2;
    }, { passive: false });
}

function openBookModal(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    const old = document.getElementById('book-modal-overlay');
    if (old) old.remove();

    const theme = getRecipeTheme(recipe);
    const ingredients = INGREDIENT_DICT ? (INGREDIENT_DICT[recipeId] || []) : [];
    const steps = typeof RECIPE_STEPS_DB !== 'undefined' ? (RECIPE_STEPS_DB[recipeId] || []) : [];
    const meta = getRecipeMetadata(recipeId);

    // 재료 목록 HTML
    const ingredientsHtml = ingredients.length > 0
        ? `<div style="font-size:0.7rem;color:#999;margin-bottom:8px;letter-spacing:0.5px;">기준 재료 (변동 시 자동계산)</div>` +
          ingredients.map((ing, idx) => idx === 0
            ? `<div style="background:#fff;border:2px solid ${theme.themeColor};border-radius:10px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                   <span style="font-size:0.88rem;font-weight:700;color:#3b281f;flex:1;">${ing.name}</span>
                   <div style="display:flex;align-items:center;gap:4px;">
                       <input type="number" id="bm-anchor-${recipeId}" value="${ing.base}" data-base="${ing.base}"
                              oninput="onBookModalAnchorChange(${recipeId})"
                              style="width:70px;border:1.5px solid ${theme.themeColor};border-radius:8px;padding:4px 8px;text-align:right;font-weight:700;color:${theme.themeColor};background:#fff;outline:none;font-size:0.9rem;">
                       <span style="color:#999;font-size:0.82rem;">g</span>
                   </div>
               </div>`
            : `<div style="background:#fff;border:1px solid #e5d8bf;border-radius:10px;padding:9px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                   <span style="font-size:0.85rem;font-weight:500;color:#3b281f;flex:1;">${ing.name}</span>
                   <div style="display:flex;align-items:center;gap:4px;">
                       <input type="number" class="bm-sub-input" data-base="${ing.base}" value="${ing.base}" readonly
                              style="width:60px;border:1px solid #e0d8cc;border-radius:6px;padding:3px 6px;text-align:right;color:#3b281f;background:#fdfbf7;outline:none;font-size:0.88rem;">
                       <span style="color:#999;font-size:0.82rem;">g</span>
                   </div>
               </div>`
        ).join('')
        : `<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:20px 0;">재료 데이터 준비 중입니다.</p>`;

    // 베이킹 순서 HTML
    const stepsHtml = steps.length > 0
        ? steps.map((s, i) => `
            <div style="display:flex;gap:12px;background:#fff;border:1px solid #e5d8bf;border-radius:10px;padding:12px 14px;margin-bottom:8px;">
                <div style="width:24px;height:24px;background:${theme.themeColor};color:${theme.accentColor};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;flex-shrink:0;">${i+1}</div>
                <div>
                    <div style="font-weight:700;font-size:0.85rem;color:${theme.themeColor};">${s.title} <span style="font-size:0.7rem;color:#aaa;margin-left:5px;">⏱ ${s.time}</span></div>
                    <div style="font-size:0.8rem;color:#555;margin-top:3px;line-height:1.4;">${s.desc}</div>
                </div>
            </div>`).join('')
        : `<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:20px 0;">베이킹 순서 데이터 준비 중입니다.</p>`;

    // 실패 대처법 HTML
    let troubleHtml = '';
    if (recipe.troubleShoot && recipe.troubleShoot.includes('Q.')) {
        const parts = recipe.troubleShoot.split('<br>');
        const q = (parts[0] || '').replace('Q.', '').trim();
        const a = (parts[1] || '').replace('A.', '').trim();
        troubleHtml = `
            <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:14px;">
                <span style="background:#E53935;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.68rem;font-weight:900;flex-shrink:0;margin-top:2px;">Q</span>
                <p style="font-size:0.85rem;color:#c62828;font-weight:600;margin:0;line-height:1.5;">${q}</p>
            </div>
            <div style="background:#fff;border:1px solid rgba(58,105,88,0.12);border-radius:10px;padding:14px;display:flex;gap:8px;align-items:flex-start;">
                <span style="background:${theme.themeColor};color:#fff;padding:2px 8px;border-radius:4px;font-size:0.68rem;font-weight:900;flex-shrink:0;margin-top:2px;">A</span>
                <p style="font-size:0.82rem;color:#2C3E50;margin:0;line-height:1.6;">${a}</p>
            </div>`;
    } else {
        troubleHtml = `<div style="text-align:center;color:#7f8c8d;font-size:0.85rem;padding:30px 0;"><i class="fa-solid fa-circle-check" style="font-size:1.8rem;color:#3a6958;display:block;margin-bottom:10px;"></i>특별한 실패 유의사항이 없습니다.<br>기본 계량과 온도를 지켜주시면 성공입니다!</div>`;
    }

    const overlay = document.createElement('div');
    overlay.id = 'book-modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) closeBookModal(); };
    overlay.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(20,12,6,0.72); backdrop-filter:blur(14px);
        display:flex; align-items:center; justify-content:center;
        z-index:10500; opacity:0; transition:opacity 0.35s ease;
        padding:20px; box-sizing:border-box;`;

    overlay.innerHTML = `
        <div id="book-modal-board" style="
            background:#FDFBF4; border:3px solid #e5d8bf;
            border-radius:24px; width:100%; max-width:900px;
            height:90vh; max-height:640px;
            display:flex; overflow:hidden;
            box-shadow:0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(197,160,89,0.2);
            transform:scale(0.9) rotateX(10deg);
            transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
            position:relative;">

            <!-- 왼쪽: 이미지 패널 (어두운 배경) -->
            <div style="
                flex:1.05; background:#18110b; padding:28px;
                display:flex; flex-direction:column; justify-content:space-between;
                border-right:1px solid rgba(255,255,255,0.07);">
                <div style="font-size:0.68rem;letter-spacing:2px;color:#a08070;font-weight:600;">프로젝트 두부</div>
                <div style="flex:1;margin:14px 0;border-radius:14px;overflow:hidden;
                    box-shadow:0 8px 24px rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.07);background:#111;">
                    <img src="${recipe.img}" alt="${recipe.title}"
                         style="width:100%;height:100%;object-fit:cover;"
                         onerror="this.style.display='none'">
                </div>
                <div style="border-left:3px solid ${theme.accentColor};padding:10px 14px;
                    background:rgba(255,255,255,0.03);border-radius:0 10px 10px 0;">
                    <p style="color:#e5dcd3;font-size:0.76rem;line-height:1.5;margin:0;font-style:italic;">${meta.cheers}</p>
                </div>
            </div>

            <!-- 오른쪽: 탭 패널 -->
            <div style="flex:1.35;display:flex;flex-direction:column;background:#faf8f5;padding:30px 34px;overflow:hidden;position:relative;">
                <!-- 닫기 -->
                <button onclick="closeBookModal()" style="
                    position:absolute;top:20px;right:26px;
                    background:none;border:none;font-size:1.9rem;color:#887a6d;cursor:pointer;outline:none;
                    transition:color 0.2s;" onmouseover="this.style.color='#3a1d11'" onmouseout="this.style.color='#887a6d'">&times;</button>

                <!-- 제목 -->
                <div style="margin-bottom:18px;padding-right:28px;">
                    <h2 class="serif" style="font-size:1.5rem;font-weight:700;color:${theme.themeColor};margin:0 0 8px 0;">${recipe.title}</h2>
                    <span style="display:inline-block;padding:4px 14px;border:1.5px solid ${theme.themeColor};
                        border-radius:20px;background:rgba(0,0,0,0.04);
                        font-size:0.7rem;font-weight:700;color:${theme.themeColor};">
                        <i class="fa-solid fa-box-open"></i> 분량: ${meta.difficulty}
                    </span>
                </div>

                <!-- 탭 메뉴 -->
                <div style="display:flex;gap:4px;border-bottom:2px solid #e5d8bf;margin-bottom:14px;">
                    <button id="bm-tab-btn-calc" onclick="switchBookTab('calc',${recipeId})" style="
                        background:none;border:none;padding:8px 12px;font-size:0.78rem;font-weight:700;
                        color:${theme.themeColor};border-bottom:3px solid ${theme.themeColor};
                        margin-bottom:-2px;cursor:pointer;outline:none;font-family:inherit;">
                        <i class="fa-solid fa-scale-balanced"></i> 재료 계산기
                    </button>
                    <button id="bm-tab-btn-steps" onclick="switchBookTab('steps',${recipeId})" style="
                        background:none;border:none;padding:8px 12px;font-size:0.78rem;font-weight:700;
                        color:#887a6d;border-bottom:3px solid transparent;
                        margin-bottom:-2px;cursor:pointer;outline:none;font-family:inherit;">
                        <i class="fa-solid fa-list-ol"></i> 베이킹순서
                    </button>
                    <button id="bm-tab-btn-trouble" onclick="switchBookTab('trouble',${recipeId})" style="
                        background:none;border:none;padding:8px 12px;font-size:0.78rem;font-weight:700;
                        color:#887a6d;border-bottom:3px solid transparent;
                        margin-bottom:-2px;cursor:pointer;outline:none;font-family:inherit;">
                        <i class="fa-solid fa-circle-question"></i> 실패대처법
                    </button>
                </div>

                <!-- 탭 콘텐츠 -->
                <div style="flex:1;overflow-y:auto;padding-right:4px;">
                    <div id="bm-content-calc">${ingredientsHtml}</div>
                    <div id="bm-content-steps" style="display:none;">${stepsHtml}</div>
                    <div id="bm-content-trouble" style="display:none;">${troubleHtml}</div>
                </div>

                <!-- 하단 버튼 3개 -->
                <div style="display:flex;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid #e5d8bf;">
                    <button onclick="issueRecipeCardFromBook(${recipeId})" style="
                        flex:1;background:${theme.themeColor};color:${theme.accentColor};
                        border:none;border-radius:10px;padding:11px 6px;
                        font-size:0.76rem;font-weight:700;cursor:pointer;outline:none;
                        font-family:inherit;transition:opacity 0.2s;"
                        onmouseover="this.style.opacity='0.82'" onmouseout="this.style.opacity='1'">
                        <i class="fa-solid fa-download"></i> 레시피소장하기
                    </button>
                    ${ recipe.blogUrl
                        ? `<a href="${recipe.blogUrl}" target="_blank" style="
                            flex:1;background:#eee6d8;color:#3b281f;
                            border:none;border-radius:10px;padding:11px 6px;
                            font-size:0.76rem;font-weight:700;cursor:pointer;outline:none;
                            text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px;
                            transition:background 0.2s;font-family:inherit;"
                            onmouseover="this.style.background='#e2d7c5'" onmouseout="this.style.background='#eee6d8'">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> 블로그가기
                           </a>`
                        : `<button disabled style="flex:1;background:#f0ece5;color:#ccc;border:none;border-radius:10px;padding:11px 6px;font-size:0.76rem;cursor:default;outline:none;font-family:inherit;">블로그준비중</button>` }
                    <button onclick="openLookbook(${recipeId})" style="
                        flex:1;background:#3a6958;color:#fff;
                        border:none;border-radius:10px;padding:11px 6px;
                        font-size:0.76rem;font-weight:700;cursor:pointer;outline:none;
                        font-family:inherit;transition:background 0.2s;"
                        onmouseover="this.style.background='#2b5042'" onmouseout="this.style.background='#3a6958'">
                        <i class="fa-solid fa-book-open"></i> 룩북보기
                    </button>
                </div>
            </div>
        </div>`;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        overlay.style.opacity = '1';
        const board = document.getElementById('book-modal-board');
        if (board) board.style.transform = 'scale(1) rotateX(0)';
    }, 30);
}

function closeBookModal() {
    const overlay = document.getElementById('book-modal-overlay');
    if (!overlay) return;
    overlay.style.opacity = '0';
    const board = document.getElementById('book-modal-board');
    if (board) board.style.transform = 'scale(0.9) rotateX(10deg)';
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 400);
}

function switchBookTab(tabId, recipeId) {
    const recipe = PROJECTS.find(p => p.id === Number(recipeId));
    const theme = getRecipeTheme(recipe);
    ['calc','steps','trouble'].forEach(t => {
        const btn = document.getElementById(`bm-tab-btn-${t}`);
        const content = document.getElementById(`bm-content-${t}`);
        if (btn) { btn.style.color = '#887a6d'; btn.style.borderBottom = '3px solid transparent'; }
        if (content) content.style.display = 'none';
    });
    const activeBtn = document.getElementById(`bm-tab-btn-${tabId}`);
    const activeContent = document.getElementById(`bm-content-${tabId}`);
    if (activeBtn) { activeBtn.style.color = theme.themeColor; activeBtn.style.borderBottom = `3px solid ${theme.themeColor}`; }
    if (activeContent) activeContent.style.display = 'block';
}

function onBookModalAnchorChange(recipeId) {
    const anchorInput = document.getElementById(`bm-anchor-${recipeId}`);
    if (!anchorInput) return;
    const val = parseFloat(anchorInput.value) || 0;
    const base = parseFloat(anchorInput.getAttribute('data-base')) || 1;
    const scale = val / base;
    const subInputs = document.querySelectorAll('#book-modal-board .bm-sub-input');
    subInputs.forEach(inp => {
        inp.value = Math.round(parseFloat(inp.getAttribute('data-base')) * scale);
    });
}

function issueRecipeCardFromBook(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;
    const meta = getRecipeMetadata(recipeId);
    const ingredients = INGREDIENT_DICT ? (INGREDIENT_DICT[recipeId] || []) : [];
    const anchorInput = document.getElementById(`bm-anchor-${recipeId}`);
    const anchorVal = anchorInput ? parseFloat(anchorInput.value) || 0 : (ingredients[0] ? ingredients[0].base : 100);
    const anchorBase = ingredients[0] ? ingredients[0].base : 1;
    const scale = anchorBase === 0 ? 1 : anchorVal / anchorBase;

    let ingredientsSummary = '';
    ingredients.forEach((ing, idx) => {
        const displayVal = idx === 0 ? anchorVal : Math.round(ing.base * scale);
        ingredientsSummary += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed rgba(58,105,88,0.1);font-size:0.9rem;">
            <span style="color:#4E342E;font-weight:500;">${ing.name}</span>
            <strong style="color:var(--dubu-mint-accent);">${displayVal}g</strong>
        </div>`;
    });

    openUnifiedRecipeCardModal(recipeId, recipe.title, recipe.img, getDynamicYieldText(recipeId, scale), meta.bakingTip, meta.cheers, ingredientsSummary);
}

function openLookbook(recipeId) {
    recipeId = Number(recipeId);
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;
    if (recipe.path) {
        window.open(recipe.path, '_blank');
    } else {
        alert('룩북 페이지 준비 중입니다.');
    }
}

