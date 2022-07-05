import { useParams } from "react-router-dom"
import "./detail.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../../redux/actions/citiesActions";
import itinerariesActions from "../../redux/actions/itinerariesActions";
import Itinerary from "../../components/Itinerary/Itinerary";
import activitiesActions from "../../redux/actions/activitesActions";


export default function Detail() {

    const { id } = useParams()

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        dispatch(itinerariesActions.getItinerariesByCity(id))
    }, [])


    

    

    const itinerary = useSelector(store => store.itinerariesReducer.itineraries)



    const filterCity = useSelector(store => store.citiesReducer.oneCity)


    return (

        <div className="detail d-flex flex-column align-items-center justify-content-between">


            <div style={{
                backgroundImage: `url("${filterCity.image}")`,
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
            }} className="container-fluid d-flex align-items-center justify-content-center titleDetail mb-3">
                <h5 className="card-title titleTinerary">{filterCity?.name}</h5>
            </div>


            {/* Si poseo un itinerario se imprime el componente itinerary, sino un mensaje de not found */}
            {itinerary.length > 0 ? itinerary.map((item, index) =>

                <Itinerary item={item} key={item._id} />
            ) : <div className="ityNotfound"><h1>Not found itinerary</h1></div>}

            <Link className="nav-link active btnD btnF m-3" to={"/cities"}>Go back</Link>

        </div>

    )
}

