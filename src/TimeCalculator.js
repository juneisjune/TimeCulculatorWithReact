import React, { useState } from 'react';
import './TimeCalculator.css';

const TimeCalculator = () => {
  const [times, setTimes] = useState('');
  const [total, setTotal] = useState('');

  const addTime = (num) => {
    // num을 문자열로 변환하여 기존의 times에 추가
    setTimes((prev) => prev + num.toString());
  }

  return (
    <div className="calculator-container">
      <div className="input-container">
        <input
          type="number"
          placeholder='시간을 입력해주세요'
          value={times}
          onChange={(e) => setTimes(e.target.value)}
        />
      </div>
      <div className="button-grid">
        <button onClick={() => addTime(1)}>1</button>
        <button onClick={() => addTime(2)}>2</button>
        <button onClick={() => addTime(3)}>3</button>
        <button onClick={() => addTime(4)}>4</button>
        <button onClick={() => addTime(5)}>5</button>
        <button onClick={() => addTime(6)}>6</button>
        <button onClick={() => addTime(7)}>7</button>
        <button onClick={() => addTime(8)}>8</button>
        <button onClick={() => addTime(9)}>9</button>
        <button onClick={() => addTime(0)}>0</button>
        <button onClick={() => setTimes((prev) => prev.slice(0, -1))}>←</button> {/* 삭제 버튼 추가 */}
        <button onClick={() => setTotal(times)}>+</button> {/* 총합을 설정할 수 있는 버튼 */}
        <button onClick={() => setTimes('')}>C</button> {/* 초기화 버튼 추가 */}
      </div>
    </div>
  );
};

export default TimeCalculator;
