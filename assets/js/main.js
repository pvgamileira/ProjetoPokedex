const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 16
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}" onclick = "abrirModal(${pokemon.number})">
                <span class="number">${'#' + pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `
        
}


function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)

    }


})

function abrirModal (id) {
    pokeAPI.getPokemonById(id).then(pokemon => {
        document.getElementById('modal-name').innerHTML = pokemon.name
        document.getElementById('modal-number').innerHTML = pokemon.number
        document.getElementById('modal-type').innerHTML = pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')
        document.getElementById('modal-image').src = pokemon.photo
        document.getElementById('modal-description').innerHTML = pokemon.description
        document.getElementById('modal').style.display = 'flex'
        console.log(pokemon)
    })
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none'
});
