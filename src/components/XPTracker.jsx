import React from 'react';

const XPTracker = ({ xp, level }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Level: {level}</h3>
      <p>XP: {xp} / {level * 100}</p>
    </div>
  );
};

export default XPTracker;
