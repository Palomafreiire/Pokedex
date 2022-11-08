
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
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

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
       
        return fetch(url)
            .then((response) => response.json()) 
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then(detailRequests => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
}
            

// o que fez aqui:
//busca nossa lista na linha 11 
// e com isso da um response e a response é um json que vai gerar a lista de pokemons
// mapea essa lista de pokemon com uma lista de requisições e converte essa response por um json
// qd todas essas requisições terminarem retorna a lista de pokemons