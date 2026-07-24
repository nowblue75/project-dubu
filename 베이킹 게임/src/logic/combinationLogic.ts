export type IngredientTier = 'raw' | 'tier1' | 'tier2' | 'final_ready' | 'final';

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: 'base' | 'intermediate' | 'final';
  tier: IngredientTier;
  description: string;
  chapter?: number;
}

export interface CombinationRule {
  ingredientA: string;
  ingredientB: string;
  resultId: string;
}

// 전체 재료 정의 (챕터 1 + 챕터 2 대안 경로 신규 재료 포함)
export const INGREDIENTS_DB: Record<string, Ingredient> = {
  // --- 챕터 1 기본 재료 ---
  soft_tofu: {
    id: 'soft_tofu',
    name: '순두부',
    emoji: '⬜',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '수분과 부드러움을 품은 콩 단백질 베이스'
  },
  salt: {
    id: 'salt',
    name: '소금',
    emoji: '🧂',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '단맛을 살려주고 풍미를 끌어올리는 소금'
  },
  lemon_juice: {
    id: 'lemon_juice',
    name: '레몬즙',
    emoji: '🍋',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '상큼한 산미로 콩 비린내를 잡고 산뜻함을 더함'
  },
  cream_cheese: {
    id: 'cream_cheese',
    name: '크림치즈',
    emoji: '🧀',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '꾸덕하고 묵직한 고소함을 더해주는 진한 치즈'
  },
  condensed_milk: {
    id: 'condensed_milk',
    name: '연유',
    emoji: '🥛',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '부드럽고 농밀한 단맛을 채워주는 달콤 연유'
  },
  corn_starch: {
    id: 'corn_starch',
    name: '옥수수전분',
    emoji: '🌽',
    category: 'base',
    tier: 'raw',
    chapter: 1,
    description: '크림의 농도를 맞춰 단단하게 잡아주는 안정화제'
  },

  // 챕터 1 중간 조합물 (기존 + 대안 경로 신규 재료)
  seasoned_tofu: {
    id: 'seasoned_tofu',
    name: '밑간된 순두부',
    emoji: '🥣',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 1,
    description: '소금으로 적절히 밑간되어 콩 맛이 조화로운 순두부'
  },
  acidic_tofu: {
    id: 'acidic_tofu',
    name: '레몬 순두부',
    emoji: '🍋',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 1,
    description: '레몬즙을 먼저 넣어 상큼한 산미를 감싸안은 순두부 (대안 경로 1)'
  },
  salted_cream_cheese: {
    id: 'salted_cream_cheese',
    name: '단짠 크림치즈',
    emoji: '🧀',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 1,
    description: '소금을 살짝 쳐서 짭쪼름한 치즈 풍미를 극대화한 크림치즈 (대안 경로 2)'
  },
  refreshing_tofu_base: {
    id: 'refreshing_tofu_base',
    name: '산뜻한 순두부 베이스',
    emoji: '✨',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 1,
    description: '밑간과 산미가 어우러져 깔끔하고 산뜻해진 순두부 베이스'
  },
  sweet_cream_base: {
    id: 'sweet_cream_base',
    name: '달콤 크림 베이스',
    emoji: '🍯',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 1,
    description: '크림치즈와 연유가 어우러진 농밀하고 달콤한 크림'
  },
  tofu_cream: {
    id: 'tofu_cream',
    name: '순두부 크림',
    emoji: '🍨',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 1,
    description: '순두부 베이스와 달콤 크림 베이스가 마침내 하나가 된 크림'
  },
  stabilized_tofu_cream: {
    id: 'stabilized_tofu_cream',
    name: '안정화된 순두부 크림',
    emoji: '🧪',
    category: 'intermediate',
    tier: 'final_ready',
    chapter: 1,
    description: '옥수수전분이 더해져 중탕 온도를 견딜 수 있게 된 완성 직전 크림'
  },
  tofu_cream_cheese: {
    id: 'tofu_cream_cheese',
    name: '순두부 크림치즈',
    emoji: '🍰',
    category: 'final',
    tier: 'final',
    chapter: 1,
    description: '건강함과 부드러운 치즈의 풍미가 완벽히 조화된 챕터 1의 완성작'
  },

  // --- 챕터 2 기본 재료 ---
  honey: {
    id: 'honey',
    name: '꿀',
    emoji: '🍯',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '은은한 꽃향과 부드러운 달콤함을 채워주는 자연 당류'
  },
  instant_coffee: {
    id: 'instant_coffee',
    name: '인스턴트커피',
    emoji: '☕',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '쌉싸름한 에스프레소 풍미를 내주는 딥 커스텀 커피 가루'
  },
  sugar_c2: {
    id: 'sugar_c2',
    name: '설탕',
    emoji: '🍬',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '커피의 쓴맛을 부드럽게 감싸주는 달콤한 설탕'
  },
  hot_water: {
    id: 'hot_water',
    name: '뜨거운 물',
    emoji: '🫖',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '커피가루를 진하게 녹여내어 향긋한 시럽을 만드는 온수'
  },
  digestive_biscuit: {
    id: 'digestive_biscuit',
    name: '다이제 통밀쿠키',
    emoji: '🍪',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '바삭하고 고소한 곡물 시트 베이스'
  },
  cocoa_powder: {
    id: 'cocoa_powder',
    name: '무가당 코코아파우더',
    emoji: '🍫',
    category: 'base',
    tier: 'raw',
    chapter: 2,
    description: '티라미수의 묵직한 카카오 토핑 마무리를 지어주는 코코아가루'
  },

  // 챕터 2 중간 조합물 (기존 + 대안 경로 신규 재료)
  sweet_coffee_powder: {
    id: 'sweet_coffee_powder',
    name: '단맛 커피가루',
    emoji: '🤎',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 2,
    description: '인스턴트커피와 설탕이 잘 섞여 단쓴 밸런스를 맞춘 커피믹스 (기존 경로 1)'
  },
  strong_coffee_water: {
    id: 'strong_coffee_water',
    name: '진한 커피물',
    emoji: '☕',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 2,
    description: '인스턴트커피를 뜨거운 물에 진하게 녹여낸 에스프레소 액체 (대안 경로 2)'
  },
  sugar_water: {
    id: 'sugar_water',
    name: '단맛 뜨거운 물',
    emoji: '🫖',
    category: 'intermediate',
    tier: 'tier1',
    chapter: 2,
    description: '뜨거운 물에 설탕을 녹여 시럽 베이스를 만든 달콤 온수 (대안 경로 3)'
  },
  coffee_syrup: {
    id: 'coffee_syrup',
    name: '커피 시럽',
    emoji: '☕',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 2,
    description: '커피와 설탕, 뜨거운 물이 완벽히 융합된 티라미수용 시럽'
  },
  tiramisu_cream: {
    id: 'tiramisu_cream',
    name: '티라미수 크림',
    emoji: '🍦',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 2,
    description: '챕터 1 완성작 순두부 크림치즈에 꿀을 더해 완성한 최고급 디저트 크림'
  },
  soaked_biscuit_base: {
    id: 'soaked_biscuit_base',
    name: '촉촉해진 다이제 베이스',
    emoji: '🥠',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 2,
    description: '진한 커피 시럽을 충분히 적셔 풍미가 스며든 촉촉 쿠키 시트'
  },
  dry_biscuit_layered: {
    id: 'dry_biscuit_layered',
    name: '바삭한 레이어드 컵',
    emoji: '🍨',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 2,
    description: '다이제 시트 위에 먼저 크림치즈를 올린 레이어 컵 (대안 경로 4)'
  },
  layered_tiramisu_cup: {
    id: 'layered_tiramisu_cup',
    name: '1차 레이어드 컵',
    emoji: '🥛',
    category: 'intermediate',
    tier: 'tier2',
    chapter: 2,
    description: '촉촉한 쿠키 시트 위에 퐁당 티라미수 크림을 켜켜이 쌓은 유리컵'
  },
  topped_tiramisu_ready: {
    id: 'topped_tiramisu_ready',
    name: '완성 직전 티라미수 (토핑 완료)',
    emoji: '🍮',
    category: 'intermediate',
    tier: 'final_ready',
    chapter: 2,
    description: '코코아 파우더를 듬뿍 솔솔 뿌려 이제 냉장 숙성을 기다리는 티라미수'
  },
  tofu_tiramisu: {
    id: 'tofu_tiramisu',
    name: '노오븐 순두부 티라미수',
    emoji: '🍮✨',
    category: 'final',
    tier: 'final',
    chapter: 2,
    description: '차가운 냉장 휴지를 거쳐 입안에서 사르르 녹아내리는 챕터 2의 완성 디저트!'
  }
};

