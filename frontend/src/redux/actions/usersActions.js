import axios from "axios";

const usersActions = {


    signUpUsers: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`http://localhost:4000/api/signUp`, { userData })
                console.log(res);
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }catch (error) {
                console.log(error);
            }
        }
    },
    loginUser: (userSignIn) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`http://localhost:4000/api/login`, { userSignIn })
                dispatch({
                    type: 'USER',
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
    }
}

export default usersActions;