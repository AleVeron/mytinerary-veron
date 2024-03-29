const Itinerary = require('../models/itinerary')

//Utiliza metodos de la libreria mongoose

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOne({ _id: id }).populate('comments.user', { fullName: 1, photoUser: 1 })
        } catch (err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res) => {
        const { title, userPic, userName, likes, duration, price, hashtag, activities, cityId } = req.body.data
        let itinerary
        let error = null
        try {
            itinerary = await new Itinerary({
                title: title,
                userPic: userPic,
                userName: userName,
                likes: likes,
                duration: duration,
                price: price,
                hashtag: hashtag,
                activities: activities,
                cityId: cityId
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            succes: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body.data
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            succes: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    multiplesItineraries: async (req, res) => {
        let itinerary = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body.
        let error = null
        try {
            data.map(async (item) => {
                await new Itinerary({
                    title: item.title,
                    userPic: item.userPic,
                    userName: item.userName,
                    likes: item.likes,
                    duration: item.duration,
                    price: item.price,
                    hashtag: item.hashtag,
                    activities: item.activities,
                    cityId: item.cityId
                }).save()
            })
        } catch (err) { error = err }
        itinerary = await Itinerary.find()
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    getItinerariesByCity: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
          itinerary = await Itinerary.find({ cityId: id})
        } catch (err) {
          error = err
        }
        res.json({
          response: error ? 'ERROR' : (itinerary),
          success: error ? false : true,
          error: error
        })
      },

    /* Like itineraries and comentaries */

    likeDislike: async (req, res) => {
        const id = req.params.id
        const user = req.user.id  
 

        await Itinerary.findOne({ _id: id })

            .then((tinerary) => {
                
                if (tinerary.likes.includes(user)) {
                    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//PULL QUITA, SACA
                        .then((response) => res.json({ success: true, response: response.likes, message:"Dislike 💔" }))
                        .catch((error) => console.log(error))
                } else {
                    Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
                        .then((response) => res.json({ success: true, response: response.likes, message:"Like 💝" }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error }))
    }
}

module.exports = itinerariesControllers;