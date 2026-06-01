






































    
    slides[heroSlideIndex].classList.add('active');
}

// 4.5珥?二쇨린濡?硫붿씤 猷⑸턿 ?붾낫瑜?援먯감 ?섏씠?쒖씤?⑸땲??
setInterval(rotateHeroSlide, 4500);

// ==========================================================================
// 3. Atelier Focus Stage (紐곗엯??3D 怨꾩궛湲?諛?3? 媛먯꽦 ??
// ==========================================================================
// 吏?ν삎 ?뚮쭏 ?앹꽦湲? ?덉떆?쇱쓽 ID, 移댄뀒怨좊━, 寃쎈줈, ?쒕ぉ??遺꾩꽍?섏뿬 ?ㅼ콈濡쒖슫 ?쒖쫵/?뚮쭏蹂?媛二??쒖? 諛?梨낅벑 ?됱긽??諛섑솚?⑸땲??
function getRecipeTheme(recipe) {
    if (!recipe) {
        return {
            themeColor: '#3a1d11', // 媛二??쒖? 湲곕낯??(???ㅽ떛 釉뚮씪??
            themeGlow: 'rgba(197, 160, 89, 0.15)',
            accentColor: '#c5a059',
            spineColor1: '#251109', // 梨낅벑 ?멸낸 洹몃씪?붿뼵??1
            spineColor2: '#3a1d11', // 梨낅벑 媛二?硫붿씤 2
            spineTextColor: '#ebd090'
        };
    }

    const id = Number(recipe.id);
    const path = recipe.path || '';
    const categories = recipe.categories || [];
    const title = recipe.title || '';

    // 1. ?щ━?ㅻ쭏??/ ?깊깂??(Christmas / Winter Wonderland)
    const isChristmas = 
        path.includes('?깊깂??) || 
        path.includes('?щ━?ㅻ쭏??) || 
        title.includes('?덊넧??) || 
        title.includes('遺?щ뱶?몄뿕') || 
        title.includes('釉붾옓?щ젅?ㅽ듃') || 
        title.includes('?덇퐙') || 
        [20, 21, 22, 23, 24, 25, 26].includes(id);

    if (isChristmas) {
        // ?щ━?ㅻ쭏???뚮쭏: ?щ젅?ㅽ듃 洹몃┛(???몃━ 珥덈줉) 媛二??쒖?濡??⑥씪 ?듭씪?섏뿬 ?ㅼ븻留ㅻ꼫 ?쇱튂
        return {
            themeColor: '#0e4a27',
            themeGlow: 'rgba(15, 74, 41, 0.35)',
            accentColor: '#e5a93b', // 怨좉툒?ㅻ윭????怨⑤뱶 ?낆꽱??            spineColor1: '#072513',
            spineColor2: '#0e4a27',
            spineTextColor: '#ffd79e'
        };
    }

    // 2. ?좊줈??(Halloween / Midnight Spooky)
    const isHalloween = 
        path.includes('?좊줈??) || 
        title.includes('?⑦샇諛?) || 
        [4, 15, 18, 9].includes(id);

    if (isHalloween) {
        // ?좊줈???뚮쭏: 誘몃뱶?섏엲 ?쇳뵆(?ㅽ뫖??蹂대씪) 媛二??쒖?濡??⑥씪 ?듭씪?섏뿬 ?ㅼ븻留ㅻ꼫 ?쇱튂
        return {
            themeColor: '#4d1d59',
            themeGlow: 'rgba(141, 45, 171, 0.35)',
            accentColor: '#ffd700', // ??怨⑤뱶 ?낆꽱??            spineColor1: '#2c0e35',
            spineColor2: '#4d1d59',
            spineTextColor: '#eed5ff'
        };
    }

    // 3. 諛쒕젋??몃뜲??/ ?붿씠?몃뜲??/ 濡쒕㎤???뚮쭏 (Romantic Valentine / Hearts)
    const isRomantic = 
        path.includes('諛쒕젋???) || 
        path.includes('?붿씠?몃뜲??) || 
        title.includes('諛뷀겕珥덉퐳由?) || 
        title.includes('珥덉퐫耳??) || 
        title.includes('珥덉퐫留덈뱾??) || 
        [37, 30, 31, 32].includes(id);

    if (isRomantic) {
        if (id === 37 || id === 30) {
            // ?щ툝由?踰꾧굔???λ? ?뚮쭏
            return {
                themeColor: '#6c1524',
                themeGlow: 'rgba(197, 43, 71, 0.22)',
                accentColor: '#fcc2cd',
                spineColor1: '#3d0a13',
                spineColor2: '#6c1524',
                spineTextColor: '#ffe6eb'
            };
        } else {
            // 濡쒕㎤??濡쒖쫰 釉뚮씪???묓겕 ?뚮쭏
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

    // 4. ?ㅻ궇-異붿꽍 / 紐낆젅 / ?꾪넻 媛먯꽦 ?뚮쭏 (Traditional / Nostalgia)
    const isTraditional = 
        path.includes('紐낆젅') || 
        path.includes('?섎뒫') || 
        title.includes('?묒엫??) || 
        title.includes('??) || 
        title.includes('?⑦뙠') || 
        title.includes('紐⑥컡') || 
        categories.includes('nostalgia') || 
        [39, 38, 17, 16, 33, 8, 35, 12, 11].includes(id);

    if (isTraditional) {
        if (title.includes('??) || categories.includes('soymilk')) {
            // 洹몄쑞????留먯감 ?щ젅?ㅽ듃 媛二??뚮쭏
            return {
                themeColor: '#2b3d2b',
                themeGlow: 'rgba(85, 125, 85, 0.2)',
                accentColor: '#d6cba0',
                spineColor1: '#172417',
                spineColor2: '#2b3d2b',
                spineTextColor: '#e5debf'
            };
        } else {
            // ?ㅽ떛 ?ㅼ빱 ?⑺넗??媛???⑦뭾 媛二??뚮쭏
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

    // 5. 移댄뀒怨좊━蹂??ㅼ콈濡쒖슫 ?뚮쭏??    // creamy (遺?쒕윭??誘쇳듃 怨꾩뿴)
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
    // cloud (??떊???섎뒛???뚯뒪???먮몢 怨꾩뿴)
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
    // fudgy (臾듭쭅??珥덉퐳由?吏꾪쓾 怨꾩뿴)
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
    // teatime (濡쒖뿴 怨⑤뱺 ?먮줈??怨꾩뿴)
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

    // 6. 湲곕낯 ?뚮쭏 (?ㅽ떛 釉뚮씪??
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

    // 怨듯넻 ?뚮쭏 ?앹꽦湲??몄텧濡??쒖쫵 諛??뚮쭏蹂?媛二??쒖? ?됱긽 ?띾뱷
    const theme = getRecipeTheme(recipe);

    // 留덈쾿梨??뚮쭏 ?대옒???곸떆 ?곸슜 諛?媛二??쒖? ?됱긽 ?숈쟻 留ㅽ븨
    const board = overlay.querySelector('.atelier-focus-board');
    if (board) {
        board.classList.add('magic-book-theme');
        if (theme) {
            board.style.setProperty('--magic-book-color', theme.themeColor);
            board.style.setProperty('--magic-book-glow', theme.themeGlow);
            board.style.setProperty('--magic-book-accent', theme.accentColor);
        } else {
            // ?대갚 ?뷀뤃??怨좏뭾?ㅻ윭???ㅽ떛 釉뚮씪???뚮쭏
            board.style.setProperty('--magic-book-color', '#3a1d11');
            board.style.setProperty('--magic-book-glow', 'rgba(197, 160, 89, 0.15)');
            board.style.setProperty('--magic-book-accent', '#c5a059');
        }
    }

    // 紐⑤떖????????긽 泥?踰덉㎏ ?щ즺 怨꾩궛湲???쑝濡?由ъ뀑
    switchFocusTab('calc');

    // 1. ?붾낫 ?대?吏 ?명똿
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // ?뚮쭏 ?곕룞 ?ㅽ??쇰쭅 (?뱁댆 ?붾낫 ?곗텧 ?④낵)
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

    // 2. 媛?대뱶 ?곗씠??諛붿씤??    let difficulty = "蹂댄넻 ?윞";
    let bakingTip = "?ㅻ툙 ?덉뿴 170??/ 25遺?;
    let cheers = "?ㅻ뒛 ???먮걹?쇰줈 鍮싲뒗 嫄닿컯???먮? 踰좎씠?? ?ㅻ젅???쒖옉?낅땲?? ??;
    let isYield = false;
    
    if (recipe.id === 40) {
        difficulty = "?ㅻ???? 3媛?遺꾨웾 ?뜛";
        bakingTip = "180째C ?덉뿴 ??170째C / 40遺?(肄⑸Ъ 留덈Т由?+ ?섎（ ?숈꽦 沅뚯옣)";
        cheers = "?ㅼ쓬 ?좎씠 吏꾩쭨?낅땲?? ?섎（ ?숈꽦 ??癒밸뒗 洹?珥됱큺?④낵 怨좎냼?⑥? ?덉떆?쇱쓽 吏꾩쭨 ?쇨뎬?댁뿉?? ?截?;
        isYield = true;
    } else if (recipe.id === 39) {
        difficulty = "?ㅻ???? ? 1媛?遺꾨웾 ?뜛";
        bakingTip = "以묓깢 ?덉뿴 150??/ 140??60遺?(??10遺?";
        cheers = "?쒕몢遺 臾쇨린瑜?吏쒖? ?딄퀬 洹몃?濡??ъ슜?섏뿬, 珥됱큺?④낵 袁몃뜒?⑥씠 洹밸??붾릺???밸퀎???덉떆?쇱엯?덈떎. ?뼡";
        isYield = true;
    } else if (recipe.id === 38) {
        difficulty = "蹂댄넻 ?윞";
        bakingTip = "?ㅻ툙 ?덉뿴 180??/ 160??30~35遺?;
        cheers = "?κ툔???κ낵 李곌린媛 留뚮뱺 ?쒓뎅??已?앺븿! 遺紐⑤떂 ?좊Ъ??遺?숈쓽 1???덉떆?쇰엻?덈떎. ?뙼";
    } else if (recipe.id === 37) {
        difficulty = "?ъ? ?윟";
        bakingTip = "?ㅻ툙 ?덉뿴 165??/ 25遺?;
        cheers = "????諛⑹슱???섎텇???덉슜?섏? ?딅뒗 ?섎텇 諛뺣㈇ 鍮꾨쾿?쇰줈 ?꾩꽦?섎뒗 洹밴컯??諛붿궘?? ?뮑";
    } else if (recipe.id === 36) {
        difficulty = "?ъ? ?윟";
        bakingTip = "?됱옣???됯컖 / 4?쒓컙";
        cheers = "?щⅤ瑜??ш렇?쇱????먮? ?щ┝??洹뱀긽 遺?쒕윭?! 而듭뿉 ?뚮났???댁쑝硫??붿슧 湲곗겑?덈떎. ?뜮";
    } else if (recipe.id === 35) {
        difficulty = "?대젮? ?뵶";
        bakingTip = "?ㅻ툙 ?덉뿴 180??/ 160??50~55遺?;
        cheers = "紐낆젅??湲고뭹???쒓퍘 ?믪뿬二쇰뒗 援녹? ?딅뒗 鍮꾨쾿 紐⑥컡?≪??댄겕, ?뺤꽦?쇰줈 ?꾩꽦??蹂댁븘?? ?㎣";
    } else if (recipe.id === 17) {
        difficulty = "?ъ? ?윟";
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
                        <span>?꾨줈?앺듃 ?먮? 怨듭떇 梨꾨꼸 媛湲???/span>
                    </a>
                </div>
            `;
        }
    }

    // 3. ?щ즺 紐⑸줉 ?명똿 (泥?踰덉㎏ ?щ즺?????쒕몢遺 ?묒쑝濡??섏씠?쇱씠??
    const ingredients = INGREDIENT_DICT[recipeId] || [
        { name: "?쒕몢遺 踰좎씠??, base: 100 },
        { name: "諛뺣젰遺?/ ?泥대텇", base: 100 },
        { name: "?좉린???ㅽ깢", base: 50 }
    ];

    const anchorIngredient = ingredients[0];
    document.getElementById('focus-anchor-label').innerText = anchorIngredient.name;
    
    const anchorInput = document.getElementById('focus-anchor-input');
    anchorInput.value = anchorIngredient.base;
    anchorInput.setAttribute('data-base', anchorIngredient.base);

    // ?쒕몢遺 ?듭빱 泥댄겕諛뺤뒪 珥덇린??    const anchorParent = document.querySelector('.primary-anchor-box');
    if (anchorParent) {
        anchorParent.classList.remove('checked-row');
        const circle = anchorParent.querySelector('.ing-check-circle');
        if (circle) circle.classList.remove('checked');
    }

    // ?섎㉧吏 ?щ즺??由ъ뒪?명솕
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

"    // 4. ?숈쟻 ?쒖꽌 ??꾨씪??鍮뚮뱶\n    const stepsList = RECIPE_STEPS_DB[recipeId] || DEFAULT_RECIPE_STEPS;\n    const timelineContainer = document.getElementById('focus-steps-timeline');\n    if (timelineContainer) {\n        timelineContainer.innerHTML = stepsList.map((step, idx) => {\n            return `\n                <div class=\"timeline-step-item\" data-step-idx=\"${idx}\" onclick=\"highlightTimelineStep(this); toggleTimelineStepComplete(this, ${stepsList.length});\">\n                    <div class=\"timeline-step-badge\">\n                        <span class=\"step-num-text\">${idx + 1}</span>\n                        <i class=\"fa-solid fa-check step-check-icon\" style=\"display: none;\"></i>\n                    </div>\n                    <div class=\"timeline-step-content\">\n                        <div class=\"step-header-row\" style=\"display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 6px;\">\n                            <h4 class=\"timeline-step-title\">${step.title}</h4>\n                            <span class=\"step-time-pill\" style=\"font-size: 0.8rem; font-weight: 700; color: var(--magic-book-color); background: rgba(58,105,88,0.08); padding: 4px 10px; border-radius: 12px;\"><i class=\"fa-regular fa-clock\"></i> ${step.time}</span>\n                        </div>\n                        <p class=\"timeline-step-desc\" style=\"font-size: 0.85rem; color: #5D6D7E; line-height: 1.5; margin: 0; word-break: keep-all;\">${step.desc}</p>\n                    </div>\n                </div>\n            `;\n        }).join('');\n    }"
    // ???곹깭 諛?吏꾪뻾瑜?寃뚯씠吏 由ъ뀑
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. ?덉떆???ㅼ슫濡쒕뱶 & 釉붾줈洹?& 猷⑸턿 踰꾪듉 ?대깽??諛붿씤??    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, difficulty, bakingTip, cheers);
    };
    
    // 釉붾줈洹?踰꾪듉: ?덉떆??blogUrl ?곕룞
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
    
    // 猷⑸턿 踰꾪듉: ?덉떆??path ?곕룞
    const lookbookBtn = document.getElementById('focus-btn-lookbook');
    if (lookbookBtn) {
        const id = Number(recipe.id);
        const isChristmas = [20, 21, 22, 23, 24, 25, 26].includes(id);
        const isHalloween = [4, 9, 15, 18].includes(id);
        
        if (recipe.path || isChristmas || isHalloween) {
            // 踰꾪듉 ?쒖꽦???ㅽ???蹂듭썝
            lookbookBtn.style.opacity = '1';
            lookbookBtn.style.pointerEvents = 'auto';
            lookbookBtn.onclick = () => { closeFocusStage(); };
            
            // ?щ━?ㅻ쭏??諛??좊줈???덉떆?쇱뿉 ????댁쟾??留뚮뱾????猷⑸턿(?ㅽ럹???붾낫遺? ?붾㈃?쇰줈 ?곕룞
            if (isChristmas) {
                // Vol 踰덊샇??id + 1 留ㅽ븨
                lookbookBtn.href = `../[?대깽?? ?깊깂???ㅽ럹???붾낫遺?index.html#vol${id + 1}`;
            } else if (isHalloween) {
                if (id === 4) lookbookBtn.href = `../[?대깽?? ?좊줈???ㅽ럹???붾낫遺?index.html#vol4`;
                else if (id === 9) lookbookBtn.href = `../[?대깽?? ?좊줈???ㅽ럹???붾낫遺?index.html`; // 9踰?釉뚮씪?곕땲荑좏궎
                else if (id === 15) lookbookBtn.href = `../[?대깽?? ?좊줈???ㅽ럹???붾낫遺?index.html#vol16`;
                else if (id === 18) lookbookBtn.href = `../[?대깽?? ?좊줈???ㅽ럹???붾낫遺?index.html#vol19`;
            } else {
                lookbookBtn.href = recipe.path;
            }
        } else {
            // 猷⑸턿 寃쎈줈媛 ?꾨씫??寃쎌슦 鍮꾪솢?깊솕
            lookbookBtn.href = '#';
            lookbookBtn.style.opacity = '0.45';
            lookbookBtn.style.pointerEvents = 'none';
        }
    }

    // 6. ?ㅻ쾭?덉씠 ?쒖꽦??    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 7. ?щ즺媛 ?ㅽ겕濡??놁씠 紐⑤몢 ?쒕늿??蹂댁씪 ?뚯쓽 ?먯뿰?ㅻ윭???믪씠瑜?痢≪젙?섏뿬 醫뚯슦 移대뱶 ?믪씠瑜??숈씪?섍쾶 怨좎젙
    const leftCard = document.querySelector('.focus-stage-left');
    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 湲곗〈 ?몃씪???믪씠 珥덇린??        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // ?뚮뜑留곸씠 ?꾨즺?????믪씠瑜??뺥솗??痢≪젙?섍린 ?꾪빐 吏㏃? ??꾩븘???ㅽ뻾
        setTimeout(() => {
            if (window.innerWidth > 900) { // ?곗뒪?ы넲 紐⑤뱶?먯꽌留??믪씠 ?숈씪???곸슜
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
        textEl.innerText = `0 / ${totalSteps} ?④퀎 ?꾨즺 (0%)`;
        barEl.style.width = '0%';
    }
}

function updateTimelineProgress(timelineContainer, totalSteps) {
    const completedCount = timelineContainer.querySelectorAll('.timeline-step-item.completed').length;
    const percent = Math.round((completedCount / totalSteps) * 100);
    
    const textEl = document.getElementById('focus-progress-text');
    const barEl = document.getElementById('focus-progress-bar');
    if (textEl && barEl) {
        textEl.innerText = `${completedCount} / ${totalSteps} ?④퀎 ?꾨즺 (${percent}%)`;
        barEl.style.width = `${percent}%`;
    }
}

function closeFocusStage() {
    const overlay = document.getElementById('atelier-focus-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // 留덈쾿梨??뚮쭏 ?대옒???쒓굅 諛?由ъ뀑
        const board = overlay.querySelector('.atelier-focus-board');
        if (board) {
            board.classList.remove('magic-book-theme');
        }
    }
}

// ==========================================================================
// 4. ??퉬濡 & ?ㅼ쨷 ?듭빱 ?묐갑??鍮꾨? ?곗궛 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "?ㅻ???? {x}媛?遺꾨웾 ?뜛", baseCount: 3 },
    39: { template: "?ㅻ???? {x}媛?遺꾨웾 ?뜛", baseCount: 1 },






































































































function renderArchive(projects) {
    const container = document.getElementById('bookshelf-3d');
    if (!container) return;
    
    // 留덈쾿??媛뺤젣 ?リ린
    closeMagicBook();

    // 蹂쇰ⅷ(ID) ?쒖꽌?濡??ㅻ쫫李⑥닚 ?뺣젹?섏뿬 梨낆옣???쇱そ?먯꽌 ?ㅻⅨ履쎌쑝濡??먮Ⅴ?꾨줉 ?뺣룉
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">寃??寃곌낵??留욌뒗 ?덉떆?쇨? ?놁뒿?덈떎.</div>`;
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
    
    // 留덈쾿??媛뺤젣 ?リ린
    closeMagicBook();

    // 蹂쇰ⅷ(ID) ?쒖꽌?濡??ㅻ쫫李⑥닚 ?뺣젹?섏뿬 梨낆옣???쇱そ?먯꽌 ?ㅻⅨ履쎌쑝濡??먮Ⅴ?꾨줉 ?뺣룉
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">寃??寃곌낵??留욌뒗 ?덉떆?쇨? ?놁뒿?덈떎.</div>`;
        return;
    }
    
    // 梨낆씠 ?섏뼱?섎룄 ?쒓?媛 ?몃줈濡?湲몄뼱吏吏 ?딄쾶 2媛?痢?2 Rows)?쇰줈 梨낆쓣 ?섎닏?덈떎.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 梨낅벑 ?뚮쭏 ??                37: "?쒕몢遺 ?붿씠??br>諛뷀겕珥덉퐳由?,
                36: "?쒕몢遺<br>?곕씪誘몄닔?몃뵫",
                35: "?쒕몢遺 紐⑥컡??br>耳?댄겕",
                34: "?쒕몢遺 ?쇨렇?덉씠<br>洹몃┃?ㅼ퐯",
                33: "?쒕몢遺 ?뱀감?붽굅??br>?뚯슫?쒖???,
                30: "?쒕몢遺<br>誘몃땲珥덉퐫耳??,
                28: "?쒕몢遺<br>?쒕굹紐щ·",
                26: "?쒕몢遺<br>?덇퐙而듭??댄겕",
                25: "?쒕몢遺 3醫낆???,
                24: "?쒕몢遺 珥덉퐫<br>踰덊듃耳??,
                23: "?쒕몢遺 ?덈が<br>踰덊듃耳??,
                22: "?쒕몢遺 釉붾옓?щ젅?ㅽ듃<br>而듭???,
                21: "?쒕몢遺<br>遺?щ뱶?몄뿕",
                20: "?쒕몢遺<br>?덊넧??,
                19: "?ы넠 ?쒕몢遺<br>?瑜댄듃",
                18: "?쒕몢遺 ?⑦샇諛?br>李뱀?鍮?,
                17: "?쒕몢遺 肄붿퐫??br>?⑦뙠援ъ?諛?,
                16: "?쒕몢遺 諛?br>?뚯슫?쒖??댄겕",
                15: "?쒕몢遺 ?⑦샇諛?br>諛붿뒪??移섏쫰耳?댄겕",
                12: "?쒕몢遺 ?щ┝移섏쫰<br>濡ㅼ???,
                11: "?쒕몢遺 移섏쫰?ㅼ퐯",
                10: "?쒕몢遺 ?덈が耳?댄겕",
                9: "?쒕몢遺<br>釉뚮씪?곕땲荑좏궎",
     











                22: "?쒕몢遺 釉붾옓?щ젅?ㅽ듃<br>而듭???,
                21: "?쒕몢遺<br>遺?щ뱶?몄뿕",
                20: "?쒕몢遺<br>?덊넧??,
                19: "?ы넠 ?쒕몢遺<br>?瑜댄듃",
                18: "?쒕몢遺 ?⑦샇諛?br>李뱀?鍮?,
                17: "?쒕몢遺 肄붿퐫??br>?⑦뙠援ъ?諛?,
                16: "?쒕몢遺 諛?br>?뚯슫?쒖??댄겕",
                15: "?쒕몢遺 ?⑦샇諛?br>諛붿뒪??移섏쫰耳?댄겕",
                12: "?쒕몢遺 ?щ┝移섏쫰<br>濡ㅼ???,
                11: "?쒕몢遺 移섏쫰?ㅼ퐯",
                10: "?쒕몢遺 ?덈が耳?댄겕",
                9: "?쒕몢遺<br>釉뚮씪?곕땲荑좏궎",
                8: "?쒕몢遺 李뱀?紐⑥컡<br>耳?댄겕",
                7: "?쒕몢遺 ?щ┝移섏쫰<br>荑좏궎",
                6: "?쇨렇?덉씠<br>?쒕몢遺 耳?댄겕",
                5: "?쒕몢遺 ?⑹튂利?br>?섎궘?쒖뿉",
                4: "?쒕몢遺<br>?쇱?釉뚮씪?곕땲",
                3: "?쒕몢遺 諛붿뒪??br>移섏쫰耳?댄겕",
                2: "?쒕몢遺 ?щ┝移섏쫰<br>?곕씪誘몄닔",
                1: "?쒕몢遺 ?щ┝移섏쫰"
            };

            // ??댄? 湲몄씠蹂??고듃 ?ㅽ???吏??諛?湲???댄? ??以?泥섎━
            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // ??以꾨줈 媛쒗뻾??寃쎌슦 ?고듃 媛꾧꺽怨??쇱씤?믪씠 ?뺣? ?명똿
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 怨좎젙???됰꼮??梨낅벑 ?먭퍡
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px ?믪씠???먯뿰?ㅻ윭???낆껜 蹂李?
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

    // ?곗씠?곌? 蹂寃쎈릺?덉쑝誘濡?媛濡??ㅽ겕濡?踰붿쐞 ?ш퀎??    setTimeout(() => {
        recalculateBookshelfBounds();
    }, 100);

    // ?명꽣?숈뀡 ?쒖뼱 ?붿쭊 援щ룞
    if (!bookshelfState.isEngineInitialized) {
        initBookshelfEngine();
    }
}

function recalculateBookshelfBounds() {
    const wrapper = document.querySelector('.bookshelf-wrapper');
    const row1 = document.getElementById('shelf-row-1');
    const row2 = document.getElementById('shelf-row-2');
    
    if (!wrapper) return;
    
    // ?꾩떆濡?under-flow瑜??쒓굅?섍퀬 ?먮옒??max-content ?덈퉬瑜??곗텧
    if (row1) row1.classList.remove('under-flow');
    if (row2) row2.classList.remove('under-flow');
    
    const wrapperWidth = wrapper.offsetWidth;
    const rowWidth = Math.max(
        row1 ? row1.scrollWidth : 0,
        row2 ? row2.scrollWidth : 0
    );
    
    if (rowWidth > wrapperWidth - 80) {
        // 梨낆옣??wrapper蹂대떎 湲????ㅽ겕濡?踰붿쐞 ?ㅼ젙
        bookshelfState.minX = wrapperWidth - rowWidth - 60; // ?쎄컙???⑤뵫 ?ㅽ봽??        if (row1) row1.style.width = 'max-content';







































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

    // 2. 遺꾨웾 ?뺣낫 ?섏쭛 (?? "遺꾨웾: ?ㅻ???? 3媛?遺꾨웾 ?벀")
    const yieldEl = document.getElementById('focus-recipe-difficulty');
    let yieldText = yieldEl ? yieldEl.innerText.trim() : '';
    if (yieldText.includes('?쒖씠??')) {
        yieldText = '';
    } else {
        yieldText = yieldText.replace('遺꾨웾:', '').trim();
    }
    
    // 3. 蹂듭궗???띿뒪???쒗뵆由?援ъ꽦
    let copyText = `[?꾨줈?앺듃 ?먮?] ${title} ?덉떆???뭽\n\n`;
    if (yieldText) {
        copyText += `??湲곗? 遺꾨웾: ${yieldText}\n`;
    }
    if (ingredientText) {
        copyText += `??留욎땄 怨꾨웾 ?щ즺:\n${ingredientText}\n`;












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
    
    // 1. ?꾩옱 ?붾㈃???쒖떆???щ즺 紐낆묶怨?怨꾩궛??怨꾨웾媛??섏쭛
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

    // 2. 遺꾨웾 ?뺣낫 ?섏쭛 (?? "遺꾨웾: ?ㅻ???? 3媛?遺꾨웾 ?벀")
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
                alert(`?뭽 [?덉떆??諛?留욎땄 怨꾨웾 蹂듭궗 ?꾨즺]\n\n"${title}" ?덉떆??留곹겕? ?꾩옱 ?붾㈃??留욎땄 怨꾩궛 怨꾨웾媛믪씠 ?대┰蹂대뱶???덉쟾?섍쾶 蹂듭궗?섏뿀?듬땲??`);
            } else {
                alert(`??留곹겕 蹂듭궗 ?ㅽ뙣: 吏곸젒 釉뚮씪?곗? 二쇱냼李쎌쓽 留곹겕瑜?蹂듭궗??二쇱꽭??`);
            }
        } catch (e) {
            alert(`??留곹겕 蹂듭궗 ?ㅽ뙣: 吏곸젒 釉뚮씪?곗? 二쇱냼李쎌쓽 留곹겕瑜?蹂듭궗??二쇱꽭??`);
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
// 6. ?대옒???꾩뭅?대툕 寃???붿쭊 & ?먮젅?댁뀡 ?쇱??댁뒪
// ==========================================================================
// ==========================================================================
// 6. 3D 梨낃퐘??諛?留덈쾿 ?뚰솚??Magic Spellbook) ?붿쭊 (v25.0 - Harry Potter Theme)
// ==========================================================================
// ?꾩뿭 3D 梨낆옣 ?쒖뼱 ?곹깭 媛앹껜
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
    
    // 留덈쾿??媛뺤젣 ?リ린
    closeMagicBook();

    // 蹂쇰ⅷ(ID) ?쒖꽌?濡??ㅻ쫫李⑥닚 ?뺣젹?섏뿬 梨낆옣???쇱そ?먯꽌 ?ㅻⅨ履쎌쑝濡??먮Ⅴ?꾨줉 ?뺣룉
    projects.sort((a, b) => a.id - b.id);

    if (projects.length === 0) {
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">寃??寃곌낵??留욌뒗 ?덉떆?쇨? ?놁뒿?덈떎.</div>`;
        return;
    }
    
    // 梨낆씠 ?섏뼱?섎룄 ?쒓?媛 ?몃줈濡?湲몄뼱吏吏 ?딄쾶 2媛?痢?2 Rows)?쇰줈 梨낆쓣 ?섎닏?덈떎.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 怨듯넻 ?뚮쭏 ?앹꽦湲??몄텧濡??쒖쫵 諛??뚮쭏蹂?梨낅벑 ?됱긽 ?명듃 ?띾뱷
            const theme = 










            const magicSymbol = magicSymbols[seed % magicSymbols.length];

            // 媛??붿??몃퀎 ?섎? ?⑥쐞(?⑥뼱 寃쎄퀎)瑜??좎??섎뒗 ?섎룞 以꾨컮轅?留ㅽ븨 ?ъ쟾
            const SPINE_TITLE_MAP = {
                40: "?쒕몢遺 肄⑸Ъ<br>?뚯슫?쒖???,
                39: "?쒕몢遺<br>?묒엫???뚮┛",
                38: "?쒕몢遺 ??br>李곕뼞釉뚮씪?곕땲",
                37: "?쒕몢遺 ?붿씠??br>諛뷀겕珥덉퐳由?,
                36: "?쒕몢遺<br>?곕씪誘몄닔?몃뵫",
                35: "?쒕몢遺 紐⑥컡??br>耳?댄겕",
                34: "?쒕몢遺 ?쇨렇?덉씠<br>洹몃┃?ㅼ퐯",
                33: "?쒕몢遺 ?뱀감?붽굅??br>?뚯슫?쒖???,
                30: "?쒕몢遺<br>誘몃땲珥덉퐫耳??,
                28: "?쒕몢遺<br>?쒕굹紐щ·",
                26: "?쒕몢遺<br>?덇퐙而듭??댄겕",
                25: "?쒕몢遺 3醫낆???,
                24: "?쒕몢遺 珥덉퐫<br>踰덊듃耳??,
                23: "?쒕몢遺 ?덈が<br>踰덊듃耳??,
                22: "?쒕몢遺 釉붾옓?щ젅?ㅽ듃<br>而듭???,
                21: "?쒕몢遺<br>遺?щ뱶?몄뿕",
                20: "?쒕몢遺<br>?덊넧??,
                19: "?ы넠 ?쒕몢遺<br>?瑜댄듃",
                18: "?쒕몢遺 ?⑦샇諛?br>李뱀?鍮?,
                17: "?쒕몢遺 肄붿퐫??br>?⑦뙠援ъ?諛?,
                16: "?쒕몢遺 諛?br>?뚯슫?쒖??댄겕",
                15: "?쒕몢遺 ?⑦샇諛?br>諛붿뒪??移섏쫰耳?댄겕",
                12: "?쒕몢遺 ?щ┝移섏쫰<br>濡ㅼ???,
                11: "?쒕몢遺 移섏쫰?ㅼ퐯",
                10: "?쒕몢遺 ?덈が耳?댄겕",
                9: "?쒕몢遺<br>釉뚮씪?곕땲荑좏궎",
                8: "?쒕몢遺 李뱀?紐⑥컡<br>耳?댄겕",
                7: "?쒕몢遺 ?щ┝移섏쫰<br>荑좏궎",
                6: "?쇨렇?덉씠<br>?쒕몢遺 耳?댄겕",
                5: "?쒕몢遺 ?⑹튂利?br>?섎궘?쒖뿉",
                4: "?쒕몢遺<br>?쇱?釉뚮씪?곕땲",
                3: "?쒕몢遺 諛붿뒪??br>移섏쫰耳?댄겕",
                2: "?쒕몢遺 ?щ┝移섏쫰<br>?곕씪誘몄닔",
                1: "?쒕몢遺 ?щ┝移섏쫰"
            };

            // ??댄? 湲몄씠蹂??고듃 ?ㅽ???吏??諛?湲???댄? ??以?泥섎━
            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // ??以꾨줈 媛쒗뻾??寃쎌슦 ?고듃 媛꾧꺽怨??쇱씤?믪씠 ?뺣? ?명똿
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 怨좎젙???됰꼮??



























    container.innerHTML = html;

    // ??섏닔 蹂꾨튆 ???뚰떚???숈쟻 ?앹꽦
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';

        const numStars = Math.floor(Math.random() * 20) + 40; // 40~60媛???섏닔 蹂꾨튆
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

    // ?곗씠?곌? 蹂寃쎈릺?덉쑝誘濡?媛濡??ㅽ겕濡?踰붿쐞 ?ш퀎??    setTimeout(() => {
        recalculateBookshelfBounds();
    }, 100);

    // ?명꽣?숈뀡 ?쒖뼱 ?붿쭊 援щ룞
    if (!bookshelfState.isEngineInitialized) {
        initBookshelfEngine();
    }
}

function recalculateBookshelfBounds() {
    const wrapper = document.querySelector('.bookshelf-wrapper');




































































































    const handleDragEnd = () => {
        if (!bookshelfState.isDragging) return;
        bookshelfState.isDragging = false;
        
        // 理쒖쥌?곸쑝濡??뺥빐吏??ㅽ겕濡?踰붿쐞瑜?踰쀬뼱?섏? ?딅룄濡?蹂듭썝
        bookshelfState.targetX = Math.max(bookshelfState.minX, Math.min(bookshelfState.targetX, bookshelfState.maxX));
    };

    // 留덉슦???대깽??諛붿씤??    wrapper.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // ?곗튂 ?대깽??諛붿씤??(紐⑤컮?????
    wrapper.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    window.addEventListener('touchend', handleDragEnd);

    // 2. 留덉슦?????ㅽ겕濡??깅줉 (?좎쓣 援대┫ ??媛濡??ㅽ겕濡ㅻ줈 留ㅻ걚?쎄쾶 ?몄엯)
    wrapper.addEventListener('wheel', (e) => {
        // 釉뚮씪?곗? 湲곕낯 ?몃줈 ?ㅽ겕濡?諛⑹?
        e.preventDefault();
        
        const delta = e.deltaY || e.deltaX;
        let newX = bookshelfState.targetX - delta * 1.5; // ???띾룄 媛먮룄 議곗젅
        
        // 踰붿쐞瑜?踰쀬뼱?섏? ?딄쾶 clamping
        bookshelfState.targetX = Math.max(bookshelfState.minX, Math.min(newX, bookshelfState.maxX));
    }, { passive: false });

    // 3. ?ㅼ떆媛?3D ?꾩튂 ?ъ궗 ?뚮뜑 猷⑦봽
    const update3D = () => {
        // ?ㅻТ??蹂닿컙(Lerp): ?꾩옱 ?꾩튂瑜??寃??꾩튂濡?10%??留ㅼ튂?쒗궡 (愿???④낵)
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

    // 紐⑤떖????????긽 泥?踰덉㎏ ?щ즺 怨꾩궛湲???쑝濡?由ъ뀑
    switchFocusTab('calc');

    // 1. ?붾낫 ?대?吏 ?명똿
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // ?뚮쭏 ?곕룞 ?ㅽ??쇰쭅 (?뱁댆 ?붾낫 ?곗텧 ?④낵)
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

    // 2. 媛?대뱶 ?곗씠??諛붿씤??





    
    // 由ъ궗?댁쫰 ??踰붿쐞瑜??ㅼ떆 ?ъ젙??    window.addEventListener('resize', recalculateBookshelfBounds);

    bookshelfState.isEngineInitialized = true;
}

function openMagicBook(event, id) {
    if (event) {
        event.stopPropagation();
    }
    
    const viewport = document.querySelector('.magic-book-viewport');
    const overlay = document.getElementById('magic-book-overlay');
    if (!viewport || !overlay) return;

    // ?곗씠?곕쿋?댁뒪?먯꽌 ?대떦 ?꾨줈?앺듃 寃??    const p = PROJECTS.find(item => item.id === id);
    if (!p) return;

    // ?대?吏 ?대갚 泥섎━
    const bookImg = p.img ? p.img : 'assets/default_dubu.jpg';
    const emotionalQuote = p.emotionalQuote ? p.emotionalQuote : "?ㅻ뒛 ???먮걹?쇰줈 鍮싲뒗 嫄닿컯???먮? 踰좎씠?? ?ㅻ젅???쒖옉?낅땲?? ??;
    const troubleTip = p.troubleShoot ? p.troubleShoot : "Q. 援쎄린 ?꾨즺 ?쒖젏? ?대뼸寃??꾨굹??<br>A. ?댁뫀?쒓컻濡??뺤쨷?숈쓣 李붾?????諛섏＝??臾살뼱?섏? ?딆쑝硫??띻퉴吏 ?꾩쟾??珥됱큺????援ъ썙吏??곹깭?낅땲?? ?삂";

    // ?대떦 ?덉떆?쇱쓽 ?щ즺 由ъ뒪??濡쒕뱶
    let ingredients = [...(INGREDIENT_DICT[p.id] || [
        { name: "?쒕몢遺 踰좎씠??, base: 100 },
        { name: "?꾨が??媛猷?, base: 80 },
        { name: "?좉린????










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
                    ?뫅?랅윂?異붿쿇 留덉뒪?곗쓽 媛먯꽦 鍮꾨? ??                </div>
                <div style="font-size: 0.82rem; color: #4E342E; margin: 0; line-height: 1.6; word-break: keep-all; font-weight: 500; background: rgba(58, 105, 88, 0.03); padding: 12px 14px; border-radius: 8px; border: 1px dashed rgba(58, 105, 88, 0.15); display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                <a href="${matchedCreator.url}" target="_blank" style="color: #D32F2F; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-brands fa-youtube" style="color: #FF0000; font-size: 0.8rem;"></i> [${matchedCreator.videoTitle}] 媛뺤쥖 蹂닿린 ??                </a>
            </div>
        `;
    } else {
        chefTipHtml = `
            <div style="font-weight: 800; font-size: 0.92rem; color: #8c6426; margin-bottom: 8px;">?뫅?랅윂?湲濡쒕쾶 鍮꾧굔 ?고봽 媛?대뱶</div>
            <div style="font-size: 0.84rem; color: #4e342e; margin: 0; line-height: 1.65; word-break: keep-all; font-weight: 500; background: rgba(140, 100, 38, 0.03); padding: 12px 14px; border-radius: 6px; border: 1px dashed rgba(140, 100, 38, 0.15); display: flex; flex-direction: column; gap: 6px;">
                <span style="font-style: italic;">"?쒕몢遺瑜?鍮꾧굔 ?붿??몄뿉 ?곸슜???뚮뒗 誘뱀꽌湲곕줈 30珥??댁긽 怨좎냽?쇰줈 ?꾩쟾??媛덉븘??遺?쒕읇寃??좏솕?쒗궎硫? 踰꾪꽣???곗쑀 ?놁씠??由ъ튂???щ┝ ?띿뒪泥섎? 援ы쁽?????덉뒿?덈떎."</span>
                <a href="https://blog.naver.com/project_dubu" target="_blank" style="color: #8c6426; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem; align-self: flex-end;">
                    <i class="fa-solid fa-cookie-bite" style="font-size: 0.75rem;"></i> ?꾨줈?앺듃 ?먮? 怨듭떇 梨꾨꼸 媛湲???                </a>
            </div>
        `;
    }

    const troubleHtml = `
        <div style="font-size: 0.85rem; line-height: 1.7; word-break: keep-all; display: flex; flex-direction: column; gap: 15px;">
            <div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #D32F2F; margin-bottom: 8px;">?좑툘 Q&A ?몃윭釉붿뒋??/div>
                <div style="background: rgba(211, 47, 47, 0.03); border: 1px solid rgba(211, 47, 47, 0.1); padding: 12px 14px; border-radius: 6px; color: #5c4135; font-weight: 500;">
                    ${troubleTip}
                </div>
            </div>
            <div>
                ${chefTipHtml}
            </div>
        </div>
    `;

    // ?섎떒 ?대룞 踰꾪듉援?3媛??명듃 ?뺤쓽
    const downloadBtn = `<button class="btn-magic-action download" onclick="issueRecipeCardFromMagicBook(${p.id}, '${p.title.replace(/'/g, "\\'")}', '${p.img}')"><i class="fa-solid fa-download"></i> ?덉떆??移대뱶濡??뚯옣?섍린</button>`;
    
    const blogBtn = p.blogUrl
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank"><i class="fa-solid fa-book-open"></i> 釉붾줈洹?媛湲??뱰</a>`
        : `<button class="btn-magic-action blog" onclick="alert('怨듭떇 釉붾줈洹?媛?대뱶媛 以鍮?以묒엯?덈떎.')">媛?대뱶 以鍮?以??뵏</button>`;
        
    const lookbookBtn = `<a href="${p.path}" class="btn-magic-action look

    // 3D 留덈쾿???숈쟻 留덊겕???앹꽦
    viewport.innerHTML = `
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 媛二?梨??쒖? (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 鍮덊떚吏 ?묓븘吏 ?띿? (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 醫뚯륫 ?섏씠吏: ?붾낫 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title" style="font-family:'Noto Serif KR', serif; font-size: 0.8rem; color: #3A6958; font-weight:700; letter-spacing: 2px; margin-bottom: 12px; text-align: left;">?꾨줈?앺듃 ?먮?</div>
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

    // 4. ?숈쟻 ?쒖꽌 ??꾨씪??鍮뚮뱶
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

    // ???곹깭 諛?吏꾪뻾瑜?寃뚯씠吏 由ъ뀑
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. ?덉떆???ㅼ슫濡쒕뱶 & 釉붾줈洹?& 猷⑸턿 踰꾪듉 ?대깽??諛붿씤??    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromF


































    const leftCard = document.querySelector('.focus-stage-left');
    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 湲곗〈 ?몃씪???믪씠 珥덇린??        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // ?뚮뜑留곸씠 ?꾨즺?????믪씠瑜??뺥솗??痢≪젙?섍린 ?꾪빐 吏㏃? ??꾩븘???ㅽ뻾
        setTimeout(() => {
            spellbook.classList.add('summoned');
        }
    }, 50);
    // 2?④퀎: 梨??쇱튂湲?    setTimeout(() => {
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
        if (viewport) viewport.innerHTML = ''; // 由ъ냼???뺣━
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
        textEl.innerText = `${completedCount} / ${totalSteps} ?④퀎 ?꾨즺 (${percent}%)`;
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
// 4. ??퉬濡 & ?ㅼ쨷 ?듭빱 ?묐갑??鍮꾨? ?곗궛 (Atelier Scale)
// ==========================================================================
const BASE_YIELDS = {
    40: { template: "?ㅻ???? {x}媛?遺꾨웾 ?뜛", baseCount: 3 },
    39: { template: "?ㅻ???? {x}媛?遺꾨웾 ?뜛", baseCount: 1 },
    38: { template: "李곕뼞釉뚮씪?곕땲 {x}??遺꾨웾 ?뙼", baseCount: 1 },
    37: { template: "?붿씠??諛뷀겕珥덉퐳由?{x}??遺꾨웾 ?뜪", baseCount: 1 },
    36: { template: "?곕씪誘몄닔 {x}而?遺꾨웾 ?뜮", baseCount: 2 },
    35: { template: "紐⑥컡??耳?댄겕 {x}??1媛?遺꾨웾 ?럟", baseCount: 1 },
    17: { template: "肄붿퐫???⑦뙠援ъ?諛?{x}媛?遺꾨웾 ?ⅴ", baseCount: 4 }










































































































































































                            <h4 class="serif back-title">${p.title}</h4>
                            <p class="back-subtitle">?대뼡 ?レ옄瑜?諛붽씀??鍮꾨? 怨꾩궛?⑸땲??/p>
                        </div>
                        
                        <div class="calculator-inputs-area">
                            ${ingredientsInputHtml}
                        </div>
                        
                        <div class="practical-guide-board">
                            <div class="guide-pills-row">
                                <span class="guide-pill difficulty">
                                    ${isYield ? `<i class="fa-solid fa-box-open"></i> 遺꾨웾: ${difficulty}` : `<i class="fa-solid fa-gauge-simple-high"></i> ?쒖씠?? ${difficulty}`}
                                </span>
                                <span class="guide-pill temperature"><i class="fa-solid fa-temperature-half"></i> ${bakingTip}</span>
                            </div>
                            <p class="guide-cheers">"${cheers}"</p>
                        </div>
                        
                        <div class="card-back-action-bar">
                            <button class="btn-issue-card" onclick="issueRecipeCard(${p.id}, '${p.title.replace(/'/g, "\\'")}', '${p.img}')">
                                <i class="fa-solid fa-receipt"></i> ?덉떆??諛쒗뻾 ?뱞




    }
}

// ==========================================================================
// 14. Sensory Accordion Artbook - ???꾩씠蹂대━ 罹붾쾭???숈쟻 ?뚮뜑留??붿쭊
// ==========================================================================
// ==========================================================================
// 14. Sensory Accordion Artbook - ???꾩씠蹂대━ 罹붾쾭???숈쟻 ?뚮뜑留??붿쭊
// ==========================================================================
function renderAccordionArtbook() {
    const container = document.getElementById('accordion-showroom-container');
    if (!container) return;

    const activeRecipes = [
        {
            id: 36,
            title: "?쒕몢遺 ?곕씪誘몄닔?몃뵫",
            img: "31. ?쒕몢遺 ?곕씪誘몄닔?몃뵫_??0.jpg",
            creatorsNote: "?쒕몢遺? 留덉뒪移댄룷???щ┝??而ㅽ뵾 ?ㅻ━ ?먮툕瑜??덉씠?대줈 ?볦븘 ?됱옣 援논엺 ?몄삤釉??곕씪誘몄닔 ?몃뵫.",
            pairingGuide: "?쒕굹紐?媛猷⑤? ?붿넄 ?щ┛ 肄쒕뱶釉뚮（ 而ㅽ뵾? 怨곷뱾??蹂댁꽭??",
            themeColor: "#826359",
            themeGlow: "rgba(130, 99, 89, 0.15)",
            accentColor: "#FFCCBC"
        },
        {
            id: 37,
            title: "?쒕몢遺 ?붿씠?몃컮?ъ큹肄쒕┸",
            img: "36. ?쒕몢遺?붿씠?몃컮?ъ큹肄쒕┸_??1.jpg",
            creatorsNote: "?쒕몢遺 ?쒗듃 ?꾩뿉 ?뱀씤 ?붿씠??而ㅻ쾭異곕? 遺???쇱뒪?移섏삤? ?ㅽ봽留곹겢濡??μ떇??援논엳??諛뷀겕 珥덉퐳由?",
            pairingGuide: "?곕쑜?섍쾶 ?곕젮???띿감??媛踰쇱슫 ?붿?????멸낵 理쒓퀬濡????댁슱由쎈땲??",
            themeColor: "#C25D7E",
            themeGlow: "rgba(194, 93, 126, 0.15)",
            accentColor: "#F48FB1"
        },
        {
            id: 38,
            title: "?쒕몢遺 ??李곕뼞釉뚮씪?곕땲",
            img: "39. ?쒕몢遺 ??李곕뼞釉뚮씪?곕땲_??assets/7.jpg",
            creatorsNote: "?쒕몢遺? 援?궛 李몄뫁媛猷⑤? ?욎뼱 已?앺븳 ?앷컧?쇰줈 援ъ슫 釉뚮씪?곕땲. ?됱옣 ?숈꽦?섎㈃ ?붿슧 已?앺빀?덈떎.",
            pairingGuide: "?곕쑜???좉린???곕”李⑤굹 ?먯쑀? ?섏긽?곸씤 ?섏뼱留곸쓣 ?먮옉?⑸땲??",
            themeColor: "#4E6B56",
            creatorsNote: "?쒕몢遺? ?묒엫???섏씠?ㅽ듃, ?붿씠??而ㅻ쾭異곕? 諛고빀?섏뿬 ?ㅻ툙 以묓깢?쇰줈 援ъ슫 ?뚮┛.",
            pairingGuide: "?됱떥由꾪븳 留먯감 ?쇰뼹???쒕┰ 而ㅽ뵾? ?④퍡 怨곷뱾?대㈃ 留쏆쓽 源딆씠媛 洹밸??붾맗?덈떎.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
        },
        {
            id: 40,
            title: "?쒕몢遺 肄⑸Ъ ?뚯슫?쒖???,
            img: "41. ?쒕몢遺肄⑸Ъ ?뚯슫?쒖??????쒕몢遺 肄⑸Ъ ?뚯슫?쒖???(0).jpg",
            creatorsNote: "?쒕몢遺? 肄⑸Ъ???④퍡 怨깃쾶 媛덉븘 怨좎냼?섍퀬 珥됱큺?섍쾶 ?꾩꽦???곕튃 ?뚯슫?쒖??듭엯?덈떎.",
            pairingGuide: "肄⑸Ъ?쇰뼹 ?먮뒗 ?곕쑜???⑹감? 遺?쒕윭???섏뼱留곸쓣 ?먮옉?⑸땲??",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8",
            isNew: true
        },
        {
            id: 'coming-soon',
            title: "Vol.41 Coming Soon",
            img: "",
            creatorsNote: "?ㅼ쓬 而щ젆?섏씠 怨?怨듦컻?⑸땲??",
            pairingGuide: "?덈줈??留쏆쓽 議고솕? 鍮꾨쾿??湲곕???二쇱꽭??",
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
        40: { texture: "怨좎냼?섍퀬 珥됱큺??, wellness: "吏꾪븳 肄⑸Ъ, ?섎（ ?숈꽦 鍮꾨쾿", method: "170???ㅻ툙 援ъ?" },
        39: { texture: "袁몃뜒??, wellness: "No諛媛猷? No踰꾪꽣", method: "140???ㅻ툙 以묓깢" },
        38: { texture: "已?앺븿", wellness: "No踰꾪꽣, 鍮꾧굔 吏??, method: "160???ㅻ툙 援ъ?" },
        37: { texture: "諛붿궘?섍퀬 ?ъ숴??, wellness: "No踰꾪꽣, 蹂띠? ?쒕몢遺", method: "165???ㅻ툙 援ъ?" },
        36: { texture: "遺?쒕읇怨?珥됱큺??, wellness: "No?ㅻ툙, ?뚮０濡쒖뒪 ?泥?媛??, method: "No?ㅻ툙 ?됱옣 援논엳湲? }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 而ㅻ컢?? : p.title.replace("?쒕몢遺 ", "").trim();
        const specs = specsData[p.id] || { texture: "???", wellness: "???", method: "???" };

        const bgStyle = p.isComingSoon 
            ? `background: linear-gradient(135deg, #1A1C1E 0%, #0D0E10 100%); display: flex; align-items: center; justify-content: center; flex-direction: column;` 
            : `background-image: url('${p.img}');`;

        const comingSoonOverlay = p.isComingSoon 
            ? `<div class="coming-soon-glowing-core" sty









        const metaText = p.isComingSoon ? "RECIPE FILE // COMING SOON" : `RECIPE FILE // Vol.${p.id}`;
        const actionBtnText = p.isComingSoon ? `怨듦컻 ?덉젙 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `?곸꽭蹂닿린 <i class="fa-solid fa-chevron-right"></i>`;

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
            alert(`?뵏 Vol.${vol} ?덉떆?쇰뒗 ?낅뜲?댄듃 ?덉젙?낅땲??\n\n?꾨줈?앺듃 ?먮????덈줈??而щ젆???뚯떇??湲곕???二쇱꽭?? ?뼡`);
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
                    <button class="film-strip-go-btn" aria-label="?대깽???닿린">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// ?렗 [?좎꽕] 洹뱀옣???명꽣?숉떚釉?媛ㅻ윭由??좊땲硫붿씠???붿쭊 (Cinematic Engine)
// ==========================================================================
let cinematicCanvas = null;
let cinematicCtx = null;
let cinematicAnimId = null;
let currentThemeId = '';
let mousePos = { x: 0, y: 0 };
let particles = [];
let transitionProgress = 0;
let isTransitioning = false;

// ?뚰떚???대옒???뺤쓽
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
            title: "?쒕몢遺 ?곕씪誘몄닔?몃뵫",
            img: "31. ?쒕몢遺 ?곕씪誘몄닔?몃뵫_??0.jpg",
            creatorsNote: "?쒕몢遺? 留덉뒪移댄룷???щ┝??而ㅽ뵾 ?ㅻ━ ?먮툕瑜??덉씠?대줈 ?볦븘 ?됱옣 援논엺 ?몄삤釉??곕씪誘몄닔 ?몃뵫.",
            pairingGuide: "?쒕굹紐?媛猷⑤? ?붿넄 ?щ┛ 肄쒕뱶釉뚮（ 而ㅽ뵾? 怨곷뱾??蹂댁꽭??",
            themeColor: "#826359",
            themeGlow: "rgba(130, 99, 89, 0.15)",
            accentColor: "#FFCCBC"
        },
        {
            id: 37,
            title: "?쒕몢遺 ?붿씠?몃컮?ъ큹肄쒕┸",
            img: "36. ?쒕몢遺?붿씠?몃컮?ъ큹肄쒕┸_??1.jpg",
            creatorsNote: "?쒕몢遺 ?쒗듃 ?꾩뿉 ?뱀씤 ?붿씠??而ㅻ쾭異곕? 遺???쇱뒪?移섏삤? ?ㅽ봽留곹겢濡??μ떇??援논엳??諛뷀겕 珥덉퐳由?",
            pairingGuide: "?곕쑜?섍쾶 ?곕젮???띿감??媛踰쇱슫 ?붿?????멸낵 理쒓퀬濡????댁슱由쎈땲??",
            themeColor: "#C25D7E",
            themeGlow: "rgba(194, 93, 126, 0.15)",
            accentColor: "#F48FB1"
        },
        {
            id: 38,
            title: "??






































    
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
        const actionBtnText = p.isComingSoon ? `怨듦컻 ?덉젙 <i class="fa-solid fa-lock" style="margin-left: 5px;"></i>` : `?곸꽭蹂닿린 <i class="fa-solid fa-chevron-right"></i>`;

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
// 14. Sensory Accordion Artbook - ???꾩씠蹂대━ 罹붾쾭???숈쟻 ?뚮뜑留??붿쭊
// ==========================================================================
// ==========================================================================
// 14. Sensory Accordion Artbook - ???꾩씠蹂대━ 罹붾쾭???숈쟻 ?뚮뜑留??붿쭊
// ==========================================================================
function renderAccordionArtbook() {
    const container = document.getElementById('accordion-showroom-container');
    if (!container) return;

    const activeRecipes = [
        {
            id: 36,
            title: "?쒕몢遺 ?곕씪誘몄닔?몃뵫",
            img: "31. ?쒕몢遺 ?곕씪誘몄닔?몃뵫_??0.jpg",
            creatorsNote: "?쒕몢遺? 留덉뒪移댄룷???щ┝??而ㅽ뵾 ?ㅻ━ ?먮툕瑜??덉씠?대줈 ?볦븘 ?됱옣 援논엺 ?몄삤釉??곕씪誘몄닔 ?몃뵫.",
            pairingGuide: "?쒕굹紐?媛猷⑤? ?붿넄 ?щ┛ 肄쒕뱶釉뚮（ 而ㅽ뵾? 怨곷뱾??蹂댁꽭??",
            themeColor: "#826359",
            themeGlow: "rgba(130, 99, 89, 0.15)",
            accentColor: "#FFCCBC"
        },
        {
            id: 37,
            title: "?쒕몢遺 ?붿씠?몃컮?ъ큹肄쒕┸",
            img: "36. ?쒕몢遺?붿씠?몃컮?ъ큹肄쒕┸_??1.jpg",

            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSectionId = section.id;
            }
        });

        // ?덉쇅 耳?댁뒪 ?뺣? 蹂댁젙
        // 1. ?ㅽ겕濡ㅼ씠 留??꾩뿉 留ㅼ슦 媛源앸떎硫?臾댁“嫄?泥?踰덉㎏ ?뱀뀡(Home) ?쒖꽦??        if (window.scrollY < 80) {







            const vol = slice.getAttribute('data-vol') || '41';
            alert(`?뵏 Vol.${vol} ?덉떆?쇰뒗 ?낅뜲?댄듃 ?덉젙?낅땲??\n\n?꾨줈?앺듃 ?먮????덈줈??而щ젆???뚯떇??湲곕???二쇱꽭?? ?뼡`);
            return;
        }
            pairingGuide: "?됱떥由꾪븳 留먯감 ?쇰뼹???쒕┰ 而ㅽ뵾? ?④퍡 怨곷뱾?대㈃ 留쏆쓽 源딆씠媛 洹밸??붾맗?덈떎.",
            themeColor: "#4A4F54",
            themeGlow: "rgba(74, 79, 84, 0.15)",
            accentColor: "#78909C"
        },
        {
            id: 40,
            title: "?쒕몢遺 肄⑸Ъ ?뚯슫?쒖???,
            img: "41. ?쒕몢遺肄⑸Ъ ?뚯슫?쒖??????쒕몢遺 肄⑸Ъ ?뚯슫?쒖???(0).jpg",
            creatorsNote: "?쒕몢遺? 肄⑸Ъ???④퍡 怨깃쾶 媛덉븘 怨좎냼?섍퀬 珥됱큺?섍쾶 ?꾩꽦???곕튃 ?뚯슫?쒖??듭엯?덈떎.",
            pairingGuide: "肄⑸Ъ?쇰뼹 ?먮뒗 ?곕쑜???⑹감? 遺?쒕윭???섏뼱留곸쓣 ?먮옉?⑸땲??",
            themeColor: "#7B6F55",
            themeGlow: "rgba(123, 111, 85, 0.15)",
            accentColor: "#F5E6C8",
            isNew: true
        },
        {
            id: 'coming-soon',
            title: "Vol.41 Coming Soon",
            img: "",
            creatorsNote: "?ㅼ쓬 而щ젆?섏씠 怨?怨듦컻?⑸땲??",
            pairingGuide: "?덈줈??留쏆쓽 議고솕? 鍮꾨쾿??湲곕???二쇱꽭??",
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
        40: { texture: "怨좎냼?섍퀬 珥됱큺??, wellness: "吏꾪븳 肄⑸Ъ, ?섎（ ?숈꽦 鍮꾨쾿", method: "170???ㅻ툙 援ъ?" },
        39: { texture: "袁몃뜒??, wellness: "No諛媛猷? No踰꾪꽣", method: "140???ㅻ툙 以묓깢" },
        38: { texture: "已?앺븿", wellness: "No踰꾪꽣, 鍮꾧굔 吏??, method: "160???ㅻ툙 援ъ?" },
        37: { texture: "諛붿궘?섍퀬 ?ъ숴??, wellness: "No踰꾪꽣, 蹂띠? ?쒕몢遺", method: "165???ㅻ툙 援ъ?" },
        36: { texture: "遺?쒕읇怨?珥됱큺??, wellness: "No?ㅻ툙, ?뚮０濡쒖뒪 ?泥?媛??, method: "No?ㅻ툙 ?됱옣 援논엳湲? }
    };

    container.innerHTML = activeRecipes.map((p, idx) => {
        const shortTitle = p.isComingSoon ? `Vol.${comingSoonVol} 而ㅻ컢?? : p.title.replace("?쒕몢遺 ", "").trim();
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
            // 留덉슦??異⑸룎 ?④낵
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
"    }).join('');\n\n    // ?섏씠吏 濡쒕뱶 ??泥?踰덉㎏ ?щ씪?댁뒪(Vol.40)瑜?湲곕낯 ?쒖꽦???뺤옣) ?곹깭濡??명똿\n    setTimeout(() => {\n        const firstSlice = container.querySelector('.accordion-slice');\n        if (firstSlice) {\n            firstSlice.style.flex = '5.4';\n            firstSlice.classList.add('active-expanded');\n        }\n    }, 50);\n}\n\nfunction handleSliceClick(event, projectId) {\n    const slice = event.currentTarget;\n    const isButton = event.target.closest('.editorial-action-box') || event.target.closest('.action-btn');\n    const isHovered = window.getComputedStyle(slice).flexGrow >= 4;\n\n    if (isButton || isHovered) {\n        if (projectId === 'coming-soon') {\n            const vol = slice.getAttribute('data-vol') || '41';\n            alert(`?뵏 Vol.${vol} ?덉떆?쇰뒗 ?낅뜲?댄듃 ?덉젙?낅땲??\\n\\n?꾨줈?앺듃 ?먮????덈줈??而щ젆???뚯떇??湲곕???二쇱꽭?? ?뼡`);\n            return;\n        }\n        openFocusStage(projectId);\n    } else {\n        document.querySelectorAll('.accordion-slice').forEach(s => {\n            if (s !== slice) {\n                s.style.flex = '1';\n                s.classList.remove('active-expanded');\n            }\n        });\n        slice.style.flex = '5.4';\n        slice.classList.add('active-expanded');\n    }\n}"
// ==========================================================================
// 14-2. ?ш퀎?덉쓽 ?꾪?由ъ뿉 ?쒖쫵 ?밸퀎 ?대깽???뚮뜑留?// ==========================================================================
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
                    <button class="film-strip-go-btn" aria-label="?대깽???닿린">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// ?렗 [?좎꽕] 洹뱀옣???명꽣?숉떚釉?媛ㅻ윭由??좊땲硫붿씠???붿쭊 (Cinematic Engine)
// ==============================






let transitionProgress = 0;
let isTransitioning = false;

// ?뚰떚???대옒???뺤쓽
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
            // 留덉슦??異⑸룎 ?④낵
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

    // 3. ?뚰떚???낅뜲?댄듃 諛??쒕줈??    for (let i = particles.length - 1; i >= 0; i--) {
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
            // Melting Cream ?곗텧: ?꾩뿉???묓겕???щ┝???⑥씠釉뚮? 移섎ŉ ?섎윭?대젮 ?붾㈃????쓬
            cinematicCtx.fillStyle = '#FFCCD5';
            cinematicCtx.beginPath();
            cinematicCtx.moveTo(0, 0);
            cinematicCtx.lineTo(width, 0);
            
            // ?⑥씠釉??뺤긽
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
            // Bojagi Unfolding ?곗텧: 以묒븰?먯꽌 ?щ갑?쇰줈 寃뱀튇 蹂댁옄湲?議곌컖??諛뽰쑝濡??댁?硫??대┝
            cinematicCtx.fillStyle = '#E8DCC4';
            const progressHeight = (height / 2) * (1 - transitionProgress);
            const progressWidth = (width / 2) * (1 - transitionProgress);
            
            cinematicCtx.fillRect(0, 0, width, progressHeight); // Top
            cinematicCtx.fillRect(0, height - progressHeight, width, progressHeight); // Bottom
            cinematicCtx.fillRect(0, 0, progressWidth, height); // Left
            cinematicCtx.fillRect(width - progressWidth, 0, progressWidth, height); // Right
        } 
        else if (currentThemeId === 'halloween') {
            // 踰덉찉???뚮옒?????怨좉툒?ㅻ읇怨?遺?쒕윭???붿쟾(Fade-to-Black) ?곗텧
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
// 15. ?섏씠吏 濡쒕뱶 珥덇린??& LNB ?ㅽ겕濡??듭?踰?// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAccordionArtbook(); 
    renderSeasonalEvents();
    renderArchive(PROJECTS);
    // renderDashboard(); // 議댁옱?섏? ?딅뒗 怨쇨굅 ??쒕낫???뚮뜑???몄텧遺 ?쒓굅 (ReferenceError ?닿껐)
    initCursorAura(); 
    initTilt(); 
    createAtmosphericParticles(); 

    // Sidebar LNB Scroll Link Observer 湲곕룞 (ScrollSpy & Click Lock)
    const navLinks = document.querySelectorAll('.sidebar-lnb .nav-item');
    const sections = document.querySelectorAll('section[id]');
    let isManualScrolling = false;
    let manualScrollTimer = null;

    function updateActiveNavLink() {
        if (isManualScrolling) return; // 硫붾돱 ?대┃?쇰줈 ?ㅻТ???ㅽ겕濡??대룞 以?







        }
        currentThemeId = '';
        particles = [];
        document.body.style.overflow = '';
    }, 500);
}

// ==========================================================================
// 15. ?섏씠吏 濡쒕뱶 珥덇린??& LNB ?ㅽ겕濡??듭?踰?// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderAccordionArtbook(); 
    renderSeasonalEvents();
    renderArchive(PROJECTS);
    // renderDashboard(); // 議댁옱?섏? ?딅뒗 怨쇨굅 ??쒕낫???뚮뜑???몄텧遺 ?쒓굅 (ReferenceError ?닿껐)
    initCursorAura(); 
    initTilt(); 
    createAtmosphericParticles(); 

"    // Sidebar LNB Scroll Link Observer 湲곕룞 (ScrollSpy & Click Lock)\n    const navLinks = document.querySelectorAll('.top-sticky-header .nav-item');"
    let manualScrollTimer = null;

    function updateActiveNavLink() {
        if (isManualScrolling) return; // 硫붾돱 ?대┃?쇰줈 ?ㅻТ???ㅽ겕濡??대룞 以묒씪 ?뚮뒗 媛먯? ?쇱떆 ?뺤?

        let activeSectionId = 'sensory-artbook'; // 湲곕낯媛?(Home)
        const scrollPosition = window.scrollY + window.innerHeight / 3; // ?붾㈃??1/3 ?믪씠 湲곗???
        sections.for

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // ?ㅻТ???ㅽ겕濡ㅼ씠 ?앸굹???쒖젏(??800ms) ?꾩뿉 ?ㅽ겕濡?媛먯? ?좉툑 ?댁젣
            manualScrollTimer = setTimeout(() => {
                isManualScrolling = false;
                updateActiveNavLink();
            }, 800);
        if (window.scrollY < 80) {
            activeSectionId = 'sensory-artbook';
        }
        // 2. ?ㅽ겕濡ㅼ씠 留??꾨옒???꾨떖?덈떎硫?臾댁“嫄?留덉?留??뱀뀡(?ㅽ뙣?녿뒗 踰좎씠?밸끂?? ?쒖꽦??        const documentHeight = document.documentElement.scrollHeight;
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

    // 硫붾돱 ?대┃ ??利됱떆 active ?대옒?ㅻ? 遺?ы븯怨??ㅽ겕濡?媛먯?瑜??쇱떆 ?좉툑
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            isManualScrolling = true;
            if (manualScrollTimer) clearTimeout(manualScrollTimer);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // ?ㅻТ???ㅽ겕濡ㅼ씠 ?앸굹???쒖젏(??800ms) ?꾩뿉 ?ㅽ겕濡?媛먯? ?좉툑 ?댁젣
            manualScrollTimer = setTimeout(() => {
                isManualScrolling = false;
                updateActiveNavLink();
            }, 800);
        });
    });

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // ?섏씠吏 濡쒕뱶 ??利됱떆 珥덇린??});



















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function openFocusStage(recipeId) {
    const recipe = PROJECTS.find(p => p.id === recipeId);
    if (!recipe) return;

    activeFocusRecipeId = recipeId;
    const overlay = document.getElementById('atelier-focus-overlay');
    if (!overlay) return;

    // 紐⑤떖????????긽 泥?踰덉㎏ ?щ즺 怨꾩궛湲???쑝濡?由ъ뀑
    switchFocusTab('calc');

    // 1. ?붾낫 ?대?吏 ?명똿
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // ?뚮쭏 ?곕룞 ?ㅽ??쇰쭅 (?뱁댆 ?붾낫 ?곗텧 ?④낵)
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

    // 2. 媛?대뱶 ?곗씠??諛붿씤??
























































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
                    ?뫅?랅윂?異붿쿇 留덉뒪?곗쓽 媛먯꽦 鍮꾨? ??                </div>
                <div style="font-size: 0.82rem; color: #4E342E; margin: 0; line-height: 1.6; word-break: keep-all; font-weight: 500; background: rgba(58, 105, 88, 0.03); padding: 12px 14px; border-radius: 8px; border: 1px dashed rgba(58, 105, 88, 0.15); display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-style: italic;">"${matchedCreator.desc}"</span>
                    <a href="${matchedCreator.url}" target="_blank" style="color: #D32F2F; font-weight: 700; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.2s; align-self: flex-end; font-size: 0.74rem;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
                        <i class="fa-brands fa-youtube" style="color: #FF0000; font-size: 0.88rem;"></i> 
                        <span>[${matchedCreator.videoTitle}] 媛뺤쥖 蹂닿린 ??/span>
                    </a>
                </div>
            `;
        } else {
            proBox.innerHTML = `
                <div style="font-weight: 800; font-size: 0.88rem; color: var(--dubu-mint-accent); margin-bottom: 6px;">
                    ?뫅?랅윂?
































































































    const rightCard = document.querySelector('.focus-stage-right');
    if (leftCard && rightCard) {
        // 湲곗〈 ?몃씪???믪씠 珥덇린??        leftCard.style.height = '';
        rightCard.style.height = '';
        
        // ?뚮뜑留곸씠 ?꾨즺?????믪씠瑜??뺥솗??痢≪젙?섍린 ?꾪빐 吏㏃? ??꾩븘???ㅽ뻾
        setTimeout(() => {
            if (window.innerWidth > 900) { // ?곗뒪?ы넲 紐⑤뱶?먯꽌留??믪씠 ?숈씪???곸슜
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
            div.title = "?붾툝?대┃?섏뿬 ?ㅼ떆媛?怨꾩궛湲??닿린";
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
            alert(`?뵏 Vol.${vol} ?덉떆?쇰뒗 ?낅뜲?댄듃 ?덉젙?낅땲??\n\n?꾨줈?앺듃 ?먮????덈줈??而щ젆???뚯떇??湲곕???二쇱꽭?? ?뼡`);
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
// 14-2. ?ш퀎?덉쓽 ?꾪?由ъ뿉 ?쒖쫵 ?밸퀎 ?대깽???뚮뜑留?// ==========================================================================
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

    // 紐⑤떖????????긽 泥?踰덉㎏ ?щ즺 怨꾩궛湲???쑝濡?由ъ뀑
    switchFocusTab('calc');

    // 1. ?붾낫 ?대?吏 ?명똿
    document.getElementById('focus-recipe-img').src = recipe.img;
    const titleEl = document.getElementById('focus-recipe-title');
    titleEl.innerText = recipe.title;

    // ?뚮쭏 ?곕룞 ?ㅽ??쇰쭅 (?뱁댆 ?붾낫 ?곗텧 ?④낵)
    const theme = RECIPE_THEMES[recipeId];
    if (the













































    } else if (recipe.id === 35) {
        difficulty = "?대젮? ?뵶";
        bakingTip = "?ㅻ툙 ?덉뿴 180??/ 160??50~55遺?;
        cheers = "紐낆젅??湲고뭹???쒓퍘 ?믪뿬二쇰뒗 援녹? ?딅뒗 鍮꾨쾿 紐⑥컡?≪??댄겕, ?뺤꽦?쇰줈 ?꾩꽦??蹂댁븘?? ?㎣";
    } else if (recipe.id === 17) {
        difficulty = "?ъ? ?윟";
        bakingTip = "?ㅻ툙 ?덉뿴 170??/ 30遺?;
        cheers = "肄붿퐫?쏆쓽 諛붿궘??and ?⑦뙠???좊뱺?? 媛踰쇱슫 ?깆궛?대굹 ?뚰뭾 媛湲???理쒓퀬???곸뼇 媛꾩떇?낅땲?? ?ⅴ";
    }

    if (BASE_YIELDS[recipeId]) {
        updateDynamicYieldDisplay(recipeId, 1.0);
    } else {
        document.getElementById('focus-recipe-difficulty').innerHTML = `<i class="fa-solid fa-gauge-simple-high"></i> ?쒖씠?? ${difficulty}`;
    }
    document.getElementById('focus-recipe-steps').innerText = bakingTip;
    document.getElementById('focus-recipe-tip').innerText = cheers;

    // [異붽?] 3踰덉㎏ ?? ?ㅽ뙣 ?泥섎쾿 諛붿씤??    const rawTrouble = recipe.troubleShoot || "Q. 踰좎씠??怨쇱젙?먯꽌 ?ㅽ뙣?섍굅???대젮???먯씠 ?덉쑝?좉???<br>A. ?덈쿋?댄궧 ??援쎈뒗 ?곹깭???앷컧???댁긽???덈떎硫? 怨듭떇 釉붾줈洹??덉떆???볤????ъ쭊怨??④퍡 ?꾩긽???④꺼二쇱꽭?? ?고봽媛 鍮좊Ⅴ寃?1:1 留욎땄 ?닿껐踰뺤쓣 ?꾪빐?쒕┰?덈떎! ?뙵";
    let troubleHTML = "";
    if (rawTrouble.includes("Q.") && rawTrouble.includes("A.")) {
        const parts = rawTrouble.split("<br>");
        const qText = parts[0].replace("Q.", "").trim();
        const aText = parts[1] ? parts[1].replace("A.", "").trim() : "";
        
        troubleHTML = `























































































































            `;
        }).join('');
    }

    // ???곹깭 諛?吏꾪뻾瑜?寃뚯씠吏 由ъ뀑
    switchFocusTab('calc');
    resetTimelineProgress(stepsList.length);

    // 5. ?덉떆???ㅼ슫濡쒕뱶 & 怨듭쑀 踰꾪듉 ?대깽??諛붿씤??    document.getElementById('focus-btn-download').onclick = () => {
        issueRecipeCardFromFocus(recipeId, recipe.title, recipe.img, difficulty, bakingTip, cheers);
    };
    document.getElementById('focus-btn-share').onclick = () => {
        shareRecipe(null, recipe.title);
    };

    // 6. ?ㅻ쾭?덉씠 ?쒖꽦??    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 7. ?щ즺媛 ?ㅽ겕濡??놁씠 紐⑤몢 ?쒕늿??蹂댁씪 ?뚯쓽 ?먯뿰?ㅻ윭???믪씠瑜?痢≪젙?섏뿬 醫뚯슦 移대뱶 ?믪씠瑜??숈씪?섍쾶 怨좎젙











































































































































































































































                // ??以꾨줈 媛쒗뻾??寃쎌슦 ?고듃 媛꾧꺽怨??쇱씤?믪씠 ?뺣? ?명똿
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 怨좎젙???됰꼮??梨낅벑 ?먭퍡
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px ?믪씠???먯뿰?ㅻ윭???낆껜 蹂李?
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

    // ??섏닔 蹂꾨튆 ???뚰떚???숈쟻 ?앹꽦
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';

        const numStars = Math.floor(Math.random() * 20) + 40; // 40~60媛???섏닔 蹂꾨튆
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

    // ?곗씠?곌? 蹂寃쎈릺?덉쑝誘濡?媛濡??ㅽ겕濡?踰붿쐞 ?ш퀎??










































                <button onclick="downloadRecipeCard('${title}')" style="flex: 1; background: var(--dubu-mint-accent); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: background 0.2s; text-align: center;">
                    <i class="fa-solid fa-download"></i> ?덉떆??移대뱶濡????                </button>
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
        finalBakingTip += " (?????議곕━ ??援쎈뒗 ?쒓컙 異붽? ?꾩슂)";
    } else if (scale < 0.9) {
        finalBakingTip += " (???뚮웾 議곕━ ??援쎈뒗 ?쒓컙 ?⑥텞 ?꾩슂)";
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
    alert(`?뮶 [?덉떆??????꾨즺]\n\n"${title}" 留욎땄 ?덉떆??移대뱶媛 ?대?吏 ?뚯씪(PNG)濡??ㅼ슫濡쒕뱶 ?대뜑????λ릺?덉뒿?덈떎. ?꾩슂?????명븯寃??댁뼱蹂대ŉ 踰좎씠?뱀뿉 ?쒖슜??蹂댁꽭??`);
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
    
    // 留덈쾿??媛뺤젣 ?リ린
    closeMagicBook();

"    // 蹂쇰ⅷ(ID) ?쒖꽌?濡??ㅻ쫫李⑥닚 ?뺣젹?섏뿬 梨낆옣???쇱そ?먯꽌 ?ㅻⅨ履쎌쑝濡??먮Ⅴ?꾨줉 ?뺣룉\n    projects.sort((a, b) => a.id - b.id);"
        container.innerHTML = `<div class="no-results" style="color: #f6df9a; font-family: 'Noto Serif KR', serif; text-align: center; padding: 50px 0; font-size: 1.1rem; width: 100%;">寃??寃곌낵??留욌뒗 ?덉떆?쇨? ?놁뒿?덈떎.</div>`;
        return;
    }
    
    // 梨낆씠 ?섏뼱?섎룄 ?쒓?媛 ?몃줈濡?湲몄뼱吏吏 ?딄쾶 2媛?痢?2 Rows)?쇰줈 梨낆쓣 ?섎닏?덈떎.
    const half = Math.ceil(projects.length / 2);
    const shelf1Projects = projects.slice(0, half);
    const shelf2Projects = projects.slice(half);
    
    const renderShelf = (shelfProjects, shelfNum) => {
        let booksHtml = '';
        for (let i = 0; i < shelfProjects.length; i++) {
            const p = shelfProjects[i];
            const seed = p.id;

            // 梨낅벑 ?뚮쭏 ?됱긽 ?뺥븯湲?(媛二??띿뒪泥섏? ??留ㅼ묶?섎룄濡??ㅽ떛 議곗쑉)
            let themeClass = 'spine-theme-plum';
            if (p.categories) {
                if (p.categories.includes('fudgy')) themeClass = 'spine-theme-terracotta';
                else if (p.categories.includes('creamy')) themeClass = 'spine-theme-mint';
                else if (p.categories.includes('cloud')) themeClass = 'spine-theme-pink';
                else if (p.categories.includes('nostalgia')) themeClass = 'spine-theme-mustard';
                else if (p.categories.includes('soymilk')) themeClass = 'spine-theme-forest';
            }

            // 梨??쒖? ?꾩씠肄?寃곗젙
            let iconClass = 'fa-cookie-bite';
            if (p.noOven) iconClass = 'fa-wind';
            else if (p.noFlour) iconClass = 'fa-wheat-awn-circle-exclamation';
            else if (p.noButter) iconClass = 'fa-cheese';

            // 留덈쾿 怨좎꽌 ?μ떇 湲고샇 寃곗젙
            const magicSymbols = ['??, '??, '?쐸', '?쓮', '?쐱', '?빇', '?쐪', '?쓷', '??, '?쐹'];
            const magicSymbol = magicSymbols[seed % magicSymbols.lengt

"            // 媛??붿??몃퀎 ?섎? ?⑥쐞(?⑥뼱 寃쎄퀎)瑜??좎??섎뒗 ?섎룞 以꾨컮轅?留ㅽ븨 ?ъ쟾\n            const SPINE_TITLE_MAP = {\n                40: \"?쒕몢遺 肄⑸Ъ<br>?뚯슫?쒖???",\n                39: \"?쒕몢遺<br>?묒엫???뚮┛\",\n                38: \"?쒕몢遺 ??br>李곕뼞釉뚮씪?곕땲\",\n                37: \"?쒕몢遺 ?붿씠??br>諛뷀겕珥덉퐳由?",\n                36: \"?쒕몢遺<br>?곕씪誘몄닔?몃뵫\",\n                35: \"?쒕몢遺 紐⑥컡??br>耳?댄겕\",\n                34: \"?쒕몢遺 ?쇨렇?덉씠<br>洹몃┃?ㅼ퐯\",\n                33: \"?쒕몢遺 ?뱀감?붽굅??br>?뚯슫?쒖???",\n                30: \"?쒕몢遺<br>誘몃땲珥덉퐫耳??",\n                28: \"?쒕몢遺<br>?쒕굹紐щ·\",\n                26: \"?쒕몢遺<br>?덇퐙而듭??댄겕\",\n                25: \"?쒕몢遺 3醫낆???",\n                24: \"?쒕몢遺 珥덉퐫<br>踰덊듃耳??",\n                23: \"?쒕몢遺 ?덈が<br>踰덊듃耳??",\n                22: \"?쒕몢遺 釉붾옓?щ젅?ㅽ듃<br>而듭???",\n                21: \"?쒕몢遺<br>遺?щ뱶?몄뿕\",\n                20: \"?쒕몢遺<br>?덊넧??",\n                19: \"?ы넠 ?쒕몢遺<br>?瑜댄듃\",\n                18: \"?쒕몢遺 ?⑦샇諛?br>李뱀?鍮?",\n                17: \"?쒕몢遺 肄붿퐫??br>?⑦뙠援ъ?諛?",\n                16: \"?쒕몢遺 諛?br>?뚯슫?쒖??댄겕\",\n                15: \"?쒕몢遺 ?⑦샇諛?br>諛붿뒪??移섏쫰耳?댄겕\",\n                12: \"?쒕몢遺 ?щ┝移섏쫰<br>濡ㅼ???",\n                11: \"?쒕몢遺 移섏쫰?ㅼ퐯\",\n                10: \"?쒕몢遺 ?덈が耳?댄겕\",\n                9: \"?쒕몢遺<br>釉뚮씪?곕땲荑좏궎\",\n                8: \"?쒕몢遺 李뱀?紐⑥컡<br>耳?댄겕\",\n                7: \"?쒕몢遺 ?щ┝移섏쫰<br>荑좏궎\",\n                6: \"?쇨렇?덉씠<br>?쒕몢遺 耳?댄겕\",\n                5: \"?쒕몢遺 ?⑹튂利?br>?섎궘?쒖뿉\",\n                4: \"?쒕몢遺<br>?쇱?釉뚮씪?곕땲\",\n                3: \"?쒕몢遺 諛붿뒪??br>移섏쫰耳?댄겕\"
<truncated 1771 bytes>





































            let displayTitle = SPINE_TITLE_MAP[p.id] || p.title;
            const titleLength = p.title.length;
            let titleStyle = '';

            if (displayTitle.includes('<br>')) {
                // ??以꾨줈 媛쒗뻾??寃쎌슦 ?고듃 媛꾧꺽怨??쇱씤?믪씠 ?뺣? ?명똿
                titleStyle = 'font-size: 0.73rem; font-weight: 700; letter-spacing: 0.6px; line-height: 1.35; text-align: center;';
            } else if (titleLength <= 5) {
                titleStyle = 'font-size: 0.95rem; font-weight: 700; letter-spacing: 2.2px;';
            } else {
                titleStyle = 'font-size: 0.86rem; font-weight: 700; letter-spacing: 1.6px;';
            }

            const width = 78; // 怨좎젙???됰꼮??梨낅벑 ?먭퍡
            const height = (230 + Math.cos(seed * 37) * 8).toFixed(0); // 222px ~ 238px ?믪씠???먯뿰?ㅻ윭???낆껜 蹂李?
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

    // ??섏닔 蹂꾨튆 ???뚰떚???숈쟻 ?앹꽦
    const wrapper = container.parentElement;
    if (wrapper) {
        const oldStars = wrapper.querySelector('.magic-star-sparkles-container');
        if (oldStars) oldStars.remove();

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'magic-star-sparkles-container';



































































































































































































































            
            // Z異?源딆씠: 以묒븰(0)???덉쓣 ???좊컲 ?욎쑝濡??뚯텧(120px), 醫뚯슦 ?앹쑝濡?媛덉닔濡??좊컲 ?쒕㈃??諛李?0px)
            // ?대? ?듯빐 ?뚯닔媛믪뿉 ?섑빐 梨?移대뱶媛 遺덊닾紐??좊컲 諛곌꼍 ?ㅻ줈 ?뚮Щ?덈뒗 釉뚮씪?곗? 3D ?뚮뜑留?踰꾧렇 李⑤떒
            const translateZ = (1 - Math.abs(ratio)) * 120;
            
            // Y異??뚯쟾媛? 以묒븰(0)???뚮뒗 0???됲룊??, ?묒쁿?쇰줈 硫?댁쭏?섎줉 理쒕? 40??爰얠뿬 ?꾩튂瑜??뺤꽦
            const rotateY = ratio * 40;
            
            // X異?誘몄꽭 蹂댁젙: 3D 怨〓쪧 援댁젅???먯뿰?ㅻ읇寃??대젮 ?먰삎 ?ㅻ┛?붿쿂???κ?寃?蹂댁엫
            const translateX = -ratio * Math.abs(ratio) * 38;
            
            // 以묒븰???ъ닔濡??ш린瑜?理쒕? 1.05諛? ?묒쁿? 0.85諛곕줈 ?먯뿰?ㅻ읇寃??뗫낫湲?以뚯씤
            const scale = 1.05 - Math.abs(ratio) * 0.2;
            
            // ?붾㈃ 諛뽰쑝濡?踰쀬뼱?섎뒗 梨낆? ?쒖꽌???섏씠?쒖븘??泥섎━
            const opacity = 1 - Math.abs(ratio) * 0.78;

            // ?몃쾭?섏? ?딆? 湲곕낯 ?곹깭???뚮쭔 ?ㅼ떆媛?3D ?꾩튂 ?몃옖?ㅽ뤌 諛섏쁺
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
            { name: "?쒕몢遺 踰좎씠??, base: 100 },
            { name: "諛뺣젰遺?/ ?泥대텇", base: 100 },
            { name: "?좉린???ㅽ깢", base: 50 }
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
       


"    // ?쒕툕 ?щ즺?ㅼ쓽 鍮꾨? 怨꾩궛 ?뚮뜑留?n    const subIngredientsHtml = ingredients.slice(1).map((ing, idx) => `\n        <div class=\"magic-calc-row\">\n            <span class=\"magic-ing-name\">${ing.name}</span>\n            <div class=\"magic-ing-value-wrapper\">\n                <span class=\"magic-sub-value\" id=\"magic-sub-${p.id}-${idx}\" data-ratio=\"${ing.base / mainIng.base}\">${ing.base}</span>\n                <span class=\"ing-unit\">g</span>\n            </div>\n        </div>\n    `).join('');\n\n    // ?곸꽭 踰좎씠???쒖꽌 媛怨?n    const stepsList = RECIPE_STEPS_DB[p.id] || [\n        { time: \"10遺?", title: \"?④퀎 1\", desc: \"?곸꽭 議곕━ 媛?대뱶媛 以鍮?以묒엯?덈떎. ?삃\" }\n    ];\n    const stepsHtml = stepsList.map((step, idx) => `\n        <div class=\"magic-step-item\" style=\"display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.78rem; align-items: flex-start;\">\n            <div style=\"background: #8c6426; color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: 700; font-size: 0.65rem; margin-top: 2px;\">${idx + 1}</div>\n            <div style=\"flex: 1;\">\n                <div style=\"font-weight: 700; color: #2b1c14; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: center;\">\n                    <span style=\"word-break: keep-all;\">${step.title}</span>\n                    <span style=\"font-size: 0.68rem; color: #8c6426; font-weight: normal; background: rgba(140,100,38,0.08); padding: 1px 6px; border-radius: 10px; flex-shrink: 0;\"><i class=\"fa-regular fa-clock\"></i> ${step.time}</span>\n                </div>\n                <div style=\"color: #5c4135; line-height: 1.5; word-break: keep-all; font-weight: 500;\">${step.desc}</div>\n            </div>\n        </div>\n    `).join('');\n\n    // ?ㅽ뙣 ?泥?諛??고봽 媛?대뱶 ?곗씠??援ъ꽦\n    let matchedCreator = null;\n    if (typeof MASTER_CREATORS !== 'un
<truncated 10929 bytes>
                            <p class="showcase-desc">${p.desc}</p>
                            ${p.emotionalQuote ? `<p class="showcase-quote" style="font-family: var(--font-playfair), serif; font-style: italic; font-size: 0.73rem; color: #8D6E63; margin-top: 10px; margin-bottom: 5px; word-break: keep-all; line-height: 1.4;"><i class="fa-solid fa-quote-left" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-right: 5px; opacity: 0.7;"></i>${p.emotionalQuote}<i class="fa-solid fa-quote-right" style="font-size: 0.55rem; color: var(--dubu-mint-accent); margin-left: 5px; opacity: 0.7;"></i></p>` : ''}
                            
                            <div class="card-action-bar">
                                <button class="flip-btn" onclick="openFocusStage(${p.id})">
                                    <i class="fa-solid fa-gift"></i> 留욎땄 遺꾨웾 怨꾩궛 ?㎜
                                </button>
                                <a href="${p.path}" class="detail-link" ${p.path.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    猷⑸턿 蹂닿린 ?뱰 <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-back">
                        <div class="card-back-header">
                            <div class="back-vol">Atelier Scale</div>
                            <h4 class="serif back-title">${p.title}</h4>
                            <p class="back-subtitle">?대뼡 ?レ옄瑜?諛붽씀??鍮꾨? 怨꾩궛?⑸땲??/p>
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank">釉붾줈洹?媛?대뱶 ?뱰</a>`
        : `<button class="btn-magic-action blog" onclick="alert('怨듭떇 釉붾줈洹?媛?대뱶媛 以鍮?以묒엯?덈떎.')">媛?대뱶 以鍮?以??뵏</button>`;

    // 3D 留덈쾿???숈쟻 留덊겕???앹꽦
    viewport.innerHTML = `
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 媛二?梨??쒖? (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 鍮덊떚吏 ?묓븘吏 ?띿? (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 醫뚯륫 ?섏씠吏: ?붾낫 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title serif">PREMIUM RECIPE</div>
          






























    `;

"    // ?섎떒 ?대룞 踰꾪듉援?3媛??명듃 ?뺤쓽\n    const downloadBtn = `<button class=\"btn-magic-action download\" onclick=\"issueRecipeCardFromMagicBook(${p.id}, '${p.title.replace(/'/g, \"\\\\'\")}', '${p.img}')\"><i class=\"fa-solid fa-download\"></i> ?덉떆??移대뱶濡??뚯옣?섍린</button>`;\n    \n    const blogBtn = p.blogUrl\n        ? `<a href=\"${p.blogUrl}\" class=\"btn-magic-action blog\" target=\"_blank\"><i class=\"fa-solid fa-book-open\"></i> 釉붾줈洹?媛湲??뱰</a>`\n        : `<button class=\"btn-magic-action blog\" onclick=\"alert('怨듭떇 釉붾줈洹?媛?대뱶媛 以鍮?以묒엯?덈떎.')\">媛?대뱶 以鍮?以??뵏</button>`;\n        \n    const lookbookBtn = `<a href=\"${p.path}\" class=\"btn-magic-action lookbook\" onclick=\"closeMagicBook();\"><i class=\"fa-solid fa-image\"></i> 猷⑸턿蹂닿린 ?렓</a>`;\n\n    // 3D 留덈쾿???숈쟻 留덊겕???앹꽦\n    viewport.innerHTML = `\n        <div class=\"magic-spellbook\" id=\"magic-spellbook\">\n            <div class=\"magic-book-body\">\n                <!-- 媛二?梨??쒖? (Book Cover) -->\n                <div class=\"magic-book-cover\"></div>\n\n                <!-- 鍮덊떚吏 ?묓븘吏 ?띿? (Parchment Pages) -->\n                <div class=\"magic-pages-container\">\n                    <button class=\"btn-magic-close\" onclick=\"closeMagicBook()\">&times;</button>\n                    \n                    <!-- 醫뚯륫 ?섏씠吏: ?붾낫 -->\n                    <div class=\"magic-page-left\">\n                        <div class=\"magic-page-book-title\" style=\"font-family:'Noto Serif KR', serif; font-size: 0.8rem; color: #3A6958; font-weight:700; letter-spacing: 2px; margin-bottom: 12px; text-align: left;\">?꾨줈?앺듃 ?먮?</div>\n                        <div class=\"magic-photo-frame\">\n                            <img src=\"${bookImg}\" alt=\"${p.title}\" onerror=\"this.style.display='none'; document.getElementById('magic-photo-fallback-${p.id}').style.display='flex';\">\n                            <div class=\"magic-photo-fa
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

                    <!-- ?곗륫 ?섏씠吏: ?ㅻ쭏??猷??곗궛??-->
                    <div class="magic-page-right" style="display: flex; flex-direction: column;">
                        <div class="magic-meta-vol">PREMIUM ARCHIVE VOL.${p.id}</div>
                        <h3 class="magic-meta-title" style="margin-bottom: 8px;">${p.title}</h3>
                        
                        <!-- 3? ??硫붾돱 -->
                        <div class="magic-book-tabs" style="display: flex; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid rgba(88,65,46,0.15); padding-bottom: 8px; font-size: 0.85rem; font-weight: 800;">
                            <button class="magic-tab-btn active" id="magic-tab-btn-calc" onclick="switchMagicBookTab('calc')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#3A6958; cursor:pointer; border-bottom: 2px solid #3A6958; transition: all 0.2s; outline:none;">?뽳툘 怨꾨웾 怨꾩궛</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-steps" onclick="switchMagicBookTab('steps')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">?뱶 踰좎씠???쒖꽌</button>
                            <button class="magic-tab-btn" id="magic-tab-btn-trouble" onclick="switchMagicBookTab('trouble')" style="background:none; border:none; padding: 2px 4px; font-family:'Noto Serif KR', serif; font-weight:800; color:#5c4135; cursor:pointer; opacity:0.6; transition: all 0.2s; outline:none;">?뵇 ?ㅽ뙣 ?泥섎쾿</button>
                        </div>

                        <!-- ??肄섑뀗痢??곸뿭 -->
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
                                    <i class="fa-solid fa-gift"></i> 留욎땄 遺꾨웾 怨꾩궛 ?㎜
                                </button>
                                <a href="${p.path}" class="detail-link" ${p.path.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    猷⑸턿 蹂닿린 ?뱰 <i class="fa-solid fa-arrow-right"></i>
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
    const anchorName = mainRow.querySelector('.magic-ing-name').innerText.replace(' (湲곗?)', '');
    const anchorVal = parseFloat(mainInput.value) || 0;
    
    const p = PROJECTS.find(item => item.id === id);
    if (!p) return;
    const ingredients = INGREDIENT_DICT[id] || [];
    const mainIng = ingredients.find(ing => ing.name.includes('?쒕몢遺')) || ingredients[0];
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
            div.title = "?붾툝?대┃?섏뿬 ?ㅼ떆媛?怨꾩궛湲??닿린";
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
            alert(`?뵏 Vol.${vol} ?덉떆?쇰뒗 ?낅뜲?댄듃 ?덉젙?낅땲??\n\n?꾨줈?앺듃 ?먮????덈줈??而щ젆???뚯떇??湲곕???二쇱꽭?? ?뼡`);
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
// 14-2. ?ш퀎?덉쓽 ?꾪?由ъ뿉 ?쒖쫵 ?밸퀎 ?대깽???뚮뜑留?// ==========================================================================
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

    // 湲곗? ?щ즺 (?쒕몢遺 ?먮뒗 泥?踰덉㎏ ?щ즺)
    const mainIng = ingredients[0];
    
    // ?쒕툕 ?щ즺?ㅼ쓽 鍮꾨? 怨꾩궛 ?뚮뜑留?    const subIngredientsHtml = ingredients.slice(1).map((ing, idx) => `
        <div class="magic-calc-row">
            <span class="magic-ing-name">${ing.name}</span>
            <div class="magic-ing-value-wrapper">
                <span class="magic-sub-value" id="magic-sub-${p.id}-${idx}" data-ratio="${ing.base / mainIng.base}">${ing.base}</span>
                <span class="ing-unit">g</span>
            </div>
        </div>
    `).join('');

    // ?듭씪???ъ빱???ㅽ뀒?댁? 猷⑸턿 ?곕룞 踰꾪듉
    const detailsBtn = `<button class="btn-magic-action details" onclick="closeMagicBook(); openFocusStage(${p.id});">?곸꽭 猷⑸턿 媛먯긽 ??</button>`;
    
    const blogBtn = p.blogUrl
        ? `<a href="${p.blogUrl}" class="btn-magic-action blog" target="_blank">釉붾줈洹?媛?대뱶 ?뱰</a>`
        : `<button class="btn-magic-action blog" onclick="alert('怨듭떇 釉붾줈洹?媛?대뱶媛 以鍮?以묒엯?덈떎.')">媛?대뱶 以鍮?以??뵏</button>`;

    // 3D 留덈쾿???숈쟻 留덊겕???앹꽦
    viewport.innerHTML = `
        <div class="magic-spellbook" id="magic-spellbook">
            <div class="magic-book-body">
                <!-- 媛二?梨??쒖? (Book Cover) -->
                <div class="magic-book-cover"></div>

                <!-- 鍮덊떚吏 ?묓븘吏 ?띿? (Parchment Pages) -->
                <div class="magic-pages-container">
                    <button class="btn-magic-close" onclick="closeMagicBook()">&times;</button>
                    
                    <!-- 醫뚯륫 ?섏씠吏: ?붾낫 -->
                    <div class="magic-page-left">
                        <div class="magic-page-book-title serif">PREMIUM RECIPE</div>
                        <div class="magic-photo-frame">
                            <img src="${bookImg}" alt="${p.title}" onerror="this.style.display='none'; document.getElementById('magic-photo-fallback-${p.id}').style.display='flex';">
                            <div class="magic-photo-fallback" id="magic-photo-fallback-${p.id}" style="display:none; width:100%; hei








                            <i class="fa-solid fa-quote-right text-xs opacity-60 ml-1"></i>
                        </div>
                    </div>

                    <!-- ?곗륫 ?섏씠吏: ?ㅻ쭏??猷??곗궛??-->
                    <div class="magic-page-right">
                        <div class="magic-meta-vol">PREMIUM ARCHIVE VOL.${p.id}</div>
                        <h3 class="magic-meta-title">${p.title}</h3>
                        
                        <!-- ?ㅻ쭏??怨꾩궛 ?⑤꼸 -->
                        <div class="magic-calc-panel">
                            <div class="magic-calc-row-main">
                                <span class="magic-ing-name" style="font-weight:700; color:#2b1c14;">${mainIng.name} (湲곗?)</span>
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

                        <!-- 留덈쾿 鍮꾨쾿 ??-->
                        <div class="magic-spell-tip">
                            ${troubleTip}
                        </div>

                        <!-- ?대룞 踰꾪듉援?-->
                        <div class="magic-action-row">
                            ${detailsBtn}
                            ${blogBtn}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 留덈쾿 ?뚰솚 ?쒓컖 ?④낵 ???ㅽ뻾
    overlay.classList.add('active');
    
    const spellbook = document.getElementById('magic-spellbook');
    // 1?④퀎: 梨??뚰솚 (鍮꾪뻾 諛??섏씠?쒖씤)
    setTimeout(() => {
        if (spellbook) {
            spellbook.classList.add('summoned');
        }
    }, 50);
    // 2?④퀎: 梨??쇱튂湲?    setTimeout(() => {
