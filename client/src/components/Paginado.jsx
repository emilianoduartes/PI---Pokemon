import React from 'react';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                { pageNumbers &&
                pageNumbers.map(number => (
                    <li className='number' key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}