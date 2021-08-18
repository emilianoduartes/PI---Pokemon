import React from 'react';

export default function Card({name, sprite, types}) {
    return (
        <div className="card">
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={sprite} alt="img not found" width="200px" height="230px"/>
        </div>
    );
}