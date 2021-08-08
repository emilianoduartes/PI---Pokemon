const { Router } = require('express');
const router = Router();
const axios = require('axios');

const getPokemonsApi = async () => {
    const pokemonsPrimero = await axios.get('https://pokeapi.co/api/v2/pokemon') // Aca me traigo los primeros 20 pokemons de la api.
    const pokemonSegundo = await axios.get(pokemonsPrimero.data.netx) // Aca me traigo los siguientes 20 pokemons.
    const totalPokemons = pokemonsPrimero.data.results.concat(pokemonSegundo.data.results) // Me guardo los 40 pokemons en una variable.

    try {
        const infoUrl = totalPokemons.map(e => axios.get(e.url)) // Accedo a la url con la info de cada pokemon.
        let infoPokemons = Promise.all(infoUrl) // Le paso un arreglo de promesas con la respuesta de cada url(info).
            .then(e => {
                let pokemon = e.map(e => e.data) // Accedo a la info de cada url de cada pokemon.
                let info = [] // Genero un arreglo de objetos con la info que necesito de cada pokemon.
                pokemon.map(e => {
                    info.push({
                        id: e.id,
                        name: e.name,
                        hp: e.stats[0].base_stat,
                        attack: e.stats[1].base_stat,
                        defense: e.stats[2].base_stat,
                        speed: e.stats[5].base_stat,
                        height: e.height,
                        weight: e.weight,
                        sprite: e.sprites.other.dream_world.front_default,
                        types: e.types.map(e => e.type.name)  
                    })
                })
                return info;
            })
            return infoPokemons;
    } catch (error) {
        console.log(error)
    }
}


module.exports = router;