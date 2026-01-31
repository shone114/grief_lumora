import React from 'react';
import { useWeather } from '../state/useWeather';

const WeatherSlider = () => {
    const { weather, setWeather } = useWeather();

    const moods = [
        { id: 'sunny', label: 'Sunny' },
        { id: 'cloudy', label: 'Cloudy' },
        { id: 'rainy', label: 'Rainy' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 flex gap-6 border border-white/10 shadow-lg">
            {moods.map((m) => (
                <button
                    key={m.id}
                    onClick={() => setWeather(m.id)}
                    className={`text-xs uppercase tracking-widest transition-all duration-500 ${weather === m.id
                            ? 'text-white font-bold opacity-100 scale-110 shadow-glow'
                            : 'text-white/50 hover:text-white/80 hover:scale-105'
                        }`}
                >
                    {m.label}
                </button>
            ))}
        </div>
    );
};

export default WeatherSlider;
