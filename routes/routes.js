const Router = require ("express").Router();

const citiesControllers = require ('../controllers/citiescontroller');
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities } = citiesControllers

Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

Router.route('/multiplesCities')
.post(multiplesCities)

const itinerariesControllers = require ('../controllers/itinerariescontroller');
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItineraries, getItinerariesByCity} = itinerariesControllers

Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/multiplesItineraries')
.post(multiplesItineraries)

Router.route('/itinerariesByCity/:id')
.get(getItinerariesByCity)

module.exports = Router