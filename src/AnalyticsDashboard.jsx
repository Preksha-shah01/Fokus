import React, { useMemo } from 'react';

// A reusable component for each individual colored card
const StatCard = ({ title, value, subtitle, colorClasses }) => (
    <div className={`p-6 rounded-2xl ${colorClasses}`}>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
);

const AnalyticsDashboard = ({ history }) => {
  // We use useMemo so these calculations only run when 'history' changes
    const stats = useMemo(() => {
    const now = new Date();
    const totalSessions = history.length;
    const totalMinutes = history.reduce((acc, curr) => acc + curr.duration, 0);
    const avgSession = totalSessions ? Math.round(totalMinutes / totalSessions) : 0;

    // Get unique dates for daily calculations
    const uniqueDays = new Set(history.map(s => new Date(s.date).toDateString()));
    const daysCount = uniqueDays.size || 1; // Avoid division by zero
    const dailyAverage = Math.round(totalMinutes / daysCount);

    // Find longest session
    const longestSession = history.reduce((max, curr) => (curr.duration > max ? curr.duration : max), 0);

    // Calculate Streak (Consecutive days ending today or yesterday)
    let streak = 0;
    const todayStr = now.toDateString();
    const yesterdayStr = new Date(now.setDate(now.getDate() - 1)).toDateString();
    
    if (uniqueDays.has(todayStr) || uniqueDays.has(yesterdayStr)) {
        let currentDay = new Date();
        while (uniqueDays.has(currentDay.toDateString())) {
            streak++;
            currentDay.setDate(currentDay.getDate() - 1);
        }
    }

    // Formatting helper
    const formatMin = (m) => `${m}m`;

    return {
        totalMinutes: formatMin(totalMinutes),
        totalSessions,
        avgSession: formatMin(avgSession),
      // Assuming all saved sessions are "completed" for now
        completionRate: totalSessions > 0 ? "100%" : "0%",
        dailyAverage: formatMin(dailyAverage),
        longestSession: formatMin(longestSession),
        streak,
    };
    }, [history]);

    return (
    <div className="bg-white p-8 rounded-3xl shadow-lg w-full">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Focus Analytics</h2>

      {/* Fake Tabs for UI matching */}
        <div className="flex gap-2 mb-8">
        <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Overview</button>
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium">Daily Breakdown</button>
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-full text-sm font-medium">30-Day Trend</button>
        </div>

      {/* Grid of Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
            title="Total Focus Time"
            value={stats.totalMinutes}
            colorClasses="bg-purple-50"
        />
        <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            subtitle={`${stats.totalSessions} completed`}
            colorClasses="bg-green-50"
        />
        <StatCard
            title="Avg. Session"
            value={stats.avgSession}
            colorClasses="bg-yellow-50"
        />
        <StatCard
            title="Completion Rate"
            value={stats.completionRate}
            colorClasses="bg-blue-50"
        />
        <StatCard
            title="Daily Average"
            value={stats.dailyAverage}
            subtitle={`${(stats.totalSessions / (new Set(history.map(s => new Date(s.date).toDateString())).size || 1)).toFixed(1)} sessions`}
            colorClasses="bg-purple-50"
        />
        <StatCard
            title="Longest Session"
            value={stats.longestSession}
            colorClasses="bg-pink-50"
        />
        <StatCard
            title="Focus Streak"
            value={stats.streak}
            subtitle="current streak days"
            colorClasses="bg-red-50"
        />
        {/* Placeholder for feature not yet implemented */}
        <StatCard
            title="Partial Sessions"
            value="0"
            subtitle="0m saved"
            colorClasses="bg-green-50 opacity-60"
        />
        </div>
    </div>
  );
};

export default AnalyticsDashboard;