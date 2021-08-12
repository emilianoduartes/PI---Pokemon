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