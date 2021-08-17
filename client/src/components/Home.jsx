import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, filterPokemonsByType, filterCreated, orderByName, orderByAttack } from '../actions/index';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
    
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);
    const [orden, setOrden] = useState('')
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
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

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`Orderado ${e.target.value}`)
    }

    return (
        <div className='all'>
            <Link to= '/pokemon'>Create pokemon</Link>
            <h1>Pokemon App</h1>
            <button onClick = {(e) => {handleClick(e)}}>Reload all pokemon</button>
            <div>
                <select onChange={e => {handleSort(e)}}>
                    <option value = 'asc'>Ascending order</option>
                    <option value = 'desc'>Descending order</option>
                </select>
                <select onChange={e => {handleSortAttack(e)}}>
                    <option value = 'strong'>Stronger attack</option>
                    <option value = 'weak'>Weaker attack</option>
                </select>
                <select onChange={e => {handleFilterType(e)}}>
                    <option value = 'all'>All</option>
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
                    <option value = 'all'>All</option>
                    <option value = 'api'>Existing</option>
                    <option value = 'created'>Created</option>
                </select>
                <div>
                    <Paginado 
                        pokemonsPerPage={pokemonsPerPage} 
                        allPokemons={allPokemons.length} 
                        paginado={paginado}
                    ></Paginado>
                    <SearchBar></SearchBar>
                </div>
                {
                    currentPokemons?.map((e) => {
                        return (
                            <div>
                                <Link to={'/details/' + e.id}>
                                    <Card name={e.name} type={e.types} sprite={e.sprite} key={e.id} />
                                    {/* <Card name={e.name} type1={e.type1} type2={e.type2} sprite={e.sprite} /> */}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}