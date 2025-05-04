import React, { useEffect, useState } from 'react';

const DailyGoalTracker = ({ completedToday, onBonus }) => {
  const [bonusGiven, setBonusGiven] = useState(() => {
    const saved = localStorage.getItem('bonusGivenDate');
    return saved === new Date().toDateString();
  });

  useEffect(() => {
    if (completedToday >= 3 && !bonusGiven) {
      onBonus(30); // Bonus XP
      alert('🔥 Daily Goal Achieved! +30 XP');
      setBonusGiven(true);
      localStorage.setItem('bonusGivenDate', new Date().toDateString());
    }
  }, [completedToday, bonusGiven, onBonus]);

  return <p>✅ Completed today: {completedToday}/3</p>;
};

export default DailyGoalTracker;
