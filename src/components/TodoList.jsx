import React, { useState } from 'react';

const TodoList = ({ todos, addTodo, toggleComplete }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTask);
    setNewTask('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li 
            key={index} 
            onClick={() => toggleComplete(index)}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
