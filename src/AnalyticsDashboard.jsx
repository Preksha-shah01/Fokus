import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Reusable Colorful Stat Card Component
const StatCard = ({ title, value, subtitle, gradient }) => (
  <div className={`p-6 rounded-2xl shadow-lg text-white transform transition-transform hover:scale-105 ${gradient}`}>
    <h3 className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">{title}</h3>
    <p className="text-4xl font-extrabold mb-1 drop-shadow-md">{value}</p>
    <p className="text-sm text-white/90 font-medium">{subtitle}</p>
  </div>
);

const AnalyticsDashboard = ({ history }) => {
  // 1. Calculate Stats
  const stats = useMemo(() => {
    const totalSessions = history.length;
    const totalMinutes = history.reduce((acc, curr) => acc + curr.duration, 0);
    const totalSaved = history.reduce((acc, curr) => acc + (curr.savedTime || 0), 0);
    const avgSession = totalSessions ? Math.round(totalMinutes / totalSessions) : 0;
    
    const uniqueDays = new Set(history.map(s => new Date(s.date).toDateString()));
    const daysCount = uniqueDays.size || 1;
    const dailyAverage = Math.round(totalMinutes / daysCount);
    const longestSession = history.reduce((max, curr) => (curr.duration > max ? curr.duration : max), 0);

    let streak = 0;
    const uniqueDates = Array.from(uniqueDays).map(d => new Date(d).getTime()).sort((a,b) => b-a);
    if (uniqueDates.length > 0) streak = 1; 

    const formatMin = (m) => `${m}m`;

    return {
      totalMinutes: formatMin(totalMinutes),
      totalSessions,
      avgSession: formatMin(avgSession),
      completionRate: totalSessions > 0 ? "100%" : "0%",
      dailyAverage: formatMin(dailyAverage),
      longestSession: formatMin(longestSession),
      streak,
      totalSaved: formatMin(totalSaved),
    };
  }, [history]);

  // 2. Prepare Data for the Graph (Last 7 Days)
  const chartData = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue"
      const dateString = d.toDateString();
      
      const minutes = history
        .filter(h => new Date(h.date).toDateString() === dateString)
        .reduce((acc, curr) => acc + curr.duration, 0);
        
      last7Days.push({ name: dayName, minutes });
    }
    return last7Days;
  }, [history]);

  return (
    <>
      {/* BOX 1: MAIN ANALYTICS CARDS */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full border border-white/40 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">📊</span> Focus Analytics
        </h2>

        {/* Grid of Colorful Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Focus" value={stats.totalMinutes} gradient="bg-gradient-to-br from-violet-500 to-purple-600" />
          <StatCard title="Sessions" value={stats.totalSessions} subtitle="completed" gradient="bg-gradient-to-br from-emerald-400 to-teal-500" />
          <StatCard title="Avg. Session" value={stats.avgSession} gradient="bg-gradient-to-br from-amber-400 to-orange-500" />
          <StatCard title="Completion" value={stats.completionRate} gradient="bg-gradient-to-br from-blue-400 to-indigo-500" />
          <StatCard title="Daily Avg" value={stats.dailyAverage} gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
          <StatCard title="Best Session" value={stats.longestSession} gradient="bg-gradient-to-br from-fuchsia-500 to-pink-600" />
          <StatCard title="Streak" value={stats.streak} subtitle="days on fire!" gradient="bg-gradient-to-br from-red-500 to-orange-600" />
          <StatCard title="Saved Time" value={stats.totalSaved} subtitle="efficiency bonus" gradient="bg-gradient-to-br from-gray-500 to-slate-600" />
        </div>
      </div>

      {/* BOX 2: WEEKLY ACTIVITY GRAPH (SEPARATE BOX) */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full border border-white/40">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <span>📈</span> Weekly Activity
        </h3>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="minutes" radius={[6, 6, 6, 6]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#8b5cf6' : '#e5e7eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;