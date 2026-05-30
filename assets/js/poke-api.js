
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

p
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeAPI.getPokemonById = (id) => {
    // 1. Preparamos as duas URLs que precisamos bater
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`

    // 2. Disparamos as duas requisições ao mesmo tempo usando Promise.all
    return Promise.all([
        fetch(urlPokemon).then(res => res.json()),
        fetch(urlSpecies).then(res => res.json())
    ]).then(([pokemonData, speciesData]) => {
        // 3. Convertemos os dados básicos (o que você já fazia)
        const pokemon = convertPokeApiDetailToPokemon(pokemonData);

        // 4. Garimpamos o texto em inglês ou espanhol/português perdido no meio do speciesData
        const flavorTextEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en' || entry.language.name === 'pt'
        );
        
        // 5. Limpamos caracteres estranhos que vêm da API (quebras de linha, etc)
        // e salvamos na nova propriedade que você criou no Passo 1
        pokemon.description = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f|\r/g, ' ') : 'Descrição indisponível.';

        // 6. Devolvemos o pokemon completo e envelopado para o main.js
        return pokemon;
    })
}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}




pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


