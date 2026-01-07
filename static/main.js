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

// Setup Interactive Components (EXPORTED for lesson pages)
export async function setupInteractive(type, containerIdOrElement) {
    // Accept either a container element or an ID string
    let container;
    if (typeof containerIdOrElement === 'string') {
        // Try multiple ID patterns for compatibility
        container = document.getElementById(containerIdOrElement) ||
            document.getElementById(`interactive-area-${containerIdOrElement}`);
    } else {
        container = containerIdOrElement;
    }

    if (!container) {
        console.warn('Container not found for widget');
        return;
    }

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

// --- Interactive Renderers ---

function renderCoinFlip(container) {
    // 3D Coin Flip Structure
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <div class="coin-container" id="coin-container-${container.id}">
            <div class="coin" id="coin-${container.id}">
                <div class="coin-face coin-front">
                    <div class="coin-content">
                        <!-- Magikarp for Heads/Gold -->
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png" class="coin-img" alt="Magikarp">
                        <span class="coin-text">Heads</span>
                    </div>
                </div>
                <div class="coin-face coin-back">
                    <div class="coin-content">
                        <!-- Pokeball for Tails/Silver -->
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="coin-img" alt="Pokeball">
                        <span class="coin-text">Tails</span>
                    </div>
                </div>
            </div>
            <div class="coin-shadow"></div>
        </div>
        
        <p id="coin-result-${container.id}" style="font-weight: 500; min-height: 1.5em; transition: opacity 0.3s;">Click the coin to flip!</p>
        <button class="action-btn" id="flip-btn-${container.id}">Flip Coin</button>
    `;
    container.appendChild(wrapper);

    const coin = wrapper.querySelector(`#coin-${container.id}`);
    const resultText = wrapper.querySelector(`#coin-result-${container.id}`);
    const btn = wrapper.querySelector('button');
    const coinContainer = wrapper.querySelector('.coin-container');

    let isFlipping = false;

    // Flip handler
    const flipCoin = () => {
        if (isFlipping) return;
        isFlipping = true;
        btn.disabled = true;
        resultText.style.opacity = 0;

        // Reset animations
        coin.style.animation = 'none';
        coin.offsetHeight; /* trigger reflow */

        // Random outcome (0 or 1)
        const isHeads = Math.random() > 0.5;

        // Remove previous specific rotation classes if manual transform was set
        coin.style.transform = '';

        // Add animation class
        if (isHeads) {
            coin.style.animation = 'flipHeads 2s cubic-bezier(0.5, 0, 0.2, 1.3) forwards';
        } else {
            coin.style.animation = 'flipTails 2s cubic-bezier(0.5, 0, 0.2, 1.3) forwards';
        }

        setTimeout(() => {
            isFlipping = false;
            btn.disabled = false;
            resultText.textContent = isHeads ? "It's Heads! (Magikarp)" : "It's Tails! (Pokeball)";
            resultText.style.opacity = 1;
            resultText.style.color = isHeads ? '#b8860b' : '#696969';

            // Persist the state so it doesn't snap back
            coin.style.animation = 'none';
            coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
        }, 2000);
    };

    btn.addEventListener('click', flipCoin);
    coinContainer.addEventListener('click', flipCoin);
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
async function renderVennDiagram(container) {

    // --- MINI - DEX DATASET (Curated for best intersections) ---
    // IDs approx: 1-151 range
    const MINI_DEX = [
        // Fire
        { id: 4, name: 'charmander', types: ['fire'] },
        { id: 5, name: 'charmeleon', types: ['fire'] },
        { id: 6, name: 'charizard', types: ['fire', 'flying'] }, // Fire/Flying
        { id: 37, name: 'vulpix', types: ['fire'] },
        { id: 38, name: 'ninetales', types: ['fire'] },
        { id: 58, name: 'growlithe', types: ['fire'] },
        { id: 59, name: 'arcanine', types: ['fire'] },
        { id: 77, name: 'ponyta', types: ['fire'] },
        { id: 78, name: 'rapidash', types: ['fire'] },
        { id: 126, name: 'magmar', types: ['fire'] },
        { id: 136, name: 'flareon', types: ['fire'] },
        { id: 146, name: 'moltres', types: ['fire', 'flying'] }, // Fire/Flying

        // Water
        { id: 7, name: 'squirtle', types: ['water'] },
        { id: 8, name: 'wartortle', types: ['water'] },
        { id: 9, name: 'blastoise', types: ['water'] },
        { id: 54, name: 'psyduck', types: ['water'] },
        { id: 60, name: 'poliwag', types: ['water'] },
        { id: 62, name: 'poliwrath', types: ['water', 'fighting'] }, // Water/Fighting
        { id: 72, name: 'tentacool', types: ['water', 'poison'] }, // Water/Poison
        { id: 73, name: 'tentacruel', types: ['water', 'poison'] }, // Water/Poison
        { id: 79, name: 'slowpoke', types: ['water', 'psychic'] }, // Water/Psychic
        { id: 80, name: 'slowbro', types: ['water', 'psychic'] }, // Water/Psychic
        { id: 86, name: 'seel', types: ['water'] },
        { id: 87, name: 'dewgong', types: ['water', 'ice'] }, // Water/Ice
        { id: 130, name: 'gyarados', types: ['water', 'flying'] }, // Water/Flying
        { id: 131, name: 'lapras', types: ['water', 'ice'] }, // Water/Ice
        { id: 134, name: 'vaporeon', types: ['water'] },

        // Grass
        { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 2, name: 'ivysaur', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 3, name: 'venusaur', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 43, name: 'oddish', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 44, name: 'gloom', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 45, name: 'vileplume', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 46, name: 'paras', types: ['bug', 'grass'] }, // Bug/Grass
        { id: 47, name: 'parasect', types: ['bug', 'grass'] }, // Bug/Grass
        { id: 69, name: 'bellsprout', types: ['grass', 'poison'] }, // Grass/Poison
        { id: 102, name: 'exeggcute', types: ['grass', 'psychic'] }, // Grass/Psychic
        { id: 103, name: 'exeggutor', types: ['grass', 'psychic'] }, // Grass/Psychic

        // Poison
        { id: 13, name: 'weedle', types: ['bug', 'poison'] }, // Bug/Poison
        { id: 14, name: 'kakuna', types: ['bug', 'poison'] }, // Bug/Poison
        { id: 15, name: 'beedrill', types: ['bug', 'poison'] }, // Bug/Poison
        { id: 23, name: 'ekans', types: ['poison'] },
        { id: 24, name: 'arbok', types: ['poison'] },
        { id: 29, name: 'nidoran-f', types: ['poison'] },
        { id: 32, name: 'nidoran-m', types: ['poison'] },
        { id: 41, name: 'zubat', types: ['poison', 'flying'] }, // Poison/Flying
        { id: 42, name: 'golbat', types: ['poison', 'flying'] }, // Poison/Flying
        { id: 88, name: 'grimer', types: ['poison'] },
        { id: 89, name: 'muk', types: ['poison'] },
        { id: 92, name: 'gastly', types: ['ghost', 'poison'] }, // Ghost/Poison
        { id: 93, name: 'haunter', types: ['ghost', 'poison'] }, // Ghost/Poison
        { id: 94, name: 'gengar', types: ['ghost', 'poison'] }, // Ghost/Poison
        { id: 109, name: 'koffing', types: ['poison'] },
        { id: 110, name: 'weezing', types: ['poison'] },

        // Bug
        { id: 10, name: 'caterpie', types: ['bug'] },
        { id: 11, name: 'metapod', types: ['bug'] },
        { id: 12, name: 'butterfree', types: ['bug', 'flying'] }, // Bug/Flying
        { id: 48, name: 'venonat', types: ['bug', 'poison'] }, // Bug/Poison
        { id: 49, name: 'venomoth', types: ['bug', 'poison'] }, // Bug/Poison
        { id: 123, name: 'scyther', types: ['bug', 'flying'] }, // Bug/Flying
        { id: 127, name: 'pinsir', types: ['bug'] },

        // Flying
        { id: 16, name: 'pidgey', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 17, name: 'pidgeotto', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 18, name: 'pidgeot', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 21, name: 'spearow', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 22, name: 'fearow', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 83, name: 'farfetchd', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 84, name: 'doduo', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 85, name: 'dodrio', types: ['normal', 'flying'] }, // Normal/Flying
        { id: 142, name: 'aerodactyl', types: ['rock', 'flying'] }, // Rock/Flying
        { id: 149, name: 'dragonite', types: ['dragon', 'flying'] }, // Dragon/Flying
    ];

    // Helper: Get unique random subset
    const getRandomSubset = (arr, count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // New Box Structure
    const wrapper = document.createElement('div');
    wrapper.className = 'venn-box-container';

    wrapper.innerHTML = `
        <div class="venn-sample-label">Sample Space (S)</div>

        <div class="venn-controls-section">
            <div class="venn-controls-top">
                <div class="venn-select-wrapper">
                    <label class="venn-select-label">Event A</label>
                    <select id="type-a-${container.id}" class="venn-select">
                        <option value="grass" selected>Grass</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="poison">Poison</option>
                        <option value="bug">Bug</option>
                        <option value="flying">Flying</option>
                    </select>
                </div>
                <div class="venn-select-wrapper">
                    <label class="venn-select-label">Event B</label>
                    <select id="type-b-${container.id}" class="venn-select">
                        <option value="poison" selected>Poison</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="bug">Bug</option>
                        <option value="flying">Flying</option>
                    </select>
                </div>
            </div>
            
            <div class="venn-controls-bottom">
                <button class="venn-btn" data-mode="intersection">Intersection (A ∩ B)</button>
                <button class="venn-btn" data-mode="union">Union (A ∪ B)</button>
                <button class="venn-btn" data-mode="complement-a">Complement (A')</button>
                <button class="venn-btn" data-mode="complement-b">Complement (B')</button>
            </div>
        </div>

        <div class="venn-grid">
            <div>
                <div class="venn-header-row">
                    <span>A Only</span>
                </div>
                <div class="venn-region venn-region-a" id="region-a-${container.id}"></div>
            </div>
            
            <div>
                <div class="venn-header-row">
                    <span style="font-size: 1rem;">Intersection</span>
                </div>
                <div class="venn-region venn-region-intersection" id="region-intersection-${container.id}"></div>
            </div>

            <div>
                <div class="venn-header-row">
                    <span>B Only</span>
                </div>
                <div class="venn-region venn-region-b" id="region-b-${container.id}"></div>
            </div>
        </div>

        <div style="margin-top: 1rem;">
             <div class="venn-header-row">
                <span style="font-size: 1rem; color: #666;">Outside (Neither A nor B)</span>
            </div>
            <div class="venn-region-outside" id="region-outside-${container.id}"></div>
        </div>

        <div class="venn-description" style="margin-top: 2rem; text-align: center;">
            <h4 id="desc-title-${container.id}" style="color: var(--pokeball-red); margin-bottom: 0.5rem;">Intersection</h4>
            <p id="desc-text-${container.id}" style="color: var(--text-secondary);">Pokemon that are BOTH Grass AND Poison.</p>
        </div>
    `;
    container.appendChild(wrapper);

    // Elements
    const selectA = wrapper.querySelector(`#type-a-${container.id}`);
    const selectB = wrapper.querySelector(`#type-b-${container.id}`);
    const regionA = wrapper.querySelector(`#region-a-${container.id}`);
    const regionB = wrapper.querySelector(`#region-b-${container.id}`);
    const regionInt = wrapper.querySelector(`#region-intersection-${container.id}`);
    const regionOut = wrapper.querySelector(`#region-outside-${container.id}`);
    const btns = wrapper.querySelectorAll('.venn-btn');
    const descTitle = wrapper.querySelector(`#desc-title-${container.id}`);
    const descText = wrapper.querySelector(`#desc-text-${container.id}`);

    // State
    const state = {
        typeA: 'grass',
        typeB: 'poison',
        mode: 'intersection'
    };

    // Helper: Create Sprite Element using direct CDN for speed
    const createSpriteBox = (pokemon) => {
        const box = document.createElement('div');
        box.className = 'mini-sprite-box';
        // Use CDN for instant loading
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

        box.innerHTML = `
            <img src="${spriteUrl}" alt="${pokemon.name}">
            <span>${pokemon.name}</span>
        `;
        return box;
    };

    const updateViz = () => {
        // Clear all regions
        regionA.innerHTML = '';
        regionB.innerHTML = '';
        regionInt.innerHTML = '';
        regionOut.innerHTML = '';

        // Reset highlights
        [regionA, regionB, regionInt, regionOut].forEach(el => el.classList.remove('active'));

        // Filter Data from Mini-Dex
        // We iterate through distinct pokemon in our mini-dex to see where they fall
        // To prevent duplicates if a pokemon is in multiple lists (not issue with hardcoded array but good practice)
        const uniqueDex = new Map();
        MINI_DEX.forEach(p => uniqueDex.set(p.id, p));

        const pokemonList = Array.from(uniqueDex.values());

        // Distribute Pokemon
        pokemonList.forEach(p => {
            const isA = p.types.includes(state.typeA);
            const isB = p.types.includes(state.typeB);

            let targetRegion = null;

            if (isA && isB) {
                targetRegion = regionInt;
            } else if (isA && !isB) {
                targetRegion = regionA;
            } else if (!isA && isB) {
                targetRegion = regionB;
            } else {
                targetRegion = regionOut;
            }

            // Optimization: Only append if we haven't overfilled the box (e.g., max 6 per box)
            if (targetRegion && targetRegion.children.length < 6) {
                targetRegion.appendChild(createSpriteBox(p));
            }
        });

        // Highlight Logic & Text
        switch (state.mode) {
            case 'intersection':
                regionInt.classList.add('active');
                descTitle.textContent = `Intersection (A ∩ B)`;
                descText.innerHTML = `Pokemon that are BOTH <b>${state.typeA}</b> AND <b>${state.typeB}</b>.`;
                break;
            case 'union':
                regionA.classList.add('active');
                regionB.classList.add('active');
                regionInt.classList.add('active');
                descTitle.textContent = `Union (A ∪ B)`;
                descText.innerHTML = `Pokemon that are <b>${state.typeA}</b> OR <b>${state.typeB}</b> (or both).`;
                break;
            case 'complement-a':
                regionB.classList.add('active');
                regionOut.classList.add('active');
                descTitle.textContent = `Complement of A (A')`;
                descText.innerHTML = `Pokemon that are NOT <b>${state.typeA}</b>.`;
                break;
            case 'complement-b':
                regionA.classList.add('active');
                regionOut.classList.add('active');
                descTitle.textContent = `Complement of B (B')`;
                descText.innerHTML = `Pokemon that are NOT <b>${state.typeB}</b>.`;
                break;
        }
    };

    const handleUpdate = () => {
        state.typeA = selectA.value;
        state.typeB = selectB.value;
        updateViz();
    };

    // Listeners
    selectA.addEventListener('change', handleUpdate);
    selectB.addEventListener('change', handleUpdate);

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Updated active state
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.mode = btn.dataset.mode;
            updateViz();
        });
    });

    // Init with Intersection active
    btns[0].classList.add('active');
    updateViz();
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

