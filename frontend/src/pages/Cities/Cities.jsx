import "./cities.css";
import Cards from "../../components/Cards/Cards";

function Cities (){




    return(
        <div className="cities d-flex flex-column justify-content-center">

            <h1>Welcome</h1>
            <input className="mb-4 search container" type="search"></input>
            <div className="d-flex flex-md-row flex-wrap gap-3 container">
            <Cards/>
            </div>

        </div>
    )
}

export default Cities;