// 챕터 1 및 챕터 2 전수 대안 경로 포함 조합 규칙 테이블
export const COMBINATION_RULES: CombinationRule[] = [
  // --- 챕터 1 기존 & 대안 경로 ---
  { ingredientA: 'soft_tofu', ingredientB: 'salt', resultId: 'seasoned_tofu' },
  { ingredientA: 'seasoned_tofu', ingredientB: 'lemon_juice', resultId: 'refreshing_tofu_base' },
  
  // ★ 챕터 1 대안 경로 1: 레시피 산미 우선
  { ingredientA: 'soft_tofu', ingredientB: 'lemon_juice', resultId: 'acidic_tofu' },
  { ingredientA: 'acidic_tofu', ingredientB: 'salt', resultId: 'refreshing_tofu_base' },

  // ★ 챕터 1 대안 경로 2: 크림치즈에 소금 밑간 우선
  { ingredientA: 'cream_cheese', ingredientB: 'salt', resultId: 'salted_cream_cheese' },
  { ingredientA: 'salted_cream_cheese', ingredientB: 'condensed_milk', resultId: 'sweet_cream_base' },

  { ingredientA: 'cream_cheese', ingredientB: 'condensed_milk', resultId: 'sweet_cream_base' },
  { ingredientA: 'refreshing_tofu_base', ingredientB: 'sweet_cream_base', resultId: 'tofu_cream' },
  { ingredientA: 'tofu_cream', ingredientB: 'corn_starch', resultId: 'stabilized_tofu_cream' },

  // --- 챕터 2 기존 & 대안 경로 ---
  { ingredientA: 'instant_coffee', ingredientB: 'sugar_c2', resultId: 'sweet_coffee_powder' },
  { ingredientA: 'sweet_coffee_powder', ingredientB: 'hot_water', resultId: 'coffee_syrup' },

  { ingredientA: 'instant_coffee', ingredientB: 'hot_water', resultId: 'strong_coffee_water' },
  { ingredientA: 'strong_coffee_water', ingredientB: 'sugar_c2', resultId: 'coffee_syrup' },

  // ★ 챕터 2 대안 경로 3: 설탕물 시럽 먼저 만들기
  { ingredientA: 'sugar_c2', ingredientB: 'hot_water', resultId: 'sugar_water' },
  { ingredientA: 'sugar_water', ingredientB: 'instant_coffee', resultId: 'coffee_syrup' },

  // --- 챕터 2 공통 & 대안 레이어드 규칙 ---
  { ingredientA: 'tofu_cream_cheese', ingredientB: 'honey', resultId: 'tiramisu_cream' },
  { ingredientA: 'digestive_biscuit', ingredientB: 'coffee_syrup', resultId: 'soaked_biscuit_base' },
  { ingredientA: 'soaked_biscuit_base', ingredientB: 'tiramisu_cream', resultId: 'layered_tiramisu_cup' },

  // ★ 챕터 2 대안 경로 4: 바삭한 다이제 위에 크림치즈 먼저 쌓기
  { ingredientA: 'digestive_biscuit', ingredientB: 'tiramisu_cream', resultId: 'dry_biscuit_layered' },
  { ingredientA: 'dry_biscuit_layered', ingredientB: 'coffee_syrup', resultId: 'layered_tiramisu_cup' },

  { ingredientA: 'layered_tiramisu_cup', ingredientB: 'cocoa_powder', resultId: 'topped_tiramisu_ready' },
];

