// src/App.js
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sun, Moon, CheckCircle, Trash2, Calendar } from 'lucide-react';

import XPBar from './components/XPBar.jsx';
import TaskList from './components/TaskList.jsx';
import Achievements from './components/Achievements.jsx';
import SpinWheel from './components/SpinWheel.jsx';
import DailyGoalTracker from './components/DailyGoalTracker.jsx';

import './App.css';

const App = () => {
  // Dark mode
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  // Core state
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')||'[]'));
  const [input, setInput] = useState('');
  const [xp, setXP] = useState(() => Number(localStorage.getItem('xp'))||0);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level'))||1);
  const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem('achievements')||'[]'));

  // Persist
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [tasks, xp, level, achievements]);

  const playSound = (type) => new Audio(type==='complete'?'/sounds/complete.mp3':'/sounds/level-up.mp3').play();

  const addAchievement = (title) => {
    if (!achievements.includes(title)) {
      setAchievements(a => [...a, title]);
      alert(`🏆 Achievement Unlocked: ${title}`);
    }
  };

  const handleAddTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false, dateTime: null };
    setTasks(t => [...t, newTask]);
    setInput('');
    if (tasks.length + 1 === 1) addAchievement('First Task Added');
  };

  const handleCompleteTask = (id) => {
    setTasks(t => t.map(task => {
      if (task.id===id && !task.completed) {
        const newXP = xp+10;
        setXP(newXP);
        playSound('complete');
        if (newXP>=level*100){
          setLevel(l => l+1);
          confetti({ particleCount:100, spread:70, origin:{ y:0.6 }});
          playSound('level');
          alert(`🎉 Level Up! Now Level ${level+1}`);
          if (level+1===5) addAchievement('Level 5 Achieved');
        }
        const doneCount = t.filter(x=>x.completed||x.id===id).length;
        if (doneCount===1) addAchievement('First Task Completed');
        if (doneCount===10) addAchievement('10 Tasks Completed');
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id) => setTasks(t => t.filter(task=>task.id!==id));

  const handleSpinReward = (reward) => {
    const newXP = xp + reward;
    setXP(newXP);
    playSound('complete');
    if (newXP>=level*100) {
      setLevel(l => l+1);
      confetti({ particleCount:100, spread:70, origin:{ y:0.6 }});
      playSound('level');
      alert(`🎉 Level Up! Now Level ${level+1}`);
      if (level+1===5) addAchievement('Level 5 Achieved');
    }
  };

  // Count today’s completions
  const today = new Date().toDateString();
  const completedToday = tasks.filter(t => t.completed && new Date(t.id).toDateString()===today).length;

  return (
    <div className="App">
      <header>
        <h1>🎮 Gamified To-Do</h1>
        <button 
          className="dark-toggle" 
          onClick={() => setDark(d => !d)}
          title="Toggle dark mode"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      <p className="subtitle">XP: {xp} | Level: {level}</p>
      <XPBar xp={xp} level={level} />

      <section className="card">
        <div className="input-row">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={handleAddTask}><CheckCircle /> Add</button>
        </div>
      </section>

      <section className="card">
        <TaskList 
          tasks={tasks} 
          onComplete={handleCompleteTask} 
          onDelete={handleDeleteTask} 
          icons={{ complete: CheckCircle, delete: Trash2, calendar: Calendar }}
        />
      </section>

      <section className="card">
        <Achievements achievements={achievements} />
      </section>

      <section className="card">
        <SpinWheel onReward={handleSpinReward} />
        <DailyGoalTracker completedToday={completedToday} onBonus={bonus => setXP(x=>x+bonus)} />
      </section>
    </div>
  );
};

export default App;
