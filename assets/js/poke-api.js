

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    // da linha 12 até linha 16, estou revisando
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
   
    const [type] = pokemon.types

    //pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default


     // IMPLEMENTAÇÃO DO SOM: Guarda a URL do áudio .ogg ou .mp3
     pokemon.cry = pokeDetail.cries?.latest || pokeDetail.cries?.legacy      
    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
       .then((response) => response.json())
       .then(convertPokeApiDetailToPokemon)
        
        
}

pokeApi.getPokemons = (offset = 10, limit = 100) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}&limit=${limit}`;
    return fetch(url) //estamos fazendo requisição http para converter
        .then((response) =>  response.json())  // transforma string em json 
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
};



