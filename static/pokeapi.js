const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export const PokeAPI = {
    async getPokemon(nameOrId) {
        try {
            const response = await fetch(`${POKEAPI_BASE}/pokemon/${nameOrId}`);
            if (!response.ok) throw new Error('Pokemon not found');
            return await response.json();
        } catch (error) {
            console.error('PokeAPI Error:', error);
            return null;
        }
    },

    async getType(type) {
        try {
            const response = await fetch(`${POKEAPI_BASE}/type/${type}`);
            return await response.json();
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
    }
};
