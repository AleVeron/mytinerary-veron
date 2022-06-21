const City = require('../models/city')

//Utiliza metodos de la libreria mongoose

const citiesControllers = {
    getCities: async(req, res) => {
        let cities
        let error = null
        try{
            cities = await City.find()
        } catch(err) {error = err}
        res.json({
            response: error ? 'ERROR' : { cities},
            success: error ? false : true,
            error : error
        })
    },
    getOneCity: async(req, res) => {
        const id = req.params.id
        let city
        let error = null
        try{
            city = await City.findOne({_id:id})
        }catch(err){
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error : error
        })
    },
    addCity: async (req, res) => {
        const {name,country,description, image} = req.body.data
        let city
        let error = null
        try{
            city = await new City ({
                name:name,
                country:country,
                description: description,
                image: image
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : city,
            succes: error ? false : true,
            error : error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try{
            citydb = await City.findOneAndUpdate({ _id: id}, city,{new: true})
        } catch (err) { error = err}
        res.json({
            response: error ? 'ERROR' : citydb,
            succes: error ? false : true,
            error : error
        })
    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    multiplesCities: async (req, res) => {
        let city = []
        const data = req.body.data 
        let error = null
        try {
            data.map(async (item) => {
                await new City({
                    name: item.name,
                    country: item.country,
                    description: item.description,
                    image: item.image
                }).save()
            })
        } catch (err) { error = err }
        city = await City.find()
        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = citiesControllers;