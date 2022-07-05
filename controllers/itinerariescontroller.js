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
            itinerary = await Itinerary.findOne({ _id: id })
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
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find({ cityId: id }).populate("cityId")
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    /* Like itineraries and comentaries */

    likeItinerary: (req, res) => {
        Itinerary.findOne({ _id: req.params.id }).then((itinerary) => {
            if (itinerary.likes.includes(req.user._id)) {
                Itinerary.findOneAndUpdate(
                    { _id: req.params.id },
                    { $pull: { likes: req.user._id } },
                    { new: true }
                ).then((newItinerary) =>
                    res.json({ response: newItinerary.likes, success: true })
                ).catch(err => console.log(err));
            } else {
                Itinerary.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.user._id } }, { new: true })
                    .then(newItinerary => res.json({ response: newItinerary.likes, success: true }))
                    .catch(err => console.log(err));
            }
        }).catch(err => res.json({ response: req.params.id, success: false }));
    },
    modifyComment: async (req, res) => {
        switch (req.body.type) {
            case "addComment":
                try {
                    let newComment = await Itinerary.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: { comment: req.body.comment, user: req.user._id } } }, { new: true }).populate('comments.user')
                    if (newComment) {
                        res.json({ success: true, response: newComment.comments })
                    } else {
                        throw new Error("Problem posting comment")
                    }
                } catch (err) {
                    res.json({ response: err.message, success: false })
                }
                break;
            case "editComment":
                try {
                    let updatedComment = await Itinerary.findOneAndUpdate({ "comments._id": req.params.id }, { $set: { "comments.$.comment": req.body.comment } }, { new: true }).populate('comments.user')
                    if (updatedComment) {
                        res.json({ response: updatedComment.comments, success: true })
                    } else {
                        throw new Error("Problem edting comment")
                    }
                } catch (err) {
                    res.json({ response: err, success: false })
                }
                break;
            case "deleteComment":
                console.log(req.body)
                try {
                    let deletedComment = await Itinerary.findOneAndUpdate({ "comments._id": req.body.commentId }, { $pull: { comments: { _id: req.body.commentId } } }).populate('comments.user')
                    if (deletedComment) {
                        res.json({ success: true })
                    } else {
                        throw new Error("Problem deleting comment")
                    }
                } catch (err) {
                    res.json({ success: false, response: err })
                }
                break;
        }
    }

}

module.exports = itinerariesControllers;