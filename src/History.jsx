import React from 'react';

const History = ({ history }) => {
  const totalMinutes = history.reduce((acc, sess) => acc + sess.duration, 0);
  
  return (
    <div className="w-full max-w-md">
      {/* Mini Dashboard */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/80 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
          <p className="text-gray-500 text-sm">Total Sessions</p>
          <p className="text-2xl font-bold text-indigo-600">{history.length}</p>
        </div>
        <div className="bg-white/80 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
          <p className="text-gray-500 text-sm">Total Minutes</p>
          <p className="text-2xl font-bold text-indigo-600">{totalMinutes}</p>
        </div>
      </div>

      {/* Recent List */}
      <div className="bg-white/80 rounded-2xl p-6 shadow-sm backdrop-blur-sm max-h-60 overflow-y-auto">
        <h3 className="font-bold text-gray-700 mb-4 sticky top-0 bg-white/0">Recent History</h3>
        {history.length === 0 ? (
          <p className="text-gray-400 text-center text-sm">No sessions yet. Start focusing!</p>
        ) : (
          <ul className="space-y-3">
            {history.map((session, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                <span className="font-medium text-gray-600 truncate max-w-[60%]">{session.task || "Untitled"}</span>
                <span className="text-gray-400">{session.duration} min • {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;