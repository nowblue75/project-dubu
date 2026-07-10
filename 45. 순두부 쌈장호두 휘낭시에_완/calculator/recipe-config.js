// 순두부 쌈장호두 휘낭시에 레시피 데이터 설정
var recipeConfig = {
    recipeName: "순두부 쌈장호두 휘낭시에",
    
    // 기본 설정 (기준 12개분량)
    baseCount: 12,
    
    // 무게(g)별 최적 굽기 시간(분) 매핑
    bakingTimeTable: [
        { weight: 25, minTime: 11, maxTime: 13, label: "Mini Financier", tip: "크기가 작으므로 타지 않도록 굽는 시간을 단축해 주세요." },
        { weight: 35, minTime: 13, maxTime: 15, label: "Classic Financier", tip: "가장 표준적인 크기로 13~14분이 겉바속촉하게 구워지는 황금 골든타임입니다." },
        { weight: 45, minTime: 16, maxTime: 18, label: "Large Financier", tip: "부피가 다소 크므로 중심부까지 익히기 위해 시간을 약간 늘려 굽습니다." }
    ],
    
    // 예열 오프셋
    preheatOffset: 10,

    // 12개 분량 기준 베이스 전량 (g) 및 역할(role)
    baseIngredients: [
        { id: "butter", name: "무염 버터 (태우기 전)", amount: 100, role: "브라운 버터 풍미", isReference: true },
        { id: "egg_white", name: "달걀 흰자", amount: 100, role: "가벼운 구조감·식감" },
        { id: "tofu", name: "순두부 (물기 살짝 뺀 것)", amount: 30, role: "수분·촉촉함 유지" },
        { id: "sugar", name: "설탕", amount: 90, role: "단맛·카라멜라이징" },
        { id: "honey", name: "꿀", amount: 15, role: "촉촉함·윤기" },
        { id: "ssamjang", name: "쌈장", amount: 12, role: "단짠·깊은 감칠맛" },
        { id: "almond_powder", name: "아몬드가루", amount: 50, role: "고소한 식감·고수분" },
        { id: "flour_strong", name: "강력분", amount: 40, role: "식감·쫄깃한 중심부" },
        { id: "walnuts_mix", name: "호두 분태 (반죽용)", amount: 30, role: "씹히는 식감 고소함" },
        { id: "walnuts_topping", name: "호두 분태 (토핑용)", amount: 10, role: "토핑 고소함 마감" }
    ],

    // 설탕 줄이기 상세 데이터
    sugarSubstitutes: {
        sugar: {
            combinedName: "설탕(줄임) + 알룰로스/스테비아",
            originalAmount: 90,
            partAmounts: [
                { label: "설탕", ratio: 0.5 },
                { label: "대체당", ratio: 0.5 }
            ],
            note: "휘낭시에의 겉면 카라멜라이징과 쫀득함을 살리기 위해 설탕 절반은 보존하고, 나머지 당도를 대체당으로 충족하는 실용적 배합입니다."
        }
    },

    // 설탕 줄이기 안내
    sugarInfo: {
        title: "설탕 줄이기 — 대체당 비율 조절 조언",
        tips: [
            "휘낭시에는 버터를 태워 갈색을 내는 공정이 핵심이며, 겉면이 바삭하고 카라멜화되어 굳어야 제맛이 납니다. 설탕을 100% 대체당으로 바꾸면 겉면의 바삭함이 현저히 떨어지므로 최소 50%의 설탕 비중 유지를 강하게 권장합니다.",
            "꿀(15g)과 쌈장(12g)은 특유의 수분감과 맛의 밸런스를 잡기 위해 가급적 레시피 정량을 지켜주세요."
        ]
    },

    // 오븐 상세 설정
    ovenTypes: [
        { id: "general", name: "일반 오븐", bakeTemp: 190, guide: "200℃로 예열해 두었다가, 오븐 문을 열고 팬을 투입한 직후 온도를 190℃로 내려서 14분 구워내면 겉이 바삭해집니다." },
        { id: "convection", name: "컨벡션", bakeTemp: 180, guide: "바람의 세기로 인해 수분이 빠르게 마를 수 있으므로, 일반 오븐 온도보다 10℃ 낮은 180℃에서 구우시면 겉면의 카라멜 코팅이 고르게 안착합니다." },
        { id: "airfryer", name: "에어프라이어", bakeTemp: 175, guide: "바스켓 내부 열선과의 거리가 가까워 윗면이 탈 수 있습니다. 175℃에서 12분 정도 굽고 상태를 보며 중간에 알루미늄 포일을 씌워주는 것도 좋은 방법입니다." }
    ]
};

window.RECIPE_CONFIG = recipeConfig;
