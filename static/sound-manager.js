/**
 * Sound Manager for Pokemon Probability Academy
 * Handles loading and playing sound effects
 */

const SOUND_PATHS = {
    HOVER: '/static/sounds/001_Hover_01.wav',
    CONFIRM: '/static/sounds/013_Confirm_03.wav',
    DENIED: '/static/sounds/033_Denied_03.wav',
    USE_ITEM: '/static/sounds/051_use_item_01.wav'
};

class SoundManager {
    constructor() {
        this.cache = {};
        this.enabled = true;
    }

    /**
     * Preload all sounds
     */
    preload() {
        Object.keys(SOUND_PATHS).forEach(key => {
            const audio = new Audio(SOUND_PATHS[key]);
            audio.load();
            this.cache[key] = audio;
        });
    }

    /**
     * Play a sound by key
     * @param {string} key - The sound key (HOVER, CONFIRM, etc)
     */
    play(key) {
        if (!this.enabled) return;

        const path = SOUND_PATHS[key];
        if (!path) {
            console.warn(`Sound key not found: ${key}`);
            return;
        }

        // Always create a new audio object for overlapping sounds
        const audio = new Audio(path);
        audio.volume = 0.5; // Set a default reasonable volume
        audio.play().catch(err => {
            // Browsers often block auto-playing audio until the user interacts
            // We just catch it silently to avoid console spam
            console.debug('Audio play failed (waiting for interaction):', err);
        });
    }

    /**
     * Specialized play methods
     */
    playHover() { this.play('HOVER'); }
    playConfirm() { this.play('CONFIRM'); }
    playDenied() { this.play('DENIED'); }
    playClick() { this.play('USE_ITEM'); }

    toggle(state) {
        this.enabled = state !== undefined ? state : !this.enabled;
        return this.enabled;
    }
}

// Export as a singleton
export const sounds = new SoundManager();
