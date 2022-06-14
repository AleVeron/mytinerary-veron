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
        let citiFiltered = cities.filter(c => c.name.toLowerCase().startsWith(input.trim().toLocaleLowerCase()))
        setCity(citiFiltered)
    },[input])


    return(
        <div className="cities d-flex flex-column justify-content-center">

            <div className="d-flex gap-3 p-5 flex-column flex-md-row align-items-center justify-content-around"> 

                <h1 >Search for your favorite city</h1>

                <input 
                className="search" 
                type="search" 
                placeholder="Search here"
                onKeyUp={(e)=>{
                    setInput(e.target.value)
                }}
                >
                </input>

            </div>


            <div className="d-flex flex-md-row flex-wrap gap-3 container justify-content-center">

            {city.length > 0 ? city.map(city => <Cards city={city} key={city.id}/>) : <div className="error"><h1>Not found city</h1></div>}

            </div>

        </div>
    )
}

export default Cities;