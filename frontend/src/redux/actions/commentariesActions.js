import axios from "axios";
let urlLocalHost = 'http://localhost:4000/'
let urlHeroku = "https://mytinerary-back-veron.herokuapp.com/"

const commentariesActions = {

  addComment: (comment) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {

      if (comment.comment !== "") {
        const res = await axios.post(`${urlHeroku}api/comments`, { comment }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        return res
      }
      else {
        dispatch({
          type: 'message',
          payload: {
            view: true,
            message: "Add a new comment",
            success: false
          }
        })
      }
    }

  },
  modifyComment: (comment) => {
    
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
        const res = await axios.put(`${urlHeroku}api/comments`, { comment }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: 'message',
            payload: {
                view: true,
                message: res.data.message,
                success: res.data.success
            }
        })
        return res
    }
},

deleteComment: (id) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
        const res = await axios.post(`${urlHeroku}api/comments/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        
        return res
    }
},
}

export default commentariesActions;