// Conditional Probability: Sprite Interaction
async function renderConditionalCalc(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.style.maxWidth = '600px';
    wrapper.style.margin = '0 auto';

    wrapper.innerHTML = `
        <h3>Catch & Calculate</h3>
        <p>There are <span id="total-start">8</span> Pokemon in the grass. 4 are Fire-type, 4 are Water-type.</p>
        <p style="font-size:0.9rem; color: #666;">Click a Pokemon to "catch" it (remove it). Watch the probabilities change!</p>
        
        <div id="sprite-grid-${container.id}" class="sprite-grid"></div>
        
        <div class="prob-display">
            <div class="prob-item">
                <div class="prob-value" id="prob-fire">0.60</div>
                <div class="prob-label">P(Fire)</div>
            </div>
            <div class="prob-item">
                <div class="prob-value" id="prob-water">0.40</div>
                <div class="prob-label">P(Water)</div>
            </div>
        </div>

        <button class="action-btn" id="reset-btn-${container.id}" style="margin-top: 1.5rem;">Reset Simulation</button>
    `;
    container.appendChild(wrapper);

    const grid = wrapper.querySelector(`#sprite-grid-${container.id}`);
    const probFire = wrapper.querySelector('#prob-fire');
    const probWater = wrapper.querySelector('#prob-water');
    const resetBtn = wrapper.querySelector(`#reset-btn-${container.id}`);

    // Configuration
    const INITIAL_FIRE = 4;
    const INITIAL_WATER = 4;

    // State
    let currentFire = INITIAL_FIRE;
    let currentWater = INITIAL_WATER;

    const updateStats = () => {
        const total = currentFire + currentWater;

        if (total === 0) {
            probFire.textContent = "0";
            probWater.textContent = "0";
            return;
        }

        const pFire = (currentFire / total).toFixed(2);
        const pWater = (currentWater / total).toFixed(2);

        probFire.textContent = `${currentFire}/${total} = ${pFire}`;
        probWater.textContent = `${currentWater}/${total} = ${pWater}`;
    };

    const spawnSprite = (type) => {
        const div = document.createElement('div');
        div.className = 'interactive-sprite';
        div.dataset.type = type;
        div.title = `Wild ${type}-type! Click to catch.`;

        // Simple distinct sprites using items logic or fixed IDs
        // Fire: Charmander (4), Water: Squirtle (7)
        // To make it look like a "group", we can vary them if we want, but keeping it simple for recognition
        const spriteId = type === 'Fire' ? 4 : 7;

        div.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png" alt="${type}">
        `;

        div.addEventListener('click', () => {
            if (div.classList.contains('caught')) return;

            // Animate out
            div.classList.add('caught');

            // Logic
            if (type === 'Fire') currentFire--;
            else currentWater--;

            updateStats();

            // Actually remove from DOM after anim
            setTimeout(() => {
                div.remove();
            }, 300);
        });

        return div;
    };

    const initGrid = () => {
        grid.innerHTML = '';
        currentFire = INITIAL_FIRE;
        currentWater = INITIAL_WATER;
        updateStats();

        const items = [];
        for (let i = 0; i < INITIAL_FIRE; i++) items.push('Fire');
        for (let i = 0; i < INITIAL_WATER; i++) items.push('Water');

        // Shuffle
        items.sort(() => Math.random() - 0.5);

        items.forEach((type, index) => {
            const sprite = spawnSprite(type);
            // Stagger animation
            sprite.style.animationDelay = `${index * 50}ms`;
            grid.appendChild(sprite);
        });
    };

    resetBtn.addEventListener('click', initGrid);
    initGrid();
}

// Tree Diagram
function renderTreeDiagram(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'simulation-box';
    wrapper.innerHTML = `
        <h3>Probability Tree: Sequential Encounters</h3>
        <p style="font-size:0.9rem; color:#666;">Hover over paths to trace the journey. Click leaf nodes to see the probability calculation.</p>
        
        <div class="tree-container">
            <svg width="600" height="350" class="tree-svg">
                <!-- Root -->
                <circle cx="50" cy="175" r="5" fill="#333"/>
                
                <!-- Level 1 Paths -->
                <path d="M50,175 C100,175 100,100 200,100" stroke="#FF8080" stroke-width="2" fill="none" class="tree-path" data-path="fire"/>
                <path d="M50,175 C100,175 100,250 200,250" stroke="#80B0FF" stroke-width="2" fill="none" class="tree-path" data-path="water"/>
                
                <!-- Level 1 Nodes -->
                <g class="tree-node" transform="translate(200,100)">
                    <circle r="20" fill="#FFE0E0" stroke="#DC0A2D" stroke-width="2"/>
                    <image href="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" x="-15" y="-15" height="30" width="30"/>
                    <text x="0" y="-25" text-anchor="middle" class="tree-label">Fire</text>
                    <text x="0" y="35" text-anchor="middle" class="tree-prob">0.6</text>
                </g>
                <g class="tree-node" transform="translate(200,250)">
                    <circle r="20" fill="#E0F0FF" stroke="#28AAFD" stroke-width="2"/>
                    <image href="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" x="-15" y="-15" height="30" width="30"/>
                    <text x="0" y="-25" text-anchor="middle" class="tree-label">Water</text>
                    <text x="0" y="35" text-anchor="middle" class="tree-prob">0.4</text>
                </g>

                <!-- Level 2 Paths (from Fire) -->
                <path d="M220,100 C270,100 270,50 350,50" stroke="#FF8080" stroke-width="2" fill="none" class="tree-path" data-path="fire-fire"/>
                <path d="M220,100 C270,100 270,150 350,150" stroke="#80B0FF" stroke-width="2" fill="none" class="tree-path" data-path="fire-water"/>

                <!-- Level 2 Paths (from Water) -->
                <path d="M220,250 C270,250 270,200 350,200" stroke="#FF8080" stroke-width="2" fill="none" class="tree-path" data-path="water-fire"/>
                <path d="M220,250 C270,250 270,300 350,300" stroke="#80B0FF" stroke-width="2" fill="none" class="tree-path" data-path="water-water"/>

                <!-- Level 2 Nodes (Outcomes) -->
                <!-- FF -->
                <g class="tree-node leaf" data-outcome="FF" transform="translate(350,50)">
                    <circle r="15" fill="#FFE0E0" stroke="#DC0A2D" stroke-width="2"/>
                    <text x="25" y="5" class="tree-label">Fire</text>
                </g>
                <!-- FW -->
                <g class="tree-node leaf" data-outcome="FW" transform="translate(350,150)">
                    <circle r="15" fill="#E0F0FF" stroke="#28AAFD" stroke-width="2"/>
                    <text x="25" y="5" class="tree-label">Water</text>
                </g>
                <!-- WF -->
                <g class="tree-node leaf" data-outcome="WF" transform="translate(350,200)">
                    <circle r="15" fill="#FFE0E0" stroke="#DC0A2D" stroke-width="2"/>
                    <text x="25" y="5" class="tree-label">Fire</text>
                </g>
                <!-- WW -->
                <g class="tree-node leaf" data-outcome="WW" transform="translate(350,300)">
                    <circle r="15" fill="#E0F0FF" stroke="#28AAFD" stroke-width="2"/>
                    <text x="25" y="5" class="tree-label">Water</text>
                </g>
            </svg>
        </div>

        <div class="calculation-box">
            <div class="calc-formula" id="tree-calc-text">Click a final node to see probability</div>
            <div class="calc-desc" id="tree-calc-desc">Trace the path: P(A and B) = P(A) × P(B)</div>
        </div>
    `;
    container.appendChild(wrapper);

    const calcText = wrapper.querySelector('#tree-calc-text');
    const calcDesc = wrapper.querySelector('#tree-calc-desc');
    const paths = wrapper.querySelectorAll('.tree-path');
    const nodes = wrapper.querySelectorAll('.leaf');

    const updateCalc = (outcome) => {
        let text = "";
        let desc = "";

        // Highlight logic could go here (reset all strokes, simplify for now)
        paths.forEach(p => p.style.strokeOpacity = 0.3);

        if (outcome === 'FF') {
            text = "0.6 × 0.6 = 0.36";
            desc = "Probability of encountering Fire THEN Fire (36%)";
            wrapper.querySelector('[data-path="fire"]').style.strokeOpacity = 1;
            wrapper.querySelector('[data-path="fire-fire"]').style.strokeOpacity = 1;
        } else if (outcome === 'FW') {
            text = "0.6 × 0.4 = 0.24";
            desc = "Probability of encountering Fire THEN Water (24%)";
            wrapper.querySelector('[data-path="fire"]').style.strokeOpacity = 1;
            wrapper.querySelector('[data-path="fire-water"]').style.strokeOpacity = 1;
        } else if (outcome === 'WF') {
            text = "0.4 × 0.6 = 0.24";
            desc = "Probability of encountering Water THEN Fire (24%)";
            wrapper.querySelector('[data-path="water"]').style.strokeOpacity = 1;
            wrapper.querySelector('[data-path="water-fire"]').style.strokeOpacity = 1;
        } else if (outcome === 'WW') {
            text = "0.4 × 0.4 = 0.16";
            desc = "Probability of encountering Water THEN Water (16%)";
            wrapper.querySelector('[data-path="water"]').style.strokeOpacity = 1;
            wrapper.querySelector('[data-path="water-water"]').style.strokeOpacity = 1;
        }

        calcText.textContent = text;
        calcDesc.textContent = desc;
        calcText.style.color = '#DC0A2D';
    };

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            updateCalc(node.dataset.outcome);
        });
        // Also hover support
        node.addEventListener('mouseenter', () => {
            updateCalc(node.dataset.outcome);
        });
    });
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
