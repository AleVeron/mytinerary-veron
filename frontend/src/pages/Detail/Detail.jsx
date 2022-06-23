import { useParams } from "react-router-dom"
import "./detail.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../../redux/actions/citiesActions";
import itinerariesActions from "../../redux/actions/itinerariesActions";



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

        <div className="detail d-flex flex-column align-items-center justify-content-around">


            <div style={{
                backgroundImage: `url("${filterCity.image}")`,
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
            }} className="container-fluid d-flex align-items-center justify-content-center titleDetail mb-3">
                <h5 className="card-title titleTinerary">{filterCity?.name}</h5>
            </div>

            {itinerary.map(item =>

                <div key={item._id} className="container card mb-3 col-10 col-sm-12 col-md-8">



                    <div className="card-body d-flex flex-md-row flex-column align-items-center">
                        <div>
                            <p>{item.userName}</p>
                            <img src={item.userPic} alt={item.userName} className="imgTinerary" />
                        </div>


                        <div className="container d-flex flex-column justify-content-around flex-wrap gap-3 align-items-center">
                            <h2>{item.title}</h2>
                            <p>Price: {item.price}</p>
                            <p>Duration: {item.duration}</p>
                            <p>🧡 {item.likes}</p>
                            <p>{item.hashtag}</p>
                        </div>
                    </div>



                    <div className="accordion" id="accordionExample">

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    View more
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>Futures activities</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            )}

            <Link className="nav-link active btnF m-3" to={"/cities"}>Go back</Link>

        </div>

    )
}

