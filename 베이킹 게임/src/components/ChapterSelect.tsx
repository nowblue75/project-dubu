import React from 'react';
import { type SaveData } from '../services/saveSystem';
import { IMAGES } from '../assets/images';
import './ChapterSelect.css';

interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  recipeId: string;
  imageSrc?: string;
  emoji: string;
  description: string;
}

interface ChapterSelectProps {
  saveData: SaveData;
  onSelectChapter: (chapterId: number) => void;
  onBackToTitle: () => void;
  onOpenJournal: () => void;
}

export const CHAPTER_LIST: ChapterInfo[] = [
  {
    id: 1,
    title: '챕터 1: 순두부 크림치즈',
    subtitle: '오븐 없이 중탕 하나로 완성하는 촉촉한 순두부 디저트',
    recipeId: 'tofu_cream_cheese',
    imageSrc: IMAGES.tofuCreamCheese,
    emoji: '🍨🧀',
    description: '순두부와 소금, 레몬즙, 크림치즈, 연유, 전분을 섞어 만드는 기초 노오븐 디저트'
  },
  {
    id: 2,
    title: '챕터 2: 노오븐 순두부 티라미수',
    subtitle: '챕터 1의 크림치즈와 커피 시럽, 쿠키 시트의 고소한 조화',
    recipeId: 'tofu_tiramisu',
    imageSrc: IMAGES.tofuTiramisu,
    emoji: '🍮☕',
    description: '챕터 1 완성작 순두부 크림치즈를 흡수하여 만드는 차가운 저온 냉숙성 티라미수'
  },
  {
    id: 3,
    title: '챕터 3: 미지의 디저트',
    subtitle: '스승 온(溫)의 비밀 수첩에 적힌 다음 디저트',
    recipeId: 'unknown_chapter_3',
    emoji: '❓',
    description: '다음 업데이트에서 공개됩니다.'
  },
];

export const ChapterSelect: React.FC<ChapterSelectProps> = ({
  saveData,
  onSelectChapter,
  onBackToTitle,
  onOpenJournal,
}) => {
  const getChapterStatus = (chapter: ChapterInfo): 'completed' | 'unlocked' | 'locked' => {
    if (chapter.id === 1) {
      return saveData.recipes.includes(chapter.recipeId) ? 'completed' : 'unlocked';
    }

    const prevChapterRecipe = CHAPTER_LIST.find(ch => ch.id === chapter.id - 1)?.recipeId;
    if (prevChapterRecipe && saveData.recipes.includes(prevChapterRecipe)) {
      return saveData.recipes.includes(chapter.recipeId) ? 'completed' : 'unlocked';
    }

    return 'locked';
  };

  return (
    <div className="chapter-select-container glass-panel animate-fade-in">
      {/* 헤더 네비게이션 */}
      <div className="select-header">
        <button className="back-btn title-back-btn" onClick={onBackToTitle}>
          🏠 타이틀로
        </button>
        <h2 className="select-title">📂 챕터 선택 (Select Chapter)</h2>
        <button className="back-btn journal-nav-btn" onClick={onOpenJournal}>
          📖 디저트 도감
        </button>
      </div>

      {/* 챕터 목록 */}
      <div className="chapter-list-scroll">
        {CHAPTER_LIST.map(chapter => {
          const status = getChapterStatus(chapter);
          const isPlayable = status !== 'locked';

          return (
            <div 
              key={chapter.id} 
              className={`chapter-card ${status} ${isPlayable ? 'playable' : ''}`}
              onClick={() => isPlayable && onSelectChapter(chapter.id)}
            >
              <div className="card-left flex-center">
                {chapter.imageSrc ? (
                  <img src={chapter.imageSrc} alt={chapter.title} className="chapter-thumb-img" />
                ) : (
                  <span className="chapter-emoji">{chapter.emoji}</span>
                )}
              </div>

              <div className="card-center">
                <div className="card-title-row">
                  <h3 className="card-chapter-title">{chapter.title}</h3>
                  {status === 'completed' && <span className="status-badge completed">✅ 완료</span>}
                  {status === 'unlocked' && <span className="status-badge unlocked">🧪 진행 중</span>}
                  {status === 'locked' && <span className="status-badge locked">🔒 잠김</span>}
                </div>
                <p className="card-subtitle">{chapter.subtitle}</p>
                <p className="card-desc">{chapter.description}</p>
              </div>

              <div className="card-right flex-center">
                {isPlayable ? (
                  <button className="cozy-button play-chapter-btn">
                    {status === 'completed' ? '다시 만들기 ➔' : '도전하기 ➔'}
                  </button>
                ) : (
                  <span className="lock-text">이전 챕터 완성 필요</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
