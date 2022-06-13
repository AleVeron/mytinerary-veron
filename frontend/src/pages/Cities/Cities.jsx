import "./cities.css";
import Cards from "../../components/Cards/Cards";
import cities from '../../data/data.js';
import { useState } from "react";
import { useEffect } from "react";

function Cities (){

    const [city, setCity] = useState([])
    const [input, setInput] = useState('')

    useEffect(()=>{
        setCity(cities)
        let city = cities.filter(c => c.name.toLowerCase().startsWith(input.trim().toLocaleLowerCase()))
        setCity(city)
    },[input])


    return(
        <div className="cities d-flex flex-column justify-content-center">

            <h1>Welcome</h1>

            <input 
            className="mb-4 search container" 
            type="search" 
            placeholder="Search here"
            onKeyUp={(e)=>{
                setInput(e.target.value)
            }}
            >
            </input>

            <div className="d-flex flex-md-row flex-wrap gap-3 container">

            {city.length > 0 ? city.map(city => <Cards city={city} key={city.id}/>) : <div className="error"><h1>Not found city</h1></div>}

            </div>

        </div>
    )
}

export default Cities;