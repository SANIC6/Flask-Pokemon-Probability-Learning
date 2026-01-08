/**
 * Sound Manager for Pokemon Probability Academy
 * Handles loading and playing sound effects
 */

const SOUND_PATHS = {
    CLICK: 'https://www.myinstants.com/media/sounds/tmpq91k5v_6.mp3',
    QUIZ_CORRECT: 'https://www.myinstants.com/media/sounds/129-received-an-item.mp3',
    QUIZ_WRONG: 'https://www.myinstants.com/media/sounds/bumpintowall_X5CNQPB.mp3',
    QUIZ_FAIL: 'https://www.myinstants.com/media/sounds/low-hp-pokemon.mp3',
    QUIZ_WIN: 'https://www.myinstants.com/media/sounds/06-caught-a-pokemon.mp3'
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
     * @param {string} key - The sound key (CLICK, QUIZ_CORRECT, etc)
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
            console.debug('Audio play failed (waiting for interaction):', err);
        });
    }

    /**
     * Specialized play methods
     */
    playClick() { this.play('CLICK'); }
    playQuizCorrect() { this.play('QUIZ_CORRECT'); }
    playQuizWrong() { this.play('QUIZ_WRONG'); }
    playQuizFail() { this.play('QUIZ_FAIL'); }
    playQuizWin() { this.play('QUIZ_WIN'); }

    toggle(state) {
        this.enabled = state !== undefined ? state : !this.enabled;
        return this.enabled;
    }
}

// Export as a singleton
export const sounds = new SoundManager();
