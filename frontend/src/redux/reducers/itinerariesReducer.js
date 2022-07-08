const initialState = {
    itineraries: [],
    getItinerariesByCity: []
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {

        case "FINDITINERARYBYCITY":
            return {
                ...state,
                itineraries: action.payload
            }
        case 'GET_ITINERARIES_BY_CITY':

            return {
                ...state,
                getItinerariesByCity: action.payload

            }
        default:
            return state
    }
}

export default itinerariesReducer