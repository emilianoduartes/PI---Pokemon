import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return(
        <div>
            <h1>Individual Project - Henry</h1>
            <Link to = '/home'>
                <button>Click here</button>
            </Link>
        </div>
    )
}