const pokeApi = {};

// Função auxiliar recursiva para mapear a árvore evolutiva completa de forma linear
async function fetchEvolutionChainData(chainNode) {
    const namesList = [];
    let current = chainNode;

    while (current) {
        namesList.push(current.species.name);
        current = current.evolves_to[0];
    }

    // Busca as imagens em paralelo de todos os integrantes da cadeia
    return Promise.all(namesList.map(async (name) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return {
                name: name,
                photo: data.sprites.front_default || data.sprites.other['official-artwork'].front_default
            };
        } catch {
            return { name: name, photo: null };
        }
    }));
}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    
    // Mapeamento Avançado de Atributos Base
    pokemon.stats = pokeDetail.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat
    }));

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default || pokeDetail.sprites.other.dream_world.front_default;
    pokemon.cry = pokeDetail.cries?.latest || pokeDetail.cries?.legacy || null;
    
    pokemon.height = pokeDetail.height / 10; // decímetros -> metros
    pokemon.weight = pokeDetail.weight / 10; // hectogramas -> kg
    pokemon.abilities = pokeDetail.abilities.map(a => a.ability.name);
    pokemon.baseExperience = pokeDetail.base_experience;

    // Chamadas secundárias integradas de Species e Evolução
    try {
        const speciesRes = await fetch(pokeDetail.species.url);
        const speciesData = await speciesRes.json();

        pokemon.habitat = speciesData.habitat ? speciesData.habitat.name : "Desconhecido";
        
        const textObj = speciesData.flavor_text_entries.find(e => e.language.name === 'pt' || e.language.name === 'en');
        pokemon.description = textObj ? textObj.flavor_text.replace(/[\n\f]/g, ' ') : "Sem descrição disponível.";

        const genusObj = speciesData.genera.find(g => g.language.name === 'pt' || g.language.name === 'en');
        pokemon.genera = genusObj ? genusObj.genus : "Espécie Desconhecida";

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        pokemon.evolutions = await fetchEvolutionChainData(evoData.chain);
    } catch (err) {
        console.error("Erro ao buscar dados complementares do Pokémon:", err);
        pokemon.description = "Não foi possível carregar a descrição oficial.";
        pokemon.evolutions = [];
    }

    return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return convertPokeApiDetailToPokemon(data);
};

pokeApi.getPokemonByNameOrId = async (query) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon não localizado");
    const data = await response.json();
    return convertPokeApiDetailToPokemon(data);
};

pokeApi.getPokemons = async (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const jsonBody = await response.json();
    const pokemons = jsonBody.results;
    const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
    return Promise.all(detailRequests);
};