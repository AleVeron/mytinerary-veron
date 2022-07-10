import React from "react";
import "./error.css";

function Error (){




    return(
        <div className="error d-flex flex-column justify-content-center">
            <h1 className="text-light">INVALID URL</h1>
            <h2 className="text-light">TRY WITH: /* , /home , /index </h2>
        </div>
    )
}

export default Error;