import React, { useState, useEffect } from 'react';

const Timer = ({ onSessionComplete }) => {
  const [task, setTask] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState(25); // Tracks the current mode (25m, 5m, etc)

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      onSessionComplete(task, mode); 
      // Play a sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log("Audio play failed (browser policy):", e));
      alert("Focus Session Complete!");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, task, mode, onSessionComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const setDuration = (minutes) => {
    setMode(minutes);
    setTimeLeft(minutes * 60);
    setIsActive(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/20 mb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Focus Session</h2>
      
      <input 
        type="text" 
        placeholder="What are you working on?" 
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <div className="text-7xl font-mono font-bold text-indigo-600 mb-8 tracking-wider">
        {formatTime(timeLeft)}
      </div>

      {/* Preset Buttons */}
      <div className="flex justify-center gap-2 mb-8">
        {[5, 15, 25, 45, 60].map((min) => (
          <button 
            key={min} 
            onClick={() => setDuration(min)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${mode === min ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {min}m
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-32 py-3 rounded-full font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-rose-500' : 'bg-indigo-600'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={() => setDuration(mode)}
          className="w-32 py-3 rounded-full font-bold bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;