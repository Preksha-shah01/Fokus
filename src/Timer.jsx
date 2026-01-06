import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; 
import toast from 'react-hot-toast'; // <--- 1. Import toast

const Timer = ({ onSessionComplete }) => {
  const [task, setTask] = useState('');
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState(10);
  const [isError, setIsError] = useState(false);

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      onSessionComplete(task, mode, 0); 
      triggerConfetti();
      
      // 2. Use Toast instead of alert
      toast.success("Session Complete! Great work! 🎉");
      
      // Play a ding sound
      new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-bells-notification-937.mp3').play().catch(e => console.log(e));
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
    if (isActive) setIsActive(false);
    else {
      if (!task.trim()) { 
        setIsError(true); 
        // 3. Error Toast
        toast.error("Please enter a goal first!");
        return; 
      }
      setIsError(false); setIsActive(true);
    }
  };

  const handleDone = () => {
    if (!task.trim()) return;
    setIsActive(false);
    const timeSpentMinutes = Math.ceil(((mode * 60) - timeLeft) / 60); 
    const savedMinutes = Math.floor(timeLeft / 60); 
    onSessionComplete(task, timeSpentMinutes, savedMinutes);
    setDuration(mode);
    setTask('');
    triggerConfetti();
    
    // 4. Success Toast
    toast.success(`Saved ${savedMinutes} minutes! nicely done.`);
  };

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-md text-center border border-white/50 dark:border-slate-600 mb-8 transform transition-all hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Focus Session</h2>
      
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="What are you working on?" 
          className={`w-full bg-white/50 dark:bg-slate-700/50 border-2 rounded-2xl p-4 text-lg outline-none transition-all placeholder-gray-400 dark:placeholder-slate-400 font-medium dark:text-white ${
            isError 
              ? 'border-red-400 ring-4 ring-red-100 dark:ring-red-900' 
              : 'border-white dark:border-slate-600 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900'
          }`}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            if(e.target.value.trim()) setIsError(false);
          }}
        />
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
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200 dark:shadow-none' 
              : 'bg-white dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600 shadow-sm'
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
        
        <button 
          onClick={handleDone}
          className="w-32 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95 text-lg bg-gradient-to-r from-emerald-400 to-teal-500"
        >
          Done
        </button>

        <button 
          onClick={() => setDuration(mode)}
          className="w-20 py-4 rounded-full font-bold bg-white dark:bg-slate-700 text-gray-500 dark:text-slate-300 border border-gray-100 dark:border-slate-600 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-lg"
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default Timer;