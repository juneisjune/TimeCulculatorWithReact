import React, { useState } from 'react';
import './TimeCalculator.css';

const TimeCalculator = () => {
  const [times, setTimes] = useState('');
  const [total, setTotal] = useState(0); // 총합 상태 초기화
  const [finalResult, setFinalResult] = useState(null); // 최종 결과 상태 초기화

  const formatTime = (input) => {
    if (input.length > 2) {
      const formatted = input.slice(0, -2) + ':' + input.slice(-2);
      return formatted;
    }
      return input;
  };

  const addTime = (num) => {
    const newTimes = times.replace(':', '') + num.toString(); // ':' 제거 후 추가
    setTimes(formatTime(newTimes));
  };

  const calculateTotal = () => {
    const totalMinutes = parseTime(times); // 현재 입력된 시간을 분으로 변환
    setTotal((prevTotal) => prevTotal + totalMinutes); // 기존 총합에 추가
    setTimes(''); // 입력값 초기화
  };

  const parseTime = (input) => {
    const num = input.replace(':', ''); // ':' 제거
    const length = num.length;
    let hours = 0;
    let minutes = 0;

    if (length === 1) {
      minutes = parseInt(num);
    } else if (length === 2) {
      minutes = parseInt(num);
    } else if (length >= 3) {
      hours = parseInt(num.slice(0, length - 2)); // 앞에서부터 2자리 제외한 나머지
      minutes = parseInt(num.slice(length - 2)); // 뒤에서 2자리
    }

    return hours * 60 + minutes; // 총 분으로 반환
  };
  


  const showFinalResult = () => {
    const totalMinutes = parseTime(times);               // 현재 입력된 시간을 분으로 변환
    const updatedTotal = total + totalMinutes;           // 기존 총합에 현재 입력 시간을 추가한 값 계산
    setTotal(updatedTotal);                              // 총합 업데이트
    setTimes('');                                        // 입력값 초기화
    setFinalResult(updatedTotal);                        // 최종 결과로 업데이트된 총합 설정
  };
  

  return (
    <div className="calculator-container">
      <h1>Time Calculator</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder='시간을 입력해주세요'
          value={times}
          onChange={(e) => setTimes(formatTime(e.target.value.replace(':', '')))}
        />
      </div>
      <div className="button-grid">
        <button onClick={minusTotal}> - </button>
        <button onClick={calculateTotal}>+</button>               {/* 총합을 설정하는 버튼 */}
        <button onClick={showFinalResult}>=</button>              {/* 최종 결과 버튼 */}
        {Array.from({ length: 9 }, (_, index) => (
          <button key={index + 1} onClick={() => addTime(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => { setTimes(''); setTotal(0); setFinalResult(null); }} className="delete-button">C</button> {/* 초기화 버튼 */}
        <button onClick={() => addTime(0)}>0</button> {/* 0 버튼 추가 */}
        <button onClick={() => setTimes(formatTime(times.slice(0, -1).replace(':', '')))}>←</button>
        
      </div>
      {finalResult !== null && (
        <>
          <h2>Total Minutes: {finalResult}</h2> {/* 총합을 분으로 표시 */}
          <h3>Total Time: {Math.floor(finalResult / 60)}:{String(finalResult % 60).padStart(2, '0')}</h3> {/* 총합을 시:분으로 표시 */}
        </>
      )}
    </div>
  );
};

export default TimeCalculator;
