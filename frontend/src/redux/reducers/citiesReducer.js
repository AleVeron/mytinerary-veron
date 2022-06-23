const initialState = {
    cities: [],
    auxiliar: [],
    oneCity: {},
    cityFilter: []
}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GETCITIES":
            return {
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
                cityFilter: action.payload
            }
        case "GETONECITY":
            return {
                ...state,
                oneCity: action.payload
            }
        case "FILTERCITY":
            let filterCity = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return{
                ...state,
                cityFilter: filterCity
            }
            
        default:
            return state
    }


}

export default citiesReducer;