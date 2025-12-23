import { lessons } from './lessons.js';
import { PokeAPI } from './pokeapi.js';

console.log('Pokemon Probability Academy: Editorial Edition loaded!');

const lessonsContainer = document.getElementById('lessons-container');
const tocList = document.getElementById('toc-list');

// Initialization
function init() {
    renderAllLessons();
    setupIntersectionObserver();
}

// Render ALL lessons as a long scrolling article
async function renderAllLessons() {
    lessonsContainer.innerHTML = '';
    tocList.innerHTML = '';

    for (const lesson of lessons) {
        // 1. Create Lesson Section
        const section = document.createElement('section');
        section.className = 'lesson-section';
        section.id = `lesson-${lesson.id}`;

        section.innerHTML = `
            <h2 class="lesson-title"><span style="font-size: 0.6em; color: #888; display: block; margin-bottom: 0.2rem;">Lesson ${lesson.id}</span>${lesson.title}</h2>
            <div class="lesson-content">
                ${lesson.content}
            </div>
            ${lesson.interactive ? `<div class="interactive-widget" id="interactive-area-${lesson.id}"><span class="widget-label">Interactive Figure</span></div>` : ''}
        `;

        lessonsContainer.appendChild(section);

        // 2. Create TOC Link
        const li = document.createElement('li');
        li.innerHTML = `<a href="#lesson-${lesson.id}">Lesson ${lesson.id}: ${lesson.title}</a>`;
        tocList.appendChild(li);

        // 3. Initialize Interactive Element if present
        if (lesson.interactive) {
            // We can lazy load these or load immediately. For now, load immediately.
            await setupInteractive(lesson.interactive, lesson.id);
        }
    }
}

// Setup Interactive Components
async function setupInteractive(type, lessonId) {
    const container = document.getElementById(`interactive-area-${lessonId}`);
    if (!container) return;

    if (type === 'coin-flip') {
        renderCoinFlip(container);
    } else if (type === 'card-draw') {
        renderCardDraw(container);
    } else if (type === 'venn-diagram') {
        renderVennDiagram(container);
    } else if (type === 'starter-choice') {
        renderStarterChoice(container);
    } else if (type === 'addition-calc') {
        renderAdditionCalc(container);
    } else if (type === 'conditional-calc') {
        renderConditionalCalc(container);
    } else if (type === 'tree-diagram') {
        renderTreeDiagram(container);
    } else if (type === 'table-viz') {
        renderTableViz(container);
    } else if (type === 'bayes-calc') {
        renderBayesCalc(container);
    } else if (type === 'final-quiz') {
        renderFinalQuiz(container);
    } else {
        // Fallback
        container.innerHTML += `<div style="text-align:center; padding: 2rem; color: #888;">Interactive Module: ${type}</div>`;
    }
}

// --- Interactive Renderers (Same logic, slightly updated styling) ---

