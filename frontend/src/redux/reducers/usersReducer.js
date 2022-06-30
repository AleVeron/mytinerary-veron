const initialState = {
    user: {
        message: '',
        success: false
    },
    notify: {
        message: '',
        success: false
    }
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case "MESSAGE":
            return {
                ...state,
                notify: action.payload
            }
        case "USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default usersReducer