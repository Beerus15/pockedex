function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonNumerationPadron(pokemon) {
    // Transforma o número em texto e garante que ele tenha pelo menos 3 dígitos preenchendo com '0'
    return `${String(pokemon.number).padStart(3, '0')}`;
}


const pokemonList = (document.getElementById('pokemonList')); // estamos pegando nossa lista pokemon

const LoadMoreButton = document.getElementById('LoadMoreButton')

const maxRecords = 151
const limit = 10;
let offset = 0;

                   // código do cry para ser implmentado mais a frente


// Pega os itens de pokemon com getPokemon, mapeia os itens de li com
// função map, junta todos os li sem separador usando join('')



function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml =  pokemons.map((pokemon) => `
        
        <li class="pokemon ${pokemon.type}">
                        <span class="number">#${convertPokemonNumerationPadron(pokemon)}</span>
                        <span class="name">${pokemon.name}</span>

                        <div class="detail">  
                            <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        <button type="button" class="button"><img src="${pokemon.photo}" alt="${pokemon.name}">
</button>
                        </div>
                    </li>
            
        
        `).join(''); // retorna a lista como string e retorna todos elemento com função join
        pokemonList.innerHTML += newHtml;

        })
}

loadPokemonItens(offset, limit) 




document.addEventListener('click', (event) => {
    // Se clicou no botão do Pokémon (ou na imagem dentro dele)
    if (event.target.closest('.button')) {
        let ocultador = document.getElementById('pokemonList');
        ocultador.className = 'ocultadoPOkemon';

        let mostrarStatus = document.getElementById()
        mostrarStatus.className = 'mostrarStatusPokemon';
        
    }
});

SobreCritaLoadMoreItens(offset, limit);



const mostrarStatusPokemon = (document.getElementById('visivelStatus')); // estamos pegando nossa lista pokemon

function SobreCritaLoadMoreItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        // Declarando corretamente o primeiro pokemon da lista
        const pokemon = pokemons[0]; 
        
        const newHtml = `        
        <div id="statusPOkemons" class="detail">          
        
        <button type="button" class="button">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </button>  
         <ol>
            <li>Base-status
                    <ol class="base-status">
            
                    
                            </li>
                        <div class="btn-status-pokemon"> 
                            ${pokemon.statsName.map((stat) => `<li class="type ${stat}">${stat}</li>`).join('')}
                        </div>
                        <div>
                            ${pokemon.base_stat.map((statsValues) => `<li class="type ${statsValues}">${statsValues}</li>`).join('')}
                        </div>
                        <div>  
                            ${pokemon.base_stat.map((statsValues) => `<progress class="gameboy-progress" value=${statsValues} max="100"></progress>`).join('')}
                        </div>
                        </ol>
                </li>
                </ol>
           </div>
        `;

        // ESSA LINHA MUDOU DE LUGAR: Agora ela está dentro do .then() e vai funcionar!
        mostrarStatusPokemon.innerHTML = newHtml;
    }); 
}
