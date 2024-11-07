import React, { useState } from 'react';
import './TimeCalculator.css';

const TimeCalculator = () => {
  const [inputValue, setInputValue] = useState(''); // 입력 값 상태
  const [finalResult, setFinalResult] = useState(0); // 최종 결과 상태

  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`; // HH:MM 형식으로 변환
  };

  const addTime = () => {
    const totalMinutes = parseInput(inputValue);
    if (totalMinutes === null) return; // 유효하지 않은 시간일 경우 종료
    setFinalResult((prevTotal) => prevTotal + totalMinutes);
    setInputValue(''); // 입력 초기화
  };

  const minusTime = () => {
    const totalMinutes = parseInput(inputValue);
    if (totalMinutes === null) return; // 유효하지 않은 시간일 경우 종료
    setFinalResult((prevTotal) => Math.max(0, prevTotal - totalMinutes)); // 음수 방지
    setInputValue(''); // 입력 초기화
  };

  const parseInput = (input) => {
    const timeParts = input.split(':'); // '시:분' 형식으로 분리
    let totalMinutes = 0;

    if (timeParts.length === 1) {
      const minutes = parseInt(timeParts[0], 10);
      if (isNaN(minutes) || minutes < 0) {
        alert('유효한 시간을 입력해주세요.');
        return null;
      }
      totalMinutes = minutes; // 분만 입력된 경우
    } else if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        alert('유효한 시간을 입력해주세요.');
        return null;
      }
      totalMinutes = hours * 60 + minutes; // 시와 분 모두 입력된 경우
    } else {
      alert('유효한 시간을 입력해주세요.');
      return null;
    }

    return totalMinutes; // 총 분으로 반환
  };

  const resetCalculator = () => {
    setInputValue(''); // 입력 초기화
    setFinalResult(0); // 총합 리셋
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9:]/g, ''); // 숫자와 ':'만 허용
    setInputValue(value);
  };

  const addNumber = (num) => {
    let newValue = inputValue.replace(/:/g, ''); // ':' 제거
    newValue += num.toString(); // 새 숫자 추가

    // 3자리 이상일 경우 자동으로 ':' 추가
    if (newValue.length > 2) {
      newValue = newValue.slice(0, -2) + ':' + newValue.slice(-2); // HH:MM 형식으로 변환
    }

    setInputValue(newValue); // 업데이트된 값 설정
  };

  return (
    <div className="calculator-container">
      <h1>Time Calculator</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder='시간 또는 분을 입력해주세요 (ex: 12:30 또는 90)'
          value={inputValue}
          onChange={handleInputChange} // 변경된 핸들러 사용
        />
      </div>
      <div className="button-grid">
        <button onClick={minusTime}> - </button>
        <button onClick={addTime}>+</button>
        <button onClick={() => setInputValue((prev) => prev.slice(0, -1))}>←</button>
        {Array.from({ length: 9 }, (_, index) => (
          <button key={index + 1} onClick={() => addNumber(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => addNumber(0)}>0</button>
        <button className="delete-button" onClick={resetCalculator}>C</button>
      </div>
      {finalResult !== null && (
  <>
    {/* 음수일 경우 0으로 표시하거나 다른 처리 */}
    <h3>Total Time: {Math.max(0, Math.floor(finalResult / 60))}:{String(Math.abs(finalResult % 60)).padStart(2, '0')}</h3> 
  </>
)}
    </div>
  );
};

export default TimeCalculator;
