import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../utils/audioManager';

const EnterScreen = ({ onEnter }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleEnter = async () => {
        await audioManager.initialize();
        setIsVisible(false);
        if (onEnter) onEnter();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white cursor-pointer"
                    onClick={handleEnter}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg font-light tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity"
                    >
                        Tap to Enter
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EnterScreen;
