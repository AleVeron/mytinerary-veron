const initialState = {
    user: {},
    notification: {
      view: false,
      message: '',
      success: false
    },
    messageUserLogIn: null,
  
  }
  
  const userReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'message':
        return {
          ...state,
          notification: action.payload,
        }
      case 'user':
        return {
          ...state,
          user: action.payload
        }
      case 'MESSAGE_USER':
        return {
          ...state,
          messageUserLogIn: action.payload
        }
        case 'SIGN_OUT':
          localStorage.removeItem("token");
          return {
            user: {
              token: null,
              fullName: null,
              photoUser: null,
              _id: null,
            }
          };
          
      default:
        return state
    }
  }
  export default userReducer