import axios from 'axios';

let urlLocalHost = 'http://localhost:4000/'
let urlHeroku = "https://mytinerary-back-veron.herokuapp.com/"

const activityActions = {

    getActivities: () => {
        return async (dispatch, getState) => {
            const res = await axios.get(urlHeroku + `api/activities`)
            dispatch({ type: 'GET_ACTIVITIES', payload: res.data.response.activities })
            return res
        }
    },

    uploadActivity: (activities, itinerary) => {
        return async (dispatch, getState) => {
            const answer = await axios.post(urlHeroku + 'api/activities', { activities, itinerary })
            dispatch({ type: 'UPD_ACTIVITY', payload: answer.data.response.activities })
        }
    },

    deleteAct: (id) => {
        return async (dispatch, getState) => {
            try {
                const answer = await axios.delete(urlHeroku + `api/activities/${id}`)
                dispatch({ type: 'DEL_ACTIVITY', payload: answer.data.response.activities })
            } catch (err) {
                console.log(err)
            }
        }
    },

    oneActivity: (id) => {
        return async (dispatch, getState) => {
            try {
                const answer = await axios.get(urlHeroku + `api/activities/${id}`)
                dispatch({ type: 'ONE_ACTIVITY', payload: answer.data.response.activities })

            } catch (err) {
                console.log(err)
            }

        }
    },

    findActFromTin: (itineraryId) => {
        
        return async (dispatch, getState) => {
            try {
                let answer = await axios.post(urlHeroku + `api/activitiesFromTinerary`, { itineraryId })
                
                return { //NO DESPACHA! RETURNA PARA SETEAR UN HOOK COMÚN
                    success: true, response: answer.data.response.activities
                }

            } catch (error) {
                return {
                    success: false, response: error.messagge
                }
            }
        }
    }

}

export default activityActions