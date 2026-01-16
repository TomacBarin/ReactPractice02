import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Beräknad filtrerad lista (räknas ut varje gång från todos + filter)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newItem]);
    setNewTodo('');
  };

  const toggleComplete = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Att göra-lista</h1>

      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Vad ska du göra idag?"
          onKeyDown={e => {
            if (e.key === 'Enter') addTodo();
          }}
        />
        <button onClick={addTodo}>Lägg till</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => removeTodo(todo.id)}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message">Inga uppgifter än – lägg till något!</p>
      )}

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Alla
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Aktiva
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Klara
        </button>
      </div>
    </div>
  );
}

export default App;