const offset = 0;

const limit = 10;

const url = 'https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}';



const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}&limit=${limit}`;
    return fetch(url) //estamos fazendo requisição http para converter
        .then((response) =>  response.json())  // transforma string em json 
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
};




// for(let i = 0; i <= limit; i++){
//     fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
// }