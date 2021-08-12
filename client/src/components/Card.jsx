import React from 'react';

export default function Card({ name, sprite, type }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <img scr={sprite} alt="img not found" width="200px" height="250px"/>
        </div>
    );
}