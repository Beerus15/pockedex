function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon">
                    <span class="number">#00${pokemon.order}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                           ${convertPokemonTypesToLi(pokemon.types).join('')}
                        </ol>
                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                    </div>
                </li>
        
    
    `
}

const pokemonList = (document.getElementById('pokemonList')); // estamos pegando nossa lista pokemon


// Pega os itens de pokemon com getPokemon, mapeia os itens de li com
// função map, junta todos os li sem separador usando join('')


pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(''); // retorna a lista como string e retorna todos elemento com função join
 

    })



