const pokemonListElement = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('LoadMoreButton');
const detailsPanelElement = document.getElementById('pokedexDetailsPanel');
const inputSearch = document.getElementById('inputSearch');
const btnSearch = document.getElementById('btnSearch');

const maxRecords = 151;
const limit = 12;
let offset = 0;
let loadedPokemonsMap = {}; // Armazena em memória para evitar requests extras no clique

function showGridSkeletons() {
    pokemonListElement.innerHTML = Array(6).fill(0).map(() => `
        <li class="skeleton-loader-card"></li>
    `).join('');
}

async function loadPokemonItens(currentOffset, currentLimit) {
    showGridSkeletons();
    try {
        const pokemons = await pokeApi.getPokemons(currentOffset, currentLimit);
        
        // Mapeia os dados renderizados no cache local
        pokemons.forEach(p => { loadedPokemonsMap[p.name] = p; });

        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="selectPokemon('${pokemon.name}')" id="card-${pokemon.name}">
                <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');

        pokemonListElement.innerHTML = newHtml;
    } catch (error) {
        pokemonListElement.innerHTML = `<p style="color:white; padding:1rem;">Ocorreu um erro ao carregar a lista.</p>`;
    }
}

function selectPokemon(name) {
    // Adiciona destaque visual ao card selecionado
    document.querySelectorAll('.pokemon').forEach(card => card.classList.remove('selected-card'));
    const selectedCard = document.getElementById(`card-${name}`);
    if (selectedCard) selectedCard.classList.add('selected-card');

    const pokemon = loadedPokemonsMap[name];
    if (pokemon) {
        renderDetailsPanel(pokemon);
    }
}

function renderDetailsPanel(p) {
    detailsPanelElement.innerHTML = `
        <article class="detail-view-container">
            <header class="detail-view-header">
                <h2>${p.name}</h2>
                <div class="genera-tag">${p.genera}</div>
                <img src="${p.photo}" alt="${p.name}">
                ${p.cry ? `<button class="audio-cry-btn" onclick="new Audio('${p.cry}').play()">🔊 Ouvir Cry</button>` : ''}
            </header>

            <div class="poke-desc-box">"${p.description}"</div>

            <section class="biometrics-grid">
                <div><strong>Altura:</strong> ${p.height} m</div>
                <div><strong>Peso:</strong> ${p.weight} kg</div>
                <div><strong>Habitat:</strong> ${p.habitat}</div>
                <div><strong>Exp. Base:</strong> ${p.baseExperience}</div>
                <div style="grid-column: span 2; text-transform: capitalize;">
                    <strong>Habilidades:</strong> ${p.abilities.join(', ')}
                </div>
            </section>

            <section class="stats-card-box">
                <h3 class="box-title">Base Stats</h3>
                ${p.stats.map((s) => `
                    <div class="stat-entry-row">
                        <span class="stat-name-lbl">${s.name.replace('-', ' ')}</span>
                        <span class="stat-num-val">${s.value}</span>
                        <progress class="gameboy-progress-${s.name}" value="${s.value}" max="200"></progress>
                    </div>
                `).join('')}
            </section>

            <section class="evolution-card-box">
                <h3 class="box-title">Cadeia Evolutiva</h3>
                <div class="chain-evo-flex">
                    ${p.evolutions.map((evo, i) => `
                        <div class="node-evolution">
                            <img src="${evo.photo || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}" alt="${evo.name}">
                            <span style="text-transform: capitalize;">${evo.name}</span>
                        </div>
                        ${i < p.evolutions.length - 1 ? '<span class="arrow-separator">↓</span>' : ''}
                    `).join('')}
                </div>
            </section>
        </article>
    `;
}

async function handleSearch() {
    const query = inputSearch.value.trim();
    if (!query) return;

    detailsPanelElement.innerHTML = `<div class="empty-state-msg"><p>Buscando registros...</p></div>`;
    
    try {
        const searchedPokemon = await pokeApi.getPokemonByNameOrId(query);
        loadedPokemonsMap[searchedPokemon.name] = searchedPokemon;
        
        // Renderiza apenas ele na grid
        pokemonListElement.innerHTML = `
            <li class="pokemon ${searchedPokemon.type}" onclick="selectPokemon('${searchedPokemon.name}')" id="card-${searchedPokemon.name}">
                <span class="number">#${String(searchedPokemon.number).padStart(3, '0')}</span>
                <span class="name">${searchedPokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${searchedPokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${searchedPokemon.photo}" alt="${searchedPokemon.name}">
                </div>
            </li>
        `;
        selectPokemon(searchedPokemon.name);
    } catch {
        pokemonListElement.innerHTML = `<p style="color:white; padding:1rem;">Nenhum Pokémon encontrado com este critério.</p>`;
        detailsPanelElement.innerHTML = `<div class="empty-state-msg"><p>Entrada inválida.</p></div>`;
    }
}

// Ouvintes de Eventos
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const nextPageRecords = offset + limit;

    if (nextPageRecords >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

btnSearch.addEventListener('click', handleSearch);
inputSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });

// Inicialização da primeira página
loadPokemonItens(offset, limit);