function renderCoinFlip(container) {
    // Append content to the widget container
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <div id="coin-${container.id}" class="coin">
            <div class="side-a">Heads</div>
            <div class="side-b">Tails</div>
        </div>
        <p id="coin-result-${container.id}" style="font-weight: 500;">Ready to flip?</p>
        <button class="action-btn" id="flip-btn-${container.id}">Flip Coin</button>
    `;
    container.appendChild(wrapper);

    const coin = wrapper.querySelector('.coin');
    const resultText = wrapper.querySelector('p');
    const btn = wrapper.querySelector('button');

    btn.addEventListener('click', () => {
        coin.classList.add('flipping');
        resultText.textContent = "Flipping...";
        btn.disabled = true;

        // Random outcome
        const isHeads = Math.random() > 0.5;

        setTimeout(() => {
            coin.classList.remove('flipping');
            coin.style.transform = isHeads ? 'rotateY(0)' : 'rotateY(180deg)';
            resultText.textContent = isHeads ? "It's Heads!" : "It's Tails!";
            btn.disabled = false;
        }, 1000);
    });
}

function renderCardDraw(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <p>Draw a card to see if it's a Fire-type!</p>
        <div id="card-display-${container.id}">
            <div class="pokemon-card" style="opacity: 0.5;">
                <p>?</p>
            </div>
        </div>
        <p id="draw-result-${container.id}">Ready?</p>
        <button class="action-btn">Draw Card</button>
        <div class="stats" style="font-size: 0.9rem; color: #666;">
            Fire-types: <span id="fire-count-${container.id}">0</span> / <span id="total-count-${container.id}">0</span>
        </div>
    `;
    container.appendChild(wrapper);

    const drawBtn = wrapper.querySelector('button');
    const cardDisplay = wrapper.querySelector(`#card-display-${container.id}`);
    const resultText = wrapper.querySelector(`#draw-result-${container.id}`);
    const fireCountEl = wrapper.querySelector(`#fire-count-${container.id}`);
    const totalCountEl = wrapper.querySelector(`#total-count-${container.id}`);

    let fireCount = 0;
    let totalCount = 0;

    drawBtn.addEventListener('click', async () => {
        drawBtn.disabled = true;
        resultText.textContent = "Drawing...";

        try {
            const id = PokeAPI.getRandomId();
            const pokemon = await PokeAPI.getPokemon(id);

            if (pokemon) {
                const isFire = pokemon.types.some(t => t.type.name === 'fire');
                totalCount++;
                if (isFire) fireCount++;

                fireCountEl.textContent = fireCount;
                totalCountEl.textContent = totalCount;

                // Render card
                cardDisplay.innerHTML = `
                    <div class="pokemon-card">
                        <img src="${PokeAPI.getSprite(pokemon)}" alt="${pokemon.name}">
                        <p style="text-transform: capitalize;">${pokemon.name}</p>
                        <small style="color: #666;">${pokemon.types.map(t => t.type.name).join(', ')}</small>
                    </div>
                `;

                resultText.textContent = isFire ? "It's a Fire-type!" : "Not a Fire-type.";
                resultText.style.color = isFire ? '#DC0A2D' : '#333';
            }
        } catch (e) {
            console.error(e);
            resultText.textContent = "Error fetching Pokemon.";
        }

        drawBtn.disabled = false;
    });
}

// Venn Diagram
function renderVennDiagram(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Interactive Venn Diagram</h3>
        <p>Visualizing Union, Intersection, and Complement</p>
        <svg width="400" height="250" style="margin: 1rem auto;">
            <circle cx="120" cy="125" r="80" fill="#FFB3BA" opacity="0.6" stroke="#DC0A2D" stroke-width="2"/>
            <circle cx="200" cy="125" r="80" fill="#BAE1FF" opacity="0.6" stroke="#28AAFD" stroke-width="2"/>
            <text x="80" y="130" font-size="14" font-weight="bold">Fire</text>
            <text x="220" y="130" font-size="14" font-weight="bold">Flying</text>
            <text x="150" y="130" font-size="12" fill="#333">Both</text>
        </svg>
        <p style="font-size: 0.9rem; color: #666;">The overlap shows Pokemon that are both Fire AND Flying (like Charizard)</p>
    `;
    container.appendChild(wrapper);
}

// Starter Choice
function renderStarterChoice(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Choose Your Starter!</h3>
        <p>These events are mutually exclusive - you can only pick one!</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin: 1rem 0;">
            <button class="action-btn starter-btn" data-starter="Bulbasaur">🌱 Bulbasaur</button>
            <button class="action-btn starter-btn" data-starter="Charmander">🔥 Charmander</button>
            <button class="action-btn starter-btn" data-starter="Squirtle">💧 Squirtle</button>
        </div>
        <p id="starter-result" style="font-weight: 500;">Make your choice!</p>
    `;
    container.appendChild(wrapper);

    const buttons = wrapper.querySelectorAll('.starter-btn');
    const result = wrapper.querySelector('#starter-result');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const starter = btn.dataset.starter;
            result.textContent = `You chose ${starter}! P(${starter}) = 1/3`;
            result.style.color = '#DC0A2D';
        });
    });
}

