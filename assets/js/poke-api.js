
const pokeApi = {}


pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}&limit=${limit}`;
    return fetch(url) //estamos fazendo requisição http para converter
        .then((response) =>  response.json())  // transforma string em json 
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.error(error))
};



