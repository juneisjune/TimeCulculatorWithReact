import React, { useState } from 'react';
import './TimeCalculator.css';

const TimeCalculator = () => {
  const [times, setTimes] = useState('');                   // 입력된 시간 상태
  const [total, setTotal] = useState(0);                    // 총합 상태 초기화
  const [finalResult, setFinalResult] = useState(null);     // 최종 결과 상태 초기화
  const [lastOperation, setLastOperation] = useState(null); // 마지막 연산 상태 추가

  // 입력 형식을 맞추는 함수
  const formatTime = (input) => {
    if (input.length > 2) {
      const formatted = input.slice(0, -2) + ':' + input.slice(-2); // '시:분' 형식으로 변환
      return formatted;
    }
    return input;
  };

  // 숫자를 추가하는 함수
  const addTime = (num) => {
    const newTimes = times.replace(':', '') + num.toString(); // ':' 제거 후 숫자 추가
    setTimes(formatTime(newTimes));                           // 형식 맞추기
  };

  // 총합에 더하는 함수
  const calculateTotal = () => {
    const totalMinutes = parseTime(times);              // 현재 입력된 시간을 분으로 변환
    setTotal((prevTotal) => prevTotal + totalMinutes);  // 기존 총합에 추가
    setLastOperation('+');                              // 마지막 연산을 더하기로 설정
    setTimes('');                                       // 입력 초기화
  };

// 총합에서 빼는 함수
const minusTotal = () => {
  const totalMinutes = parseTime(times); // 현재 입력된 시간을 분으로 변환

  // 입력된 시간이 없거나 total이 0일 때 빼기 방지
  if (totalMinutes === 0 || total === 0) {
    alert('유효한 시간을 입력해주세요.'); // 사용자에게 알림
    setTimes(''); // 입력 초기화
    return;
  }

  // 기존 총합에서 빼기
  const updatedTotal = total - totalMinutes;
  
  // 음수 방지
  setTotal(updatedTotal < 0 ? 0 : updatedTotal); // 음수가 될 경우 0으로 설정
  setLastOperation('-'); // 마지막 연산을 빼기로 설정
  setTimes(''); // 입력 초기화
};

  // 입력된 시간을 분으로 변환하는 함수
  const parseTime = (input) => {
    const num = input.replace(':', ''); // ':' 제거
    const length = num.length;
    let hours = 0;
    let minutes = 0;

    if (length === 1) {
      minutes = parseInt(num); // 1자리 수는 분으로 해석
    } else if (length === 2) {
      minutes = parseInt(num); // 2자리 수도 분으로 해석
    } else if (length >= 3) {
      hours = parseInt(num.slice(0, length - 2)); // 앞에서부터 2자리 제외한 나머지를 시간으로
      minutes = parseInt(num.slice(length - 2)); // 뒤에서 2자리를 분으로
    }

    return hours * 60 + minutes; // 총 분으로 반환
  };

// 최종 결과를 보여주는 함수
const showFinalResult = () => {
  const totalMinutes = parseTime(times); // 현재 입력된 시간을 분으로 변환
  let updatedTotal = total;

  // 마지막 연산에 따라 총합 업데이트
  if (lastOperation === '+') {
    updatedTotal += totalMinutes; // 더하기
  } else if (lastOperation === '-') {
    updatedTotal -= totalMinutes; // 빼기
  }

  // 음수로 계산될 경우 0으로 설정
  if (updatedTotal < 0) {
    updatedTotal = 0; // 음수 방지
  }

  setTotal(updatedTotal); // 총합 업데이트
  setTimes(''); // 입력 초기화
  setFinalResult(updatedTotal); // 최종 결과로 업데이트된 총합 설정
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
        <button onClick={calculateTotal}>+</button>
        <button onClick={showFinalResult}>=</button>
        {Array.from({ length: 9 }, (_, index) => (
          <button key={index + 1} onClick={() => addTime(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => { 
          setTimes(''); 
          setTotal(0); 
          setFinalResult(null); 
          setLastOperation(null); // 초기화 시 마지막 연산도 초기화 
        }} className="delete-button">C</button>
        <button onClick={() => addTime(0)}>0</button>
        <button onClick={() => setTimes(formatTime(times.slice(0, -1).replace(':', '')))}>←</button>
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
