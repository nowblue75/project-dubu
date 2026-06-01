const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../dubu_data.js');
let data = fs.readFileSync(dataPath, 'utf8');

// 1. PROJECTS 배열에 37번 레시피 삽입
const target37 = `    {
        "id": 40,`;

const replace37 = `    {
        "id": 40,
        "title": "순두부 콩물 파운드케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "desc": "순두부와 콩물을 함께 갈아 촉촉하게 구워내는 고소하고 부드러운 파운드케익. 콩물의 고소함과 순두부의 촉촉함이 만나 남녀노소 부담 없이 즐기는 웰빙 슬라이스.",
        "path": "41. 순두부콩물 파운드케익_완/index.html",
        "img": "41. 순두부콩물 파운드케익_완/순두부 콩물 파운드케익 (0).jpg",
        "calcPath": "41. 순두부콩물 파운드케익_완/calculator/index.html",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224291999885",
        "categories": [
            "gift",
            "teatime",
            "soymilk"
        ],
        "pairing": "콩물라떼 또는 따뜻한 황차",
        "time": "50분",
        "emotionalQuote": "콩물의 고소함 and 순두부의 촉촉함이 만들어내는 건강한 콩물 파운드케익입니다. ☀️",
        "troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물을 조금씩 나누어 넣으며 분리되지 않도록 유화시켜 섞어줍니다. 오븐 온도가 너무 높으면 겉만 타고 속은 안 익을 수 있으니, 170도에서 은은하게 구워주시고 이쑤시개 테스트 후 꺼내어 주세요.",
        "isNew": true
    },
    {
        "id": 37,
        "title": "순두부 화이트바크초콜릿",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "수분을 완전히 날린 바삭한 순두부 시트와 화이트 초콜릿의 만남.",
        "path": "36. 순두부화이트바크초콜릿_완/index.html",
        "img": "36. 순두부화이트바크초콜릿_완/0.jpg",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224213464375",
        "categories": [
            "gift",
            "teatime",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "pairing": "산뜻하게 우려낸 홍차나 가벼운 디저트 와인",
        "time": "60분",
        "emotionalQuote": "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝"
    },
    {
        "id": 39,`;

// 기존 40번 레시피의 시작 부분부터 39번 레시피 시작 직전까지를 교체합니다.
// dubu_data.js를 보니 40번 레시피가 PROJECTS의 첫 요소이므로, `const PROJECTS = [\n    {\n        "id": 40,`가 타겟입니다.
const projectsHeader = `const PROJECTS = [
    {
        "id": 40,`;
const projectsHeaderReplace = `const PROJECTS = [
    {
        "id": 40,
        "title": "순두부 콩물 파운드케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "desc": "순두부와 콩물을 함께 갈아 촉촉하게 구워내는 고소하고 부드러운 파운드케익. 콩물의 고소함과 순두부의 촉촉함이 만나 남녀노소 부담 없이 즐기는 웰빙 슬라이스.",
        "path": "41. 순두부콩물 파운드케익_완/index.html",
        "img": "41. 순두부콩물 파운드케익_완/순두부 콩물 파운드케익 (0).jpg",
        "calcPath": "41. 순두부콩물 파운드케익_완/calculator/index.html",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224291999885",
        "categories": [
            "gift",
            "teatime",
            "soymilk"
        ],
        "pairing": "콩물라떼 또는 따뜻한 황차",
        "time": "50분",
        "emotionalQuote": "콩물의 고소함 and 순두부의 촉촉함이 만들어내는 건강한 콩물 파운드케익입니다. ☀️",
        "troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물을 조금씩 나누어 넣으며 분리되지 않도록 유화시켜 섞어줍니다. 오븐 온도가 너무 높으면 겉만 타고 속은 안 익을 수 있으니, 170도에서 은은하게 구워주시고 이쑤시개 테스트 후 꺼내어 주세요.",
        "isNew": true
    },
    {
        "id": 37,
        "title": "순두부 화이트바크초콜릿",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "수분을 완전히 날린 바삭한 순두부 시트와 화이트 초콜릿의 만남.",
        "path": "36. 순두부화이트바크초콜릿_완/index.html",
        "img": "36. 순두부화이트바크초콜릿_완/0.jpg",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224213464375",
        "categories": [
            "gift",
            "teatime",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "pairing": "산뜻하게 우려낸 홍차나 가벼운 디저트 와인",
        "time": "60분",
        "emotionalQuote": "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝"
    },
    {
        "id": 39,`;

