const Router = require("express").Router();
const passport = require('../config/passport')



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
const { getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItineraries, getItinerariesByCity, likeDislike } = itinerariesControllers

Router.route('/itineraries')
    .get(getItineraries)
    .post(addItinerary)

Router.route('/itineraries/:id')
    .delete(removeItinerary)
    .put(modifyItinerary)
    .get(getOneItinerary)

Router.route('/multiplesItineraries')
    .post(multiplesItineraries)

Router.route('/itinerariesbycity/:id')
    .get(getItinerariesByCity)

Router.route("/itineraries/like/:id")
    .put(passport.authenticate("jwt", { session: false }), likeDislike)

/* VALIDATOR ROUTE */
const userValidator = require('../config/validator')

/* ROUTES USERLOG */

const userControllers = require('../controllers/usercontrollers')
const { signUpUsers, loginUser, verifyEmail, verifyToken } = userControllers

Router.route('/signUp')
    .post(userValidator, signUpUsers)

Router.route('/login')
    .post(loginUser)

Router.route('/verify/:string')
    .get(verifyEmail)

Router.route('/logintoken')
    .get(passport.authenticate('jwt', { session: false }), verifyToken)

/* ROUTES ACTIVITIES */

const activitiesControllers = require('../controllers/activitiescontrollers');
const { getActivities, uploadActivity, deleteAct, modifyAct, oneActivity, findActFromTin } = activitiesControllers

Router.route('/activities')
    .get(getActivities)
    .post(uploadActivity)

Router.route('/activities/:id')
    .delete(deleteAct)
    .put(modifyAct)
    .get(oneActivity)

Router.route('/activitiesFromTinerary')
    .post(findActFromTin)

/* ROUTES COMMENTS  */

const commentsControllers = require('../controllers/commentsControllers');
const { addComment, modifyComment, deleteComment } = commentsControllers

Router.route('/comments')
    .put(passport.authenticate('jwt', { session: false }), modifyComment)
    .post(passport.authenticate('jwt', { session: false }), addComment)

Router.route('/comments/:id')
    .post(passport.authenticate('jwt', { session: false }), deleteComment)




module.exports = Router