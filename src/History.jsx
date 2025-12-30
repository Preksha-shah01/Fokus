import React from 'react';

const History = ({ history }) => {
  const totalMinutes = history.reduce((acc, sess) => acc + sess.duration, 0);
  
  return (
    <div className="w-full max-w-md pb-4">
      {/* Mini Dashboard */}
      {/* Added 'mb-8' for more space between these boxes and the list below */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        
        {/* Card 1: Increased padding to px-6 */}
        <div className="bg-white/60 backdrop-blur-md py-6 px-6 rounded-2xl shadow-sm border border-white/40 flex flex-col items-center justify-center min-h-[110px] transform transition-transform hover:scale-105">
          <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-widest mb-2 text-center">
            Total Sessions
          </p>
          <p className="text-4xl font-black text-indigo-600">
            {history.length}
          </p>
        </div>
        
        {/* Card 2: Increased padding to px-6 */}
        <div className="bg-white/60 backdrop-blur-md py-6 px-6 rounded-2xl shadow-sm border border-white/40 flex flex-col items-center justify-center min-h-[110px] transform transition-transform hover:scale-105">
          <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-widest mb-2 text-center">
            Total Minutes
          </p>
          <p className="text-4xl font-black text-indigo-600">
            {totalMinutes}
          </p>
        </div>

      </div>

      {/* Recent List */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/40 max-h-64 overflow-y-auto custom-scrollbar">
        <h3 className="font-bold text-gray-700 mb-4 sticky top-0 bg-transparent text-xs uppercase tracking-wider pl-1">
          Recent History
        </h3>
        {history.length === 0 ? (
          <p className="text-gray-400 text-center text-sm py-4">No sessions yet. Start focusing!</p>
        ) : (
          <ul className="space-y-3">
            {history.map((session, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-200/40 pb-3 last:border-0 hover:bg-white/40 p-2 rounded-xl transition-all">
                <span className="font-semibold text-slate-700 truncate max-w-[60%]">{session.task || "Untitled"}</span>
                <span className="text-slate-500 text-xs font-medium bg-white/50 px-2 py-1 rounded-md">
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