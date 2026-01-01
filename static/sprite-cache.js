/**
 * Sprite Cache Manager for Pokemon Probability Academy
 * Handles caching of Pokemon sprites from PokeAPI to minimize API calls
 */

import { PokeAPI } from './pokeapi.js';

const CACHE_KEY = 'ppa_sprite_cache';
const CACHE_EXPIRY_DAYS = 7;

export const SpriteCache = {
    /**
     * Get cached sprite data
     * @returns {Object} Cache object with sprites and metadata
     */
    getCache() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return { sprites: {}, lastUpdate: null };

        try {
            const data = JSON.parse(cached);
            // Check if cache is expired
            if (this.isCacheExpired(data.lastUpdate)) {
                return { sprites: {}, lastUpdate: null };
            }
            return data;
        } catch (e) {
            console.error('Error parsing sprite cache:', e);
            return { sprites: {}, lastUpdate: null };
        }
    },

    /**
     * Check if cache is expired
     * @param {string} lastUpdate ISO timestamp
     * @returns {boolean}
     */
    isCacheExpired(lastUpdate) {
        if (!lastUpdate) return true;
        const cacheDate = new Date(lastUpdate);
        const now = new Date();
        const daysDiff = (now - cacheDate) / (1000 * 60 * 60 * 24);
        return daysDiff > CACHE_EXPIRY_DAYS;
    },

    /**
     * Save sprite to cache
     * @param {number} spriteId Pokemon ID
     * @param {string} url Sprite URL
     */
    saveSprite(spriteId, url) {
        const cache = this.getCache();
        cache.sprites[spriteId] = url;
        cache.lastUpdate = new Date().toISOString();
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    },

    /**
     * Get sprite URL from cache or fetch from API
     * @param {number} spriteId Pokemon ID
     * @returns {Promise<string>} Sprite URL
     */
    async getSprite(spriteId) {
        // Check cache first
        const cache = this.getCache();
        if (cache.sprites[spriteId]) {
            return cache.sprites[spriteId];
        }

        // Fallback to direct CDN URL (faster than API)
        const cdnUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;

        // Try to verify URL works
        try {
            const response = await fetch(cdnUrl, { method: 'HEAD' });
            if (response.ok) {
                this.saveSprite(spriteId, cdnUrl);
                return cdnUrl;
            }
        } catch (e) {
            console.warn(`CDN URL failed for sprite ${spriteId}, trying API...`);
        }

        // Fallback to PokeAPI
        try {
            const pokemon = await PokeAPI.getPokemon(spriteId);
            const url = PokeAPI.getSprite(pokemon);
            if (url) {
                this.saveSprite(spriteId, url);
                return url;
            }
        } catch (e) {
            console.error(`Failed to fetch sprite ${spriteId}:`, e);
        }

        // Ultimate fallback: placeholder Pokeball
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    },

    /**
     * Preload multiple sprites (for dashboard)
     * @param {number[]} spriteIds Array of Pokemon IDs
     * @returns {Promise<Object>} Map of spriteId to URL
     */
    async preloadSprites(spriteIds) {
        const results = {};
        const batchSize = 5;
        const delay = 100; // ms between batches

        // Process in batches to avoid overwhelming API
        for (let i = 0; i < spriteIds.length; i += batchSize) {
            const batch = spriteIds.slice(i, i + batchSize);
            const promises = batch.map(async (id) => {
                const url = await this.getSprite(id);
                results[id] = url;
            });

            await Promise.all(promises);

            // Delay between batches (except for last batch)
            if (i + batchSize < spriteIds.length) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        return results;
    },

    /**
     * Preload sprite and create Image object for immediate use
     * @param {number} spriteId Pokemon ID
     * @returns {Promise<HTMLImageElement>}
     */
    async preloadImage(spriteId) {
        const url = await this.getSprite(spriteId);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    },

    /**
     * Clear sprite cache
     */
    clearCache() {
        localStorage.removeItem(CACHE_KEY);
    },

    /**
     * Get cache stats
     * @returns {Object} Cache statistics
     */
    getCacheStats() {
        const cache = this.getCache();
        return {
            cachedSprites: Object.keys(cache.sprites).length,
            lastUpdate: cache.lastUpdate,
            cacheSize: new Blob([localStorage.getItem(CACHE_KEY) || '']).size,
            isExpired: this.isCacheExpired(cache.lastUpdate)
        };
    }
};
