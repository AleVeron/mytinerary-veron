import React from "react";
import "./error.css";
import cities from '../../data/data.js';

function Error (){

    console.log(cities);


    return(
        <div className="error d-flex flex-column justify-content-center">
            <h1>INDIQUE LA URL CORRECTA</h1>
        </div>
    )
}

export default Error;