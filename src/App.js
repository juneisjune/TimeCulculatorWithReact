import React from 'react';
import TimeCalculator from './TimeCalculator';
import AdsenseComponent from './components/AdsenseComponent';
import './App.css'; // 스타일을 적용하기 위해 CSS 파일을 불러옵니다.

function App() {
  return (
    <div className="app-container">
      {/* 왼쪽 광고 */}
      <div className="ad-left">
        <AdsenseComponent adClient="ca-pub-6428134824213344" adSlot="1571265083" />
      </div>
      
      {/* 중앙 시간 계산기 */}
      <div className="calculator">
        <TimeCalculator />
      </div>
      
      {/* 오른쪽 광고 */}
      <div className="ad-right">
        <AdsenseComponent adClient="ca-pub-6428134824213344" adSlot="1571265083" />
      </div>
    </div>
  );
}

export default App;