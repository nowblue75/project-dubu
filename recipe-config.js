const recipeConfig = {
    recipeName: "순두부 르뱅쿠키 (8개 기준)",
    
    // 기본 배율 기준 (버터 180g 기준)
    baseIngredients: [
        { id: "butter", name: "무염 버터", amount: 180, unit: "g", isReference: true },
        { id: "sugar_brown", name: "황설탕", amount: 180, unit: "g" },
        { id: "sugar_white", name: "흰설탕", amount: 60, unit: "g" },
        { id: "egg", name: "달걀", amount: 55, unit: "g" },
        { id: "flour_strong", name: "강력분", amount: 60, unit: "g" },
        { id: "flour_allpurpose", name: "중력분 (또는 순두부 가루)", amount: 280, unit: "g" },
        { id: "baking_soda", name: "베이킹소다", amount: 4, unit: "g" },
        { id: "baking_powder", name: "베이킹파우더", amount: 4, unit: "g" },
        { id: "salt", name: "소금", amount: 3, unit: "g" },
        { id: "chocolate_chips", name: "초콜릿 칩", amount: 250, unit: "g" },
        { id: "walnuts", name: "구운 호두", amount: 180, unit: "g" }
    ],

    // 옵션: 설탕 줄이기
    sugarOptions: [
        { id: "original", name: "오리지널", description: "블로그 원본 레시피 그대로 반영" },
        { id: "reduce", name: "설탕 줄이기", description: "대체 감미료(알룰로스/스테비아) 활용" }
    ],

    // 설탕 리플레이스 로직 (설탕 줄이기 선택 시)
    sugarSubstitutes: {
        sugar_brown: [
            { name: "추가 유지 (버터/오일)", amount: 100, ratio: 100/180 },
            { name: "분말 알룰로스", amount: 80, ratio: 80/180 }
        ],
        sugar_white: [
            { name: "추가 유지 (버터/오일)", amount: 30, ratio: 30/60 },
            { name: "에리스리톨/스테비아", amount: 30, ratio: 30/60 }
        ]
    },

    // 오븐 종류 및 가이드
    ovenTypes: [
        { 
            id: "convection", 
            name: "컨벡션", 
            temp: 180, 
            time: 12, 
            guide: "예열 180℃ → 굽기 170℃ 고정 (원본 레시피 기준). 냉장 휴지 12시간 필수 안내 포함." 
        },
        { 
            id: "general", 
            name: "일반 오븐", 
            temp: 190, 
            time: 15, 
            guide: "열선 오븐의 경우 문을 자주 열면 온도가 급격히 떨어집니다. 상하 온도 조절에 주의하세요." 
        },
        { 
            id: "airfryer", 
            name: "에어프라이어", 
            temp: 170, 
            time: 10, 
            guide: "윗면이 타기 쉬우므로 종이호일을 덮거나 온도를 10도 정도 낮춰서 테스트해 보세요." 
        },
        { 
            id: "microwave", 
            name: "전자레인지 오븐", 
            temp: 180, 
            time: 14, 
            guide: "복합 오븐의 경우 팬 회전에 따라 색이 다르게 날 수 있습니다. 중간에 한 번 돌려주세요." 
        }
    ]
};

window.RECIPE_CONFIG = recipeConfig;
