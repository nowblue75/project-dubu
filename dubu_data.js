/**
 * Maison de Dubu (프로젝트 두부)
 * Premium Digital Archive - Static Database Module (v1.0)
 * 
 * 이 파일은 플랫폼 전체에서 공통으로 사용되는 모든 정적 레시피, 테마, 식감,
 * 마스터 셰프 및 인포그래픽 유니버스 노드 데이터를 관리하는 파일입니다.
 */

// 1. 디저트 메인 데이터베이스 (각 고유의 '베이킹 DNA 속성' 및 '물성 식감 카테고리' 매핑)
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
        "img": "41. 순두부콩물 파운드케익_완/순두부 콩물 파운드케익 (0).png",
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
        "id": 39,
        "title": "순두부 흑임자 테린",
        "noOven": false,
        "noFlour": true,
        "noButter": true,
        "oneBowl": true,
        "desc": "오란다 대 틀 1판 기준! 오븐 중탕 공법과 오븐 베이킹으로 완성하는 깊고 진한 흑임자 테린. 만든 다음 날 차갑게 굳혀 드실 때 더욱 꾸덕합니다.",
        "path": "40. 순두부 흑임자테린_완/index.html",
        "img": "40. 순두부 흑임자테린/assets/01.png",
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
        "path": "39. 순두부 쑥 찰떡브라우니_완/index.html",
        "img": "39. 순두부 쑥 찰떡브라우니_화보북 여기서부터/assets/0.jpg",
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
        "emotionalQuote": "단 한 방울의 수분도 허용하지 않는 수분 박멸 비법으로 완성하는 극강의 바삭함! 💝",
        "troubleShoot": "Q. 시트 수분을 빼는 볶기 과정이 너무 오래 걸리거나 시트가 눅눅해요!<br>A. [수분 박멸 & 식감 조율 팁] 볶기 전 무거운 도구로 순두부를 눌러 1차 압착 후 볶아주시면 조리 시간이 절반으로 단축됩니다."
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
        "categories": [
            "teatime",
            "creamy",
            "butterfree",
            "flourfree"
        ],
        "pairing": "진한 콜드브루 커피 또는 디카페인 차",
        "time": "40분",
        "emotionalQuote": "순두부와 마스카포네 크림에 커피 젤리 큐브를 레이어로 쌓아 냉장 굳힌 노오븐 티라미수 푸딩. ☕",
        "troubleShoot": "Q. 커피 젤리가 단단하게 안 굳고 부서져요!<br>A. 판젤라틴을 충분히 찬물에 불린 뒤 뜨거운 커피액에 넣어 완벽히 녹여주어야 겔화가 잘 일어납니다. 만약 젤리가 덜 굳었다면, 냉동실에 30분 정도 살짝 얼려서 잘라주세요."
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
        "id": 31,
        "title": "순두부 레몬마들렌",
        "noOven": false,
        "noFlour": false,
        "noButter": false,
        "oneBowl": true,
        "desc": "상큼한 레몬 글레이즈와 촉촉한 순두부 반죽의 조화",
        "path": "34. 순두부레몬마들렌_완/index.html",
        "img": "34. 순두부레몬마들렌_완/0.jpg",
        "isInteractive": true,
        "categories": [
            "teatime"
        ],
        "time": "30분"
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
        "title": "순두부 눈꽃컵케이크",
        "isInteractive": false,
        "path": "27. 순두부 눈꽃컵케이크_완/index.html",
        "img": "27. 순두부 눈꽃컵케이크_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224127335052"
    },
    {
        "id": 26,
        "title": "순두부 3종케익",
        "isInteractive": false,
        "path": "26. 순두부 3종케익_완/index.html",
        "img": "26. 순두부 3종케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224113782805"
    },
    {
        "id": 25,
        "title": "순두부 초코번트케익",
        "isInteractive": false,
        "path": "25. 순두부초코번트케익_완/index.html",
        "img": "25. 순두부초코번트케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224106900867"
    },
    {
        "id": 24,
        "title": "순두부 레몬번트케익",
        "isInteractive": false,
        "path": "24. 순두부레몬번트케익_완/index.html",
        "img": "24. 순두부레몬번트케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224103127145"
    },
    {
        "id": 23,
        "title": "순두부 블랙포레스트 컵케익",
        "isInteractive": false,
        "path": "23. 순두부블랙포레스트 컵케익_완/index.html",
        "img": "23. 순두부블랙포레스트 컵케익_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224089622187"
    },
    {
        "id": 22,
        "title": "순두부 부쉬드노엘",
        "isInteractive": false,
        "path": "22. 순두부 부쉬드노엘_완/index.html",
        "img": "22. 순두부 부쉬드노엘_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224097606202"
    },
    {
        "id": 21,
        "title": "순두부 슈톨렌",
        "isInteractive": false,
        "path": "21. 순두부슈톨렌_완/index.html",
        "img": "21. 순두부슈톨렌_완/0.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224083029266"
    },
    {
        "id": 20,
        "title": "투톤 순두부 타르트",
        "isInteractive": false
    },
    {
        "id": 19,
        "title": "순두부 단호박 찹쌀빵",
        "isInteractive": false,
        "path": "19. 순두부 단호박 찹쌀빵_완/index.html",
        "img": "19. 순두부 단호박 찹쌀빵_완/KakaoTalk_20251002_083711682.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224044280791"
    },
    {
        "id": 18,
        "title": "순두부 코코넛 단팥찹쌀구움바",
        "desc": "전통 단팥의 달콤함과 찹쌀의 쫄깃함이 만난 현대적 해석. 명절의 정갈함을 담은 주전부리입니다.",
        "path": "18. 순두부 코코넛 단팥찹쌀구움바/index.html",
        "img": "18. 순두부 코코넛 단팥찹쌀구움바/KakaoTalk_20251002_083305924.jpg",
        "isInteractive": true
    },
    {
        "id": 17,
        "title": "순두부 밤파운드케이크",
        "isInteractive": false,
        "path": "17. 순두부 밤파운드케이크_완/index.html",
        "img": "17. 순두부 밤파운드케이크_완/KakaoTalk_20251002_083513712_15.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224035441110"
    },
    {
        "id": 16,
        "title": "순두부 단호박바스크치즈케이크",
        "isInteractive": false,
        "path": "16. 순두부단호박바스크치즈케이크_완/index.html",
        "img": "16. 순두부단호박바스크치즈케이크_완/KakaoTalk_20251002_082631387_17.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/224029278133"
    },
    {
        "id": 15,
        "title": "순두부 시나몬롤",
        "isInteractive": false
    },
    {
        "id": 14,
        "title": "순두부 녹차팥푸딩",
        "isInteractive": false
    },
    {
        "id": 13,
        "title": "순두부 크림치즈롤케익",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/224012454408"
    },
    {
        "id": 12,
        "title": "순두부 치즈스콘",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223977891669"
    },
    {
        "id": 11,
        "title": "순두부 레몬케이크",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223969919173"
    },
    {
        "id": 10,
        "title": "순두부 브라우니쿠키",
        "isInteractive": false,
        "path": "10. 순두부 브라우니쿠키_완/index.html",
        "img": "10. 순두부 브라우니쿠키_완/12.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/223961946339"
    },
    {
        "id": 9,
        "title": "순두부 찹쌀모찌 케이크",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223953399410"
    },
    {
        "id": 8,
        "title": "순두부 크림치즈쿠키",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223934000393"
    },
    {
        "id": 7,
        "title": "얼그레이 순두부 케이크",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223945052824"
    },
    {
        "id": 6,
        "title": "순두부 갈릭포카치아(보류)",
        "isInteractive": false
    },
    {
        "id": 5,
        "title": "순두부 황치즈휘낭시에",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223916749341"
    },
    {
        "id": 4,
        "title": "순두부 퍼지브라우니",
        "isInteractive": false,
        "path": "4. 순두부퍼지브라우니_완/index.html",
        "img": "[이벤트] 할로윈_20251029/KakaoTalk_20251029_091834561_01.jpg",
        "blogUrl": "https://blog.naver.com/project_dubu/223925764123"
    },
    {
        "id": 3,
        "title": "순두부 바스크치즈케이크",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223909587683"
    },
    {
        "id": 2,
        "title": "순두부 크림치즈티라미수",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223901807888"
    },
    {
        "id": 1,
        "title": "순두부 크림치즈",
        "isInteractive": false,
        "blogUrl": "https://blog.naver.com/project_dubu/223895335443"
    }
];

