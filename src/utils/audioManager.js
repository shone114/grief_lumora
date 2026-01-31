import { Howl, Howler } from 'howler';

class AudioManager {
    constructor() {
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        // Resume AudioContext
        if (Howler.ctx && Howler.ctx.state === 'suspended') {
            await Howler.ctx.resume();
        }

        this.initialized = true;
        console.log("Audio Initialized");
    }
}

export const audioManager = new AudioManager();
