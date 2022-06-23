import "./cities.css";
import Cards from "../../components/Cards/Cards";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import citiesActions from "../../redux/actions/citiesActions";


function Cities() {

    const [input, setInput] = useState('')

    //Traigo toda mi app con useSelector
    const cities = useSelector((store) => store.citiesReducer.cities)
    console.log(cities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(citiesActions.filterCities(input))
    }, [input])

    //Traigo mis ciudades filtradas con useSelector
    const filteredCities = useSelector((store) => store.citiesReducer.cityFilter)
    console.log(filteredCities);


    const handlechange = (e) => {
        setInput(e.target.value)
        console.log(input);
    }



    return (
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


                {/* Realizo el mapeo de mis cards con el array filtrado */}
                {filteredCities?.length > 0 ? filteredCities.map(city => <Cards city={city} key={city._id} />) : <div className="error"><h1>Not found city</h1></div>}

            </div>

        </div>
    )
}

export default (Cities)

