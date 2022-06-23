const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title:{type:String, required:true},
    userPic:{type:String, required:true},
    userName:{type:String, required:true},
    likes:{type:Number, required:true},
    duration:{type:String, required:true},
    price:{type:String, required:true},
    hashtag:[String],
    activities:{type:String, required:true},
    cityId:{type: mongoose.Types.ObjectId , ref : 'cities'}
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary

