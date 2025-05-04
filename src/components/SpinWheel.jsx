import React, { useState, useEffect } from 'react';

const SpinWheel = ({ onReward }) => {
  const [spinsLeft, setSpinsLeft] = useState(() => {
    const saved = localStorage.getItem('spinsLeft');
    const lastSpinDate = localStorage.getItem('lastSpinDate');
    const today = new Date().toDateString();

    if (lastSpinDate !== today) {
      localStorage.setItem('lastSpinDate', today);
      localStorage.setItem('spinsLeft', '3');
      return 3;
    }

    return saved ? Number(saved) : 3;
  });

  const spin = () => {
    if (spinsLeft <= 0) {
      alert("No spins left today!");
      return;
    }

    const xpReward = Math.floor(Math.random() * 41) + 10; // 10–50 XP
    onReward(xpReward);
    alert(`🎉 You earned ${xpReward} XP!`);

    const updatedSpins = spinsLeft - 1;
    setSpinsLeft(updatedSpins);
    localStorage.setItem('spinsLeft', updatedSpins.toString());
  };

  return (
    <div>
      <h3>🎯 Spin the Wheel</h3>
      <p>Spins left: {spinsLeft}</p>
      <button onClick={spin}>🎡 Spin</button>
    </div>
  );
};

export default SpinWheel;
