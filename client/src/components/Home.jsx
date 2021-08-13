import React from 'react';
import {useEffect} from 'react';
// import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions/index';
import {Link} from 'react-router-dom';
import Card from './Card';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state) => state.pokemons)

    useEffect (() => {
        dispatch(getPokemons());
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    return (
        <div>
            <Link to= '/pokemons'>Crear pokemon</Link>
            <h1>Proyecto Individual - Henry Pokemon</h1>
            <button onClick = {e => {handleClick(e)}}>
                Volver a cargar todos los pokemons
            </button>
            <div>
                <select>
                    <option value = 'acs'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select>
                    <option value = 'normal'>Normal</option>
                    <option value = 'fighting'>Fighting</option>
                    <option value = 'flying'>Flying</option>
                    <option value = 'poison'>Poison</option>
                    <option value = 'ground'>Ground</option>
                    <option value = 'rock'>Rock</option>
                    <option value = 'bug'>Bug</option>
                    <option value = 'ghost'>Ghost</option>
                    <option value = 'steel'>Steel</option>
                    <option value = 'fire'>Fire</option>
                    <option value = 'water'>Water</option>
                    <option value = 'grass'>Grass</option>
                    <option value = 'electric'>Electric</option>
                    <option value = 'psychic'>Psychic</option>
                    <option value = 'ice'>Ice</option>
                    <option value = 'dragon'>Dragon</option>
                    <option value = 'dark'>Dark</option>
                    <option value = 'fairy'>Fairy</option>
                    <option value = 'unknown'>Unknown</option>
                    <option value = 'shadow'>Shadow</option>
                </select>
                <select>
                    <option value = 'all'>Todos</option>
                    <option value = 'api'>Existentes</option>
                    <option value = 'created'>Creados</option>
                </select>
                {allPokemons?.map((e) => {
                    return (
                        <fragment>
                            <Link to={"/home/" + e.id}>
                                <Card name={e.name} type={e.types} sprite={e.sprite} />
                            </Link>
                        </fragment>
                    );
                })}
            </div>
        </div>
    )
}