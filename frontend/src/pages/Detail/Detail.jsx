import { useParams } from "react-router-dom"
import "./detail.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch ,  useSelector} from "react-redux";
import citiesActions from "../../redux/actions/citiesActions";
import itinerariesActions from "../../redux/actions/citiesActions";



export default function Detail() {

    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
    }, []) 

    const filterCity = useSelector(store => store.citiesReducer.oneCity)
    console.log(filterCity);

    // const dispatchTwo = useDispatch()
    // useEffect(() => {
    //     dispatchTwo(itinerariesActions.getItinerariesByCity(id))
    // },[])

    // const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
    // console.log(itineraries);


    return (
        
        <div className="detail p-2">
            <div key={filterCity?._id} className="container card mb-3 col-10 col-sm-12 col-md-6">
                <img src={filterCity?.image} className="card-img-top" alt={filterCity?.name} />
                <div className="card-body">
                    <h5 className="card-title">{filterCity?.name}</h5>
                    <p className="card-text">{filterCity?.description}</p>
                    <Link className="nav-link active btnF" to={"/cities"}>Go back</Link>
                </div>
            </div>
        </div>

    )
}

