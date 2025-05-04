// src/components/XPBar.js
import React from 'react';

const XPBar = ({ xp, level }) => {
  const xpProgress = Math.min((xp % (level * 100)) / (level * 100), 1);

  return (
    <div style={{ background: '#eee', borderRadius: '5px', overflow: 'hidden', height: '10px', marginBottom: '1em' }}>
      <div style={{ background: 'limegreen', height: '100%', width: `${xpProgress * 100}%` }} />
    </div>
  );
};

export default XPBar;
