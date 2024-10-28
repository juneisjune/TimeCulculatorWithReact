import React, { useState } from 'react';
import './TimeCalculator.css';

const TimeCalculator = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [timeEntries, setTimeEntries] = useState([]);

  const handleAddTime = () => {
    if (hours === '' || minutes === '') return;

    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    setTimeEntries([...timeEntries, totalMinutes]);
    setHours('');
    setMinutes('');
  };

  const handleReset = () => {
    setTimeEntries([]);
  };

  const handleDeleteTime = (index) => {
    const newTimeEntries = timeEntries.filter((_, i) => i !== index);
    setTimeEntries(newTimeEntries);
  };

  const updateHours = (num) => {
    setHours((prev) => (prev + num).slice(0, 2));
  };

  const updateMinutes = (num) => {
    setMinutes((prev) => (prev + num).slice(0, 2));
  };

  const adjustMinutes = (adjustment) => {
    setMinutes((prev) => {
      const newMinutes = parseInt(prev || 0) + adjustment;
      return newMinutes < 0 ? '0' : newMinutes.toString();
    });
  };

  const calculateTotalTime = () => {
    const totalMinutes = timeEntries.reduce((acc, curr) => acc + curr, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainderMinutes = totalMinutes % 60;

    return `${totalHours}시간 ${remainderMinutes}분`;
  };

  return (
    <div className="calculator-container">
      <h1>시간 계산기</h1>
      <div className="input-container">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="시간"
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="분"
        />
        <button onClick={handleAddTime}>추가</button>
        <button onClick={handleReset}>리셋</button>
      </div>

      <div className="button-grid">
        {[...Array(10)].map((_, index) => (
          <button key={index} onClick={() => updateHours(index)}>
            {index}
          </button>
        ))}
        <button onClick={() => adjustMinutes(1)}>+</button>
        <button onClick={() => adjustMinutes(-1)}>-</button>
      </div>

      <h2>총 근무 시간: {calculateTotalTime()}</h2>
      <ul>
        {timeEntries.map((entry, index) => (
          <li key={index}>
            {Math.floor(entry / 60)}시간 {entry % 60}분
            <button className="delete-button" onClick={() => handleDeleteTime(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeCalculator;
