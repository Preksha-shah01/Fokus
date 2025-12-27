import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import History from './History';
import AnalyticsDashboard from './AnalyticsDashboard'; // Import the new component

function App() {
  // Load history from LocalStorage
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
      task: task || "Focus Session", // Default name if empty
      duration,
      date: new Date().toISOString()
    };
    // Add to the beginning of the array
    setHistory([newSession, ...history]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="mb-12 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 drop-shadow-sm">
          FOKUS
        </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          <span className="text-indigo-600 font-bold">Master your workflow. Build better habits.</span>
        </p>
      </header>
      {/* Main Content Grid */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Timer & History */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <Timer onSessionComplete={addSession} />
          <History history={history} />
        </div>
        
        {/* Right Column: Analytics Dashboard */}
        <div className="w-full md:w-2/3">
          <AnalyticsDashboard history={history} />
        </div>
        
      </div>
    </div>
  );
}

export default App;