import { invoke } from '@tauri-apps/api/core';

export interface CustomRecipeRecord {
  condensedMilkRatio?: number;
  tofuMoistureLevel?: number;
  acidSubstituted?: boolean;
  saltRatio?: number;
  sweetenerType?: string;
  baseType?: string;
  toppingType?: string;
  customRecipeTitle?: string;
  grade?: string; // '명작' | '숙련' | '보통'
  mentorComment?: string;
  attemptCount?: number; // 총 시도 횟수
  gradeCounts?: {
    perfect?: number; // Masterpiece (명작) 횟수
    good?: number;    // 숙련 횟수
    normal?: number;  // 보통 횟수
  };
}

export interface SaveData {
  mentorAffection: number;
  mentorDialogueStep: number;
  ingredients: string[];
  recipes: string[];
  highScores: Record<string, string>;
  customHistory?: Record<string, CustomRecipeRecord>;
}

const DEFAULT_SAVE_DATA: SaveData = {
  mentorAffection: 0,
  mentorDialogueStep: 1,
  ingredients: ['soft_tofu', 'salt', 'lemon_juice', 'cream_cheese', 'condensed_milk', 'corn_starch'],
  recipes: [],
  highScores: {},
  customHistory: {},
};

const LOCAL_STORAGE_KEY = 'soft_tofu_baking_save_v1';

/**
 * 게임 데이터를 세이브 파일 또는 localStorage에 저장합니다.
 */
export async function saveGameData(data: SaveData): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
  } catch (e) {
    console.warn('localStorage 저장 실패:', e);
  }

  try {
    if ((window as any).__TAURI_INTERNALS__) {
      await invoke('save_game', { jsonContent: jsonString });
    }
  } catch (err) {
    console.warn('Tauri save_game 커맨드 실패 (웹 환경 폴백):', err);
  }
}

/**
 * 저장된 세이브 데이터를 불러옵니다.
 */
export async function loadGameData(): Promise<SaveData> {
  try {
    if ((window as any).__TAURI_INTERNALS__) {
      const content = await invoke<string>('load_game');
      if (content) {
        const parsed = JSON.parse(content);
        return {
          ...DEFAULT_SAVE_DATA,
          ...parsed,
          customHistory: parsed.customHistory || {},
        };
      }
    }
  } catch (err) {
    console.warn('Tauri load_game 커맨드 실패/파일없음 (웹 환경 폴백 사용):', err);
  }

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return {
        ...DEFAULT_SAVE_DATA,
        ...parsed,
        customHistory: parsed.customHistory || {},
      };
    }
  } catch (e) {
    console.warn('localStorage 로드 실패:', e);
  }

  return DEFAULT_SAVE_DATA;
}

/**
 * 세이브 데이터를 완전히 초기화합니다 (새로 시작 시 호출).
 */
export async function clearGameData(): Promise<SaveData> {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    console.warn('localStorage 삭제 실패:', e);
  }

  const freshData: SaveData = {
    mentorAffection: 0,
    mentorDialogueStep: 1,
    ingredients: ['soft_tofu', 'salt', 'lemon_juice', 'cream_cheese', 'condensed_milk', 'corn_starch'],
    recipes: [],
    highScores: {},
    customHistory: {},
  };

  await saveGameData(freshData);
  return freshData;
}
