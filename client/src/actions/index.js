import axios from 'axios';

export function getPokemons() {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: 'GET_POKEMONS',
            payload: res.data
        });
    };
}

export function getTypes() {
    return async function(dispatch) {
        const info = await axios.get("http://localhost:3001/types")
        return dispatch({ 
            type: 'GET_TYPES', 
            payload: info.data
        });
    };
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/pokemon",payload);
        console.log(response)
        return response;
    }
}

export function getNamePokemons(name) {
    return async function(dispatch) {
        try {
            var res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({ 
                type: 'GET_NAME_POKEMONS', 
                payload: res.data 
            });
        } catch (error) {
            console.log(error)
        }
    };
}

export function filterPokemonsByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

