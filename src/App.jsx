import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Timer from './Timer';
import History from './History';
import AnalyticsDashboard from './AnalyticsDashboard';
import Soundscapes from './Soundscapes';
import Motivation from './Motivation';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // ✨ NEW: State for "Focus View" (Minimal Mode)
  const [isMinimal, setIsMinimal] = useState(false);

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

  const clearHistory = () => {
    if (history.length === 0) return;
    if (window.confirm("Are you sure you want to delete all history?")) {
      setHistory([]);
      localStorage.removeItem('focusHistory');
      toast.success("History cleared!");
    }
  };

  const deleteSession = (indexToDelete) => {
    const newHistory = history.filter((_, index) => index !== indexToDelete);
    setHistory(newHistory);
    toast.success("Session removed");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        toast.success("Entered Zen Mode");
      }).catch((err) => {
        toast.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // ✨ NEW: Toggle function for Minimal Mode
  const toggleMinimal = () => {
    setIsMinimal(!isMinimal);
    if (!isMinimal) {
        toast.success("Distractions hidden");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen flex flex-col items-center p-8 pb-32 transition-colors duration-500 ${darkMode ? 'dark-mode-bg text-white' : 'light-mode-bg text-gray-800'}`}>
        
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
            <div className="w-32 hidden md:block"></div>

            <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-black mb-2 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 drop-shadow-sm">
                    FOKUS
                </span>
                </h1>
                
                {/* Hide subtitle in minimal mode to be extra clean */}
                {!isMinimal && (
                    <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Master your workflow. <span className="text-indigo-600 font-bold">Build better habits.</span>
                    </p>
                )}
            </div>

            {/* Buttons Container */}
            <div className="mt-6 md:mt-0 flex gap-3 justify-center md:justify-end w-32">
                
                {/* ✨ NEW: Focus View Toggle */}
                <button 
                    onClick={toggleMinimal}
                    className={`p-3 rounded-full backdrop-blur-md border hover:bg-white/30 transition-all shadow-lg ${isMinimal ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white/20 border-white/30'}`}
                    title={isMinimal ? "Show Dashboard" : "Hide Distractions"}
                >
                    {isMinimal ? '👁️' : '🕶️'}
                </button>

                <button 
                    onClick={toggleFullscreen}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all shadow-lg"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? '↘' : '⛶'}
                </button>

                <button 
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all shadow-lg"
                    title="Toggle Dark Mode"
                >
                    {darkMode ? '🌙' : '☀️'}
                </button>
            </div>
        </header>

        {/* Hide Quote in Minimal Mode */}
        {!isMinimal && <Motivation />}
        
        {/* Main Content Grid */}
        <div className={`w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start transition-all duration-500 ${isMinimal ? 'justify-center mt-10' : ''}`}>
          
          {/* Left Column (Timer & History) */}
          {/* In Minimal Mode, we center this div and hide the History component */}
          <div className={`flex flex-col gap-8 transition-all duration-500 ${isMinimal ? 'w-full md:w-1/2 lg:w-1/3' : 'w-full md:w-1/3'}`}>
            <Timer onSessionComplete={addSession} />
            
            {/* HIDE History if isMinimal is true */}
            <div className={`transition-all duration-500 ${isMinimal ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <History 
                    history={history} 
                    onClear={clearHistory} 
                    onDelete={deleteSession} 
                />
            </div>
          </div>
          
          {/* Right Column (Analytics) */}
          {/* HIDE entire column if isMinimal is true */}
          {!isMinimal && (
            <div className="w-full md:w-2/3 fade-in">
                <AnalyticsDashboard history={history} />
            </div>
          )}
          
        </div>

        <Soundscapes />

      </div>
    </div>
  );
}

export default App;