/**
 * State Manager for Pokemon Probability Academy
 * Handles lesson completion tracking and quiz variant selection
 */

const STATE_KEYS = {
    COMPLETED_LESSONS: 'ppa_completed_lessons',
    QUIZ_HISTORY: 'ppa_quiz_history',
    LAST_SYNC: 'ppa_last_sync'
};

export const StateManager = {
    /**
     * Get array of completed lesson IDs
     * @returns {number[]} Array of lesson IDs
     */
    getCompletedLessons() {
        const stored = localStorage.getItem(STATE_KEYS.COMPLETED_LESSONS);
        return stored ? JSON.parse(stored) : [];
    },

    /**
     * Check if a specific lesson is completed
     * @param {number} lessonId 
     * @returns {boolean}
     */
    isLessonComplete(lessonId) {
        const completed = this.getCompletedLessons();
        return completed.includes(lessonId);
    },

    /**
     * Mark a lesson as complete
     * @param {number} lessonId 
     */
    markLessonComplete(lessonId) {
        const completed = this.getCompletedLessons();
        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(STATE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
            this.updateLastSync();
        }
    },

    /**
     * Mark a lesson as incomplete (for wrong answers)
     * @param {number} lessonId 
     */
    markLessonIncomplete(lessonId) {
        const completed = this.getCompletedLessons();
        const index = completed.indexOf(lessonId);
        if (index > -1) {
            completed.splice(index, 1);
            localStorage.setItem(STATE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
            this.updateLastSync();
        }
    },

    /**
     * Get quiz history for all lessons
     * @returns {Object} Map of lessonId to array of seen variant IDs
     */
    getQuizHistory() {
        const stored = localStorage.getItem(STATE_KEYS.QUIZ_HISTORY);
        return stored ? JSON.parse(stored) : {};
    },

    /**
     * Get which quiz variants have been seen for a specific lesson
     * @param {number} lessonId 
     * @returns {number[]} Array of variant IDs (1, 2, or 3)
     */
    getSeenQuizVariants(lessonId) {
        const history = this.getQuizHistory();
        return history[lessonId] || [];
    },

    /**
     * Record that a quiz variant has been seen
     * @param {number} lessonId 
     * @param {number} variantId (1, 2, or 3)
     */
    recordQuizVariant(lessonId, variantId) {
        const history = this.getQuizHistory();
        if (!history[lessonId]) {
            history[lessonId] = [];
        }
        if (!history[lessonId].includes(variantId)) {
            history[lessonId].push(variantId);
            localStorage.setItem(STATE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
        }
    },

    /**
     * Intelligently select a quiz variant for a lesson
     * Prioritizes unseen variants, resets after all seen
     * @param {number} lessonId 
     * @returns {number} Variant ID (1, 2, or 3)
     */
    selectQuizVariant(lessonId) {
        const seen = this.getSeenQuizVariants(lessonId);
        const allVariants = [1, 2, 3];

        // Find unseen variants
        const unseen = allVariants.filter(v => !seen.includes(v));

        // If all variants have been seen, reset for this lesson
        if (unseen.length === 0) {
            const history = this.getQuizHistory();
            history[lessonId] = [];
            localStorage.setItem(STATE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
            // Return random variant
            return allVariants[Math.floor(Math.random() * allVariants.length)];
        }

        // Return random unseen variant
        return unseen[Math.floor(Math.random() * unseen.length)];
    },

    /**
     * Get progress statistics
     * @returns {Object} { completed: number, total: number, percentage: number }
     */
    getProgress() {
        const completed = this.getCompletedLessons().length;
        const total = 10; // Total lessons
        return {
            completed,
            total,
            percentage: Math.round((completed / total) * 100)
        };
    },

    /**
     * Update last sync timestamp
     */
    updateLastSync() {
        localStorage.setItem(STATE_KEYS.LAST_SYNC, new Date().toISOString());
    },

    /**
     * Clear all progress (for testing/reset)
     */
    clearAllProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(STATE_KEYS.COMPLETED_LESSONS);
            localStorage.removeItem(STATE_KEYS.QUIZ_HISTORY);
            localStorage.removeItem(STATE_KEYS.LAST_SYNC);
            return true;
        }
        return false;
    },

    /**
     * Export progress data (for backup/debugging)
     * @returns {Object}
     */
    exportData() {
        return {
            completed: this.getCompletedLessons(),
            quizHistory: this.getQuizHistory(),
            lastSync: localStorage.getItem(STATE_KEYS.LAST_SYNC),
            exportDate: new Date().toISOString()
        };
    },

    /**
     * Import progress data (for restore)
     * @param {Object} data 
     */
    importData(data) {
        if (data.completed) {
            localStorage.setItem(STATE_KEYS.COMPLETED_LESSONS, JSON.stringify(data.completed));
        }
        if (data.quizHistory) {
            localStorage.setItem(STATE_KEYS.QUIZ_HISTORY, JSON.stringify(data.quizHistory));
        }
        this.updateLastSync();
    }
};
