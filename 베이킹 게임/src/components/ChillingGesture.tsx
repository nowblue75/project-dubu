import React, { useState, useEffect } from 'react';
import { IMAGES } from '../assets/images';
import './ChillingGesture.css';

interface ChillingGestureProps {
  onGestureComplete: (score: 'Normal' | 'Good' | 'Perfect') => void;
}

export const ChillingGesture: React.FC<ChillingGestureProps> = ({ onGestureComplete }) => {
  const [stage, setStage] = useState<'ready' | 'chilling' | 'done'>('ready');
  const [countdown, setCountdown] = useState<number>(3);

  const handleStartChilling = () => {
    setStage('chilling');
  };

  useEffect(() => {
    let timer: any = null;
    if (stage === 'chilling') {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('done');
            setTimeout(() => {
              onGestureComplete('Perfect'); // 냉장 휴지는 느긋하게 기다리면 명작(Perfect) 확정!
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [stage, onGestureComplete]);

  return (
    <div className="chilling-gesture-container glass-panel animate-fade-in flex-center">
      {stage === 'ready' && (
        <div className="chilling-screen flex-center">
          <h3 className="chilling-instruction">
            ❄️ 노오븐 디저트의 진수: 차가운 냉장 휴지
          </h3>
          <p className="chilling-desc">
            "티라미수는 서두르지 않고 차갑게 기다리는 것 자체가 비법이다, 풋내기야."
          </p>

          <div className="refrigerator-graphic flex-center animate-float">
            <div className="fridge-door flex-center">
              {/* 이모지 🍮🍫✨ 대신 실사 디저트 이미지 IMAGES.tofuTiramisu 적용 */}
              <img src={IMAGES.tofuTiramisu} alt="완성 직전 티라미수 프리뷰" className="tiramisu-inside-img animate-float" />
              <div className="fridge-handle"></div>
            </div>
          </div>

          <button className="cozy-button chill-action-btn chill-start-btn" onClick={handleStartChilling}>
            🚪 냉장고 문 닫고 숙성 시작하기 ➔
          </button>
        </div>
      )}

      {stage === 'chilling' && (
        <div className="chilling-screen chilling-active flex-center">
          <h3 className="chilling-instruction animate-pulse">
            ❄️ 5°C 저온에서 크림과 시럽이 조화롭게 깊어지는 중...
          </h3>

          <div className="chilling-animation-area flex-center">
            <div className="frost-overlay flex-center">
              <span className="snowflake-icon animate-spin-slow">❄️</span>
              <span className="chilling-countdown">{countdown}초</span>
              <span className="snowflake-icon animate-spin-slow">✨</span>
            </div>
          </div>

          <p className="chill-sub-text">시간이 지나며 순두부 크림치즈와 커피 시럽이 하나로 스며듭니다.</p>
        </div>
      )}

      {stage === 'done' && (
        <div className="chilling-screen flex-center">
          <h3 className="chilling-instruction gold-text animate-fade-in">
            ✨ 숙성 완료! 사르르 녹아내리는 완벽한 냉숙성 티라미수 탄생!
          </h3>
          <div className="tiramisu-perfect-preview flex-center animate-float">
            <img src={IMAGES.tofuTiramisu} alt="완성된 티라미수" className="tiramisu-done-img animate-float" />
          </div>
        </div>
      )}
    </div>
  );
};