data = data.replace(projectsHeader, projectsHeaderReplace);

// 2. PROJECTS 배열에 31번 레시피 삽입
// 32번 마들렌과 30번 미니초코케익 사이에 주입합니다.
const target31 = `    {
        "id": 30,`;
const replace31 = `    {
        "id": 31,
        "title": "순두부 레몬마들렌",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "desc": "상큼한 레몬 글레이즈와 촉촉한 순두부 반죽의 조화가 만들어내는 비건 지향 레몬 마들렌.",
        "path": "34. 순두부레몬마들렌_완/index.html",
        "img": "34. 순두부레몬마들렌_완/0.jpg",
        "calcPath": "34. 순두부레몬마들렌_완/calculator/index.html",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224197631515",
        "categories": [
            "teatime",
            "creamy"
        ],
        "pairing": "따뜻한 얼그레이 홍차",
        "time": "25분",
        "emotionalQuote": "상큼함과 촉촉함이 빚어내는 오후의 하모니 🍋",
        "troubleShoot": "Q. 배꼽이 봉긋하게 솟아오르지 않고 납작해요!<br>A. [휴지 & 온도 팁] 반죽을 짤주머니에 담아 냉장고에서 최소 1시간 이상 차갑게 휴지시킨 뒤, 예열된 높은 온도(180도)에서 구워내야 오븐 속 온도차로 배꼽이 예쁘게 올라옵니다."
    },
    {
        "id": 30,`;

data = data.replace(target31, replace31);

// 3. THEMES 배열 영역 통째로 대체
const themesStart = data.indexOf('const THEMES = [');
const dictStart = data.indexOf('const INGREDIENT_DICT = {');

