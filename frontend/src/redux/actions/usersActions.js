import axios from "axios";
let urlLocalHost = 'http://localhost:4000/'

const usersActions = {


  signUpUsers: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(urlLocalHost + `api/signUp`, { userData })
        console.log(res);
        dispatch({
          type: 'MESSAGE',
          payload: {
            message: res.data.message,
            success: res.data.success
          }
        })
        return res
      } catch (error) {
        console.log(error);
      }
    }
  },

  loginUsers: (userSignIn) => {
    
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(urlLocalHost + 'api/login', {userSignIn})
        if (res.data.success) {
          localStorage.setItem('token', res.data.response.token)
          dispatch({
            type: 'user',
            payload: { user: res.data.response.userData, success: res.data.success }
          })
        }

        return res
      } catch (error) {
        console.log(error);
      }

    }
  },

  verifyToken: (token) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.get(urlLocalHost + 'api/logintoken', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        if (user.data.success) {
          dispatch({ type: 'user', payload: { user: user.data.response, success: user.data.success } });
          dispatch({
            type: 'MESSAGE_USER',
            payload: { view: true, message: user.data.message, success: user.data.success }
          })

        }

        else { localStorage.removeItem('item') }        

      } catch (err) {
        console.error(err);
      }
    }
  },
  
  signOut: () => {
    return (dispatch, getState) => {
      dispatch({ type: "SIGN_OUT" ,
    });
    };
  },


}

export default usersActions;

