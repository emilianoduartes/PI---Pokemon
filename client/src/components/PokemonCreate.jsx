import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name must be completed';
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
            ...input,
            types: [...input.types, e.target.value]
        }) : alert('Maximum two types')
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert("Pokemon created")
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            types: []
        })
        history.push('/home')
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <h1>Create your pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <p>
                    <label>Name: </label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </p>
                <p>
                    <label>Hp: </label>
                    <input
                    type= "number"
                    value= {input.hp}
                    name= "hp"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Attack: </label>
                    <input
                    type= "number"
                    value= {input.attack}
                    name= "attack"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Defense: </label>
                    <input
                    type= "number"
                    value= {input.defense}
                    name= "defense"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Speed: </label>
                    <input
                    type= "number"
                    value= {input.speed}
                    name= "speed"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Height: </label>
                    <input
                    type= "number"
                    value= {input.height}
                    name= "height"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Weight: </label>
                    <input
                    type= "number"
                    value= {input.weight}
                    name= "weight"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <p>
                    <label>Sprite: </label>
                    <input
                    type= "text"
                    value= {input.sprite}
                    name= "sprite"
                    onChange={(e) => handleChange(e)}
                    />
                </p>
                <div>
                    <label>Types: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        {tipos.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                    <ul>
                        <p>{input.types.map(e => e + ", ")}</p>
                    </ul>        
                    <button className='return' type='submit'>Create</button>
                    <Link className='return' to= '/home'><button className='return'>Return</button></Link>
                </div>
            </form>
            {input.types.map(e =>
                <div className='divTypes'>
                    <p>{e}</p>
                    <button className='botonX' onClick={() => handleDelete(e)}>x</button>
                </div>      
            )}
        </div>
    )
}