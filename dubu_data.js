/**
 * Maison de Dubu (프로젝트 두부)
 * Premium Digital Archive - Static Database Module (v1.0)
 * 
 * 이 파일은 플랫폼 전체에서 공통으로 사용되는 모든 정적 레시피, 테마, 식감,
 * 마스터 셰프 및 인포그래픽 유니버스 노드 데이터를 관리하는 파일입니다.
 */

// 1. 38종 디저트 메인 데이터베이스 (각 고유의 '베이킹 DNA 속성' 및 '물성 식감 카테고리' 매핑)
const PROJECTS = [
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
        "troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물




        "title": "순두부 흑임자 테린",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "오란다 대 틀 1판 기준! 오븐 중탕 공법과 오븐 베이킹으로 완성하는 깊고 진한 흑임자 테린. 만든 다음 날 차갑게 굳혀 드실 때 더욱 꾸덕합니다.",
        "path": "40. 순두부 흑임자테린_완/index.html",
        "img": "40. 순두부 흑임자테린_완/assets/01.png",
        "calcPath": "40. 순두부 흑임자테린_완/calculator/index.html",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224277363532",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "pairing": "따뜻한 아메리카노",
        "time": "70분",
        "emotionalQuote": "만든 당일보다 다음 날 더 꾸덕하고 맛이 깊어집니다. 🖤",
        "troubleShoot": "Q. 만든 직후에는 단단하지 않고 흐물거리는데 성공한 건가요? 더 꾸덕하고 깊은 맛으로 즐기려면 어떻게 보관해야 하나요?<br>A. [숙성 & 서빙 꿀팁] 오븐에서 갓 나온 테린은 부드러운 상태입니다. 실온에서 완전히 식힌 뒤 냉장고에서 최소 4시간 이상 차갑게 굳혀주세요! 만든 당일보다 다음 날 드실 때 밀도가 밀착하여 훨씬 더 꾸덕한 극강의 흑임자 풍미가 완성됩니다. 드실 때는 그냥 드셔도 아주 고소하고, 꿀 한 방울을 곁들여 차가운 음료와 매치하시면 고급 디저트숍 부럽지 않은 깊은 풍미를 느낄 수 있습니다. (냉장 보관 3일 이내 권장) ✨"
    },
    {
        "id": 38,
        "title": "순두부 쑥 찰떡브라우니",
        "noOven": false,
        "noFlour": false,
        "noButter": true,
        "oneBowl": true,
        "desc": "찹쌀 없이 완성하는 반전의 찰기! 순두부 크림과 향긋한 쑥가루를 배합하여 냉장 숙성으로 쫀득한 식감을 2배 올린 웰빙 브라우니.",
        "path":































        "time": "40분",
        "emotionalQuote": "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝",
        "troubleShoot": "Q. 시트 수분을 빼는 볶기 과정이 너무 오래 걸리거나 시트가 눅눅해요!<br>A. [수분 박멸 & 식감 조율 팁] 볶기 전 무거운 도구로 순두부를 눌러 1차 압착 후 볶아주시면 조리 시간이 절반으로 단축됩니다. 다이어트 목적을 위해 가루 알룰로스로 대체할 경우 시트가 다소 부드러워지니 3분 더 구워주시고, 선물용의 바삭한 식감을 원하시면 유기농 설탕 사용을 권장합니다!"
    },
    {
        "id": 36,
        "title": "순두부 티라미수푸딩",
        "noOven": true,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "커피 젤리 큐브에 순두부 마스카포네 크림을 올리고 코코아 파우더를 더해 차갑게 떠먹는 부드러운 수제 푸딩.",
        "path": "31. 순두부 티라미수푸딩_완/index.html",
        "img": "31. 순두부 티라미수푸딩_완/0.jpg",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224164987367",









    },
    {
        "id": 35,
        "title": "순두부 모찌떡 케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "물기 안 짠 순두부를 곱게 갈아 타피오카와 찹쌀가루를 배합해 굽고 슈가파우더로 마무리하는 쫀득 폭신한 케이크.",
        "path": "28. 순두부 모찌떡케이크/index.html",
        "img": "28. 순두부 모찌떡케이크_완/0.jpg",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224139999891",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "butterfree"
        ],
        "pairing": "향긋한 녹차",
        "time": "60분",
        "emotionalQuote": "모찌 공법으로 빚어내어 시간이 지나도 굳지 않고 야들야들함이 유지되는 퓨전 케이크입니다.",
        "troubleShoot": "Q. 구워내니 겉면 테두리가 너무 딱딱하고 자를 때 부서져요!<br>A. 따뜻할 때 바로 자르면 반죽이 쫀득해서 단면이 뭉개지거나 모양이 안 잡힐 수 있습니다. 반드시 틀째 완전히 식힌 후 조심스럽게 꺼내 자르시면 깔끔하게 단면을 낼 수 있습니다. 드실 때 1분 정도 데우면 다시 부드러운 찰기가 복원됩니다."
    },
    {
        "id": 34,

































































    },
    {
        "id": 30,
        "title": "순두부 미니초코케익",
        "noOven": false,
        "noFlour": true,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "33. 순두부 미니초코케익_완/index.html",
        "img": "33. 순두부 미니초코케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224182208558",
        "categories": [
            "gift",
            "teatime",
            "cloud"
        ],
        "time": "45분"
    },
    {
        "id": 29,
        "title": "순두부 찰떡파이",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224173603637",
        "categories": [
            "nostalgia",
            "fudgy"
        ],
        "time": "30분",
        "path": "32. 순두부찰떡파이_완/index.html",
        "img": "32. 순두부찰떡파이_완/0.jpg"
    },
    {
        "id": 28,
        "title": "순두부 시나몬롤",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": false,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224156728237",
        "categories": [
            "teatime",
            "cloud"
        ],
        "time": "50분",
        "path": "30. 순두부 시나몬롤_완/index.html",
        "img": "30. 순두부 시나몬롤_완/0.jpg"
    },
    {
        "id": 27,









































































































































































        "time": "30분"
    },
    {
        "id": 17,
        "title": "순두부 코코넛 단팥구움바",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "코코넛의 바삭함 and 단팥의 든든함. 가벼운 등산이나 소풍 가기 전 최고의 건강 영양바.",
        "isInteractive": true,
        "path": "18. 순두부 코코넛 단팥찹쌀구움바/index.html",
        "img": "18. 순두부 코코넛 단팥찹쌀구움바/KakaoTalk_20251002_083305924_12.jpg",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "time": "30분",
        "emotionalQuote": "겉은 코코넛 슬라이스로 바삭하고, 속은 단팥 and 찹쌀의 든든한 식감을 품은 건강바입니다.",
        "troubleShoot": "Q. 오븐에서 꺼내 자르는데 예쁜 바 모양이 안 나오고 우수수 부스러져요!<br>A. 찹쌀 전분이 뜨거울 때 칼을 대면 결이 무너집니다. 반드시 팬 채로 실온에서 완전히 식힌 후, 밀폐용기에 담아 냉장고에서 최소 30분 이상 차갑게 결속한 뒤 잘 드는 칼로 과감히 내리눌러 썰어주세요."
    },
    {
        "id": 16,
        "title": "순두부 밤파운드케이크",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "17. 순두부 밤파운드케이크_완/index.html",
        "img": "17. 순두부 밤파운드케이크_완/KakaoTalk_20251002_083513712_15.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224035441110",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "40분"
    },
    {
        "id": 15,
        "title": "순두부 단호박바스크치즈케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "path": "16. 순두부단호박바스크치즈케이크_완/index.html",
        "img": "16. 순두부단호박바스크치즈케이크_완/KakaoTalk_20251002_082631387.jpg",





























































































































































































            "teatime",
            "creamy"
        ],
        "time": "20분",
        "path": "2. 순두부크림치즈티라미수_완/index.html",
        "img": "2. 순두부크림치즈티라미수_완/5-1.jpg"
    },
    {
        "id": 1,
        "title": "순두부 크림치즈",
        "noOven": true,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223895335443",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "15분",
        "path": "1. 순두부크림치즈_완/index.html",
        "img": "1. 순두부크림치즈_완/5-1.jpg",
        "emotionalQuote": "오직 5가지 재료로 완성하는 기적의 노오븐 크림치즈. 순두부가 버터를 대신합니다. 🌿",
        "troubleShoot": "Q. 크림치즈가 너무 단단하거나 덩어리져서 잘 섞이지 않아요!<br>A. [유화 성공 꿀팁] 크림치즈를 반드시 실온(30분 이상)에서 부드럽게 풀어준 뒤 작업하세요. 차가운 상태로 믹싱하면 분리가 생겨 식감이 거칠어집니다. 핸드믹서로 크림치즈를 먼저 1분 이상 홀로 풀어준 뒤, 연유·전분·레몬즙을 순서대로 한 번에 하나씩 넣으며 유화시키면 실크처럼 매끄러운 크림이 완성됩니
    }
];

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = [
    {
        "id": "romantic",
        "title": "발렌타인데이",
        "engTitle": "Romantic Holiday",
        "desc": "",
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
                "vol": "VOL. 36",
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
                "vol": "VOL. 33",
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
                "vol": "VOL. 34",
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
                "vol": "VOL. 35",
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
        "desc": "",
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
                "vol": "VOL. 40",
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
                "vol": "VOL. 39",
                "img": "39. 순두부 쑥 찰떡브라우니_완/assets/7.jpg",
                "path": "39. 순두부 쑥 찰떡브라우니_완/index.html",
                "desc": "밀가루 없이 완성한 쫀득한 쑥 반죽과 콩가루의 고소한 동행",
                "blogUrl": "https://blog.naver.com/project_dubu/224247304779"
            },
            {
                "id": 16,
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
                "vol": "VOL. 37",
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
        "desc": "",
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
                "id": 15,
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
                "id": 18,
                "title": "순두부 단호박 찹쌀빵",
                "noOven": false,
                "noFlour": true,
                "noButter": true,
                "oneBowl": true,
                "vol": "VOL. 19",
                "img": "19. 순두부 단호박 찹쌀빵_완/KakaoTalk_20251002_083711682.jpg",
                "path": "19. 순두부 단호박 찹쌀빵_완/index.html",
                "desc":
            },
            {
                "id": 9,
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
        "desc": "",
        "icon": "🎄",
        "bgClass": "theme-christmas-bg",
        "img": "24. 순두부레몬번트케익_완/0.jpg",
        "tag": "X-mas Magic",
        "recipes": [
            {
                "id": 23,
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
                "id": 24,
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
                "id": 20,
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
                "id": 21,
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
                "id": 22,
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
                "id": 25,
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
                "id": 26,
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

// 3. 주요 디저트별 아틀리에 비례 계량 레시피 배합비 사전 (Atelier Focus Stage 데이터셋)
const INGREDIENT_DICT = {
    "1": [
        {
            "name": "크림치즈",
            "base": 80
        },
        {
            "name": "연유",
            "base": 35

























































































































































































































































































































































































































































































































































































































































































































































































































































































































/**
 * Maison de Dubu (프로젝트 두부)
 * Premium Digital Archive - Static Database Module (v1.0)
 * 
 * 이 파일은 플랫폼 전체에서 공통으로 사용되는 모든 정적 레시피, 테마, 식감,
 * 마스터 셰프 및 인포그래픽 유니버스 노드 데이터를 관리하는 파일입니다.
 */

// 1. 38종 디저트 메인 데이터베이스 (각 고유의 '베이킹 DNA 속성' 및 '물성 식감 카테고리' 매핑)
const PROJECTS = [
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
        "troubleShoot": "Q. 반죽 분리가 일어나지 않고 속이 촉촉하게 잘 익으려면 어떻게 해야 하나요?<br>A. [수분 제거 & 유화 팁] 순두부의 물기를 확실히 제거한 뒤, 실온 버터와 설탕을 충분히 크림화하고 순두부, 달걀, 콩물
        "isNew": true
    },
    {
        "id": 39,
        "title": "순두부 흑임자 테린",
        "noOven": false,
        "noFlour": true,
        "noButter": true,




















































































    },
    {
        "id": 35,
        "title": "순두부 모찌떡 케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "물기 안 짠 순두부를 곱게 갈아 타피오카와 찹쌀가루를 배합해 굽고 슈가파우더로 마무리하는 쫀득 폭신한 케이크.",
        "path": "28. 순두부 모찌떡케이크/index.html",
        "img": "28. 순두부 모찌떡케이크_완/0.jpg",
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224139999891",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "butterfree"
        ],
        "pairing": "향긋한 녹차",
        "time": "60분",
        "emotionalQuote": "모찌 공법으로 빚어내어 시간이 지나도 굳지 않고 야들야들함이 유지되는 퓨전 케이크입니다.",
        "troubleShoot": "Q. 구워내니 겉면 테두리가 너무 딱딱하고 자를 때 부서져요!<br>A. 따뜻할 때 바로 자르면 반죽이 쫀득해서 단면이 뭉개지거나 모양이 안 잡힐 수 있습니다. 반드시 틀째 완전히 식힌 후 조심스럽게 꺼내 자르시면 깔끔하게 단면을 낼 수 있습니다. 드실 때 1분 정도 데우면 다시 부드러운 찰기가 복원됩니다."
    },
    {
        "id": 34,
        "title": "순두부 얼그레이그릭스콘",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224231139066",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "30분",
        "path": "38. 순두부 얼그레이그릭스콘_완/index.html",
        "img": "38. 순두부 얼그레이그릭스콘_완/0.jpg"
    },
    {
        "id": 33,
        "title": "순두부 녹차요거트파운드케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "37. 순두부녹차요거트파운드케익_완/index.html",
        "img": "37. 순두부녹차요거트파운드케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224223083246",
        "categories": [
            "teatime",
            "cloud"
        ],
        "time": "40분"
    },
    {
        "id": 32,
        "title": "순두부 초코마들렌",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "35. 순두부초코마들렌_완/index.html",
        "img": "35. 순두부초코마들렌_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224203525984",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "25분"
    },
    {











































































































































        "id": 23,
        "title": "순두부 레몬번트케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "24. 순두부레몬번트케익_완/index.html",
        "img": "24. 순두부레몬번트케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224103127145",
        "categories": [
            "teatime",
            "cloud"
        ],
        "time": "40분"
    },
    {
        "id": 22,
        "title": "순두부 블랙포레스트 컵케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224089622187",
        "categories": [
            "gift",
            "teatime",
            "cloud"
        ],
        "time": "35분"
    },
    {
        "id": 21,
        "title": "순두부 부쉬드노엘",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": false,
        "isInteractive": true,
        "path": "22. 순두부 부쉬드노엘_완/index.html",





























        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "45분",
        "blogUrl": "",
        "path": "20. 순두부 투톤타르트/index.html",
        "img": "20. 순두부 투톤타르트/KakaoTalk_20251023_140529348_05.jpg"
    },
    {
        "id": 18,
        "title": "순두부 단호박 찹쌀빵",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224044280791",
        "categories": [
            "nostalgia",
            "fudgy"
        ],
        "time": "30분"
    },
    {
        "id": 17,
        "title": "순두부 코코넛 단팥구움바",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "코코넛의 바삭함 and 단팥의 든든함. 가벼운 등산이나 소풍 가기 전 최고의 건강 영양바.",
        "isInteractive": true,
        "path": "18. 순두부 코코넛 단팥찹쌀구움바/index.html",
        "img": "18. 순두부 코코넛 단팥찹쌀구움바/KakaoTalk_20251002_083305924_12.jpg",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "time": "30분",
        "emotionalQuote": "겉은 코코넛 슬라이스로 바삭하고, 속은 단팥 and 찹쌀의 든든한 식감을 품은 건강바입니다.",
        "troubleShoot": "Q. 오븐에서 꺼내 자르는데 예쁜 바 모양이 안 나오고 우수수 부스러져요!<br>A. 찹쌀 전분이 뜨거울 때 칼을 대면 결이 무너집니다. 반드시 팬 채로 실온에서 완전히 식힌 후, 밀폐용기에 담아 냉장고에서 최소 30분 이상 차갑게 결속한 뒤 잘 드는 칼로 과감히 내리눌러 썰어주세요."
    },
    {




        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "17. 순두부 밤파운드케이크_완/index.html",
        "img": "17. 순두부 밤파운드케이크_완/KakaoTalk_20251002_083513712_15.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224035441110",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "40분"
    },
    {
        "id": 15,
        "title": "순두부 단호박바스크치즈케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224029278133",
        "categories": [
            "nostalgia",
            "teatime",
            "fudgy"
        ],
        "time": "50분"
    },
    {
        "id": 12,
        "title": "순두부 크림치즈롤케익",















































































        "time": "35분",
        "path": "9. 순두부 찹쌀모찌 케이크_완/index.html",
        "img": "9. 순두부 찹쌀모찌 케이크_완/1.jpg"
    },
"    {\n        \"id\": 7,\n        \"title\": \"순두부 크림치즈쿠키\",\n        \"noOven\": false,\n        \"noFlour\": false,\n        \"noButter\": false,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/223934000393\",\n        \"categories\": [\n            \"teatime\",\n            \"creamy\"\n        ],\n        \"time\": \"20분\",\n        \"path\": \"8. 순두부 크림치즈쿠키_완/index.html\",\n        \"img\": \"8. 순두부 크림치즈쿠키_완/0.jpg\"\n    },"
    {
        "id": 6,
        "title": "얼그레이 순두부 케이크",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223945052824",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "40분",
        "path": "7. 얼그레이순두부케이크_완/index.html",
        "img": "7. 얼그레이순두부케이크_완/완성샷.jpg"
    },































































        "time": "45분",
        "path": "3. 순두부바스크치즈케이크_완/index.html",
        "img": "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444.jpg"
    },
    {
        "id": 2,
        "title": "순두부 크림치즈티라미수",
        "noOven": true,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223901807888",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "20분",
        "path": "2. 순두부크림치즈티라미수_완/index.html",
        "img": "2. 순두부크림치즈티라미수_완/5-1.jpg"
    },
    {
        "id": 1,
        "title": "순두부 크림치즈",
        "noOven": true,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223895335443",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "15분",
        "path": "1. 순두부크림치즈_완/index.html",
        "img": "1. 순두부크림치즈_완/5-1.jpg",
        "emotionalQuote": "오직 5가지 재료로 완성하는 기적의 노오븐 크림치즈. 순두부가 버터를 대신합니다. 🌿",
        "troubleShoot": "Q. 크림치즈가 너무 단단하거나 덩어리져서 잘 섞이지 않아요!<br>A. [유화 성공 꿀팁] 크림치즈를 반드시 실온(30분 이상)에서 부드럽게 풀어준 뒤 작업하세요. 차가운 상태로 믹싱하면 분리가 생겨 식감이 거칠어집니다. 핸드믹서로 크림치즈를 먼저 1분 이상 홀로 풀어준 뒤, 연유·전분·레몬즙을 순서대로 한 번에 하나씩 넣으며 유화시키면 실크처럼 매끄러운 크림이 완성됩니다. 냉장 보관 시 하루 숙성하면 풍미가 두 배로 깊어집니다. ✨"
    }
];

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = [
    {
        "id": "romantic",
        "title": "발렌타인데이",
        "engTitle": "Romantic Holiday",
        "desc": "",
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











































































            },
            {
                "id": 33,
                "title": "순두부 녹차요거트파운드케익",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 37",
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
        "desc": "",
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
                "id": 15,
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
                "id": 18,
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
                "id": 9,
                "title": "순두부 브라우니쿠키",
                "noOven": false,
                "noFlour": false,
                "noButter": false,
                "oneBowl": true,
                "vol": "VOL. 10",
                "img": "1


































                "vol": "VOL. 25",
                "img": "25. 순두부초코번트케익_완/0.jpg",
                "path": "25. 순두부초코번트케익_완/index.html",
                "desc": "달콤하고 묵직한 초콜릿 글레이즈를 듬뿍 얹은 크리스마스 특선 번트케이크"
            },
            {
                "id": 20,
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
                "id": 21,
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
                "id": 22,
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
                "id": 25,
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
                "id": 26,
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

// 3. 주요 디저트별 아틀리에 비례 계량 레시피 배합비 사전 (Atelier Focus Stage 데이터셋)
const INGREDIENT_DICT = {
    "1": [
        {
            "name": "크림치즈",
            "base": 80
        },
        {
            "name": "연유",
            "base": 35
        },
        {
            "name": "옥수수 전분",
            "base": 10
        },
        {
            "name": "레몬즙",
            "base": 2
























































































































































































































































































































































































































































































































































































/**
 * Maison de Dubu (프로젝트 두부)
 * Premium Digital Archive - Static Database Module (v1.0)
 * 
    },
 * 마스터 셰프 및 인포그래픽 유니버스 노드 데이터를 관리하는 파일입니다.
 */

// 1. 38종 디저트 메인 데이터베이스 (각 고유의 '베이킹 DNA 속성' 및 '물성 식감 카테고리' 매핑)
const PROJECTS = [
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



















































































































        "time": "60분",
        "emotionalQuote": "모찌 공법으로 빚어내어 시간이 지나도 굳지 않고 야들야들함이 유지되는 퓨전 케이크입니다.",
        "troubleShoot": "Q. 구워내니 겉면 테두리가 너무 딱딱하고 자를 때 부서져요!<br>A. 따뜻할 때 바로 자르면 반죽이 쫀득해서 단면이 뭉개지거나 모양이 안 잡힐 수 있습니다. 반드시 틀째 완전히 식힌 후 조심스럽게 꺼내 자르시면 깔끔하게 단면을 낼 수 있습니다. 드실 때 1분 정도 데우면 다시 부드러운 찰기가 복원됩니다."
    },
"    {\n        \"id\": 34,\n        \"title\": \"순두부 얼그레이그릭스콘\",\n        \"noOven\": false,\n        \"noFlour\": false,\n        \"noButter\": false,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/224231139066\",\n        \"categories\": [\n            \"teatime\",\n            \"creamy\"\n        ],\n        \"time\": \"30분\",\n        \"path\": \"38. 순두부 얼그레이그릭스콘_완/index.html\",\n        \"img\": \"38. 순두부 얼그레이그릭스콘_완/0.jpg\"\n    },\n    {\n        \"id\": 33,\n        \"title\": \"순두부 녹차요거트파운드케익\",\n        \"noOven\": false,\n        \"noFlour\": false,\n        \"noButter\": false,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"path\": \"37. 순두부녹차요거트파운드케익_완/index.html\",\n        \"img\": \"37. 순두부녹차요거트파운드케익_완/0.jpg\",\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/224223083246\",\n        \"categories\": [\n            \"teatime\",\n            \"cloud\"\n        ],\n        \"time\": \"40분\"\n    },\n    {\n        \"id\": 32,\n        \"title\": \"순두부 초코마들렌\",\n        \"noOven\": false,\n        \"noFlour\": false,\n        \"noButter\": false,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"path\": \"35. 순두부초코마들렌_완/index.html\",\n        \"img\": \"35. 순두부초코마들렌_완/0.jpg\",\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/224203525984\",\n        \"categories\": [\n            \"teatime\",\n            \"fudgy\"\n        ],\n        \"time\": \"25분\"\n    },\n    {\n        \"id\": 31,\n        \"title\": \"순두부 레몬마들렌\",\n        \"noOven\": false,\n        \"noFlour\": false,\n        \"noButter\": false,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/22419763
<truncated 2615 bytes>
    {
        "id": 26,
        "title": "순두부 눈꽃컵케이크",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "27. 순두부 눈꽃컵케이크_완/index.html",
        "img": "27. 순두부 눈꽃컵케이크_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224127335052",
        "categories": [
            "gift",
            "cloud"
        ],
        "time": "30분"
    },
    {
        "id": 25,
        "title": "순두부 3종케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "26. 순두부 3종케익_완/index.html",
        "img": "26. 순두부 3종케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224113782805",
        "categories": [
            "teatime",
            "cloud"
        ],
        "time": "60분"
    },
    {
        "id": 24,
        "title": "순두부 초코번트케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "25. 순두부초코번트케익_완/index.html",
        "img": "25. 순두부초코번트케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224106900867",
        "categories": [
            "teatime",
            "cloud"
        ],
        "time": "40분"
    },
    {
        "id": 23,
        "title": "순두부 레몬번트케익",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "24. 순두부레몬번트케익_완/index.html",
        "img": "24. 순두부레몬번트케익_완/0.jpg",
        "blogUrl": "http








































































    },
    {
        "id": 18,
        "title": "순두부 단호박 찹쌀빵",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224044280791",
        "categories": [
            "nostalgia",
            "fudgy"
        ],
        "time": "30분"
    },
    {
        "id": 17,
        "title": "순두부 코코넛 단팥구움바",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "코코넛의 바삭함 and 단팥의 든든함. 가벼운 등산이나 소풍 가기 전 최고의 건강 영양바.",
        "isInteractive": true,
        "path": "18. 순두부 코코넛 단팥찹쌀구움바/index.html",
        "img": "18. 순두부 코코넛 단팥찹쌀구움바/KakaoTalk_20251002_083305924_12.jpg",
        "categories": [
            "gift",
            "nostalgia",
            "fudgy",
            "flourfree",
            "butterfree"
        ],
        "time": "30분",
        "emotionalQuote": "겉은 코코넛 슬라이스로 바삭하고, 속은 단팥 and 찹쌀의 든든한 식감을 품은 건강바입니다.",
        "troubleShoot": "Q. 오븐에서 꺼내 자르는데 예쁜 바 모양이 안 나오고 우수수 부스러져요!<br>A. 찹쌀 전분이 뜨거울 때 칼을 대면 결이 무너집니다. 반드시 팬 채로 실온에서 완전히 식힌 후, 밀폐용기에 담아 냉장고에서 최소 30분 이상 차갑게 결속한 뒤 잘 드는 칼로 과감히 내리눌러 썰어주세요."
    },
    {
        "id": 16,
        "title": "순두부 밤파운드케이크",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "17. 순두부 밤파운드케이크_완/index.html",
        "img": "17. 순두부 밤파운드케이크_완/KakaoTalk_20251002_083513712_15.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224035441110",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "40분"
    },
    {
        "id": 15,
        "title": "순두부 단호박바스크치즈케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/224029278133",
        "categories": [
            "nostalgia",
            "teatime",
            "fudgy"
 
                "name": "소금",
                "base": 1
            }
        ],
    2: [
            {
                "name": "순두부 크림치즈",
                "base": 200
            },
            {
                "name": "꿀",
                "base": 25
            },
            {
                "name": "스)에 무가당 코코아 파우더",
                "base": 10
            }
        ],
    4: [
            {
                "name": "순두부 (물기 꽉 짠 것)",
                "base": 100
            },
            {
                "name": "다크 커버춰 초콜릿",
                "base": 80
            },
            {
                "name": "무염 버터",
                "base": 30
            },
            {
                "name": "식물성 오일 (포도씨유






















            {
                "name": "바닐라 익스트랙",
                "base": 2
            }
        ],
    7: [
            {
                "name": "크림치즈 코어 재료(순두부",
                "base": 150
            },
            {
                "name": "크림치즈",
                "base": 80
            },
            {
                "name": "연유",
                "base": 35
            },
            {
                "name": "레몬즙",
                "base": 2
            },
            {
                "name": "소금",
                "base": 1
            },
            {
                "name": "옥수수전분",
                "base": 10
            }
        ],
    9: [
            {
                "name": "순두부 (물기 제거 후)",
                "base": 60
            },
            {
                "name": "무염 버터 (실온)",
                "base": 80
            },
            {
                "name": "다크 커버춰",
                "base": 100
            },
            {
                "name": "머스코바도 (설탕)",
                "base": 80
            },
            {
                "name": "계란 (실온)",
                "base": 50
            },
            {
                "name": "박력분",
                "base": 60
            },
            {
                "name": "코코아 파우더",
                "base": 20
            },
            {
                "name": "베이킹파우더",
                "base": 2
        "img": "7. 얼그레이순두부케이크_완/완성샷.jpg"
    },
    {
        "id": 5,
        "title": "순두부 황치즈휘낭시에",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223916749341",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "20분",
        "path": "5. 순두부황치즈휘낭시에_완/index.html",
        "img": "5. 순두부황치즈휘낭시에_완/KakaoTalk_20250623_175152559.jpg"
    },
    {
        "id": 4,
        "title": "순두부 퍼지브라우니",
        "noOven": false,
        "noFlour": true,
        "noButter": false,
        "oneBowl": true,
        "isInteractive": true,
        "path": "4. 순두부퍼지브라우니_완/index.html",
        "img": "[이벤트] 할로윈_20251029/KakaoTalk_20251029_091834561_01.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/223925764123",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "30분"
    },
    {
        "id": 3,
        "title": "순두부 바스크치즈케이크",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223909587683",
        "categories": [
            "teatime",
            "fudgy"
        ],
        "time": "45분",
        "path": "3. 순두부바스크치즈케이크_완/index.html",
        "img": "3. 순두부바스크치즈케이크_완/KakaoTalk_20250618_084702444.jpg"
    },
"    {\n        \"id\": 2,\n        \"title\": \"순두부 크림치즈티라미수\",\n        \"noOven\": true,\n        \"noFlour\": true,\n        \"noButter\": true,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/223901807888\",\n        \"categories\": [\n            \"teatime\",\n            \"creamy\"\n        ],\n        \"time\": \"20분\",\n        \"path\": \"2. 순두부크림치즈티라미수_완/index.html\",\n        \"img\": \"2. 순두부크림치즈티라미수_완/5-1.jpg\"\n    },\n    {\n        \"id\": 1,\n        \"title\": \"순두부 크림치즈\",\n        \"noOven\": true,\n        \"noFlour\": true,\n        \"noButter\": true,\n        \"oneBowl\": true,\n        \"isInteractive\": true,\n        \"blogUrl\": \"https://blog.naver.com/project_dubu/223895335443\",\n        \"categories\": [\n            \"teatime\",\n            \"creamy\"\n        ],\n        \"time\": \"15분\",\n        \"path\": \"1. 순두부크림치즈_완/index.html\",\n        \"img\": \"1. 순두부크림치즈_완/5-1.jpg\"\n    }\n];"

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = [
    {
        "id": "romantic",
        "title": "발렌타인데이",
        "engTitle": "Romantic Holiday",
        "desc": "",
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
                "vol": "VOL. 36",
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
                "vol": "VOL. 33",
                "img": "33. 순두부 미니초코케익_완/0.jpg",
                "path": "33. 순두부 미니초코케익_완/index.html",

















            {
                "name": "다진 호두",
                "base": 30
            }
        ],
    20: [
            {
                "name": "순두부 (물기 꽉 짠 상태)",
                "base": 140
            },
            {
                "name": "강력분",
                "base": 250
            },
            {
                "name": "우유",
                "base": 90
            },
            {
                "name": "무염 버터 (실온)",
                "base": 70
            },
            {
                "name": "설탕",
                "base": 65
            },
            {
                "name": "소금",
                "base": 4
            },
            {
                "name": "인스턴트 드라이 이스트",
                "base": 5
            },
            {
                "name": "달걀 (실온)",
                "base": 100
            },
            {
                "name": "시나몬 가루",
                "base": 3
            },
            {
                "name": "아몬드 가루",
                "base": 120
            },
            {
                "name": "박력분",
                "base": 10
            },
            {
                "name": "코코아 가루",
                "base": 5
            },
            {
                "name": "럼에 절인 건과일",
                "base": 175
            },
            {
                "name": "바닐라 익스트랙",
                "base": 2
            }
        ],
    21: [
            {
                "name": "순두부 (물기 꽉 짠 후)",
                "base": 110
            },
            {
                "name": "달걀 (실온)",
                "base": 150
            },
            {
                "name": "설탕",
                "base": 110
            },
            {
                "name": "박력분",
                "base": 70
            },
            {
                "name": "코코아 파우더",
                "base": 25
            },
            {
                "name": "무염 버터",
                "base": 45
            },
            {
                "name": "냉장 동물성 생크림",
                "base": 300
            },
            {
                "name": "다크 커버춰 초콜릿",
                "base": 75
            },
        "time": "20분",
        "path": "2. 순두부크림치즈티라미수_완/index.html",
        "img": "2. 순두부크림치즈티라미수_완/5-1.jpg"
    },
    {
        "id": 1,
        "title": "순두부 크림치즈",
        "noOven": true,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "isInteractive": true,
        "blogUrl": "https://blog.naver.com/project_dubu/223895335443",
        "categories": [
            "teatime",
            "creamy"
        ],
        "time": "15분",
        "path": "1. 순두부크림치즈_완/index.html",
        "img": "1. 순두부크림치즈_완/5-1.jpg"
    }
];

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = [
    {
        "id": "romantic",
        "title": "발렌타인데이",
        "engTitle": "Romantic Holiday",
        "desc": "",
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
                "vol": "VOL. 36",
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
                "vol": "VOL. 33",
































































































































































































































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
                "id": 26,
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

// 3. 주요 디저트별 아틀리에 비례 계량 레시피 배합비 사전 (Atelier Focus Stage 데이터셋)
const INGREDIENT_DICT = {
    "1": [
        {
            "name": "크림치즈",
            "base": 80
        },
        {
            "name": "연유",
            "base": 35
        },
        {
            "name": "옥수수 전분",
            "base": 10
        },
        {
            "name": "레몬즙",
            "base": 2
        },
        {
            "name": "소금",
            "base": 1
        }
    ],
    "2": [
        {
            "name": "순두부 크림치즈",
            "base": 200
        },
        {
            "name": "꿀",
            "base": 25
        },
        {
            "name": "스)에 무가당 코코아 파우더",
            "base": 10
        }
    ],
    "3": [
        {
            "name": "물기 짠 순두부",
            "base": 150
        },
        {
            "name": "생크림",
            "base": 150
        },
        {
            "name": "크림치즈",
            "base": 300
        },
        {
            "name": "설탕",
            "base": 100
        },
        {
            "name": "계란 (2알 + 노른자 1알)",
            "base": 120
        },
        {
            "name": "옥수수전분",
            "base": 13
        },
        {
            "name": "레몬즙",
            "base": 9
        }
    ],
    "4": [
        {





const RECIPE_STEPS_DB = {
    "1": [
        {
            "time": "2분",
            "title": "Step 1. 크림치즈 실온 준비",
            "desc": "크림치즈 80g을 볼에 담고 핸드믹서 또는 거품기로 1~2분 충분히 풀어 부드럽고 매끄러운 상태로 만들어줍니다. 이 단계가 가장 중요합니다."
        },
        {
            "time": "3분",
            "title": "Step 2. 연유 & 전분 합류",
            "desc": "풀어놓은 크림치즈에 연유 35g을 넣고 잘 섞은 뒤, 옥수수 전분 10g을 체쳐 넣고 덩어리 없이 고르게 섞어줍니다."
        },
        {
            "time": "2분",
            "title": "Step 3. 레몬즙 & 소금 마무리",
            "desc": "레몬즙 2g과 소금 한 꼬집(1g)을 더해 향미를 살려줍니다. 이 두 가지가 맛의 밸런스를 완성합니다."
        },
        {
            "time": "5분",
            "title": "Step 4. 순두부 블렌딩",
            "desc": "면보에 싸서 물기를 꽉 짠 순두부를 준비합니다. 믹서기에 순두부와 위의 크림치즈 혼합물을 함께 넣고 30초~1분 고속 블렌딩하여 실크처럼 유화시켜 줍니다."
        },
        {
            "time": "냉장 2시간",
            "title": "Step 5. 냉장 숙성 & 서빙",
            "desc": "밀


































        },
        {
            "time": "45분",
            "title": "단계 4: 오븐 베이킹",
            "desc": "230도로 예열된 오븐에서 25~30분간 구워 윗면이 진한 캐러멜 갈색이 될 때까지 구워냅니다."
        },
        {
            "time": "60분",
            "title": "단계 5: 식히기 및 냉장 숙성",
            "desc": "틀째 실온에서 완전히 식힌 후, 밀폐하여 냉장고에서 최소 6시간 이상 충분히 차갑게 굳혀 꾸덕하게 완성합니다."
        }
    ],
    "4": [
        {
            "time": "5분",
            "title": "Step 1",
            "desc": "순두부 물기 제거"
        },
        {
            "time": "10분",
            "title": "Step 2",
            "desc": "과감하게 &#x27;덜&#x27; 익히세요"
        },
        {
            "time": "15분",
            "title": "Step 3",
            "desc": "숙성은 필수! 더 맛있게 즐기기"
        }
    ],
    "5": [
        {
            "time": "10분",
            "title": "단계 1: 헤이즐넛 버터",
            "desc": "냄비에 버터를 녹이고 약불에서 끓여 고소한 향과 갈색 찌꺼기가 생기는 탄 버터로 만든 뒤 체에 걸러 식힙니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 순두부 준비",
            "desc": "순두부의 물기를 확실하게 제거한 뒤 55g을 계량해 블렌더로 매끄러운 페이스트 형태로 갈아 둡니다."
        },
        {


































































































































































































































                "base": 55
            },
            {
                "name": "바닐라익스트랙 (선택)",
                "base": 2
            },
            {
                "name": "화이트커버춰 (초콜릿)",
                "base": 270
            },
            {
                "name": "건과 및 견과 (토핑용)",
                "base": 30
            },
            {
                "name": "스프링클 (데코용)",
                "base": 10
            }
        ],
    38: [
            {
                "name": "순두부 (물기 안 짠 그대로)",
                "base": 400
            },
            {
                "name": "통밀가루",
                "base": 140
            },
            {
                "name": "쑥가루",
                "base": 40
            },
            {
                "name": "설탕 (에리스리톨 대체 가능)",
                "base": 120
            },
            {
                "name": "베이킹파우더",
                "base": 3
            },
            {
                "name": "올리고당",
                "base": 20
            },
            {
                "name": "소금",
                "base": 4
            },
            {
                "name": "인절미 떡 (데코용)",
                "base": 50
            },
            {
                "name": "볶은 콩가루 (데코용)",
                "base": 15
            }
        ],
    39: [
            {
                "name": "순두부 (물기 안 짠 그대로)",
                "base": 230
            },
            {
                "name": "설탕",
                "base": 70
            },
            {
                "name": "흑임자 페이스트",
                "base": 65
            },
            {
                "name": "소금",
                "base": 2
            },
            {
                "name": "화이트커버춰 (녹인것)",
                "base": 100
            },
            {
                "name": "옥수수 전분",
                "base": 40
            },
            {
                "name": "통흑임자 (데코/선택)",
                "base": 5
            }
        ],
    40: [
            {
                "name": "순두부 (물기 제거 후)",
                "base": 180
            },
            {
                "name": "버터 (실온)",
                "base": 120
            },
            {
                "name": "백설탕",
                "base": 160
            },
            {
                "name": "비정제설탕 (황설탕 또는 코코넛슈가)",
                "base": 65
            },
            {
                "name": "달





















const RECIPE_STEPS_DB = {
    1: [
            {
                "time": "10분",
                "title": "단계 1",
                "desc": "다음 프로젝트 예고: &#x27;노오븐 순두부 티라미수&#x27;"
            },
            {
                "time": "20분",
                "title": "단계 2",
                "desc": "다음 시간에는 이 크림을 200% 활용해서 만드는, 입에서 살살 녹는 &#x27;노오븐 순두부 티라미수&#x27; 레시피로 찾아뵙겠습니다. 기대해주세요!"
            }
        ],
    2: [
            {
                "time": "5분",
                "title": "Step 1",
                "desc": "더 진한 초코맛을 원한다면?"
            },
            {
                "time": "10분",
                "title": "Step 2",
                "desc": "깔끔함의 비결, 짤주머니!"
            },
            {
                "time": "15분",
                "title": "Step 3",
                "desc": "가장 중요한 &#x27;기다림의 미학&#x27;"
            }
        ],
    4: [
            {
                "time": "5분",
                "title": "Step 1",
                "desc": "순두부 물기 제거"
            },
            {
                "time": "10분",
   
















































            {
                "time": "5분",
                "title": "Step 1",
                "desc": "[크림치즈 크림화]"
            },
            {
                "time": "10분",
                "title": "Step 2",
                "desc": "설탕을 넣고 설탕 입자가 서걱거리지 않을 때까지 휘핑합니다."
            },
            {
                "time": "25분",
                "title": "Step 5",
                "desc": "[전분, 생���림, 바닐라 혼합]"
            },
            {
                "time": "5분",
                "title": "Step 1",
                "desc": "순두부의 마법! 콩 맛 없이 &#x27;사르르 녹는&#x27; 식감 완벽 구현!"
            },
            {
                "time": "10분",
                "title": "Step 2",
                "desc": "가을을 맛보다! 단호박의 진한 풍미가 입안 가득!"
            },
            {
                "time": "15분",
                "title": "Step 3",
                "desc": "선물용으로 딱! 홈베이킹도 전문점 퀄리티!"
            },
            {
                "time": "5분",
                "title": "Step 1",
                "desc": "순두부 물기 제거"
            },
            {
                "time": "20분",
                "title": "Step 4",
                "desc": "믹싱 & 체에 거르기"
            },
            {
                "time": "25분",
                "title": "Step 5",
                "desc": "굽기 온도 및 시간 (진한 캐러멜 풍미 & 꾸덕 촉촉 비법)"
            },


























































































































































































































































































































































































































































































































































































            },
            {
                "time": "5분",
                "title": "Step 1",
                "desc": "오븐을 190~200도로 넉넉히 예열합니다. 차갑게 휴지된 반죽을 꺼내자마자 버터칠을 한 마들렌 틀에 80%만 짜주세요."
            },
            {
                "time": "10분",
                "title": "Step 2",
                "desc": "오븐에 넣고 180도로 온도를 맞춘 뒤 13~15분간 구워줍니다."
            }
        ],
    32: [
            {
                "time": "10분",
                "title": "단계 1",
                "desc": "✅ STEP 1: 믹서기를 활용한 반죽 및 휴지"
            },
            {
                "time": "20분",
                "title": "단계 2",
                "desc": "계란, 설탕, 우유, 물기 짠 순두부를 믹서기에 넣고 부드럽게 갈아줍니다. 볼에 옮겨 담은 뒤 체 친 박력분, 코코아가루, 베이킹파우더를 넣어 가볍게 섞어주세요. 따뜻하게 녹인 버터를 섞은 뒤 짤주머니에 담아 냉장고에서 최소 3시간 이상 휴지시킵니다."
            },
            {
                "time": "30분",
                "title": "단계 3",
                "desc": "반죽이 휴지되는 동안 가나슈를 만듭니다. 생크림과 커버춰 초콜릿을 데워서 녹이고 물엿을 넣은 뒤 마지막에 버터를 섞어 광택을 냅니다. 실온에서 식혀 짤 수 있는 상태로 준비하세요."
            },
            {
                "time": "40분",
                "title": "단계 4",
                "desc": "예열된 오븐에 차가운 반죽을 80% 정도 팬닝합니다. 180도에서 13~15분간 구워 봉긋한 배꼽을 확인하세요."
            }
        ],
    33: [
            {
                "time": "10분",
                "title": "단계 1",
                "desc": "달걀은 한 알씩 나누어 넣으면서 매번 잘 섞어주는 게 중요해요. 한꺼번에 넣으면 반죽이 분리될 수 있거든요. 조급하게 서두르지 않는 게 포인트!"
            },
            {
                "time": "20분",
                "title": "단계 2",
                "desc": "체 친 통밀가루, 박력분, 녹차가루, 베이킹파우더, 소금을 한꺼번에 넣고 주걱으로 가볍게 섞어줍니다. 반죽을 질기게 만드는 글루텐이 생기지 않도록, 과하게 젓지 않는 게 핵심이에요."
            },
            {
                "time": "30분",
                "title": "단계 3",
                "desc": "오란다 팬에 반죽을 나눠 담고 윗면을 정리해주세요. 오븐에서  170도 40분, 속까지 촉촉하게 익혀줍니다. 꼬치로 찔러 깨끗하게 나오면 완성이에요."
            },
            {
                "time": "40분",
                "title": "단계 4",
                "desc": "화




















































































































































































































































































































































const RECIPE_STEPS_DB = {
    "1": [
        {
            "time": "10분",
            "title": "단계 1",
            "desc": "다음 프로젝트 예고: &#x27;노오븐 순두부 티라미수&#x27;"
        },
        {
            "time": "20분",
            "title": "단계 2",
            "desc": "다음 시간에는 이 크림을 200% 활용해서 만드는, 입에서 살살 녹는 &#x27;노오븐 순두부 티라미수&#x27; 레시피로 찾아뵙겠습니다. 기대해주세요!"
        }
    ],
    "2": [
        {
            "time": "5분",
            "title": "Step 1",
            "desc": "더 진한 초코맛을 원한다면?"
        },
        {
            "time": "10분",
            "title": "Step 2",
            "desc": "깔끔함의 비결, 짤주머니!"
        },
        {
            "time": "15분",
            "title": "Step 3",
            "desc": "가장 중요한 &#x27;기다림의 미학&#x27;"
        }
    ],
    "3": [
        {
            "time": "10분",
            "title": "단계 1: 순두부 탈수",
            "desc": "순두부는 면보에 싸서 무거운 용기로 눌러 1시간 이상 물기를 빼고 150g을 맞춥니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 블렌딩",
            "desc": "실온 상태의 크림치즈와 설탕을 풀고, 물기 짠 순두부, 생크림, 달걀, 전분, 레몬즙을 함께 넣어 믹서로 고르게 갈아줍니다."
        },
        {
            "time": "20분",
            "title": "단계 3: 팬닝 및 기포 빼기",
            "desc": "15.5cm 케이크 틀에 유황지를 대충 구겨 깐 뒤 반죽을 붓고, 틀을 바닥에 가볍게 쳐서 큰 기포를 빼냅니다."