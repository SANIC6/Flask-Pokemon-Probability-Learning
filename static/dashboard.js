/**
 * Dashboard JavaScript for Pokemon Probability Academy
 * Renders lesson cards and manages navigation
 */

import { lessons } from './lessons.js';
import { StateManager } from './state-manager.js';
import { SpriteCache } from './sprite-cache.js';
import { sounds } from './sound-manager.js';

console.log('Pokemon Probability Academy Dashboard loaded!');

// Initialize dashboard
async function init() {
    updateProgressStats();
    await renderLessonCards();
    setupAnimations();
    setupGlobalSounds();
}

/**
 * Setup global sound effects for interactions
 */
function setupGlobalSounds() {
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        const card = e.target.closest('.lesson-card');

        if (button || card) {
            sounds.playClick();
        }
    });
}

/**
 * Update progress statistics in hero section
 */
function updateProgressStats() {
    const progress = StateManager.getProgress();

    // Update percentage
    const percentElem = document.getElementById('progress-percent');
    if (percentElem) {
        percentElem.textContent = `${progress.percentage}%`;
    }

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress.percentage}%`;
    }

    // Update progress text
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `${progress.completed} of ${progress.total} lessons completed`;
    }
}

/**
 * Render all lesson cards in the grid
 */
async function renderLessonCards() {
    const grid = document.getElementById('lessons-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear existing content

    // Collect all sprite IDs to preload
    const spriteIds = lessons.map(lesson => lesson.spriteId);

    // Preload sprites in background
    SpriteCache.preloadSprites(spriteIds).catch(err => {
        console.warn('Sprite preload failed, will load individually:', err);
    });

    // Render cards
    lessons.forEach((lesson, index) => {
        const card = createLessonCard(lesson, index);
        grid.appendChild(card);
    });
}

/**
 * Create a single lesson card element
 * @param {Object} lesson - Lesson data
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement}
 */
function createLessonCard(lesson, index) {
    const isComplete = StateManager.isLessonComplete(lesson.id);

    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.lessonId = lesson.id;
    card.style.animationDelay = `${index * 50}ms`;

    // Add complete class if lesson is done
    if (isComplete) {
        card.classList.add('complete');
    }

    card.innerHTML = `
        <div class="card-header">
            <div class="lesson-badge">Lesson ${lesson.id}</div>
            <div class="completion-icon ${isComplete ? 'complete' : ''}">
                ${isComplete ? '🔴' : '⚪'}
            </div>
        </div>
        <div class="card-sprite" data-sprite-id="${lesson.spriteId}">
            <div class="sprite-placeholder">
                <div class="spinner"></div>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${lesson.title}</h3>
            <button class="card-button">
                ${isComplete ? 'Review Lesson' : 'Start Lesson'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z"/>
                </svg>
            </button>
        </div>
    `;

    // Load sprite asynchronously
    loadSpriteForCard(card, lesson.spriteId);

    // Add click handler
    card.addEventListener('click', () => {
        navigateToLesson(lesson.id);
    });

    // Add hover effect (no sound)
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    return card;
}

/**
 * Load sprite for a lesson card
 * @param {HTMLElement} card - Card element
 * @param {number} spriteId - Pokemon sprite ID
 */
async function loadSpriteForCard(card, spriteId) {
    const spriteContainer = card.querySelector('.card-sprite');
    if (!spriteContainer) return;

    try {
        const spriteUrl = await SpriteCache.getSprite(spriteId);

        // Create image element
        const img = document.createElement('img');
        img.src = spriteUrl;
        img.alt = `Pokemon #${spriteId}`;
        img.className = 'sprite-image';

        // Wait for image to load
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Replace placeholder with image
        spriteContainer.innerHTML = '';
        spriteContainer.appendChild(img);

    } catch (err) {
        console.error(`Failed to load sprite ${spriteId}:`, err);
        // Show fallback Pokeball icon
        spriteContainer.innerHTML = '<div class="sprite-fallback">⚪</div>';
    }
}

/**
 * Navigate to a lesson page
 * @param {number} lessonId
 */
function navigateToLesson(lessonId) {
    // Add transition class for smooth navigation
    document.body.classList.add('page-transition-out');

    setTimeout(() => {
        window.location.href = `/lesson/${lessonId}`;
    }, 300);
}

/**
 * Setup entrance animations
 */
function setupAnimations() {
    // Trigger fade-in animations
    const cards = document.querySelectorAll('.lesson-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add global debug helper
window.PPA_DEBUG = {
    clearProgress: () => StateManager.clearAllProgress(),
    exportProgress: () => console.log(StateManager.exportData()),
    clearCache: () => {
        SpriteCache.clearCache();
        location.reload();
    }
};
