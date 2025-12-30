import React, { useState, useRef, useEffect } from 'react';

const sounds = [
  { 
    id: 'rain', 
    label: 'Rain', 
    icon: '🌧️', 
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3' 
  },
  { 
    id: 'forest', 
    label: 'Forest', 
    icon: '🌲', 
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-stream-loop-1210.mp3' 
  },
  { 
    id: 'cafe', 
    label: 'Cafe', 
    icon: '☕', 
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-restaurant-crowd-talking-ambience-44.mp3' 
  },
  { 
    id: 'fire', 
    label: 'Fire', 
    icon: '🔥', 
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3' 
  }
];

const Soundscapes = () => {
  const [activeSound, setActiveSound] = useState(null);
  const audioRef = useRef(new Audio());

  const toggleSound = (sound) => {
    if (activeSound === sound.id) {
      audioRef.current.pause();
      setActiveSound(null);
    } else {
      audioRef.current.pause();
      audioRef.current.src = sound.url;
      audioRef.current.loop = true; 
      audioRef.current.volume = 0.5;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setActiveSound(sound.id))
          .catch((error) => {
            console.error("Playback failed.", error);
            setActiveSound(null);
          });
      }
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
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