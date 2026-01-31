import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../state/useWeather';

const THEMES = {
    sunny: {
        background: "linear-gradient(to bottom, #0EA5E9 0%, #BAE6FD 100%)", // Vibrant Sky Blue -> Light Blue
        overlay: "bg-orange-400/0", // Clear
        hasSun: true
    },
    cloudy: {
        background: "linear-gradient(to bottom, #757F9A 0%, #D7DDE8 100%)", // Grey/Silver
        overlay: "bg-gray-500/10",
        hasSun: false
    },
    rainy: {
        background: "linear-gradient(to bottom, #203A43 0%, #2C5364 100%)", // Dark Blue/Grey
        overlay: "bg-blue-900/30",
        hasSun: false
    }
};

const SkyCanvas = ({ children }) => {
    const { weather } = useWeather();
    const activeTheme = THEMES[weather] || THEMES.sunny;

    return (
        <motion.div
            className="relative w-full h-screen overflow-hidden"
            animate={{
                backgroundImage: activeTheme.background,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
        >
            {/* Sun & Rays (Sunny Mode Only) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeTheme.hasSun ? 1 : 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* The Sun Glow (Top Left) */}
                <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-white/40 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                {/* Light Beams / Lens Flare Effect */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 mix-blend-overlay">
                    <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.8)_20deg,transparent_40deg,rgba(255,255,255,0.5)_60deg,transparent_360deg)] animate-spin-slow origin-center brightness-150 blur-xl" style={{ animationDuration: '60s' }} />
                </div>
            </motion.div>

            {/* Tint Overlay */}
            <motion.div
                className={`absolute inset-0 pointer-events-none ${activeTheme.overlay}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />

            {/* Parallax / Cloud Container */}
            <div className="absolute inset-0">
                {children}
            </div>
        </motion.div>
    );
};

export default SkyCanvas;
