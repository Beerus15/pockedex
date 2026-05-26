

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    // da linha 12 até linha 16, estou revisando
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
   
    const [type] = pokemon.types

    //pokemon.types = types
    pokemon.type = type

    pokemon.statsName = pokeDetail.stats.map((base_stat) => base_stat.stat.name)


    
    const [stat] = pokemon.statsName   

    pokemon.stat = stat
    // status base do pokemon
    pokemon.base_stat = pokeDetail.stats.map((base_stat) => base_stat.base_stat)
    
    const [statsValues] = pokemon.base_stat

    pokemon.statsValues = statsValues
    
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


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url) //estamos fazendo requisição http para converter
        .then((response) =>  response.json())  // transforma string em json 
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
};



