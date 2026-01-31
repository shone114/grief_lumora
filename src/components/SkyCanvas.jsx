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
            {/* Removed parent opacity to prevent stacking context isolation of blend modes */}
            <div className="absolute inset-0 pointer-events-none">

                {/* 1. Sun Layer Group (Core + Glow) - Normal Blend */}
                <motion.div
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTheme.hasSun ? 1 : 0 }}
                    transition={{ duration: activeTheme.hasSun ? 2 : 1 }}
                >
                    {/* The Sun Core (Bright White/Yellow Center) */}
                    <div className="absolute top-[30%] left-[30%] w-[20vw] h-[20vw] bg-yellow-100 blur-[60px] rounded-full opacity-90 z-10" />

                    {/* Outer Glow (Deep Orange to prevent Green) */}
                    <div className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-orange-500/30 blur-[120px] rounded-full z-0" />
                </motion.div>

                {/* 2. God Rays (Screen Blend) - Animate Opacity Directly */}
                <motion.div
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] flex items-center justify-center mix-blend-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTheme.hasSun ? 0.6 : 0 }}
                    transition={{ duration: activeTheme.hasSun ? 2 : 1 }}
                >
                    <div
                        className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,160,50,0.6)_10deg,transparent_20deg,rgba(255,200,100,0.4)_40deg,transparent_360deg)] animate-spin-slow origin-center blur-md"
                        style={{ animationDuration: '80s' }}
                    />
                    <div
                        className="absolute w-[120%] h-[120%] bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(255,140,0,0.4)_15deg,transparent_30deg,rgba(255,220,150,0.3)_45deg,transparent_360deg)] animate-spin-slow origin-center blur-xl"
                        style={{ animationDuration: '100s', animationDirection: 'reverse' }}
                    />
                </motion.div>

                {/* 3. Lens Flares (Screen Blend) - Animate Opacity Directly */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden mix-blend-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTheme.hasSun ? 0.6 : 0 }}
                    transition={{ duration: activeTheme.hasSun ? 2 : 1 }}
                >
                    <div className="absolute top-[40%] left-[40%] w-[10vw] h-[10vw] bg-orange-400/20 rounded-full blur-[20px]" />
                    <div className="absolute top-[60%] left-[60%] w-[4vw] h-[4vw] bg-yellow-200/40 rounded-full blur-[5px]" />
                    <div className="absolute top-[75%] left-[75%] w-[8vw] h-[8vw] bg-orange-300/10 rounded-full blur-[40px]" />
                </motion.div>
            </div>

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
