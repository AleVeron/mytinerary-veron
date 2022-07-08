const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title:{type:String, required:true},
    userPic:{type:String, required:true},
    userName:{type:String, required:true},
    likes:[String],
    duration:[String],
    price:{type:String, required:true},
    hashtag:[String],
    activities:{type:String, required:true},
    cityId:{type: mongoose.Types.ObjectId , ref : 'cities'},
    comments: [{
        comment: {type: String},
        user: { type: mongoose.Types.ObjectId , ref: 'users'},
        date: { type: Date }
    }]
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary

