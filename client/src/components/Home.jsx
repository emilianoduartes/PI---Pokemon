import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, filterPokemonsByType, filterCreated, orderByName, orderByAttack } from '../actions/index';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './Home.css'

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
    const currentPokemons = Array.isArray(allPokemons) && allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
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
            <h1>Pokemon App</h1>
            {/* <img src="https://www.pinclipart.com/picdir/middle/533-5333611_team-building-clip-art.png" alt="img not found" width="200px" height="230px"/> */}
            <p>
                <SearchBar></SearchBar>    
            </p>
            <div>
                <Link to= '/pokemon'><button>Create pokemon</button></Link>
                <select className='select' onChange={e => {handleSort(e)}}>
                    <option value = 'asc'>Ascending order</option>
                    <option value = 'desc'>Descending order</option>
                </select>
                <select className='select' onChange={e => {handleSortAttack(e)}}>
                    <option value = 'strong'>Stronger attack</option>
                    <option value = 'weak'>Weaker attack</option>
                </select>
                <select className='select' onChange={e => {handleFilterType(e)}}>
                    <option value = 'all'>All types</option>
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
                <select className='select' onChange={e => {handleFilterCreated(e)}}>
                    <option value = 'all'>All pokemon</option>
                    <option value = 'api'>Existing</option>
                    <option value = 'created'>Created</option>
                </select>
                <button className='select' onClick = {(e) => {handleClick(e)}}>Delete filters</button>
                <div>
                    {
                        currentPokemons &&
                        <p>
                            <Paginado 
                                pokemonsPerPage={pokemonsPerPage} 
                                allPokemons={allPokemons.length} 
                                paginado={paginado}
                            ></Paginado>
                        </p>

                    }
                </div>
                <div>
                    {
                        currentPokemons ? currentPokemons.map((e) => {
                            return (
                                <div className='cards'>
                                    <Link to={'/details/' + e.id}>
                                        <Card 
                                            name={e.name} 
                                            types={e.types.map(el => el.name + (' '))}
                                            sprite={e.sprite} 
                                            key={e.id}>
                                        </Card>
                                    </Link>
                                </div>
                            );
                        }) : 
                        <div>
                            <Link to={'/details/' + allPokemons.id}>
                                <Card 
                                    name={allPokemons.name} 
                                    types={allPokemons.types.map(el => el.name + (' '))}
                                    sprite={allPokemons.sprite} 
                                    key={allPokemons.id}>
                                </Card>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}