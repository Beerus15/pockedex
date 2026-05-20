function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonNumerationPadron(pokemon) {
    // Transforma o número em texto e garante que ele tenha pelo menos 3 dígitos preenchendo com '0'
    return `${String(pokemon.number).padStart(3, '0')}`;
}



function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon ${pokemon.type}">
                    <span class="number">#${convertPokemonNumerationPadron(pokemon)}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                    </div>
                </li>
        
    
    `
}
                   // código do cry para ser implmentado mais a frente

const pokemonList = (document.getElementById('pokemonList')); // estamos pegando nossa lista pokemon


// Pega os itens de pokemon com getPokemon, mapeia os itens de li com
// função map, junta todos os li sem separador usando join('')


pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(''); // retorna a lista como string e retorna todos elemento com função join
 

    })



