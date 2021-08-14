import React from 'react';

export default function Card({name, sprite, types}) {
// export default function Card({name, sprite, type1, type2}) {    
    // const type1 = types.map(e => e.name)[0]
    // const type2 = types.map(e => e.name)[1]
    // console.log(types)
    return (
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            {/* <h5>{type1}</h5>
            <h5>{type2 ? type2 : null}</h5> */}
            <img src={sprite} alt="img not found" width="200px" height="250px"/>
        </div>
    );
}