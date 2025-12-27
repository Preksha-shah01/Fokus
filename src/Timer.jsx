import React, { useState, useEffect } from 'react';

const Timer = ({ onSessionComplete }) => {
  const [task, setTask] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState(25);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      // Natural finish: 0 saved time
      onSessionComplete(task, mode, 0); 
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log("Audio failed:", e));
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

  const handleStart = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      if (!task.trim()) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setIsActive(true);
    }
  };

  // --- NEW: LOGIC FOR SAVED TIME ---
  const handleDone = () => {
    if (!task.trim()) return;
    
    setIsActive(false);
    
    // Calculate stats
    const timeSpentSeconds = (mode * 60) - timeLeft;
    const timeSpentMinutes = Math.ceil(timeSpentSeconds / 60); // Round up partial minutes
    
    const savedSeconds = timeLeft;
    const savedMinutes = Math.floor(savedSeconds / 60); // Only count full saved minutes
    
    // Send 3 things: Task Name, Actual Time Worked, Time Saved
    onSessionComplete(task, timeSpentMinutes, savedMinutes);
    
    // Reset for next time
    setDuration(mode);
    setTask('');
    alert(`Great job! You saved ${savedMinutes} minutes!`);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-full max-w-md text-center border border-white/50 mb-8 transform transition-all hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Focus Session</h2>
      
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="What are you working on?" 
          className={`w-full bg-white/50 border-2 rounded-2xl p-4 text-lg outline-none transition-all placeholder-gray-400 font-medium ${
            isError 
              ? 'border-red-400 ring-4 ring-red-100' 
              : 'border-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100'
          }`}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            if(e.target.value.trim()) setIsError(false);
          }}
        />
        {isError && (
          <p className="absolute -bottom-6 left-1 text-rose-600 text-xs font-bold animate-bounce">
            ⚠️ Please enter a goal to start!
          </p>
        )}
      </div>

      <div className="text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center gap-3 mb-10">
        {[1, 5, 10, 30, 60].map((min) => (
          <button 
            key={min} 
            onClick={() => setDuration(min)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-1 ${
              mode === min 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200' 
              : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {min}m
          </button>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <button 
          onClick={handleStart}
          className={`w-32 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95 text-lg ${
            isActive 
            ? 'bg-gradient-to-r from-rose-400 to-orange-400' 
            : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        
        {/* NEW: FINISH EARLY BUTTON */}
        <button 
          onClick={handleDone}
          className="w-32 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95 text-lg bg-gradient-to-r from-emerald-400 to-teal-500"
        >
          Done
        </button>

        <button 
          onClick={() => setDuration(mode)}
          className="w-20 py-4 rounded-full font-bold bg-white text-gray-500 border border-gray-100 shadow-lg hover:bg-gray-50 transition-colors text-lg"
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default Timer;