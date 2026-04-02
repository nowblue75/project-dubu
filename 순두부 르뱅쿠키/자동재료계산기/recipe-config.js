const recipeConfig = {
    recipeName: "순두부 르뱅쿠키",
    defaultCount: 8, // 기본 생산 개수
    defaultUnitWeight: 150, // 개당 무게 (g)
    
    // 재료 리스트 (비율 기준: 가루 대비)
    ingredients: [
        { id: "flour", name: "순두부 전처리 가루(또는 중력분)", ratio: 100, category: "base" },
        { id: "butter", name: "차가운 무염 버터", ratio: 75, category: "fat" },
        { id: "sugar_brown", name: "황설탕", ratio: 55, category: "sugar" },
        { id: "sugar_white", name: "백설탕", ratio: 45, category: "sugar" },
        { id: "egg", name: "달걀", ratio: 38, category: "liquid" },
        { id: "salt", name: "소금", ratio: 1.5, category: "seasoning" },
        { id: "baking_soda", name: "베이킹소다", ratio: 1.2, category: "leavener" },
        { id: "chocolate_chips", name: "다크 초콜릿 칩", ratio: 110, category: "inclusion" },
        { id: "walnuts", name: "구운 호두", ratio: 80, category: "inclusion" }
    ],

    // 대체 재료 설명
    substitutions: [
        { original: "순두부 전처리 가루", substitute: "일반 중력분", note: "순두부 전처리가 번거로우시면 일반 밀가루로 대체 가능하지만 식감이 달라질 수 있어요." },
        { original: "황설탕", substitute: "마스코바도", note: "색상이 더 진해지고 풍미가 깊어집니다." }
    ],

    // 오븐 및 굽기 설정
    baking: {
        ovenTypes: [
            { id: "default", name: "기본 오븐", temp: 185, time: 13, note: "예열 후 겉바속촉하게 구워주세요." }
        ],
        defaultOven: "default"
    }
};

window.RECIPE_CONFIG = recipeConfig;
