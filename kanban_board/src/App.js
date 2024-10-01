import logo from './logo.svg';
import './App.css';
// src/App.js
import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './styles/kanban.css';

function App() {
  return (
    <div className="App">
      
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App