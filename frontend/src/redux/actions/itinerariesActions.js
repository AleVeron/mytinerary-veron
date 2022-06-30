import axios from "axios";

const itinerariesActions = {


    getItinerariesByCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries/city/${id}`)
            console.log(res);
            dispatch({type : 'FINDITINERARYBYCITY', payload: res.data.response})
        }
    }
}

export default itinerariesActions;