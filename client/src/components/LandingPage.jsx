import React from 'react';
import {NavLink} from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1>Individual Project - Henry</h1>
            <NavLink to="/home" ><img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="pokelogo" width= '950px' height= '400px' /></NavLink>
        </div>
    )
}



