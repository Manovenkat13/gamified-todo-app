// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}
        className={task.completed ? 'completed' : ''}
        onClick={() => onComplete(task.id)}>
          {task.text}
          {!task.completed && (
            <button onClick={() => onComplete(task.id)}>✅ Complete</button>
          )}
          <button onClick={() => onDelete(task.id)}>🗑 Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
