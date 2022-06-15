const Router = require ("express").Router();

const citiesControllers = require ('../controllers/citiescontroller');
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers

Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

Router.route('multiplesCities')
.post(multiplesCities)

module.exports = Router