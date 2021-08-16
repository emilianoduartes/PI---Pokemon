import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tipos = useSelector((state) => state.types)

    const [input,setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        type: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    // function handleCheck(e) {
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    // }

    function handleSelect(e) {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert("Personaje creado")
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            type: []
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <Link to= '/home'><button>Return</button></Link>
            <h1>Create your pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Hp:</label>
                    <input
                    type= "text"
                    value= {input.hp}
                    name= "hp"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                    type= "text"
                    value= {input.attack}
                    name= "attack"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                    type= "text"
                    value= {input.defense}
                    name= "defense"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    type= "text"
                    value= {input.speed}
                    name= "speed"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                    type= "text"
                    value= {input.height}
                    name= "height"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    type= "text"
                    value= {input.weight}
                    name= "weight"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Sprite:</label>
                    <input
                    type= "text"
                    value= {input.sprite}
                    name= "sprite"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                {/* <div>
                    <label>Types:</label>
                    <div>
                        <label><input type="checkbox" name="normal" value="normal" onChange={(e)=>handleCheck(e)}/>Normal</label>
                        <label><input type="checkbox" name="fighting" value="fighting"onChange={(e)=>handleCheck(e)}/>Fighting</label>
                        <label><input type="checkbox" name="flying" value="flying" onChange={(e)=>handleCheck(e)}/>Flying</label>
                        <label><input type="checkbox" name="poison" value="poison" onChange={(e)=>handleCheck(e)}/>Poison</label>
                        <label><input type="checkbox" name="ground" value="ground" onChange={(e)=>handleCheck(e)}/>Ground</label>
                    </div>
                    <div>
                        <label><input type="checkbox" name="rock" value="rock" onChange={(e)=>handleCheck(e)}/>Rock</label>
                        <label><input type="checkbox" name="bug" value="bug" onChange={(e)=>handleCheck(e)}/>Bug</label>
                        <label><input type="checkbox" name="ghost" value="ghost" onChange={(e)=>handleCheck(e)}/>Ghost</label>
                        <label><input type="checkbox" name="steel" value="steel" onChange={(e)=>handleCheck(e)}/>Steel</label>
                        <label><input type="checkbox" name="fire" value="fire" onChange={(e)=>handleCheck(e)}/>Fire</label>
                    </div>
                    <div>
                        <label><input type="checkbox" name="water" value="water" onChange={(e)=>handleCheck(e)}/>Water</label>
                        <label><input type="checkbox" name="grass" value="grass" onChange={(e)=>handleCheck(e)}/>Grass</label>
                        <label><input type="checkbox" name="electric" value="electric" onChange={(e)=>handleCheck(e)}/>Electric</label>
                        <label><input type="checkbox" name="psychic" value="psychic" onChange={(e)=>handleCheck(e)}/>Psychic</label>
                        <label><input type="checkbox" name="ice" value="ice" onChange={(e)=>handleCheck(e)}/>Ice</label>
                    </div>
                    <div>
                        <label><input type="checkbox" name="dragon" value="dragon" onChange={(e)=>handleCheck(e)}/>Dragon</label>
                        <label><input type="checkbox" name="dark" value="dark" onChange={(e)=>handleCheck(e)}/>Dark</label>
                        <label><input type="checkbox" name="fairy" value="fairy" onChange={(e)=>handleCheck(e)}/>Fairy</label>
                        <label><input type="checkbox" name="unknown" value="unknown" onChange={(e)=>handleCheck(e)}/>Unknown</label>
                        <label><input type="checkbox" name="shadow" value="shadow" onChange={(e)=>handleCheck(e)}/>Shadow</label>
                    </div>
                </div> */}
                <label>Types:</label>
                <select onChange={(e) => handleSelect(e)}>
                    {tipos.map((e) => (
                        <option value={e}>{e}</option>
                    ))}
                </select>
                <ul>
                    <li>{input.type.map(e => e + ", ")}</li>
                </ul>        
                <button type='submit'>Create pokemon</button>
            </form>
        </div>
    )
}