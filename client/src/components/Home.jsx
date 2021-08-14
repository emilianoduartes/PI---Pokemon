import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokemonsByType, filterCreated, orderByName } from '../actions/index';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state) => state.pokemons)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9)
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 9
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (() => {
        dispatch(getPokemons());
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(e) {
        dispatch(filterPokemonsByType(e.target.value))
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to= '/pokemons'>Crear pokemon</Link>
            <h1>Proyecto Individual - Henry Pokemon</h1>
            <button onClick = {e => {handleClick(e)}}>
                Volver a cargar todos los pokemons
            </button>
            <div>
                <select onChange={e => {handleSort(e)}}>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select onChange={e => {handleFilterType(e)}}>
                    <option value = 'all'>Todos</option>
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
                <select onChange={e => {handleFilterCreated(e)}}>
                    <option value = 'all'>Todos</option>
                    <option value = 'api'>Existentes</option>
                    <option value = 'created'>Creados</option>
                </select>
                <Paginado 
                    pokemonsPerPage = {pokemonsPerPage} 
                    allPokemons = {allPokemons.length} 
                    paginado = {paginado}
                ></Paginado>
                {currentPokemons?.map((e) => {
                    return (
                        <div>
                            <Link to={"/home/" + e.id}>
                                <Card name={e.name} type={e.types} sprite={e.sprite} key={e.id} />
                                {/* <Card name={e.name} type1={e.type1} type2={e.type2} sprite={e.sprite} /> */}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}