// Addition Calculator
function renderAdditionCalc(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Addition Rule Calculator</h3>
        <div style="text-align: left; max-width: 400px; margin: 0 auto;">
            <label>P(A): <input type="number" id="pa" step="0.01" min="0" max="1" value="0.3" style="width: 80px; padding: 4px;"></label><br><br>
            <label>P(B): <input type="number" id="pb" step="0.01" min="0" max="1" value="0.2" style="width: 80px; padding: 4px;"></label><br><br>
            <label>P(A and B): <input type="number" id="pab" step="0.01" min="0" max="1" value="0.08" style="width: 80px; padding: 4px;"></label><br><br>
            <button class="action-btn">Calculate P(A or B)</button>
            <p id="calc-result" style="margin-top: 1rem; font-weight: 500;"></p>
        </div>
    `;
    container.appendChild(wrapper);

    const btn = wrapper.querySelector('button');
    const result = wrapper.querySelector('#calc-result');

    btn.addEventListener('click', () => {
        const pa = parseFloat(wrapper.querySelector('#pa').value);
        const pb = parseFloat(wrapper.querySelector('#pb').value);
        const pab = parseFloat(wrapper.querySelector('#pab').value);
        const answer = pa + pb - pab;
        result.textContent = `P(A or B) = ${pa} + ${pb} - ${pab} = ${answer.toFixed(3)}`;
        result.style.color = '#DC0A2D';
    });
}

// Conditional Probability Calculator
function renderConditionalCalc(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Conditional Probability: P(B|A)</h3>
        <div style="text-align: left; max-width: 400px; margin: 0 auto;">
            <label>P(A and B): <input type="number" id="pab-cond" step="0.01" min="0" max="1" value="0.2" style="width: 80px; padding: 4px;"></label><br><br>
            <label>P(A): <input type="number" id="pa-cond" step="0.01" min="0" max="1" value="0.35" style="width: 80px; padding: 4px;"></label><br><br>
            <button class="action-btn">Calculate P(B|A)</button>
            <p id="cond-result" style="margin-top: 1rem; font-weight: 500;"></p>
        </div>
    `;
    container.appendChild(wrapper);

    const btn = wrapper.querySelector('button');
    const result = wrapper.querySelector('#cond-result');

    btn.addEventListener('click', () => {
        const pab = parseFloat(wrapper.querySelector('#pab-cond').value);
        const pa = parseFloat(wrapper.querySelector('#pa-cond').value);
        const answer = pab / pa;
        result.textContent = `P(B|A) = ${pab} / ${pa} = ${answer.toFixed(3)}`;
        result.style.color = '#DC0A2D';
    });
}

// Tree Diagram
function renderTreeDiagram(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Probability Tree Diagram</h3>
        <p>Example: Two coin flips</p>
        <pre style="text-align: left; font-size: 0.85rem; background: #f5f5f5; padding: 1rem; border-radius: 8px; overflow-x: auto;">
First Flip:
├─ Heads (0.5)
│  ├─ Second Heads (0.5) → P(HH) = 0.5 × 0.5 = 0.25
│  └─ Second Tails (0.5) → P(HT) = 0.5 × 0.5 = 0.25
└─ Tails (0.5)
   ├─ Second Heads (0.5) → P(TH) = 0.5 × 0.5 = 0.25
   └─ Second Tails (0.5) → P(TT) = 0.5 × 0.5 = 0.25
        </pre>
    `;
    container.appendChild(wrapper);
}

// Table Visualization
function renderTableViz(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Conditional Probability Table</h3>
        <table style="margin: 1rem auto; border-collapse: collapse; text-align: center;">
            <tr style="background: #f0f0f0;">
                <th style="border: 1px solid #ddd; padding: 8px;"></th>
                <th style="border: 1px solid #ddd; padding: 8px;">Fire</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Water</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Beginner</td>
                <td style="border: 1px solid #ddd; padding: 8px;">15</td>
                <td style="border: 1px solid #ddd; padding: 8px;">20</td>
                <td style="border: 1px solid #ddd; padding: 8px;">35</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Expert</td>
                <td style="border: 1px solid #ddd; padding: 8px;">25</td>
                <td style="border: 1px solid #ddd; padding: 8px;">20</td>
                <td style="border: 1px solid #ddd; padding: 8px;">45</td>
            </tr>
            <tr style="background: #f0f0f0;">
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Total</td>
                <td style="border: 1px solid #ddd; padding: 8px;">40</td>
                <td style="border: 1px solid #ddd; padding: 8px;">40</td>
                <td style="border: 1px solid #ddd; padding: 8px;">80</td>
            </tr>
        </table>
        <p style="font-size: 0.9rem;">P(Expert | Fire) = 25/40 = 0.625</p>
    `;
    container.appendChild(wrapper);
}

