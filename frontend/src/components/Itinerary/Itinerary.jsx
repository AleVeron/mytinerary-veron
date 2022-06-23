import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import itinerariesActions from "../../redux/actions/citiesActions";



export default function Itinerary() {



    const dispatchTwo = useDispatch()
    useEffect(() => {
        dispatchTwo(itinerariesActions.getItinerariesByCity())
    }, [])

    const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
    console.log(itineraries);


    return (

        <>

        </>


    )
}
