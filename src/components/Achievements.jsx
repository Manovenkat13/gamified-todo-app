// src/components/Achievements.js
import React from 'react';

const Achievements = ({ achievements }) => {
  if (achievements.length === 0) return null;

  return (
    <div>
      <h3>🏆 Achievements</h3>
      <ul>
        {achievements.map((ach, index) => (
          <li key={index}>{ach}</li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
