import axios from "axios";
let urlLocalHost = 'http://localhost:4000/'

const commentariesActions = {

  addComment: (comment) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {

      if (comment.comment !== "") {
        const res = await axios.post(`${urlLocalHost}api/comments`, { comment }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(res);
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
        const res = await axios.put(`${urlLocalHost}api/comments`, { comment }, {
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
        const res = await axios.post(`${urlLocalHost}api/comments/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        
        return res
    }
},
}

export default commentariesActions;