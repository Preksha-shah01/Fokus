import React from 'react';

const History = ({ history, onClear }) => {
  const totalMinutes = history.reduce((acc, sess) => acc + sess.duration, 0);
  
  return (
    <div className="w-full max-w-md pb-2">
      <div className="grid grid-cols-2 gap-3 mb-4">
        
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-3 rounded-xl shadow-sm border border-white/40 dark:border-slate-600 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 text-center whitespace-nowrap">
            Sessions
          </p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-tight">
            {history.length}
          </p>
        </div>
        
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-3 rounded-xl shadow-sm border border-white/40 dark:border-slate-600 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 text-center whitespace-nowrap">
            Minutes
          </p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-tight">
            {totalMinutes}
          </p>
        </div>

      </div>

      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/40 dark:border-slate-600 max-h-56 overflow-y-auto custom-scrollbar relative">
        
        {/* Header Row with Clear Button */}
        <div className="flex justify-between items-center mb-3 sticky top-0 bg-transparent z-10">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-[10px] uppercase tracking-wider pl-1">
            Recent History
            </h3>

            {/* ✨ UPDATED BUTTON: Better Visibility */}
            {history.length > 0 && (
                <button 
                    onClick={onClear}
                    className="flex items-center gap-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg transition-colors border border-red-100 dark:border-red-900/50 shadow-sm"
                    title="Clear All History"
                >
                    <span className="text-[10px] font-bold uppercase tracking-wide">🗑️ Clear</span>
                </button>
            )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-400 text-center text-xs py-2">No sessions yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((session, idx) => (
              <li key={idx} className="flex justify-between items-center text-xs border-b border-gray-200/40 dark:border-slate-600/40 pb-2 last:border-0 hover:bg-white/40 dark:hover:bg-slate-700/50 p-1.5 rounded-lg transition-all">
                <span className="font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[60%]">{session.task || "Untitled"}</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium bg-white/50 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">
                  {session.duration}m
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;