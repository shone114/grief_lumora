import React from 'react';
import { motion } from 'framer-motion';
import cloudImg from '../assets/clouds/cloud_1.png';

const Cloud = ({ cloud }) => {
    const { type, direction, duration, delay, scale, opacity, top, zIndex } = cloud;

    // Animation Variants
    // LTR: Start at -20%, End at 120%
    const driftVariants = {
        ltr: { x: ['-20vw', '120vw'] },
        rtl: { x: ['120vw', '-20vw'] }
    };

    // Interaction style
    const isInteractive = type === 'interactive';
    const cursorClass = isInteractive ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none';

    return (
        <motion.div
            className={`absolute ${cursorClass}`}
            style={{
                top: `${top}%`,
                width: '400px', // Base size for image
                height: 'auto', // Preserve aspect ratio
                zIndex: zIndex,
                scale: scale,
                opacity: opacity,
            }}
            initial="start"
            animate={direction === 'ltr' ? "ltr" : "rtl"}
            variants={driftVariants}
            transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                delay: delay || 0, // Apply negative delay for initial positioning
            }}
            whileHover={{ scale: scale * 1.05, opacity: 1 }}
        >
            <img
                src={cloudImg}
                alt="Memory Cloud"
                className="w-full h-auto object-contain pointer-events-none drop-shadow-xl"
                draggable="false"
            />
        </motion.div>
    );
};

export default Cloud;
