import React from 'react';
import { type SaveData } from '../services/saveSystem';
import { INGREDIENTS_DB } from '../logic/combinationLogic';
import { IMAGES } from '../assets/images';
import './RecipeJournal.css';

interface RecipeJournalProps {
  saveData: SaveData;
  onCloseJournal: () => void;
}

export const RecipeJournal: React.FC<RecipeJournalProps> = ({ saveData, onCloseJournal }) => {
  const isChapter1Unlocked = saveData.recipes.includes('tofu_cream_cheese');
  const isChapter2Unlocked = saveData.recipes.includes('tofu_tiramisu');

  const defaultCh1History = {
    customRecipeTitle: '순두부 크림치즈',
    condensedMilkRatio: 100,
    tofuMoistureLevel: 3,
    acidSubstituted: false,
    saltRatio: 100,
    grade: saveData.highScores['tofu_cream_cheese'] || '명작',
    mentorComment: '수분감과 치즈의 풍미가 은은한 중탕 속에서 완벽한 꾸덕함으로 피어난 순두부 크림치즈다!',
    attemptCount: 1,
    gradeCounts: { perfect: 1, good: 0, normal: 0 }
  };

  const defaultCh2History = {
    customRecipeTitle: '노오븐 순두부 티라미수',
    sweetenerType: 'honey',
    baseType: 'digestive',
    toppingType: 'cocoa',
    grade: saveData.highScores['tofu_tiramisu'] || '명작',
    mentorComment: '챕터 1의 순두부 크림치즈와 다이제 시트, 그리고 차가운 냉숙성이 입안에서 사르르 녹아드는 완벽한 티라미수를 만들어냈구나!',
    attemptCount: 1,
    gradeCounts: { perfect: 1, good: 0, normal: 0 }
  };

  const ch1History: any = saveData.customHistory?.['tofu_cream_cheese'] || (isChapter1Unlocked ? defaultCh1History : null);
  const ch2History: any = saveData.customHistory?.['tofu_tiramisu'] || (isChapter2Unlocked ? defaultCh2History : null);

  const unlockedCount = (isChapter1Unlocked ? 1 : 0) + (isChapter2Unlocked ? 1 : 0);

  const getMoistureLabel = (level?: number) => {
    switch (level) {
      case 1: return "1단계 (수분 촉촉 크림형)";
      case 2: return "2단계 (부드럽고 가벼움)";
      case 3: return "3단계 (황금 밸런스 꾸덕함)";
      case 4: return "4단계 (밀도 높은 단단함)";
      case 5: return "5단계 (극강의 묵직 질감)";
      default: return "3단계 (황금 밸런스)";
    }
  };

  const getBaseLabel = (type?: string) => {
    switch (type) {
      case 'ladyfinger': return '레이디핑거 (정통 시트)';
      case 'wholewheat': return '통밀쿠키 (건강 곡물 시트)';
      default: return '다이제 (고소한 통밀시트)';
    }
  };

  const getToppingLabel = (type?: string) => {
    switch (type) {
      case 'black_sesame': return '흑임자 파우더 (고소함)';
      case 'bean': return '콩가루 (인절미 퓨전)';
      default: return '무가당 코코아파우더 (클래식)';
    }
  };

  // 요구사항 3: 등급별 도전 횟수 포맷터
  const formatGradeDistribution = (counts?: { perfect?: number; good?: number; normal?: number }) => {
    const p = counts?.perfect || 0;
    const g = counts?.good || 0;
    const n = counts?.normal || 0;
    return `명작 ${p}회 · 숙련 ${g}회 · 보통 ${n}회`;
  };

  return (
    <div className="journal-overlay flex-center animate-fade-in">
      <div className="journal-panel glass-panel">
        <div className="journal-header">
          <button className="nav-back-btn" onClick={onCloseJournal}>
            ◀ 이전 화면으로
          </button>
          <h2 className="journal-title">📖 프로젝트 두부: 디저트 수집 도감</h2>
          <div className="journal-stats">
            수집한 디저트: <strong>{unlockedCount}종</strong>
          </div>
        </div>

        <div className="journal-content">
          {/* 🌸 챕터 1 카테고리 */}
          <div className="chapter-section">
            <h3 className="chapter-title">🌸 챕터 1: 노오븐 순두부 크림치즈</h3>
            <div className="journal-card-grid">
              {isChapter1Unlocked ? (
                <div className="journal-card unlocked animate-fade-in">
                  <div className="card-top flex-center">
                    <img src={IMAGES.tofuCreamCheese} alt="순두부 크림치즈" className="journal-dessert-img" />
                    <div className="card-title-group">
                      <h4 className="card-custom-name">
                        {ch1History?.customRecipeTitle || '순두부 크림치즈'}
                      </h4>
                      <span className="card-original-name">(원형: {INGREDIENTS_DB['tofu_cream_cheese']?.name})</span>
                    </div>
                    <div className="card-badges flex-center">
                      <span className="card-attempt-badge">🎯 총 {ch1History?.attemptCount || 1}회 도전</span>
                      <span className="card-grade-badge">
                        🏆 최고 등급: {ch1History?.grade || '명작'}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* 요구사항 3: 등급별 도전 횟수 분포 라인 */}
                    <div className="grade-distribution-bar">
                      📊 등급 분포: <strong>{formatGradeDistribution(ch1History?.gradeCounts)}</strong>
                    </div>

                    <h5 className="section-label">⚙️ 최고 등급 달성 시 나만의 커스텀 배합 수치 기록</h5>
                    <div className="ratio-grid">
                      <div className="ratio-item">
                        <span className="r-label">🥛 연유 (단맛):</span>
                        <span className="r-val">{ch1History?.condensedMilkRatio ?? 100}%</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">⬜ 물기 제거 (식감):</span>
                        <span className="r-val">{getMoistureLabel(ch1History?.tofuMoistureLevel)}</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">🍋 산미 대체재:</span>
                        <span className="r-val">{ch1History?.acidSubstituted ? '요거트 (고소함)' : '레몬즙 (상큼함)'}</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">🧂 소금 (단짠):</span>
                        <span className="r-val">{ch1History?.saltRatio ?? 100}%</span>
                      </div>
                    </div>

                    {ch1History?.mentorComment && (
                      <div className="card-mentor-quote">
                        <span className="quote-header">👴 스승 온(溫)의 평가 기록:</span>
                        <p className="quote-body">"{ch1History.mentorComment}"</p>
                      </div>
                    )}

                    <div className="blog-link-box">
                      <span className="blog-label">🔗 프로젝트 두부 실제 디저트 개발 스토리:</span>
                      <a 
                        href="https://blog.naver.com/project_dubu/223895335443" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="blog-url-btn"
                      >
                        💚 네이버 블로그에서 노오븐 순두부 크림치즈 실제 레시피 보러 가기 ➔
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="journal-card locked flex-center">
                  <span className="lock-icon">🔒</span>
                  <h4 className="locked-title">순두부 크림치즈 (미해금 디저트)</h4>
                  <p className="locked-hint">순두부, 소금, 레몬즙, 크림치즈, 연유, 전분을 조합해 챕터 1을 완성하세요!</p>
                </div>
              )}
            </div>
          </div>

          {/* ☕ 챕터 2 카테고리 */}
          <div className="chapter-section">
            <h3 className="chapter-title">☕ 챕터 2: 노오븐 순두부 티라미수</h3>
            <div className="journal-card-grid">
              {isChapter2Unlocked ? (
                <div className="journal-card unlocked ch2-card animate-fade-in">
                  <div className="card-top flex-center">
                    <img src={IMAGES.tofuTiramisu} alt="노오븐 순두부 티라미수" className="journal-dessert-img" />
                    <div className="card-title-group">
                      <h4 className="card-custom-name">
                        {ch2History?.customRecipeTitle || '노오븐 순두부 티라미수'}
                      </h4>
                      <span className="card-original-name">(원형: {INGREDIENTS_DB['tofu_tiramisu']?.name})</span>
                    </div>
                    <div className="card-badges flex-center">
                      <span className="card-attempt-badge">🎯 총 {ch2History?.attemptCount || 1}회 도전</span>
                      <span className="card-grade-badge">
                        🏆 최고 등급: {ch2History?.grade || '명작'}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* 요구사항 3: 등급별 도전 횟수 분포 라인 */}
                    <div className="grade-distribution-bar">
                      📊 등급 분포: <strong>{formatGradeDistribution(ch2History?.gradeCounts)}</strong>
                    </div>

                    <h5 className="section-label">⚙️ 최고 등급 달성 시 나만의 커스텀 배합 수치 기록</h5>
                    <div className="ratio-grid">
                      <div className="ratio-item">
                        <span className="r-label">🍯 당류 종류:</span>
                        <span className="r-val">{ch2History?.sweetenerType === 'alulose' ? '알룰로스 (제로당)' : '자연 꿀 (달콤함)'}</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">🍪 베이스 시트:</span>
                        <span className="r-val">{getBaseLabel(ch2History?.baseType)}</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">🍫 마무리 토핑:</span>
                        <span className="r-val">{getToppingLabel(ch2History?.toppingType)}</span>
                      </div>
                      <div className="ratio-item">
                        <span className="r-label">❄️ 숙성 방식:</span>
                        <span className="r-val">저온 냉장 휴지 (5°C)</span>
                      </div>
                    </div>

                    {ch2History?.mentorComment && (
                      <div className="card-mentor-quote">
                        <span className="quote-header">👴 스승 온(溫)의 평가 기록:</span>
                        <p className="quote-body">"{ch2History.mentorComment}"</p>
                      </div>
                    )}

                    <div className="blog-link-box">
                      <span className="blog-label">🔗 프로젝트 두부 실제 디저트 개발 스토리:</span>
                      <a 
                        href="https://blog.naver.com/project_dubu/223901807888" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="blog-url-btn"
                      >
                        💚 네이버 블로그에서 노오븐 순두부 티라미수 실제 레시피 보러 가기 ➔
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="journal-card locked flex-center">
                  <span className="lock-icon">🔒</span>
                  <h4 className="locked-title">노오븐 순두부 티라미수 (미해금 디저트)</h4>
                  <p className="locked-hint">
                    챕터 1의 완성작 '순두부 크림치즈'에 꿀과 커피 시럽, 쿠키 시트를 연계 조합해 챕터 2를 완성하세요!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ❓ 챕터 3 카테고리 */}
          <div className="chapter-section">
            <h3 className="chapter-title">❓ 챕터 3: 미지의 디저트</h3>
            <div className="journal-card-grid">
              <div className="journal-card locked flex-center">
                <span className="lock-icon">🔒</span>
                <h4 className="locked-title">미지의 디저트</h4>
                <p className="locked-hint">스승 온(溫)조차 도달하지 못했던 미지의 영역 디저트입니다. 다음 업데이트에서 공개됩니다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="journal-footer flex-center">
          <button className="cozy-button close-journal-btn" onClick={onCloseJournal}>
            도감 닫기 ➔
          </button>
        </div>
      </div>
    </div>
  );
};
