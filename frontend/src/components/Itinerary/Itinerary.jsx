import Accordion from "./Accordion";
import activitiesActions from "../../redux/actions/activitesActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import itinerariesActions from "../../redux/actions/itinerariesActions";


export default function Itinerary({ item, cityId }) {

    const itinerary = useSelector(store => store.itinerariesReducer.getItinerariesByCity)

    let cityIdf = cityId



    const [activities, setActivites] = useState()
    const[reload, setReload] = useState(false)
    const[comment, setComment] = useState()
   

    const dispatch = useDispatch()

    //Obtengo las acciones
    async function getActions() {
        let actions = await dispatch(activitiesActions?.findActFromTin(item._id))
        if (actions.response.length > 0) { setActivites(actions.response[0].activities) }
    }


    //Despacho el id a la accion
    async function getLikes() {
        await dispatch(itinerariesActions?.likeAndDislike(item._id))
        setReload(!reload)
    }

    //Obtengo solo un itinerario y seteo el dato
    async function getComments() {
        let comments = await dispatch(itinerariesActions.getOneItinerary(item._id))
        setComment(comments)
    }
    

    //useEffect para actualizar el itinerario cuando doy like
    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(cityId))
    }, [reload])



    useEffect(() => {
        getComments()
        getActions()
    }, [itinerary])


    return (

        <div className="container card mb-3 col-10 col-sm-12 col-md-8 hola">


            {/* DETAIL BODY */}

            <div className="card-body d-flex flex-md-row flex-column align-items-center detailCard">
                <div>
                    <p>{item.userName}</p>
                    <img src={item.userPic} alt={item.userName} className="imgTinerary"/>
                </div>


                <div className="container d-flex flex-column justify-content-around flex-wrap align-items-center ">
                    <h2 className="tineraryTitle">{item.title}</h2>
                    <p className="tineraryP">Price: {item.price}</p>
                    <p className="tineraryP">Duration: {item.duration}</p>
                    <button onClick={getLikes}>🧡</button>
                    <p className="tineraryP">{item?.likes.length}</p>
                    <p className="tineraryP">{item.hashtag}</p>
                </div>
            </div>

            <Accordion props={activities} city={item} propId={cityIdf} comments={comment}/>



        </div>

    )
}