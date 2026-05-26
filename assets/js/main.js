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
                        <button type="button" class="button"><img  id="${pokemon.number}" src="${pokemon.photo}" alt="${pokemon.name}">
</button>
                        </div>
                    </li>
            
        
        `).join(''); // retorna a lista como string e retorna todos elemento com função join
        pokemonList.innerHTML += newHtml;
        
        pokemons.forEach((pokemon) => {
            document.getElementById(`${pokemon.number}`).onclick = (e) => {
                if(e.target.tagName == 'IMG'){
                    let ocultador = document.getElementById('pokemonList');
                    ocultador.className = 'ocultadoPOkemon';
                }

                const pokemonNumber = e.target.getAttribute('data-number');
                SobreCritaLoadMoreItens(pokemon.number);
            }
        });
    }); // Fechamento do then que faltava no seu original
}

loadPokemonItens(offset, limit) 



    // Se clicou no botão do Pokémon (ou na imagem dentro dele)

// document.addEventListener('click', (event) => {
//     if (event.target.closest('.button')) {
//         let ocultador = document.getElementById('pokemonList');
//         ocultador.className = 'ocultadoPOkemon';

//         let mostrarStatus = document.getElementById()
//         mostrarStatus.className = 'mostrarStatusPokemon';
        
//     }
// });





const mostrarStatusPokemon = (document.getElementById('visivelStatus')); // estamos pegando nossa lista pokemon
function SobreCritaLoadMoreItens(offset, limit){
    // A ÚNICA MODIFICAÇÃO É AQUI: Forçamos a API a buscar a partir do Pokémon clicado (offset - 1) e trazer apenas 1 item
    pokeApi.getPokemons(offset - 1, 1).then((pokemons = []) => {
        
        // Declarando corretamente o primeiro pokemon da lista
        const pokemon = pokemons[0]; 
        

        // let clicouPokemon = [];
        // pokemons.forEach(function(pokemon) {
        //     if(pokemon.photo = 'click')
        //         clicouPokemon.push(pokemon.number)
        // });

        const newHtml = `        
      <div id="statusPOkemons" class="detail">          
        
        <button type="button" class="button">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </button>  
            <nav class="navbar-menu-status">
                
            <li class="btn-img-ckedex"><img class="logo-pockedex " src="/assets/images/logos/logo-pokedex.png" alt=""></li>

                    <ol class="btn-list-pokemon-ordenation">  

                            <li>    <a href="">About-status      </li>
                            <li>   <a href="">base status</a>     </li>
                            <li>    <a href="">evolution</a>      </li>
                            <li>    <a href="">map</a>            </li>    
                    </ol>
             </nav>

             <ol class="base-status">
                         <div class="container-pai">
                                <li class="">   
                                            
                                                    <div class="btn-status-pokemon"> 
                                                        ${pokemon.statsName.map((stat) => `<li class="type ${stat}">${stat}</li>`).join('')}
                                                    </div>
                                                    <div  class="btn-status-pokemon">
                                                        ${pokemon.base_stat.map((statsValues) => `<li class="type ${statsValues}">${statsValues}</li>`).join('')}
                                                    </div>
                                                    <div  class="btn-status-pokemon">  
                                                        ${pokemon.base_stat.map((statsValues, stat) => `<progress  class="gameboy-progress-${stat}" value=${statsValues} max="100"></progress>`).join('')}
                                                    </div>
                                      
                               </li>
                         </div>
             </ol>

     </div>

        `;

        // ESSA LINHA MUDOU DE LUGAR: Agora ela está dentro do .then() e vai funcionar!
        mostrarStatusPokemon.innerHTML = newHtml;
    }); 
 }

                
                    // <li class="btn-base-status">
                    //         <ol class="base-status">
                    //             <li>   
                    //                 <div class="btn-status-pokemon"> 
                    //                     ${pokemon.statsName.map((stat) => `<li class="type ${stat}">${stat}</li>`).join('')}
                    //                 </div>
                    //                 <div  class="btn-status-pokemon">
                    //                     ${pokemon.base_stat.map((statsValues) => `<li class="type ${statsValues}">${statsValues}</li>`).join('')}
                    //                 </div>
                    //                 <div  class="btn-status-pokemon">  
                    //                     ${pokemon.base_stat.map((statsValues) => `<progress class="gameboy-progress" value=${statsValues} max="100"></progress>`).join('')}
                    //                 </div>
                    //             </li> 
                    //         </ol>
                    //     </li>

