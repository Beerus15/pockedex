

// pokeApi.getPokemons = (offset = 0, limit = 5) => {
//     const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

//     return fetch(url)
//         .then((response) => response.json())
//         .then((jsonBody) => jsonBody.results)
//         .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
//         .then((detailRequests) => Promise.all(detailRequests))
//         .then((pokemonsDetails) => pokemonsDetails)
// }


// URL: https://pokeapi.co/api/v2/pokemon?type=grass&name=i
// type = grass
// name = 1


//https://pokeapi.co/api/v2/pokemon?offset=
// ${offset}&
// limit=${limit}

// Request Header
//     content-type: application/jason


// body 
// {
//     "name": "Teste"
// }