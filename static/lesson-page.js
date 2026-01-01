/**
 * Lesson Page JavaScript for Pokemon Probability Academy
 * Handles lesson content, interactive widgets, quizzes, and completion
 */

import { lessons } from './lessons.js';
import { StateManager } from './state-manager.js';
import { SpriteCache } from './sprite-cache.js';
import { sounds } from './sound-manager.js';

// Import widget renderers from main.js
// We'll need to refactor main.js to export these functions

const lessonId = window.LESSON_ID;
const lesson = lessons.find(l => l.id === lessonId);

let currentQuestionIndex = 0;
let wrongAnswersCount = 0;
let selectedQuizVariant = null;
let quizQuestions = [];

// Initialize lesson page
async function init() {
    if (!lesson) {
        window.location.href = '/';
        return;
    }

    setupNavigation();
    renderLessonContent();
    await loadInteractiveWidget();
    setupQuizSection();
}

/**
 * Setup navigation handlers
 */
function setupNavigation() {
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToDashboard();
        });
    }

    // Dashboard button in completion section
    const dashboardBtn = document.getElementById('dashboard-btn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', navigateToDashboard);
    }

    // Next lesson button
    const nextLessonBtn = document.getElementById('next-lesson-btn');
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', () => {
            // Check if we failed the quiz (isPass is not globally accessible, but we can check button text or state)
            if (nextLessonBtn.textContent === 'Retry Quiz') {
                location.reload();
                return;
            }

            const nextId = lessonId + 1;
            if (nextId <= 10) {
                window.location.href = `/lesson/${nextId}`;
            } else {
                navigateToDashboard();
            }
        });
    }
}

/**
 * Navigate back to dashboard with transition
 */
function navigateToDashboard() {
    document.body.classList.add('page-transition-out');
    setTimeout(() => {
        window.location.href = '/';
    }, 300);
}

/**
 * Render lesson content
 */
function renderLessonContent() {
    const contentDiv = document.getElementById('lesson-content');
    if (contentDiv && lesson.content) {
        contentDiv.innerHTML = lesson.content;
    }

    // Update lesson title
    const titleElem = document.getElementById('lesson-title');
    if (titleElem) {
        titleElem.textContent = lesson.title;
    }
}

/**
 * Load and render the interactive widget
 */
async function loadInteractiveWidget() {
    if (!lesson.interactive) return;

    const widgetDiv = document.getElementById('interactive-widget');
    if (!widgetDiv) return;

    // Import and setup widget based on type
    // This will require exporting widget functions from main.js
    // For now, show a placeholder
    try {
        const { setupInteractive } = await import('./main.js');
        // Pass the container element directly (not a string ID)
        await setupInteractive(lesson.interactive, widgetDiv);
        console.log(`Loaded interactive widget: ${lesson.interactive}`);
    } catch (err) {
        console.error('Failed to load widget:', err);
        widgetDiv.innerHTML = `
            <div class="widget-placeholder">
                <p>Interactive widget: ${lesson.interactive}</p>
                <p>Practice with the ${lesson.title} concept!</p>
            </div>
        `;
    }
}

/**
 * Setup quiz section
 */
function setupQuizSection() {
    // Select quiz variant
    selectedQuizVariant = StateManager.selectQuizVariant(lessonId);
    const quizData = lesson.quizzes.find(q => q.variant === selectedQuizVariant);

    if (!quizData) {
        console.error('Quiz variant not found');
        return;
    }

    quizQuestions = quizData.questions;

    // Show quiz section after a delay
    setTimeout(() => {
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
            quizSection.style.display = 'block';
            quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        startQuiz();
    }, 2000); // Give user time to interact with widget
}

/**
 * Start the quiz
 */
function startQuiz() {
    currentQuestionIndex = 0;
    renderProgressDots();
    renderQuestion();
}

/**
 * Render progress dots
 */
function renderProgressDots() {
    const dotsContainer = document.getElementById('quiz-progress-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    quizQuestions.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `progress-dot ${index === currentQuestionIndex ? 'active' : ''}`;
        dotsContainer.appendChild(dot);
    });
}

/**
 * Render current question
 */
function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) return;

    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return;

    quizContent.innerHTML = `
        <div class="question-card fade-in">
            <div class="question-number">Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</div>
            <h3 class="question-text">${question.question}</h3>
            <div class="answer-choices">
                ${question.choices.map((choice, index) => `
                    <button class="answer-button" data-index="${index}">
                        <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="choice-text">${choice}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Add click handlers to answer buttons
    const answerButtons = quizContent.querySelectorAll('.answer-button');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => handleAnswer(parseInt(button.dataset.index)));
        button.addEventListener('mouseenter', () => sounds.playHover());
    });

    // Update progress dots
    renderProgressDots();
}

/**
 * Handle answer selection
 * @param {number} selectedIndex - Index of selected answer
 */
function handleAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;

    // Disable all buttons
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.disabled = true);

    // Show feedback
    showFeedback(isCorrect, question, selectedIndex);
}

