import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import History from './History';

function App() {
  // Load history from LocalStorage so data isn't lost on refresh
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('focusHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever history updates
  useEffect(() => {
    localStorage.setItem('focusHistory', JSON.stringify(history));
  }, [history]);

  const addSession = (task, duration) => {
    const newSession = {
      task,
      duration,
      date: new Date().toISOString()
    };
    setHistory([newSession, ...history]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-md">Fokus</h1>
        <p className="opacity-90 font-light">Track your focus, build better habits.</p>
      </header>
      
      <Timer onSessionComplete={addSession} />
      
      <History history={history} />
    </div>
  );
}

export default App;
