import "./cities.css";
import Cards from "../../components/Cards/Cards";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"

function Cities (){

    const [citys, setCity] = useState()
    const [input, setInput] = useState('')
    const [cityFilter, setCityFilter] = useState()

    useEffect(()=>{
        axios.get("http://localhost:4000/api/cities")
        .then(response => setCity(response.data.response.cities))
        
    }, [])
    console.log(citys);

    const handlechange = (e) => {
        setInput(e.target.value)
        console.log(input);
    }

    useEffect(()=>{
        let cityFiltered = citys?.filter(c => c.name.toLowerCase().startsWith(input.trim().toLocaleLowerCase()))
        setCityFilter(cityFiltered)
        console.log(cityFiltered)
    },[input, citys])



    return(
        <div className="cities d-flex flex-column justify-content-center">

            <div className="d-flex gap-3 p-5 flex-column flex-md-row align-items-center justify-content-around"> 

                <h1 className="citiesTitle">Search for your favorite city</h1>

                
                <input 
                className="search" 
                type="search" 
                placeholder="Search here"
                onKeyUp={handlechange}
                >
                </input>

            </div>


            <div className="d-flex flex-md-row flex-wrap gap-3 container justify-content-center">

            {cityFilter?.length > 0 ? cityFilter.map(city => <Cards city={city} key={city._id}/>) : <div className="error"><h1>Not found city</h1></div>}

            </div>

        </div>
    )
}

export default Cities;