/**
 * Show feedback for answer
 * @param {boolean} isCorrect 
 * @param {Object} question 
 * @param {number} selectedIndex 
 */
function showFeedback(isCorrect, question, selectedIndex) {
    const buttons = document.querySelectorAll('.answer-button');

    if (isCorrect) {
        sounds.playConfirm();
        // Highlight correct answer in green
        buttons[selectedIndex].classList.add('correct');
        buttons[selectedIndex].innerHTML += '<span class="feedback-icon">✓</span>';

        // Show explanation
        showExplanation(question.explanation, true);

        // Record that user saw this variant
        StateManager.recordQuizVariant(lessonId, selectedQuizVariant);

    } else {
        sounds.playDenied();
        wrongAnswersCount++;

        // Highlight incorrect answer in red
        buttons[selectedIndex].classList.add('incorrect');
        buttons[selectedIndex].innerHTML += '<span class="feedback-icon">✗</span>';

        // Highlight correct answer
        buttons[question.correctIndex].classList.add('correct');

        // Show explanation
        showExplanation(question.explanation, false);
    }

    // Wait then proceed to next question or completion
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            renderQuestion();
        } else {
            // All questions answered
            completeLesson();
        }
    }, 3000);
}

/**
 * Show explanation text
 * @param {string} explanation 
 * @param {boolean} isCorrect 
 */
function showExplanation(explanation, isCorrect) {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return;

    const explanationDiv = document.createElement('div');
    explanationDiv.className = `explanation fade-in ${isCorrect ? 'correct' : 'incorrect'}`;
    explanationDiv.innerHTML = `
        <div class="explanation-header">
            ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </div>
        <p>${explanation}</p>
    `;

    quizContent.appendChild(explanationDiv);
}

/**
 * Complete the lesson
 */
async function completeLesson() {
    const isPass = wrongAnswersCount < 2;

    if (isPass) {
        // Mark as complete
        StateManager.markLessonComplete(lessonId);
    } else {
        // Mark as incomplete if failed
        StateManager.markLessonIncomplete(lessonId);
    }

    // Hide quiz section
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
        quizSection.style.display = 'none';
    }

    // Show completion section
    const completionSection = document.getElementById('completion-section');
    if (completionSection) {
        completionSection.style.display = 'block';
        completionSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Update completion topic
    const topicElem = document.getElementById('completion-topic');
    if (topicElem) {
        topicElem.textContent = lesson.title;
    }

    // Update message based on performance
    const completionTitle = document.querySelector('.completion-title');
    const completionMsg = document.querySelector('.completion-message');

    if (isPass) {
        completionTitle.textContent = "Lesson Complete!";
        completionTitle.style.color = "var(--grass-green)";
        completionMsg.innerHTML = `Great job! You got <strong>${quizQuestions.length - wrongAnswersCount}</strong> out of <strong>${quizQuestions.length}</strong> correct. You've mastered <strong>${lesson.title}</strong>!`;
        await loadCompletionSprite();
        celebrateCompletion();
    } else {
        completionTitle.textContent = "Keep Practicing!";
        completionTitle.style.color = "var(--pokeball-red)";
        completionMsg.innerHTML = `You got <strong>${quizQuestions.length - wrongAnswersCount}</strong> out of <strong>${quizQuestions.length}</strong> correct. You should practice this topic more before moving on.`;
        await loadCompletionSprite();
    }

    // Update next lesson button actions
    const nextBtn = document.getElementById('next-lesson-btn');
    if (nextBtn) {
        if (!isPass) {
            nextBtn.textContent = 'Retry Quiz';
        } else if (lessonId === 10) {
            nextBtn.textContent = 'Back to Dashboard';
        } else {
            nextBtn.textContent = 'Next Lesson →';
        }
    }
}

/**
 * Load sprite for completion screen
 */
async function loadCompletionSprite() {
    const spriteContainer = document.getElementById('completion-sprite');
    if (!spriteContainer) return;

    try {
        const spriteUrl = await SpriteCache.getSprite(lesson.spriteId);
        spriteContainer.innerHTML = `
            <img src="${spriteUrl}" alt="Celebration Pokemon" class="celebration-sprite bounce-in">
        `;
    } catch (err) {
        console.error('Failed to load completion sprite:', err);
    }
}

/**
 * Trigger celebration animation
 */
function celebrateCompletion() {
    const animationDiv = document.getElementById('completion-animation');
    if (!animationDiv) return;

    // Create falling Pokeballs
    for (let i = 0; i < 20; i++) {
        const pokeball = document.createElement('div');
        pokeball.className = 'confetti-pokeball';
        pokeball.textContent = '⚪';
        pokeball.style.left = `${Math.random() * 100}%`;
        pokeball.style.animationDelay = `${Math.random() * 2}s`;
        pokeball.style.animationDuration = `${2 + Math.random() * 2}s`;
        animationDiv.appendChild(pokeball);
    }

    // Remove after animation
    setTimeout(() => {
        animationDiv.innerHTML = '';
    }, 5000);
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
