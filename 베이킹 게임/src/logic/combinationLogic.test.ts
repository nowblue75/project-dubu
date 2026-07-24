import { describe, it, expect } from 'vitest';
import { combineIngredients, getManualHintDialogue } from './combinationLogic';

describe('순두부 베이킹 어드벤처 - 조합 알고리즘 전수 대안 경로 검증', () => {
  describe('챕터 1 대안 경로 테스트', () => {
    it('기존 경로: 순두부 + 소금 ➔ 밑간된 순두부 ➔ (+레몬즙) ➔ 산뜻한 순두부 베이스', () => {
      const s1 = combineIngredients('soft_tofu', 'salt');
      expect(s1?.id).toBe('seasoned_tofu');

      const s2 = combineIngredients(s1!.id, 'lemon_juice');
      expect(s2?.id).toBe('refreshing_tofu_base');
    });

    it('★ 챕터 1 대안 경로 1: 순두부 + 레몬즙 ➔ 레몬 순두부 ➔ (+소금) ➔ 산뜻한 순두부 베이스 (동일 수렴!)', () => {
      const alt1 = combineIngredients('soft_tofu', 'lemon_juice');
      expect(alt1?.id).toBe('acidic_tofu');
      expect(alt1?.name).toBe('레몬 순두부');

      const alt2 = combineIngredients(alt1!.id, 'salt');
      expect(alt2?.id).toBe('refreshing_tofu_base');
    });

    it('★ 챕터 1 대안 경로 2: 크림치즈 + 소금 ➔ 단짠 크림치즈 ➔ (+연유) ➔ 달콤 크림 베이스 (동일 수렴!)', () => {
      const alt1 = combineIngredients('cream_cheese', 'salt');
      expect(alt1?.id).toBe('salted_cream_cheese');
      expect(alt1?.name).toBe('단짠 크림치즈');

      const alt2 = combineIngredients(alt1!.id, 'condensed_milk');
      expect(alt2?.id).toBe('sweet_cream_base');
    });
  });

  describe('챕터 2 대안 경로 테스트', () => {
    it('★ 챕터 2 대안 경로 3: 설탕 + 뜨거운 물 ➔ 단맛 뜨거운 물 ➔ (+인스턴트커피) ➔ 커피 시럽 (동일 수렴!)', () => {
      const alt1 = combineIngredients('sugar_c2', 'hot_water');
      expect(alt1?.id).toBe('sugar_water');
      expect(alt1?.name).toBe('단맛 뜨거운 물');

      const alt2 = combineIngredients(alt1!.id, 'instant_coffee');
      expect(alt2?.id).toBe('coffee_syrup');
    });

    it('★ 챕터 2 대안 경로 4: 다이제 + 티라미수 크림 ➔ 바삭한 레이어드 컵 ➔ (+커피 시럽) ➔ 1차 레이어드 컵 (동일 수렴!)', () => {
      const alt1 = combineIngredients('digestive_biscuit', 'tiramisu_cream');
      expect(alt1?.id).toBe('dry_biscuit_layered');

      const alt2 = combineIngredients(alt1!.id, 'coffee_syrup');
      expect(alt2?.id).toBe('layered_tiramisu_cup');
    });
  });

  describe('수동 힌트 생성기 검증', () => {
    it('챕터 1 시작 시 밑간 힌트를 제공해야 한다', () => {
      const hint = getManualHintDialogue(1, ['soft_tofu', 'salt']);
      expect(hint).toContain('순두부');
    });
  });
});
