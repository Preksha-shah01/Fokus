import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast'; // <--- 1. Import Toaster
import Timer from './Timer';
import History from './History';
import AnalyticsDashboard from './AnalyticsDashboard';
import Soundscapes from './Soundscapes';
import Motivation from './Motivation';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('focusHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('focusHistory', JSON.stringify(history));
  }, [history]);

  const addSession = (task, duration, savedTime) => {
    const newSession = {
      task: task || "Focus Session",
      duration,
      savedTime: savedTime || 0,
      date: new Date().toISOString()
    };
    setHistory([newSession, ...history]);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen flex flex-col items-center p-8 pb-32 transition-colors duration-500 ${darkMode ? 'dark-mode-bg text-white' : 'light-mode-bg text-gray-800'}`}>
        
        {/* 2. Add the Toaster here. This handles the popups! */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: darkMode ? '#334155' : '#fff',
              color: darkMode ? '#fff' : '#333',
            },
          }}
        />

        <header className="mb-4 text-center relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between">
            <div className="w-10 hidden md:block"></div>
            <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-black mb-2 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 drop-shadow-sm">
                    FOKUS
                </span>
                </h1>
                <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Master your workflow. <span className="text-indigo-600 font-bold">Build better habits.</span>
                </p>
            </div>
            <button 
                onClick={toggleTheme}
                className="mt-6 md:mt-0 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all shadow-lg"
                title="Toggle Dark Mode"
            >
                {darkMode ? '🌙' : '☀️'}
            </button>
        </header>

        <Motivation />
        
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col gap-8">
            <Timer onSessionComplete={addSession} />
            <History history={history} />
          </div>
          <div className="w-full md:w-2/3">
            <AnalyticsDashboard history={history} />
          </div>
        </div>

        <Soundscapes />

      </div>
    </div>
  );
}

export default App;