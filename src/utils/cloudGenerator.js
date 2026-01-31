export const generateCloud = (weather = 'sunny', layerType = 'baseline', startOnScreen = false) => {
    // 1. Direction Logic: Always Left-to-Right
    const direction = 'ltr';

    // 2. Define Layer Configs
    let config;
    if (layerType === 'interactive') {
        // FOREGROUND: The "Hero" clouds (Clickable, Big, High Z)
        config = {
            scaleMin: 1.5,
            scaleMax: 2.2,
            opacityMin: 0.9,
            opacityMax: 1.0,
            topMin: 15,
            topMax: 70, // Central band (Accessible)
            zBase: 50,  // Always on top
            speedMod: 0.8, // Slightly majestic/slow
        };
    } else {
        // BASELINE: Background atmosphere (Non-clickable, Varied, Low Z)
        config = {
            scaleMin: 0.8,
            scaleMax: 1.4,
            opacityMin: 0.4,
            opacityMax: 0.7, // Distinctly more transparent
            topMin: 5,
            topMax: 85, // Fill the whole sky
            zBase: 10,  // Behind heroes
            speedMod: 1.1, // Varied speed
        };
    }

    // 3. Base Speed (Duration)
    let baseDuration;
    switch (weather) {
        case 'sunny': baseDuration = 45; break;
        case 'rainy': baseDuration = 80; break;
        case 'cloudy': default: baseDuration = 60; break;
    }
    const duration = baseDuration * config.speedMod * (0.9 + Math.random() * 0.2);

    // 4. Props
    const scale = config.scaleMin + Math.random() * (config.scaleMax - config.scaleMin);
    const opacity = config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin);
    const top = config.topMin + Math.random() * (config.topMax - config.topMin);
    const zIndex = config.zBase + Math.floor(Math.random() * 10);

    // 5. Initial Position
    let delay = 0;
    if (startOnScreen) {
        delay = -Math.random() * (duration * 0.95);
    }

    return {
        id: crypto.randomUUID(),
        direction,
        type: layerType, // 'baseline' or 'interactive'
        duration,
        delay,
        scale,
        opacity,
        top,
        zIndex,
        memory: null,
    };
};
