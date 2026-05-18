
function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon">
                    <span class="number">#001</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            <li class="type">grass</li>
                            <li class="type">poison</li>
                        </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
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



