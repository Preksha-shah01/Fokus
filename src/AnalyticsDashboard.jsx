import React, { useMemo } from 'react';

// Reusable Colorful Stat Card Component
const StatCard = ({ title, value, subtitle, gradient }) => (
  <div className={`p-6 rounded-2xl shadow-lg text-white transform transition-transform hover:scale-105 ${gradient}`}>
    <h3 className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">{title}</h3>
    <p className="text-4xl font-extrabold mb-1 drop-shadow-md">{value}</p>
    <p className="text-sm text-white/90 font-medium">{subtitle}</p>
  </div>
);

const AnalyticsDashboard = ({ history }) => {
  const stats = useMemo(() => {
    const totalSessions = history.length;
    
    // Calculate total minutes actually worked
    const totalMinutes = history.reduce((acc, curr) => acc + curr.duration, 0);
    
    // NEW: Calculate total saved time (handling cases where savedTime might be undefined)
    const totalSaved = history.reduce((acc, curr) => acc + (curr.savedTime || 0), 0);

    const avgSession = totalSessions ? Math.round(totalMinutes / totalSessions) : 0;
    
    // Calculate unique days for daily average
    const uniqueDays = new Set(history.map(s => new Date(s.date).toDateString()));
    const daysCount = uniqueDays.size || 1;
    const dailyAverage = Math.round(totalMinutes / daysCount);
    
    // Find longest session
    const longestSession = history.reduce((max, curr) => (curr.duration > max ? curr.duration : max), 0);

    // Simple streak logic
    let streak = 0;
    const uniqueDates = Array.from(uniqueDays).map(d => new Date(d).getTime()).sort((a,b) => b-a);
    if (uniqueDates.length > 0) streak = 1; // Simplified streak for now

    const formatMin = (m) => `${m}m`;

    return {
      totalMinutes: formatMin(totalMinutes),
      totalSessions,
      avgSession: formatMin(avgSession),
      completionRate: totalSessions > 0 ? "100%" : "0%",
      dailyAverage: formatMin(dailyAverage),
      longestSession: formatMin(longestSession),
      streak,
      totalSaved: formatMin(totalSaved), // Send the calculated saved time to UI
    };
  }, [history]);

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full border border-white/40">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="text-4xl">📊</span> Focus Analytics
      </h2>

      {/* Grid of Colorful Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Focus"
          value={stats.totalMinutes}
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
        />
        <StatCard
          title="Sessions"
          value={stats.totalSessions}
          subtitle="completed"
          gradient="bg-gradient-to-br from-emerald-400 to-teal-500"
        />
        <StatCard
          title="Avg. Session"
          value={stats.avgSession}
          gradient="bg-gradient-to-br from-amber-400 to-orange-500"
        />
        <StatCard
          title="Completion"
          value={stats.completionRate}
          gradient="bg-gradient-to-br from-blue-400 to-indigo-500"
        />
        <StatCard
          title="Daily Avg"
          value={stats.dailyAverage}
          gradient="bg-gradient-to-br from-pink-500 to-rose-500"
        />
        <StatCard
          title="Best Session"
          value={stats.longestSession}
          gradient="bg-gradient-to-br from-fuchsia-500 to-pink-600"
        />
        <StatCard
          title="Streak"
          value={stats.streak}
          subtitle="days on fire!"
          gradient="bg-gradient-to-br from-red-500 to-orange-600"
        />
        {/* NEW: Updated Saved Time Card */}
        <StatCard
          title="Saved Time"
          value={stats.totalSaved}
          subtitle="efficiency bonus"
          gradient="bg-gradient-to-br from-gray-500 to-slate-600"
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;