// Bayes Calculator
function renderBayesCalc(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Bayes' Theorem Calculator</h3>
        <p style="font-size: 0.9rem;">Calculate P(B|A) from P(A|B), P(B), and P(A)</p>
        <div style="text-align: left; max-width: 400px; margin: 0 auto;">
            <label>P(A|B): <input type="number" id="p-a-given-b" step="0.01" min="0" max="1" value="0.95" style="width: 80px; padding: 4px;"></label><br><br>
            <label>P(B): <input type="number" id="p-b" step="0.01" min="0" max="1" value="0.02" style="width: 80px; padding: 4px;"></label><br><br>
            <label>P(A): <input type="number" id="p-a" step="0.01" min="0" max="1" value="0.068" style="width: 80px; padding: 4px;"></label><br><br>
            <button class="action-btn">Calculate P(B|A)</button>
            <p id="bayes-result" style="margin-top: 1rem; font-weight: 500;"></p>
        </div>
    `;
    container.appendChild(wrapper);

    const btn = wrapper.querySelector('button');
    const result = wrapper.querySelector('#bayes-result');

    btn.addEventListener('click', () => {
        const pAgivenB = parseFloat(wrapper.querySelector('#p-a-given-b').value);
        const pB = parseFloat(wrapper.querySelector('#p-b').value);
        const pA = parseFloat(wrapper.querySelector('#p-a').value);
        const answer = (pAgivenB * pB) / pA;
        result.textContent = `P(B|A) = (${pAgivenB} × ${pB}) / ${pA} = ${answer.toFixed(3)}`;
        result.style.color = '#DC0A2D';
    });
}

// Final Quiz
function renderFinalQuiz(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>🎓 Final Challenge</h3>
        <p><strong>Question:</strong> In a tournament, 60% use Dragon-types, 40% use Pseudo-Legendaries, and 30% use both.</p>
        <p>What's P(Dragon OR Pseudo)?</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin: 1rem 0; flex-wrap: wrap;">
            <button class="action-btn quiz-btn" data-answer="0.7">0.7</button>
            <button class="action-btn quiz-btn" data-answer="1.0">1.0</button>
            <button class="action-btn quiz-btn" data-answer="0.3">0.3</button>
        </div>
        <p id="quiz-result" style="font-weight: 500;"></p>
    `;
    container.appendChild(wrapper);

    const buttons = wrapper.querySelectorAll('.quiz-btn');
    const result = wrapper.querySelector('#quiz-result');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.dataset.answer;
            if (answer === "0.7") {
                result.textContent = "✅ Correct! P(D or P) = 0.6 + 0.4 - 0.3 = 0.7";
                result.style.color = '#51AD60';
            } else {
                result.textContent = "❌ Not quite. Remember: P(A or B) = P(A) + P(B) - P(A and B)";
                result.style.color = '#DC0A2D';
            }
        });
    });
}

// Highlight TOC on scroll
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                document.querySelectorAll('#toc-list a').forEach(a => a.classList.remove('active'));
                // Add active to current
                const id = entry.target.id;
                const link = document.querySelector(`#toc-list a[href="#${id}"]`);
                if (link) link.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

init();
