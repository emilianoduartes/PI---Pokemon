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