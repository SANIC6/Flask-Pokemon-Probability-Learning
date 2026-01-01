const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const CACHE_KEY_PREFIX = 'pokeapi_cache_';
const CACHE_EXPIRY_DAYS = 7;

export const PokeAPI = {
    /**
     * Get cached data from localStorage
     * @param {string} key 
     * @returns {any|null}
     */
    getFromCache(key) {
        const cacheKey = CACHE_KEY_PREFIX + key;
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;

        try {
            const { data, timestamp } = JSON.parse(cached);
            const now = Date.now();
            const age = (now - timestamp) / (1000 * 60 * 60 * 24);

            if (age > CACHE_EXPIRY_DAYS) {
                localStorage.removeItem(cacheKey);
                return null;
            }

            return data;
        } catch (e) {
            return null;
        }
    },

    /**
     * Save data to cache
     * @param {string} key 
     * @param {any} data 
     */
    saveToCache(key, data) {
        const cacheKey = CACHE_KEY_PREFIX + key;
        const cacheData = {
            data,
            timestamp: Date.now()
        };
        try {
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (e) {
            console.warn('Cache storage failed:', e);
        }
    },

    async getPokemon(nameOrId) {
        // Check cache first
        const cacheKey = `pokemon_${nameOrId}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${POKEAPI_BASE}/pokemon/${nameOrId}`);
            if (!response.ok) throw new Error('Pokemon not found');
            const data = await response.json();

            // Save to cache
            this.saveToCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('PokeAPI Error:', error);
            return null;
        }
    },

    async getType(type) {
        // Check cache first
        const cacheKey = `type_${type}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${POKEAPI_BASE}/type/${type}`);
            const data = await response.json();

            // Save to cache
            this.saveToCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('PokeAPI Error:', error);
            return null;
        }
    },

    // Helper to get random pokemon ID
    getRandomId(max = 151) {
        return Math.floor(Math.random() * max) + 1;
    },

    // Get simple sprite URL
    getSprite(pokemon) {
        return pokemon?.sprites?.front_default || '';
    },

    /**
     * Clear all PokeAPI cache
     */
    clearCache() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(CACHE_KEY_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    }
};
