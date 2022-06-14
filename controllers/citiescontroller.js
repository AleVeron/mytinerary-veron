const Cities = require('../models/cities')

const citiesControllers = {
    getCities: async(req, res) => {
        let cities
        let error = null
        try{
            cities = await Cities.find()
        } catch(err) {error = err}
        res.json({
            response: error ? 'ERROR' : { cities},
            success: error ? false : true,
            error : error
        })
    },
    getOneCity: () => {},
    addCity: () => {},
    modifyCity: () => {},
    removeCity: () => {}
}

module.exports = citiesControllers;