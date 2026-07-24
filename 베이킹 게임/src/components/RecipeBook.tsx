import React, { useState } from 'react';
import { IMAGES } from '../assets/images';
import { type SaveData } from '../services/saveSystem';
import './RecipeBook.css';

interface DialogueLine {
  speaker: string;
  text: string;
}

interface RecipeBookProps {
  currentChapter?: number;
  saveData?: SaveData | null;
  dialogueStep: number;
  onDialogueComplete: () => void;
  onBackToTitle?: () => void;
  mentorAffection: number;
}

export const RecipeBook: React.FC<RecipeBookProps> = ({
  currentChapter = 1,
  saveData,
  onDialogueComplete,
  onBackToTitle,
  mentorAffection,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // 요구사항 2: 반말이되 다정하고 위엄 있는 스승 온 말투 통일!
  const getContextualDialogues = (): DialogueLine[] => {
    const isCh1Completed = saveData?.recipes.includes('tofu_cream_cheese');
    const isCh2Completed = saveData?.recipes.includes('tofu_tiramisu');

    // 1. 챕터 1 & 2 모두 완성한 베테랑
    if (isCh1Completed && isCh2Completed) {
      return [
        { speaker: '온 (溫)', text: '어느새 훌륭한 노오븐 순두부 베이커가 되었구나!' },
        { speaker: '온 (溫)', text: '순두부 크림치즈와 차가운 티라미수까지... 제 레시피북의 핵심 지혜를 모두 흡수했단다.' },
        { speaker: '온 (溫)', text: '언제든 레시피북을 펼쳐 나만의 배합 비율을 점검하고, 다음 미지의 챕터를 준비하려무나.' }
      ];
    }

    // 2. 챕터 1 완성 후 챕터 2 진행 중
    if (isCh1Completed && currentChapter === 2) {
      return [
        { speaker: '온 (溫)', text: '챕터 1의 순두부 크림치즈를 마침내 성공시켰구나! 아주 대견하다.' },
        { speaker: '온 (溫)', text: '이제 챕터 2에서는 방금 만든 크림치즈와 커피 시럽, 쿠키 시트를 켜켜이 쌓아 차가운 티라미수를 만들 차례란다.' },
        { speaker: '온 (溫)', text: '서두르지 말고 커피의 풍미와 저온 냉장 휴지를 잘 활용해보려무나.' }
      ];
    }

    // 3. 챕터 1 작업대 진행 중 (조합 1개 이상 해금)
    const unlockedIngCount = saveData?.ingredients.length || 0;
    if (unlockedIngCount > 6) {
      return [
        { speaker: '온 (溫)', text: `믹싱볼에서 새로운 조합을 찾아내 인벤토리에 ${unlockedIngCount}종의 재료가 모였구나!` },
        { speaker: '온 (溫)', text: '순두부 크림치즈를 완성하려면 순두부 밑간부터 시작해 전분으로 단단하게 안정화시켜야 한단다.' },
        { speaker: '온 (溫)', text: '막힐 때는 언제든 두 재료의 성질을 생각해보렴. 준비가 되었다면 조합 작업대로 이동하자.' }
      ];
    }

    // 4. 최초 1회 입문 대사 (다정하고 위엄 있는 스승 톤)
    return [
      { speaker: '온 (溫)', text: '어 오셨는가? 제 오래된 레시피북을 펼친 걸 보니... 순두부 베이킹을 배우러 왔구나.' },
      { speaker: '온 (溫)', text: '디저트는 꼭 오븐이 있어야만 만드는 게 아니다. 순두부와 따뜻한 정성만 있다면 노오븐으로도 정갈한 치즈를 굳힐 수 있단다.' },
      { speaker: '온 (溫)', text: '자, 먼저 믹싱볼에 콩의 비린내를 잡고 부드러운 산미를 더할 재료들을 하나씩 조합해보려무나.' },
      { speaker: '온 (溫)', text: '두 가지 재료를 짝지어 만드는 기초 공정부터 시작해보자. 준비가 되었다면 작업대로 이동하자!' },
    ];
  };

  const dialogues = getContextualDialogues();
  const currentDialogue = dialogues[currentLineIndex] || dialogues[0];

  const handleNextLine = () => {
    if (currentLineIndex < dialogues.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      onDialogueComplete();
    }
  };

  return (
    <div className="recipe-book-container glass-panel animate-fade-in flex-center">
      <div className="book-header flex-center">
        {onBackToTitle && (
          <button className="back-btn title-back-btn" onClick={onBackToTitle}>
            🏠 타이틀로
          </button>
        )}
        <h2 className="book-title">📖 스승 온(溫)의 낡은 레시피북</h2>
        <div className="affection-badge">친밀도 Lv.{mentorAffection}</div>
      </div>

      <div className="book-content flex-center">
        <div className="mentor-section flex-center">
          <div className="mentor-avatar-frame animate-float">
            <img src={IMAGES.on01} alt="스승 온(溫) 기본 표정" className="mentor-img" />
          </div>
          <div className="mentor-name-tag">스승 온 (溫)</div>
        </div>

        <div className="dialogue-box mentor-tone-basic" onClick={handleNextLine}>
          <div className="speaker-name">{currentDialogue.speaker}</div>
          <p className="dialogue-text">{currentDialogue.text}</p>
          <div className="click-hint">클릭하여 다음 대화 ({currentLineIndex + 1}/{dialogues.length}) ➔</div>
        </div>
      </div>
    </div>
  );
};
