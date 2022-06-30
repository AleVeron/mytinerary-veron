const Router = require("express").Router();

/* ROUTES CITIES */

const citiesControllers = require('../controllers/citiescontroller');
const { getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities } = citiesControllers

Router.route('/cities')
    .get(getCities)
    .post(addCity)

Router.route('/cities/:id')
    .delete(removeCity)
    .put(modifyCity)
    .get(getOneCity)

Router.route('/multiplesCities')
    .post(multiplesCities)

/* ROUTES ITINERARIOS */

const itinerariesControllers = require('../controllers/itinerariescontroller');
const { getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItineraries, getItinerariesByCity } = itinerariesControllers

Router.route('/itineraries')
    .get(getItineraries)
    .post(addItinerary)

Router.route('/itineraries/:id')
    .delete(removeItinerary)
    .put(modifyItinerary)
    .get(getOneItinerary)

Router.route('/multiplesItineraries')
    .post(multiplesItineraries)

Router.route('/itineraries/city/:id')
    .get(getItinerariesByCity)


/* VALIDATOR ROUTE */
const userValidator = require('../config/validator')

/* ROUTES USERLOG */

const userControllers = require('../controllers/usercontrollers')
const { signUpUsers, loginUser } = userControllers

Router.route('/signUp')
    .post(userValidator,signUpUsers)


Router.route('/login')
    .post(loginUser)


module.exports = Router