import React, { useState, useEffect } from 'react';

const quotes = [
    "“Focus on being productive instead of busy.”",
    "“The only way to do great work is to love what you do.” – Steve Jobs",
    "“Your future is created by what you do today, not tomorrow.”",
    "“Starve your distractions, feed your focus.”",
    "“One thing at a time. Most important thing first. Start now.”",
    "“Simplicity is the ultimate sophistication.” – Leonardo da Vinci",
    "“It’s not about having time. It’s about making time.”",
    "“Don’t watch the clock; do what it does. Keep going.”",
    "“Success is the sum of small efforts, repeated day in and day out.”"
];

const Motivation = () => {
    const [quote, setQuote] = useState("");

    useEffect(() => {
    // Pick a random quote when the component loads
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    }, []);

    return (
    <div className="text-center mb-8 fade-in">
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium italic">
        {quote}
        </p>
    </div>
    );
};

export default Motivation;