if (themesStart !== -1 && dictStart !== -1) {
    const perfectThemesCode = `const THEMES = [
    {
        "id": "romantic",
        "title": "발렌타인데이",
        "engTitle": "Romantic Holiday",
        "desc": "초콜릿과 부드러운 크림이 사르르 녹아내리는 핑크빛 로맨스 테마.",
        "icon": "💝",
        "bgClass": "theme-romantic-bg",
        "img": "36. 순두부화이트바크초콜릿_완/0.jpg",
        "tag": "Valentine",
        "recipes": [
            {
                "id": 37,
                "title": "순두부 화이트바크초콜릿",
                "noOven": false,
                "noFlour": true,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 37",
                "img": "36. 순두부화이트바크초콜릿_완/0.jpg",
                "path": "36. 순두부화이트바크초콜릿_완/index.html",
                "desc": "수분을 완전히 날린 바삭한 순두부 시트와 화이트 초콜릿의 만남",
                "blogUrl": "https://blog.naver.com/project_dubu/224213464375"
            },
            {
                "id": 30,
                "title": "순두부 미니초코케익",
                "noOven": false,
                "noFlour": true,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 30",
                "img": "33. 순두부 미니초코케익_완/0.jpg",
                "path": "33. 순두부 미니초코케익_완/index.html",
                "desc": "속은 촉촉하고 겉은 부드러운 순두부 초콜릿 미니 케이크"
            },
            {
                "id": 31,
                "title": "순두부 레몬마들렌",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 31",
                "img": "34. 순두부레몬마들렌_완/0.jpg",
                "path": "34. 순두부레몬마들렌_완/index.html",
                "desc": "상큼한 레몬 글레이즈와 촉촉한 순두부 반죽의 조화"
            },
            {
                "id": 32,
                "title": "순두부 초코마들렌",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 32",
                "img": "35. 순두부초코마들렌_완/0.jpg",
                "path": "35. 순두부초코마들렌_완/index.html",
                "desc": "달콤하고 쌉싸름한 카카오와 부드러운 순두부의 하모니"
            }
        ]
    },
    {
        "id": "traditional",
        "title": "설날-추석",
        "engTitle": "Korean Traditional & Hearts",
        "desc": "정겨운 전통 식감과 고소함이 깃든 명절 테마.",
        "icon": "🧧",
        "bgClass": "theme-traditional-bg",
        "img": "40. 순두부 흑임자테린_완/assets/01.png",
        "tag": "Harvest & Thanks",
        "recipes": [
            {
                "id": 39,
                "title": "순두부 흑임자 테린",
                "noOven": false,
                "noFlour": true,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 39",
                "img": "40. 순두부 흑임자테린_완/assets/01.png",
                "path": "40. 순두부 흑임자테린_완/index.html",
                "desc": "오븐 중탕 공법으로 완성하는 극강의 고소하고 꾸덕한 흑임자 테린",
                "blogUrl": "https://blog.naver.com/project_dubu/224277363532"
            },
            {
                "id": 38,
                "title": "순두부 쑥 찰떡브라우니",
                "noOven": false,
                "noFlour": false,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 38",
                "img": "39. 순두부 쑥 찰떡브라우니_완/0.jpg",
                "path": "39. 순두부 쑥 찰떡브라우니_완/index.html",
                "desc": "밀가루 없이 완성한 쫀득한 쑥 반죽과 콩가루의 고소한 동행",
                "blogUrl": "https://blog.naver.com/project_dubu/224247304779"
            },
            {
                "id": 17,
                "title": "순두부 밤파운드케이크",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 17",
                "img": "17. 순두부 밤파운드케이크_완/KakaoTalk_20251002_083513712_15.jpg",
                "path": "17. 순두부 밤파운드케이크_완/index.html",
                "desc": "가을 밤의 풍성함을 가득 담은 포슬촉촉한 영양 만점 파운드케이크"
            },
            {
                "id": 33,
                "title": "순두부 녹차요거트파운드케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 33",
                "img": "37. 순두부녹차요거트파운드케익_완/0.jpg",
                "path": "37. 순두부녹차요거트파운드케익_완/index.html",
                "desc": "쌉싸름한 녹차와 산뜻한 요거트가 빚어내는 싱그러운 구움과자"
            }
        ]
    },
    {
        "id": "halloween",
        "title": "할로윈",
        "engTitle": "Halloween Special",
        "desc": "형광등이 깜빡이다 꺼진 밤, 신비로운 손전등 조명으로 탐색하는 스릴.",
        "icon": "🎃",
        "bgClass": "theme-halloween-bg",
        "img": "[이벤트] 할로윈_20251029/KakaoTalk_20251029_091834561_01.jpg",
        "tag": "Midnight Spooky",
        "recipes": [
            {
                "id": 4,
                "title": "순두부 퍼지브라우니",
                "noOven": false,
                "noFlour": true,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 4",
                "img": "[이벤트] 할로윈_20251029/KakaoTalk_20251029_091834561_01.jpg",
                "path": "4. 순두부퍼지브라우니_완/index.html",
                "desc": "진하고 묵직한 다크 초콜릿의 풍미를 담은 웰빙 퍼지 브라우니"
            },
            {
                "id": 16,
                "title": "순두부 단호박바스크치즈케이크",
                "noOven": false,
                "noFlour": true,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 16",
                "img": "16. 순두부단호박바스크치즈케이크_완/KakaoTalk_20251002_082631387_17.jpg",
                "path": "16. 순두부단호박바스크치즈케이크_완/index.html",
                "desc": "단호박의 달콤함와 바스크 치즈케이크의 부드러움이 공존하는 테이스트"
            },
            {
                "id": 19,
                "title": "순두부 단호박 찹쌀빵",
                "noOven": false,
                "noFlour": true,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 19",
                "img": "19. 순두부 단호박 찹쌀빵_완/KakaoTalk_20251002_083711682.jpg",
                "path": "19. 순두부 단호박 찹쌀빵_완/index.html",
                "desc": "겉은 바삭하고 속은 쫄깃한 황금빛 단호박 슬라이스 브레드"
            },
            {
                "id": 10,
                "title": "순두부 브라우니쿠키",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 10",
                "img": "10. 순두부 브라우니쿠키_완/12.jpg",
                "path": "10. 순두부 브라우니쿠키_완/index.html",
                "desc": "쿠키의 바삭함과 브라우니의 쫀득함을 동시에 구현한 듀얼 텍스처"
            }
        ]
    },
    {
        "id": "christmas",
        "title": "크리스마스",
        "engTitle": "Winter Wonderland",
        "desc": "소복소복 쌓이는 하얀 눈송이와 화려한 축제의 겨울 감성 테마.",
        "icon": "🎄",
        "bgClass": "theme-christmas-bg",
        "img": "24. 순두부레몬번트케익_완/0.jpg",
        "tag": "X-mas Magic",
        "recipes": [
            {
                "id": 24,
                "title": "순두부 레몬번트케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 24",
                "img": "24. 순두부레몬번트케익_완/0.jpg",
                "path": "24. 순두부레몬번트케익_완/index.html",
                "desc": "눈 쌓인 산자락을 닮은 화이트 글레이즈와 상큼한 레몬 번트케이크"
            },
            {
                "id": 25,
                "title": "순두부 초코번트케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 25",
                "img": "25. 순두부초코번트케익_완/0.jpg",
                "path": "25. 순두부초코번트케익_완/index.html",
                "desc": "달콤하고 묵직한 초콜릿 글레이즈를 듬뿍 얹은 크리스마스 특선 번트케이크"
            },
            {
                "id": 21,
                "title": "순두부 슈톨렌",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": false,
                "vol": "VOL. 21",
                "img": "21. 순두부슈톨렌_완/0.jpg",
                "path": "21. 순두부슈톨렌_완/index.html",
                "desc": "크리스마스를 기다리며 얇게 썰어 먹는 독일 전통 겨울철 웰빙 슈톨렌"
            },
            {
                "id": 22,
                "title": "순두부 부쉬드노엘",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": false,
                "vol": "VOL. 22",
                "img": "22. 순두부 부쉬드노엘_완/0.jpg",
                "path": "22. 순두부 부쉬드노엘_완/index.html",
                "desc": "통나무 모양의 크리스마스 전통 케이크를 건강한 순두부 시트로 오마주"
            },
            {
                "id": 23,
                "title": "순두부 블랙포레스트 컵케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 23",
                "img": "23. 순두부블랙포레스트 컵케익_완/0.jpg",
                "path": "23. 순두부블랙포레스트 컵케익_완/index.html",
                "desc": "짙은 카카오 숲 속에 숨겨진 가장 매혹적이고 비밀스러운 유혹"
            },
            {
                "id": 26,
                "title": "순두부 3종케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 26",
                "img": "26. 순두부 3종케익_완/0.jpg",
                "path": "26. 순두부 3종케익_완/index.html",
                "desc": "크리스마스 시즌을 화려하게 수놓는 매혹적인 비주얼의 순두부 파운드 3종"
            },
            {
                "id": 27,
                "title": "순두부 눈꽃컵케이크",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 27",
                "img": "27. 순두부 눈꽃컵케이크_완/0.jpg",
                "path": "27. 순두부 눈꽃컵케이크_완/index.html",
                "desc": "소복이 내려앉은 하얀 겨울을 표현한 사랑스럽고 부드러운 컵케이크"
            }
        ]
    }
];

`;
    data = data.substring(0, themesStart) + perfectThemesCode + data.substring(dictStart);
    console.log('Themes replaced successfully!');
} else {
    console.log('Marker not found!');
}

fs.writeFileSync(dataPath, data, 'utf8');
console.log('dubu_data.js file modification is successfully finished.');