// 2. 4대 시즌 특별 이벤트 테마 데이터베이스
const THEMES = [
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
        "img": "40. 순두부 흑임자테린/assets/01.png",
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
                "img": "40. 순두부 흑임자테린/assets/01.png",
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
                "img": "39. 순두부 쑥 찰떡브라우니_화보북 여기서부터/assets/0.jpg",
                "path": "39. 순두부 쑥 찰떡브라우니_화보북 여기서부터/index.html",
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

const INGREDIENT_DICT = {
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
    "36": [
        {
            "name": "순두부 (물기 안 짜고 그대로)",
            "base": 200
        },
        {
            "name": "마스카포네 치즈",
            "base": 150
        },
        {
            "name": "설탕 (알룰로스 대체 가능)",
            "base": 40
        },
        {
            "name": "우유 (따뜻한 상태)",
            "base": 50
        },
        {
            "name": "판젤라틴 (푸딩용)",
            "base": 6
        },
        {
            "name": "커피가루 (인스턴트)",
            "base": 8
        },
        {
            "name": "설탕 (커피젤리용)",
            "base": 25
        },
        {
            "name": "뜨거운 물 (커피젤리용)",
            "base": 150
        },
        {
            "name": "판젤라틴 (커피젤리용)",
            "base": 6
        },
        {
            "name": "코코아가루 (데코용)",
            "base": 5
        },
        {
            "name": "바닐라익스트랙 (선택)",
            "base": 2
        }
    ],
    "37": [
        {
            "name": "생 순두부",
            "base": 800
        },
        {
            "name": "아몬드가루",
            "base": 210
        },
        {
            "name": "설탕",
            "base": 50
        },
        {
            "name": "계란 (특란, 실온)",
            "base": 60
        },
        {
            "name": "화이트커버춰 초콜릿",
            "base": 270
        },
        {
            "name": "바닐라익스트랙 (선택)",
            "base": 2
        },
        {
            "name": "토핑용 견과/건과",
            "base": 30
        },
        {
            "name": "데코용 스프링클",
            "base": 10
        }
    ],
    "32": [
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
    "38": [
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
    "39": [
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
    "40": [
        {
            "name": "버터 (실온 상태)",
            "base": 120
        },
        {
            "name": "백설탕",
            "base": 160
        },
        {
            "name": "비정제설탕 (황설탕 등)",
            "base": 65
        },
        {
            "name": "순두부 (물기 제거 후)",
            "base": 180
        },
        {
            "name": "달걀 (실온 상태)",
            "base": 200
        },
        {
            "name": "콩물 (진하고 간 없는 것)",
            "base": 120
        },
        {
            "name": "박력분",
            "base": 300
        },
        {
            "name": "베이킹파우더",
            "base": 7
        },
        {
            "name": "소금",
            "base": 2
        },
        {
            "name": "콩물 (윗면 마무리용)",
            "base": 30
        }
    ],
    "10": [
        { "name": "순두부 (물기 제거 후)", "base": 60 },
        { "name": "무염 버터 (실온)", "base": 80 },
        { "name": "다크 커버춰 초콜릿", "base": 100 },
        { "name": "머스코바도 설탕", "base": 80 },
        { "name": "달걀 (실온)", "base": 50 },
        { "name": "박력분", "base": 60 },
        { "name": "코코아 파우더", "base": 20 },
        { "name": "베이킹파우더", "base": 2 },
        { "name": "소금", "base": 1 },
        { "name": "초코칩 (또는 견과류)", "base": 40 }
    ],
    "16": [
        { "name": "크림치즈 (실온)", "base": 250 },
        { "name": "순두부 (물기 제거 후)", "base": 150 },
        { "name": "찐 단호박", "base": 100 },
        { "name": "설탕", "base": 70 },
        { "name": "달걀 (실온)", "base": 100 },
        { "name": "동물성 생크림 (실온)", "base": 180 },
        { "name": "옥수수 전분", "base": 10 },
        { "name": "레몬즙", "base": 5 },
        { "name": "바닐라 익스트랙 (선택)", "base": 3 }
    ],
    "17": [
        { "name": "무염버터 (실온)", "base": 150 },
        { "name": "순두부 (물기 제거 후)", "base": 80 },
        { "name": "설탕", "base": 110 },
        { "name": "달걀 (실온)", "base": 150 },
        { "name": "박력분", "base": 180 },
        { "name": "베이킹파우더", "base": 4 },
        { "name": "밤 페이스트", "base": 50 },
        { "name": "삶은 밤 (맛밤)", "base": 50 },
        { "name": "Rum주 (옵션)", "base": 5 },
        { "name": "바닐라 익스트랙 (옵션)", "base": 3 }
    ],
    "19": [
        { "name": "순두부 (물기 제거 후)", "base": 100 },
        { "name": "찐 단호박", "base": 130 },
        { "name": "찹쌀가루", "base": 150 },
        { "name": "설탕", "base": 50 },
        { "name": "베이킹파우더", "base": 5 },
        { "name": "생크림", "base": 110 },
        { "name": "소금", "base": 1 },
        { "name": "다진 호두", "base": 30 }
    ],
    "21": [
        { "name": "강력분 (반죽용)", "base": 250 },
        { "name": "순두부 (반죽용)", "base": 100 },
        { "name": "우유", "base": 90 },
        { "name": "무염 버터 (반죽용)", "base": 70 },
        { "name": "설탕 (반죽용)", "base": 40 },
        { "name": "소금 (반죽용)", "base": 3 },
        { "name": "인스턴트 드라이 이스트", "base": 5 },
        { "name": "달걀", "base": 100 },
        { "name": "시나몬 가루", "base": 3 },
        { "name": "럼에 절인 건과일", "base": 175 },
        { "name": "순두부 (마지팬용)", "base": 40 },
        { "name": "아몬드 가루", "base": 120 },
        { "name": "박력분", "base": 10 },
        { "name": "코코아 가루", "base": 5 },
        { "name": "설탕 (마지팬용)", "base": 25 },
        { "name": "소금 (마지팬용)", "base": 1 },
        { "name": "바닐라 익스트랙", "base": 2 }
    ]
};

// 4. 레시피 공정 단계 데이터베이스 (3D 타임라인 연동용)
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
    "36": [
        {
            "time": "15분",
            "title": "단계 1: 커피 젤리 큐브 만들기",
            "desc": "인스턴트 커피 8g, 설탕 25g을 뜨거운 물 150ml에 녹인 후 불린 젤라틴 6g을 넣어 녹이고 사각 용기에 부어 냉장고에서 단단히 굳힌 후 큐브 모양으로 자릅니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 푸딩 크림 블렌딩",
            "desc": "찬물에 불린 젤라틴 6g을 따뜻한 우유 50g에 넣어 완벽히 녹인 후, 순두부, 마스카포네 치즈, 설탕 40g, 바닐라 익스트랙을 함께 넣어 덩어리 없이 부드럽게 섞어줍니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 레이어 쌓기 및 마무리",
            "desc": "투명한 컵 바닥에 커피 젤리 큐브를 깔고 푸딩 크림을 채워 냉장고에서 최소 4시간 이상 충분히 굳힌 후 코코아 파우더와 여분의 젤리를 올려 완성합니다."
        }
    ],
    "37": [
        {
            "time": "15분",
            "title": "단계 1: 순두부 압착 및 수분 날리기",
            "desc": "생 순두부를 면보나 키친타월로 감싸고 그 위에 무거운 것을 올려 1차 압착해 물기를 짜낸 뒤, 팬에 올려 강불에서 10~12분간 저으며 볶아 수분을 완전히 날립니다."
        },
        {
            "time": "10분",
            "title": "단계 2: 시트 반죽 치대기",
            "desc": "볶은 순두부를 한김 식힌 후 아몬드가루, 설탕, 계란, 바닐라 익스트랙을 섞어 단단한 찰흙 질감이 될 때까지 충분히 치대어 혼합해 줍니다."
        },
        {
            "time": "25분",
            "title": "단계 3: 시트 베이킹 및 식히기",
            "desc": "사각팬에 반죽을 얇고 평평하게 펴준 후 165도로 예열된 오븐에서 25분간 굽고, 구워진 시트는 꺼내어 팬째로 완벽하게 차갑게 식혀줍니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 초콜릿 코팅 및 데코레이션",
            "desc": "식힌 시트 위에 녹인 화이트 커버춰 초콜릿을 고르게 부어 펴준 후 피스타치오, 동결건조 딸기, 스프링클 등 토핑을 뿌려 냉장고에서 1시간 굳힌 뒤 부러뜨려 완성합니다."
        }
    ],
    "32": [
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
    "38": [
        {
            "time": "10분",
            "title": "단계 1: 재료의 준비",
            "desc": "순두부, 쑥가루 등 필요한 베이킹 재료들을 엄선하여 정밀하게 계량해 둡니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 시트 반죽의 조화",
            "desc": "순두부와 설탕, 올리고당을 고르게 섞어 매끄러운 베이스를 만든 뒤 가루류를 체 쳐 넣고 가볍게 섞어줍니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 순두부 크림의 유화",
            "desc": "순두부 크림이 다른 재료들과 완벽하게 섞이도록 충분히 믹싱하여 묵직하고 고운 농도를 완성합니다."
        },
        {
            "time": "35분",
            "title": "단계 4: 골든 베이킹",
            "desc": "사각 팬에 유산지를 깔고 반죽을 고르게 채워준 뒤, 예열된 오븐 160°C에서 30~35분간 구워냅니다."
        },
        {
            "time": "10분",
            "title": "단계 5: 식히기 및 냉장 숙성",
            "desc": "한 김 식힌 뒤 냉장고에서 최소 3시간 이상 충분히 숙성하여 쑥의 진한 풍미와 쫀득한 찰기를 완성합니다."
        }
    ],
    "39": [
        {
            "time": "10분",
            "title": "단계 1: 초콜릿 준비",
            "desc": "화이트 커버춰 초콜릿을 중탕 또는 전자레인지로 부드럽게 녹인 뒤 실온에서 미지근하게 식혀둡니다."
        },
        {
            "time": "10분",
            "title": "단계 2: 재료 블렌딩",
            "desc": "믹서기에 물기 안 짠 순두부, 설탕, 흑임자 페이스트, 소금, 옥수수 전분을 모두 넣고 입자가 보이지 않을 때까지 곱게 갈아줍니다."
        },
        {
            "time": "5분",
            "title": "단계 3: 커버춰 혼합",
            "desc": "녹여둔 화이트 커버춰 초콜릿을 믹서기에 마저 넣고 전체적으로 균일해질 때까지 한 번 더 가볍게 돌려 섞어줍니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 팬닝 & 기포 제거",
            "desc": "오란다 대 팬에 유산지를 깔고 반죽을 80% 높이까지 채운 뒤, 바닥에 가볍게 쳐 큰 기포들을 빼냅니다."
        },
        {
            "time": "60분",
            "title": "단계 5: 오븐 중탕 베이킹",
            "desc": "오븐 팬에 뜨거운 물을 자작하게 붓고 반죽 틀을 올린 뒤, 140°C 오븐에서 60분 동안 은은하게 중탕으로 굽습니다."
        },
        {
            "time": "10분",
            "title": "단계 6: 이쑤시개 테스트 & 뜸 들이기",
            "desc": "꼬치 테스트 시 묻어남이 거의 없으면 오븐 문을 닫은 상태 그대로 10분간 뜸을 들여 윗면을 차분하게 정리합니다."
        },
        {
            "time": "10분",
            "title": "단계 7: 냉장 숙성",
            "desc": "실온에서 충분히 식힌 후 냉장고에서 최소 4시간 이상 차갑게 굳혀 꾸덕한 질감을 극대화하여 슬라이스합니다."
        }
    ],
    "40": [
        {
            "time": "10분",
            "title": "단계 1: 오븐 예열 & 가루 체 치기",
            "desc": "오븐을 180°C로 예열하고 오란다 대 3개에 유산지를 깔아둡니다. 박력분, 베이킹파우더, 소금은 함께 체 쳐서 준비합니다."
        },
        {
            "time": "30분",
            "title": "단계 2: 순두부 물기 제거",
            "desc": "채반 위에 키친타올을 깔고 순두부를 올린 뒤 무거운 용기로 눌러 30분 이상 확실하게 물기를 빼줍니다."
        },
        {
            "time": "5분",
            "title": "단계 3: 버터와 설탕 크림화",
            "desc": "믹서기에 실온 상태의 버터와 백설탕, 비정제설탕을 넣고 서걱거림이 줄어들며 충분히 크림화될 때까지 돌려줍니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 순두부, 달걀, 콩물 혼합",
            "desc": "물기를 뺀 순두부, 실온 달걀, 콩물을 믹서기에 추가로 넣고 매끄럽게 유화될 때까지 다시 한번 돌려 섞어줍니다."
        },
        {
            "time": "5분",
            "title": "단계 5: 가루류 혼합",
            "desc": "체 친 가루류(박력분 등)를 넣고 가루가 보이지 않을 때까지만 주걱 또는 믹서기로 짧게 섞어 반죽을 완성합니다."
        },
        {
            "time": "40분",
            "title": "단계 6: 팬닝 및 칼집 오븐 베이킹",
            "desc": "오란다 팬 3개에 반죽을 균등하게 나눠 담은 후, 170°C 오븐에서 40분간 굽습니다. 구운 지 10분 정도 지나면 재빨리 칼집을 내줍니다."
        },
        {
            "time": "10분",
            "title": "단계 7: 콩물 마무리 & 하루 숙성",
            "desc": "꼬치 테스트 후 꺼내어 윗면에 콩물을 붓으로 얇게 끼얹어 마무리하고, 식힌 뒤 하루 숙성해서 썰어 드세요."
        }
    ],
    "10": [
        {
            "time": "30분",
            "title": "단계 1: 순두부 물기 제거",
            "desc": "생 순두부를 면포에 싸 채반에 올린 후 무거운 것을 얹어 30분~1시간 동안 물기를 단단하게 짜줍니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 초콜릿 중탕 & 순두부 블렌딩",
            "desc": "버터와 다크 초콜릿을 함께 녹여 식힌 뒤, 믹서기에 물기 뺀 순두부, 계란, 설탕, 녹인 초콜릿 혼합물을 넣고 곱게 갈아줍니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 가루류 혼합 & 냉장 휴지",
            "desc": "체 친 박력분, 코코아파우더, 베이킹파우더, 소금을 넣고 살살 섞은 후 초코칩을 혼합해 냉장고에서 30분간 휴지합니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 팬닝 및 오븐 베이킹",
            "desc": "휴지된 반죽을 스쿱으로 한 덩어리씩 떠서 간격을 두고 팬닝한 뒤, 170°C 예열된 오븐에서 10분간 구워냅니다."
        },
        {
            "time": "10분",
            "title": "단계 5: 식히기 및 숙성",
            "desc": "구워진 쿠키는 트레이 위에서 한 김 식힌 뒤 식힘망으로 옮겨 완전히 식히면 겉바속촉 식감이 완성됩니다."
        }
    ],
    "16": [
        {
            "time": "30분",
            "title": "단계 1: 재료 및 순두부 준비",
            "desc": "크림치즈, 달걀, 생크림은 실온에 꺼내두고 생 순두부는 면포에 싸서 무거운 것으로 눌러 수분을 확실히 제거합니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 단호박 찌기",
            "desc": "단호박은 찜기에 찌거나 전자레인지에 익혀 껍질과 씨를 제거한 뒤 부드럽게 으깨어 완전히 식혀둡니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 치즈 및 부재료 블렌딩",
            "desc": "실온 크림치즈를 부드럽게 풀고 설탕을 넣어 섞은 후, 물기 뺀 순두부와 단호박을 넣어 믹서로 곱게 갈아 혼합합니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 달걀 및 액체류 혼합",
            "desc": "달걀을 나누어 넣으며 휘핑하고 옥수수 전분, 생크림, 바닐라 익스트랙, 레몬즙을 순서대로 부드럽게 섞어줍니다."
        },
        {
            "time": "5분",
            "title": "단계 5: 체에 거르기 & 팬닝",
            "desc": "완성된 필링 반죽을 고운 체에 한 번 걸러 기포와 덩어리를 제거한 후, 유산지를 깐 1호 원형틀에 부어 바닥에 쳐줍니다."
        },
        {
            "time": "20분",
            "title": "단계 6: 오븐 베이킹",
            "desc": "220°C 오븐에서 20분간 구운 뒤, 오븐 문을 살짝 열어둔 채로 10분간 잔열로 서서히 익혀 굳힙니다."
        },
        {
            "time": "10분",
            "title": "단계 7: 냉장 숙성",
            "desc": "실온에서 충분히 식힌 뒤 냉장실에서 최소 6시간 이상 충분히 차갑게 굳혀 꾸덕한 텍스처로 완성합니다."
        }
    ],
    "17": [
        {
            "time": "30분",
            "title": "단계 1: 순두부 물기 제거",
            "desc": "순두부를 면포에 싸 무거운 도구를 올려 30분~1시간 동안 수분을 단단하게 제거하여 준비합니다."
        },
        {
            "time": "10분",
            "title": "단계 2: 가루 체치기 & 밤 준비",
            "desc": "박력분과 베이킹파우더를 체 쳐 두고, 삶은 밤은 먹기 좋은 크기로 썰어 취향에 따라 럼주에 가볍게 버무려 둡니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 버터 크림화 & 설탕 혼합",
            "desc": "볼에 버터를 부드럽게 풀고 설탕을 넣어 밝은 아이보리색이 될 때까지 충분히 크림화합니다."
        },
        {
            "time": "10분",
            "title": "단계 4: 달걀 및 베이스 유화",
            "desc": "달걀을 조금씩 나누어 넣으며 분리되지 않게 섞은 뒤, 준비한 순두부와 밤 페이스트를 넣어 고르게 휘핑합니다."
        },
        {
            "time": "5분",
            "title": "단계 5: 가루 혼합 및 밤 섞기",
            "desc": "체 친 가루류를 반죽에 넣어 가볍게 섞어준 후 다진 밤 조각을 골고루 혼합하여 반죽을 매끄럽게 완성합니다."
        },
        {
            "time": "40분",
            "title": "단계 6: 팬닝 및 오븐 베이킹",
            "desc": "완성된 반죽을 오란다 대자 팬 2개에 나눠 담고, 170°C 예열된 오븐에서 40분간 노릇하게 구워냅니다."
        },
        {
            "time": "10분",
            "title": "단계 7: 식히기 및 하루 숙성",
            "desc": "틀에서 즉시 꺼내 식힘망에 완전히 식힌 후 밀봉하여 하루 정도 숙성하면 더욱 촉촉한 풍미가 가득해집니다."
        }
    ],
    "19": [
        {
            "time": "30분",
            "title": "단계 1: 순두부 전처리",
            "desc": "순두부를 면포에 감싸 무거운 것으로 눌러 30분~1시간 동안 최대한 단단하게 물기를 제거해 줍니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 단호박 찌기",
            "desc": "단호박은 껍질과 씨를 제거한 뒤 찜기나 전자레인지를 이용해 속까지 푹 쪄서 식힙니다."
        },
        {
            "time": "10분",
            "title": "단계 3: 찹쌀 반죽 믹싱",
            "desc": "볼에 찹쌀가루, 설탕, 베이킹파우더, 소금을 담고 물기 뺀 순두부와 찐 단호박, 생크림을 넣어 매끄럽게 치대어 줍니다."
        },
        {
            "time": "5분",
            "title": "단계 4: 호두 혼합 및 팬닝",
            "desc": "다진 호두를 넣어 섞어준 뒤 실리콘 오발틀에 채워 담고 취향껏 여분의 호두 토핑을 얹어줍니다."
        },
        {
            "time": "20분",
            "title": "단계 5: 오븐 베이킹",
            "desc": "180°C로 충분히 예열된 오븐에 반죽을 넣어 20~22분간 구워줍니다."
        },
        {
            "time": "10분",
            "title": "단계 6: 식히기 및 완성",
            "desc": "구워진 찹쌀빵은 한 김 식혀 틀에서 부드럽게 분리하며 식힌 뒤 쫠깃한 맛으로 즐기면 됩니다."
        }
    ],
    "21": [
        {
            "time": "15분",
            "title": "단계 1: 건과일 준비 & 마지팬 제조",
            "desc": "절인 과일의 럼을 빼두고, 순두부, 아몬드가루, 박력분, 코코아, 설탕, 소금, 바닐라를 뭉쳐 막대 모양으로 빚어 10분간 냉동합니다."
        },
        {
            "time": "15분",
            "title": "단계 2: 슈톨렌 반죽 치대기",
            "desc": "강력분, 순두부, 우유, 설탕, 소금, 이스트, 달걀, 시나몬을 뭉치다 무염버터를 추가해 치대고 절인 과일을 가볍게 섞습니다."
        },
        {
            "time": "60분",
            "title": "단계 3: 1차 발효",
            "desc": "반죽을 둥글려 볼에 담고 비닐랩을 씌워 따뜻한 곳(28~30°C)에서 약 2배 크기로 부풀 때까지 1시간 동안 발효시킵니다."
        },
        {
            "time": "15분",
            "title": "단계 4: 가스 빼기 및 중간 휴지",
            "desc": "발효된 반죽을 눌러 가스를 뺀 후 2등분하여 둥글린 뒤 비닐랩을 덮어 15분간 중간 휴지합니다."
        },
        {
            "time": "10분",
            "title": "단계 5: 성형 및 마지팬 감싸기",
            "desc": "밀대로 반죽을 타원형으로 밀어준 후 중앙에 냉동해 둔 초코 마지팬을 올리고 양 끝을 접어 꼬집어 단단하게 밀봉합니다."
        },
        {
            "time": "40분",
            "title": "단계 6: 2차 발효",
            "desc": "오븐 팬에 충분한 간격을 두어 올리고 랩을 씌워 따뜻한 곳에서 40분간 2차 발효하여 약 1.5배로 키워 줍니다."
        },
        {
            "time": "45분",
            "title": "단계 7: 오븐 베이킹",
            "desc": "165°C의 비교적 낮은 온도 오븐에서 속까지 완전히 익도록 40~45분 동안 은은하게 구워냅니다."
        },
        {
            "time": "15분",
            "title": "단계 8: 버터 마감 & 숙성",
            "desc": "구워져 따뜻한 상태일 때 녹인 버터를 듬뿍 코팅하고 슈가파우더를 뿌려 완전히 식힌 뒤 파우더를 2차로 뿌려 랩핑해 숙성합니다."
        }
    ]
};

// 시즌 및 특별 이벤트 데이터
const EVENTS = [
    { id: 'valentine', month: 'FEB', title: '발렌타인데이', icon: '💝', vols: '33, 35', path: "[이벤트] 발렌타인_2026/index.html", isReady: true },
    { id: 'whiteday', month: 'MAR', title: '화이트데이', icon: '🍭', vols: '36, 34', path: "[이벤트] 화이트데이_2026/index.html", isReady: true },
    { id: 'family', month: 'MAY', title: '가정의 달', icon: '🌸', vols: '29, 31, 39', path: "[이벤트] 가정의달_2026/index.html", isReady: true },
    { id: 'holidays', month: 'HOLIDAY', title: '명절 (설/추석)', icon: '🧧', vols: '18, 28, 40', path: "[이벤트] 명절_2026/index.html", isReady: true },
    { id: 'halloween', month: 'OCT', title: '할로윈 데이', icon: '🎃', path: "[이벤트] 할로윈_20251029/index.html", isReady: true },
    { id: 'pepero', month: 'NOV', title: '빼빼로데이', icon: '🥖', path: "[이벤트] 빼빼로_20251106/index.html", isReady: true },
    { id: 'sooneung', month: 'NOV', title: '수능 응원', icon: '🎓', path: "[이벤트] 수능 찹쌀떡_20251112/index.html", isReady: true },
    { id: 'christmas', month: 'DEC', title: '성탄절 시리즈', icon: '🎄', vols: '21-27', path: "크리스마스 팝시클/index.html", isReady: true }
];