export function combineIngredients(id1: string, id2: string): Ingredient | null {
  if (!id1 || !id2 || id1 === id2) {
    return null;
  }

  const foundRule = COMBINATION_RULES.find(rule => 
    (rule.ingredientA === id1 && rule.ingredientB === id2) ||
    (rule.ingredientA === id2 && rule.ingredientB === id1)
  );

  if (!foundRule) {
    return null;
  }

  return INGREDIENTS_DB[foundRule.resultId] || null;
}

// 스승 온 톤 교정: 반말이되 다정하고 위엄 있는 스승의 톤 (제네릭 접두사 제거!)
export const ON_SIMPLE_REACTION_DIALOGUES = [
  "베이킹은 무작정 섞는 게 아니다. 재료의 성질을 먼저 생각하렴.",
  "크림치즈와 그 재료는 서로 겉도는구나. 조합을 다시 점검해보렴.",
  "음... 반응이 일어나지 않는구나. 다른 재료 조합을 차근차근 시도해보거라.",
  "서두르지 말고 내가 알려준 조리법의 순서를 천천히 복습해보려무나.",
  "믹싱볼 안에서 재료가 조화를 이루지 못했어. 콩의 비린내를 잡는 기본부터 생각해볼까?"
];

/**
 * 3단계 힌트 생성기 (반말이되 다정하고 위엄 있는 스승 톤)
 */
