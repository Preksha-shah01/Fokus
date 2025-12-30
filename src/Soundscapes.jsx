import React, { useState, useRef, useEffect } from 'react';

const sounds = [
  { 
    id: 'rain', 
    label: 'Rain', 
    icon: '🌧️', 
    url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' 
  },
  { 
    id: 'forest', 
    label: 'Forest', 
    icon: '🌲', 
    url: 'https://actions.google.com/sounds/v1/relax/river_sounds.ogg' 
  },
  { 
    id: 'cafe', 
    label: 'Cafe', 
    icon: '☕', 
    url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' 
  },
  { 
    id: 'fire', 
    label: 'Fire', 
    icon: '🔥', 
    url: 'https://actions.google.com/sounds/v1/ambiences/fireplace.ogg' 
  }
];

const Soundscapes = () => {
  const [activeSound, setActiveSound] = useState(null);
  const audioRef = useRef(new Audio());

  // Handle Play/Pause
  const toggleSound = (sound) => {
    if (activeSound === sound.id) {
      // If clicking the active one, stop it
      audioRef.current.pause();
      setActiveSound(null);
    } else {
      // Play new sound
      audioRef.current.src = sound.url;
      audioRef.current.loop = true; // Make it repeat forever
      audioRef.current.volume = 0.5; // Set volume to 50% so it's not too loud
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
      setActiveSound(sessionStorage.id); // Typo fix in logic below
      setActiveSound(sound.id);
    }
  };

  // Cleanup when leaving the page
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-full px-6 py-3 flex gap-4 items-center transition-all hover:scale-105 hover:bg-white/90">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-2 hidden md:block">
          Zen Mode
        </span>
        
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound)}
            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center group relative ${
              activeSound === sound.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300 scale-110' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            title={`Play ${sound.label}`}
          >
            <span className="text-xl">{sound.icon}</span>
            
            {/* Tooltip on Hover */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {sound.label}
            </span>

            {/* Visual Equalizer Animation when playing */}
            {activeSound === sound.id && (
              <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full animate-ping"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Soundscapes;