// 순두부 르뱅쿠키 원본 레시피 및 스크린샷 100% 반영 데이터 설정
var recipeConfig = {
    recipeName: "순두부 르뱅쿠키",
    
    // 기본 설정 (기준 8개분량)
    baseCount: 8,
    
    // 겉바속촉(Crispy Outside, Soft Inside) 정밀 굽기 데이터 테이블
    // 무게(g)별 최적 굽기 시간(분) 매핑 (수분 사수를 위해 2분 편차 권장)
    bakingTimeTable: [
        { weight: 80, minTime: 10, maxTime: 12, label: "Small (S)", tip: "고온에서 짧게 구워 수분을 사수하세요!" },
        { weight: 100, minTime: 12, maxTime: 14, label: "Medium (M)", tip: "가장 대중적인 사이즈로 겉바속촉의 정석입니다." },
        { weight: 150, minTime: 16, maxTime: 18, label: "Large (L)", tip: "중심부까지 촉촉함이 유지되도록 주의하세요." },
        { weight: 165, minTime: 20, maxTime: 22, label: "Classic Levain", tip: "겉면이 노릇해지면 즉시 꺼내어 잔열로 익히세요." },
        { weight: 200, minTime: 23, maxTime: 25, label: "Jumbo (XL)", tip: "매우 크므로 겉이 타지 않게 중간에 확인이 필수입니다." }
    ],
    
    // 예열 오프셋 (굽기 온도보다 10도 높게 설정)
    preheatOffset: 10,

    // 8개 분량 기준 베이스 전량 (g) 및 역할(role)
    baseIngredients: [
        { id: "tofu", name: "순두부 (물기 제거 후)", amount: 100, role: "수분·촉촉함" },
        { id: "butter", name: "차가운 버터", amount: 180, role: "풍미·결·퍼짐 방지", isReference: true },
        { id: "egg", name: "달걀 (실온)", amount: 55, role: "구조·결합" },
        { id: "sugar_brown", name: "황설탕", amount: 180, role: "꾸덕함·풍미·색" },
        { id: "sugar_white", name: "흰설탕", amount: 60, role: "바삭함·카라멜라이징" },
        { id: "flour_medium", name: "중력분", amount: 320, role: "구조" },
        { id: "flour_strong", name: "강력분", amount: 60, role: "쫄깃함" },
        { id: "baking_soda", name: "베이킹소다", amount: 4, role: "팽창" },
        { id: "baking_powder", name: "베이킹파우더", amount: 4, role: "팽창" },
        { id: "salt", name: "소금", amount: 3, role: "풍미 균형" },
        { id: "nuts", name: "견과류 (호두/피칸)", amount: 150, role: "식감·풍미" },
        { id: "chocolate_chips", name: "다크 초콜릿 칩", amount: 200, role: "포인트" }
    ],

    // 설탕 줄이기 상세 데이터
    sugarSubstitutes: {
        sugar_white: {
            combinedName: "흰설탕(줄임) + 스테비아",
            originalAmount: 60,
            partAmounts: [
                { label: "흰설탕", ratio: 0.5 },
                { label: "스테비아", ratio: 0.5 }
            ],
            note: "바삭함을 위해 설탕 일부를 남기고, 당도는 대체당으로 채우는 안정적인 추천 비율입니다."
        }
    },

    // 설탕 줄이기 안내
    sugarInfo: {
        title: "설탕 줄이기 — 가장 완벽한 대체 비율(50:50)",
        tips: [
            "쿠키의 핵심인 바삭함과 색감은 설탕의 캐러멜화에서 나옵니다. 100% 대체보다는 흰설탕의 50% 정도를 남기는 것이 가장 풍미가 좋습니다.",
            "황설탕(180g)은 퍼짐과 꾸덕함을 위해 정량을 사용하여 황금 배합을 유지합니다.",
            "스테비아 혹은 알룰로스 제품 종류에 따라 단맛의 농도가 다를 수 있으니, 제품 뒷면의 가이드를 참고하여 양을 가감하셔도 좋습니다."
        ]
    },

    // 오븐 상세 설정
    ovenTypes: [
        { id: "convection", name: "컨벡션", bakeTemp: 170, guide: "예열은 실제 굽기보다 10℃ 높게 설정하여 오븐 문을 열 때의 손실을 보완합니다. 굽기 시작 시 170℃로 유지하세요." },
        { id: "general", name: "일반 오븐", bakeTemp: 180, guide: "열선 오븐은 열이 직접적으로 닿으므로 팬 위치를 중간에 한번 돌려주는 것이 색을 내는 데 유리합니다." },
        { id: "airfryer", name: "에어프라이어", bakeTemp: 160, guide: "에어프라이어는 윗면이 빠르게 탈 수 있으므로 굽는 시간 중간에 알루미늄 포일을 덮어 보호해주세요." }
    ]
};

window.RECIPE_CONFIG = recipeConfig;
