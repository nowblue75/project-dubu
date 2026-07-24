import React, { useState, useEffect } from 'react';
import './GestureMiniGame.css';

interface GestureMiniGameProps {
  onGameComplete: (score: 'Normal' | 'Good' | 'Perfect') => void;
}

export const GestureMiniGame: React.FC<GestureMiniGameProps> = ({ onGameComplete }) => {
  const [temperature, setTemperature] = useState<number>(60);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [resultScore, setResultScore] = useState<'Normal' | 'Good' | 'Perfect' | null>(null);

  // 원래의 조작 로직 원복: 온도가 60°C ~ 95°C 사이를 부드럽게 자동으로 왕복 이동 (스위핑)
  useEffect(() => {
    if (gameEnded) return;

    const interval = setInterval(() => {
      setTemperature(prev => {
        let nextTemp = prev + (direction === 'up' ? 1.2 : -1.2);
        if (nextTemp >= 95) {
          setDirection('down');
          nextTemp = 95;
        } else if (nextTemp <= 60) {
          setDirection('up');
          nextTemp = 60;
        }
        return nextTemp;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction, gameEnded]);

  // 황금존(80~85°C)에서 단 1회 클릭으로 중탕 완성! (원래의 직관적 1회 클릭 조작 로직)
  const handleStopBainMarie = () => {
    if (gameEnded) return;
    setGameEnded(true);

    let finalScore: 'Normal' | 'Good' | 'Perfect' = 'Normal';
    if (temperature >= 80 && temperature <= 85) {
      finalScore = 'Perfect'; // 황금존 적중!
    } else if ((temperature >= 75 && temperature < 80) || (temperature > 85 && temperature <= 90)) {
      finalScore = 'Good';
    } else {
      finalScore = 'Normal';
    }

    setResultScore(finalScore);

    setTimeout(() => {
      onGameComplete(finalScore);
    }, 1200);
  };

  const getTempPercentage = () => {
    const min = 60;
    const max = 95;
    const currentClamped = Math.max(min, Math.min(max, temperature));
    return ((currentClamped - min) / (max - min)) * 100;
  };

  const isPerfectRange = temperature >= 80 && temperature <= 85;

  return (
    <div className="gesture-game-container glass-panel animate-fade-in flex-center">
      <div className="gesture-header">
        <h3 className="gesture-title">♨️ 챕터 1: 노오븐 중탕 게이지</h3>
        <p className="gesture-subtitle">
          "게이지가 황금 온도(80~85°C)에 다다랐을 때 1회 클릭하여 중탕을 마무리해보거라!"
        </p>
      </div>

      <div className="gesture-play-screen flex-center">
        {/* 비주얼 정리 유지: 게이지 바 위쪽 외부에 목표 온도 정보 독립 배치 */}
        <div className={`amber-target-info-card ${isPerfectRange ? 'perfect-in-range' : ''}`}>
          <span>황금 중탕 목표: <strong>80°C ~ 85°C</strong></span>
          <span className="current-temp-readout">현재 온도: <strong>{temperature.toFixed(1)}°C</strong></span>
        </div>

        {/* 비주얼 정리 유지: 세피아/앰버 골드 톤 게이지 바 */}
        <div className="amber-gauge-wrapper">
          {/* 80~85도 황금 가열 구간 마크 */}
          <div className="amber-target-zone" style={{ left: '57%', width: '14%' }}></div>
          
          <div 
            className={`amber-gauge-fill ${isPerfectRange ? 'perfect-gold-fill' : ''}`}
            style={{ width: `${getTempPercentage()}%` }}
          ></div>
        </div>

        {/* 게이지 상태 안내 */}
        <div className="gauge-status-box">
          {gameEnded ? (
            <span className="status-msg gold animate-pulse">
              ✨ 중탕 완료! [{resultScore === 'Perfect' ? '🏆 황금 적중 명작' : resultScore === 'Good' ? '⭐ 숙련' : '👍 보통'}] 판정!
            </span>
          ) : isPerfectRange ? (
            <span className="status-msg gold animate-pulse">🔥 지금입니다! [중탕 완성하기]를 클릭하세요!</span>
          ) : (
            <span className="status-msg normal">온도가 80~85°C 황금존에 도달할 때 버튼을 클릭하세요</span>
          )}
        </div>

        {/* 원래의 직관적 단 1회 클릭 버튼 원복 */}
        <div className="heat-control-area">
          <button 
            className={`cozy-button stop-bain-marie-btn ${isPerfectRange ? 'ready-pulse' : ''}`}
            onClick={handleStopBainMarie}
            disabled={gameEnded}
          >
            🔥 지금 황금 온도! 중탕 완성하기 (클릭) ➔
          </button>
        </div>
      </div>
    </div>
  );
};
