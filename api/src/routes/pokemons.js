const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');

// Esta funcion me trae los datos de los pokemons de la api.
const getPokemonsApi = async () => {
    const pokemonsPrimero = await axios.get("https://pokeapi.co/api/v2/pokemon") // Aca me traigo los primeros 20 pokemons de la api.
    const pokemonSegundo = await axios.get(pokemonsPrimero.data.next) // Aca me traigo los siguientes 20 pokemons.
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

// Esta funcion me trae los datos de los pokemons de la db.
const getPokemonsDb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Esta funcion concatena los datos de los pokemons de la api con los de la db.
const getAllPokemons = async () => {
    const apiInfo = await getPokemonsApi();
    const dbInfo = await getPokemonsDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

// ***RUTAS*** //

router.get('/', async (req, res, next) => {
    const {name} = req.query;
    const pokemonsTotal = await getAllPokemons();
    try {
        if(name) {
            let pokemonName = await pokemonsTotal.find(e => e.name.toLowerCase() === name.toLowerCase());
            if(pokemonName === undefined) {
                return res.status(404).json('Pokemon not found')
            } else {
                return res.status(200).json(pokemonName)
            }
        } else {
            res.status(200).json(pokemonsTotal);
        }
    } catch (error) {
        return next(error);
    }
})




module.exports = router;

