import React, { useState } from 'react';
import { INGREDIENTS_DB, COMBINATION_RULES, combineIngredients, getManualHintDialogue, type Ingredient } from '../logic/combinationLogic';
import { IMAGES } from '../assets/images';
import './BakingTable.css';

interface BakingTableProps {
  currentChapter: number;
  onOpenChapterSelect: () => void;
  unlockedIngredients: string[];
  unlockedRecipes: string[];
  onIngredientUnlocked: (id: string) => void;
  onReadyForBainMarie: () => void;
  onReadyForChilling: () => void;
  onBackToBook: () => void;
  onBackToTitle: () => void;
  onOpenJournal: () => void;
}

export const BakingTable: React.FC<BakingTableProps> = ({
  currentChapter,
  onOpenChapterSelect,
  unlockedIngredients,
  unlockedRecipes,
  onIngredientUnlocked,
  onReadyForBainMarie,
  onReadyForChilling,
  onBackToBook,
  onBackToTitle,
  onOpenJournal
}) => {
  const ch1DefaultBaseIds = ['soft_tofu', 'salt', 'lemon_juice', 'cream_cheese', 'condensed_milk', 'corn_starch'];
  const ch2DefaultBaseIds = ['honey', 'instant_coffee', 'sugar_c2', 'hot_water', 'digestive_biscuit', 'cocoa_powder'];

  if (unlockedRecipes.includes('tofu_cream_cheese') && !ch2DefaultBaseIds.includes('tofu_cream_cheese')) {
    ch2DefaultBaseIds.push('tofu_cream_cheese');
  }

  const currentDefaultBaseIds = currentChapter === 1 ? ch1DefaultBaseIds : ch2DefaultBaseIds;
  
  // 현재 작업대 세션에서 실제 해금/생성된 아이디 목록
  const sessionUnlockedIds = Array.from(new Set([...currentDefaultBaseIds, ...unlockedIngredients]));
  
  const availableIngredients: Ingredient[] = sessionUnlockedIds
    .map(id => INGREDIENTS_DB[id])
    .filter(ing => {
      if (!ing) return false;
      if (currentChapter === 1) return ing.chapter === 1;
      return ing.chapter === 2 || ing.id === 'tofu_cream_cheese';
    });

  /**
   * 🐛 중요 버그 수정: 다 쓴 재료(Used) 판별 엄격 로직
   * 원재료(raw)의 경우 현재 세션 내에서 유효한 파생 재료가 '실제로 인벤토리에 만들어졌는지' 확인하고,
   * 새 게임/이전 세이브 해금 기록으로 인해 옥수수전분 등이 시작부터 Used로 오인되는 문제를 완벽 해결.
   */
  const isMaterialUsedUp = (ingId: string): boolean => {
    const ing = INGREDIENTS_DB[ingId];
    if (!ing || ing.tier === 'final' || ing.tier === 'final_ready') return false;

    // 해당 재료가 포함될 수 있는 유효한 규칙 목록
    const validRulesForIng = COMBINATION_RULES.filter(
      rule => rule.ingredientA === ingId || rule.ingredientB === ingId
    );

    if (validRulesForIng.length === 0) return false;

    // 원재료(raw)의 경우: 현재 작업대에 바로 다음 단계 파생 재료가 '이미 만들어져서' 존재하는 경우에만 원재료 소진으로 처리
    if (ing.tier === 'raw') {
      const hasDirectDerivedInSession = validRulesForIng.some(rule => 
        unlockedIngredients.includes(rule.resultId)
      );

      // 예: 순두부에 소금이 더해져 '밑간된 순두부'나 '산뜻한 순두부 베이스'가 이미 생성되어 인벤토리에 있다면 원재료는 사용 완료
      return hasDirectDerivedInSession;
    }

    // 1차/2차 중간 재료인 경우: 상위 조합물이 만들어졌다면 소진 처리
    const hasNextTierDerived = validRulesForIng.some(rule => unlockedIngredients.includes(rule.resultId));
    return hasNextTierDerived;
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    currentChapter === 1 
      ? "재료 2개를 선택해 [순두부 크림치즈]의 조합을 시작하세요!"
      : "재료 2개를 선택해 [순두부 티라미수]의 조합을 시작하세요!"
  );

  const [onDialoguePopup, setOnDialoguePopup] = useState<string | null>(null);
  const [popupExpressionImg, setPopupExpressionImg] = useState<string>(IMAGES.on01);
  const [manualHintText, setManualHintText] = useState<string | null>(null);
  const [lastDiscovered, setLastDiscovered] = useState<Ingredient | null>(null);

  const [animState, setAnimState] = useState<'idle' | 'success' | 'fail'>('idle');
  const [sameComboFailCount, setSameComboFailCount] = useState<number>(0);

  const triggerAnim = (type: 'success' | 'fail') => {
    setAnimState(type);
    setTimeout(() => {
      setAnimState('idle');
    }, 600);
  };

  const handleSelectIngredient = (id: string) => {
    setOnDialoguePopup(null);
    setLastDiscovered(null);
    setManualHintText(null);

    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(prev => prev.filter(item => item !== id));
      return;
    }

    if (selectedIngredients.length >= 2) {
      setFeedbackMessage("믹싱볼에는 2개의 재료만 담을 수 있습니다.");
      return;
    }

    setSelectedIngredients(prev => [...prev, id]);
    const ingName = INGREDIENTS_DB[id]?.name;
    setFeedbackMessage(`믹싱볼에 [${ingName}]을(를) 투입했습니다.`);
  };

  const handleCombine = () => {
    if (selectedIngredients.length !== 2) {
      setFeedbackMessage("조합을 위해 2개의 재료를 담아주세요!");
      return;
    }

    setOnDialoguePopup(null);
    setLastDiscovered(null);
    setManualHintText(null);

    const [ing1, ing2] = selectedIngredients;
    const result = combineIngredients(ing1, ing2);

    if (result) {
      triggerAnim('success');
      setSelectedIngredients([]);
      onIngredientUnlocked(result.id);
      setLastDiscovered(result);

      if (result.tier === 'final_ready') {
        setFeedbackMessage(`✨ 성공! [${result.name}] 완성! 이제 다음 제스처 단계로 이동할 수 있습니다.`);
        setPopupExpressionImg(IMAGES.on02);
        setOnDialoguePopup(`훌륭하구나! [${result.name}]이(가) 완성되었으니 우측의 제스처 버튼을 눌러 마무리를 짓거라!`);
      } else {
        setFeedbackMessage(`🎉 신규 조합 발견: [${result.name}] 생성 완료!`);
        setPopupExpressionImg(IMAGES.on03);
        setOnDialoguePopup(`오! [${result.name}]을(를) 새로 만들어냈구나. 성질을 고려한 멋진 조합이다!`);
      }
      setSameComboFailCount(0);
    } else {
      triggerAnim('fail');
      setSelectedIngredients([]);
      setSameComboFailCount(prev => prev + 1);

      setFeedbackMessage("조합에 실패했습니다. 재료의 성질을 다시 고려해보세요.");
      setPopupExpressionImg(IMAGES.on04);

      if (sameComboFailCount + 1 >= 3) {
        setOnDialoguePopup("서두르지 말고 차근차근 점검해보렴. 수동 힌트 버튼을 눌러 다음 길을 확인해보는 건 어떠냐?");
      } else {
        setOnDialoguePopup("음... 믹싱볼 안에서 두 재료가 서로 조화를 이루지 못하고 겉도는구나.");
      }
    }
  };

  const handleShowManualHint = () => {
    const hint = getManualHintDialogue(currentChapter, sessionUnlockedIds);
    setManualHintText(hint);
    setPopupExpressionImg(IMAGES.on02);
    setOnDialoguePopup(hint);
  };

  const isCh1FinalReady = sessionUnlockedIds.includes('stabilized_tofu_cream');
  const isCh2FinalReady = sessionUnlockedIds.includes('topped_tiramisu_ready');

  return (
    <div className="baking-table-container animate-fade-in">
      {/* 🛡️ 상단 헤더: 고정 규격 Potion Craft 탭 */}
      <header className="baking-header glass-panel flex-center">
        <div className="header-left flex-center">
          <button className="header-nav-btn" onClick={onBackToTitle}>
            🏠 메인
          </button>
          <button className="header-nav-btn" onClick={onOpenChapterSelect}>
            🗺️ 챕터 지도
          </button>
          <div className="chapter-badge">
            <span className="ch-num">CHAPTER {currentChapter}</span>
            <span className="ch-title" title={currentChapter === 1 ? '순두부 크림치즈' : '노오븐 순두부 티라미수'}>
              {currentChapter === 1 ? '순두부 크림치즈' : '노오븐 순두부 티라미수'}
            </span>
          </div>
        </div>

        <div className="header-right flex-center">
          <button className="header-tab-btn active" title="조립 작업대">
            🧪 조합 작업대
          </button>
          <button className="header-tab-btn" onClick={onBackToBook} title="스승 레시피북">
            📜 스승 레시피북
          </button>
          <button className="header-tab-btn journal-link-btn" onClick={onOpenJournal} title="디저트 수집 도감">
            📖 디저트 도감
          </button>
        </div>
      </header>

      {/* 📐 Potion Craft 3-패널 그리드 메인 레이아웃 */}
      <main className="baking-main-grid">
        {/* 👈 1. 좌측 패널: 보유 재료 선반 (Ingredients Shelf) */}
        <section className="panel-left glass-panel">
          <div className="panel-title-bar">
            <h3>🧺 보유 재료 선반</h3>
            <span className="ing-count-badge">{availableIngredients.length}종 해금</span>
          </div>

          <div className="ingredients-grid-scroll">
            {availableIngredients.map(ing => {
              const isSelected = selectedIngredients.includes(ing.id);
              const isUsedUp = isMaterialUsedUp(ing.id);

              return (
                <div
                  key={ing.id}
                  className={`ingredient-card ${isSelected ? 'selected' : ''} ${isUsedUp ? 'used-up-dimmed' : ''}`}
                  onClick={() => handleSelectIngredient(ing.id)}
                  title={isUsedUp ? '현재 단계에서 이미 소비된 재료입니다.' : ing.description}
                >
                  <div className="card-top-icon">
                    <span className="ing-emoji">{ing.emoji}</span>
                    {isSelected && <span className="selected-check">✓</span>}
                  </div>
                  <div className="ing-info">
                    <span className="ing-name">{ing.name}</span>
                    {isUsedUp ? (
                      <span className="used-tag">(사용 완료)</span>
                    ) : (
                      <span className="tier-tag">{ing.tier === 'raw' ? '원재료' : '조합물'}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🥣 2. 중앙 패널: 믹싱볼 조리대 (Mixing Workbench) */}
        <section className="panel-center glass-panel flex-center">
          {/* 스승 온 대사 슬롯 (고정 높이 68px로 하단 버튼 밀림 100% 방지) */}
          <div className="mentor-dialogue-slot mentor-tone-basic flex-center">
            <img src={popupExpressionImg} alt="스승 온" className="mentor-thumb-img" />
            <div className="mentor-speech-box">
              <span className="mentor-name">스승 온(溫):</span>
              <p className="mentor-speech-text">
                {onDialoguePopup || "재료의 성질을 생각하며 믹싱볼에 2개씩 담아 조합해보렴."}
              </p>
            </div>
          </div>

          {/* 오가닉 믹싱볼 뷰 */}
          <div className={`mixing-bowl-stage flex-center ${animState}`}>
            <div className="bowl-graphic flex-center">
              <div className="bowl-rim"></div>
              <div className="bowl-interior flex-center">
                {selectedIngredients.length === 0 && (
                  <span className="bowl-placeholder">재료 2개를 선택해 투입하세요</span>
                )}
                {selectedIngredients.map(id => (
                  <div key={id} className="selected-in-bowl animate-pop flex-center">
                    <span>{INGREDIENTS_DB[id]?.emoji}</span>
                    <label>{INGREDIENTS_DB[id]?.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 피드백 안내 바 */}
          <div className="feedback-bar flex-center">
            <p className="feedback-text">{feedbackMessage}</p>
          </div>

          {/* 중앙 조작 버튼부 (위치 고정) */}
          <div className="workbench-actions flex-center">
            <button
              className="cozy-button mix-btn"
              onClick={handleCombine}
              disabled={selectedIngredients.length !== 2}
            >
              ✨ 재료 조합하기
            </button>

            {currentChapter === 1 && isCh1FinalReady && (
              <button className="cozy-button ready-bain-marie-btn animate-pulse" onClick={onReadyForBainMarie}>
                ♨️ 중탕하러 가기 ➔
              </button>
            )}

            {currentChapter === 2 && isCh2FinalReady && (
              <button className="cozy-button ready-chilling-btn animate-pulse" onClick={onReadyForChilling}>
                ❄️ 냉장 휴지하러 가기 ➔
              </button>
            )}
          </div>
        </section>

        {/* 📜 3. 우측 패널: 레시피 목표 & 수동 힌트 (Recipe & Hints) */}
        <section className="panel-right glass-panel">
          <div className="panel-title-bar">
            <h3>📜 챕터 조합 목표</h3>
          </div>

          <div className="recipe-target-card flex-center">
            <img
              src={currentChapter === 1 ? IMAGES.tofuCreamCheese : IMAGES.tofuTiramisu}
              alt="목표 디저트"
              className="target-dessert-img"
            />
            <div className="target-info">
              <h4>{currentChapter === 1 ? '순두부 크림치즈' : '노오븐 순두부 티라미수'}</h4>
              <p>{currentChapter === 1 ? '순두부의 콩 비린내를 잡고 치즈와 조화' : '순두부 크림치즈와 커피 시럽의 냉숙성 레이어'}</p>
            </div>
          </div>

          {/* 수동 힌트 카드 */}
          <div className="manual-hint-card">
            <div className="hint-header flex-center">
              <span className="hint-title">💡 스승의 조언 힌트</span>
              <button className="cozy-button manual-hint-btn" onClick={handleShowManualHint}>
                💡 힌트 보기
              </button>
            </div>
            <p className="hint-body">
              {manualHintText || "막힐 때는 언제든 [힌트 보기]를 누르면 스승 온이 다음 조합 길을 알려줍니다."}
            </p>
          </div>

          {/* 최근 발견한 조합물 트레이 */}
          <div className="discovered-tray">
            <h4>🧪 새로 발견한 조합물</h4>
            {lastDiscovered ? (
              <div className="discovered-item flex-center animate-fade-in">
                <span className="d-emoji">{lastDiscovered.emoji}</span>
                <div className="d-text">
                  <strong>{lastDiscovered.name}</strong>
                  <p>{lastDiscovered.description}</p>
                </div>
              </div>
            ) : (
              <p className="tray-empty-text">조합을 완성하면 이곳에 조합물의 정보가 기록됩니다.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