export const getStepwiseMentorDialogue = (sameComboFailCount: number, chapter: number = 1): string => {
  if (sameComboFailCount < 3) {
    const randomIndex = Math.floor(Math.random() * ON_SIMPLE_REACTION_DIALOGUES.length);
    return ON_SIMPLE_REACTION_DIALOGUES[randomIndex];
  }

  if (sameComboFailCount >= 3 && sameComboFailCount < 5) {
    if (chapter === 2) {
      return "커피의 풍미를 우려내는 순서를 다르게 생각해보렴. 물을 먼저 부어 진하게 녹이거나 설탕을 타서 우려내야 할 수도 있단다.";
    }
    return "기본부터 차근차근 점검해보렴. 순두부의 콩 맛을 살려줄 소금 밑간이나 레몬의 산미를 먼저 조합해보는 건 어떠냐?";
  }

  if (chapter === 2) {
    return "인스턴트커피를 '뜨거운 물'이나 '설탕'과 먼저 조합하여 향긋한 커피 시럽부터 만들어보려무나!";
  }
  return "순두부에는 먼저 '소금'을 살짝 쳐서 밑간을 하거나 '레몬즙'을 더해야 산뜻한 크림 베이스로 나아갈 수 있단다.";
};

// 수동 힌트 버튼 클릭 시 현재 플레이어의 해금 상태를 분석하여 가장 가까운 다음 조합 힌트 제공
export const getManualHintDialogue = (chapter: number, unlockedIngredients: string[]): string => {
  if (chapter === 1) {
    if (!unlockedIngredients.includes('seasoned_tofu') && !unlockedIngredients.includes('acidic_tofu')) {
      return "순두부에 '소금'을 쳐서 밑간을 하거나, '레몬즙'을 넣어 콩 비린내를 먼저 잡아보려무나.";
    }
    if (!unlockedIngredients.includes('sweet_cream_base')) {
      return "크림치즈와 '연유'나 '소금'을 짝지어 묵직하고 달콤한 크림치즈 베이스를 만들어보렴.";
    }
    if (!unlockedIngredients.includes('tofu_cream')) {
      return "만들어둔 순두부 베이스와 달콤한 크림치즈 베이스를 하나로 합쳐 풍미를 완성해보거라.";
    }
    if (!unlockedIngredients.includes('stabilized_tofu_cream')) {
      return "순두부 크림에 '옥수수전분'을 넣어야 중탕 열기를 견딜 수 있는 단단함이 생겨난단다.";
    }
    return "모든 재료 준비가 끝났으니, 우측 상단의 [♨️ 중탕하러 가기] 버튼을 눌러 마무리를 지으렴!";
  } else {
    if (!unlockedIngredients.includes('coffee_syrup')) {
      return "인스턴트커피, 설탕, 뜨거운 물 중 두 재료를 먼저 짝지어 향긋한 '커피 시럽'을 완성해보렴.";
    }
    if (!unlockedIngredients.includes('tiramisu_cream')) {
      return "챕터 1 완성작인 '순두부 크림치즈'에 달콤한 '꿀'을 섞어 부드러운 티라미수 크림을 만들어보거라.";
    }
    if (!unlockedIngredients.includes('soaked_biscuit_base')) {
      return "다이제 쿠키 시트에 만들어둔 '커피 시럽'을 듬뿍 적셔 촉촉한 시트를 준비해보렴.";
    }
    if (!unlockedIngredients.includes('layered_tiramisu_cup')) {
      return "촉촉해진 쿠키 시트와 꿀을 품은 티라미수 크림을 유리컵에 차곡차곡 레이어드해보려무나.";
    }
    if (!unlockedIngredients.includes('topped_tiramisu_ready')) {
      return "마지막으로 컵 위에 '무가당 코코아파우더'를 솔솔 뿌려 마무리를 짓거라!";
    }
    return "모든 탑이 완성되었으니, 우측 상단의 [❄️ 냉장 휴지하러 가기] 버튼을 눌러 차갑게 굳히렴!";
  }
};

export const getOnHintDialogue = (consecutiveFails: number, chapter: number = 1): string => {
  return getStepwiseMentorDialogue(consecutiveFails, chapter);
};
