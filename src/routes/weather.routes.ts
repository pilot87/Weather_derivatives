import {Router} from '../app'
// const {Router} = require('express')

const City = require('../models/City')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/update', auth,
    async(req: any, res: any) => {
        try {
            const cities = await City.find()
            res.status(200).json(
                Object.fromEntries(cities.map((city: { name: string, current_temp: string, hourly_temp: string[],
                    current_wind_speed: string, hourly_wind_speed: string[], current_clouds: string,
                    hourly_clouds: string[], current_pressure: string, hourly_pressure: string[], current_humidity: string,
                    hourly_humidity: string[], current_visibility: string, hourly_visibility: string[]}) => {
                    return [
                        city.name,
                        {
                            current_temp: parseFloat(city.current_temp),
                            hourly_temp: city.hourly_temp.map(v => parseFloat(v)),
                            current_wind_speed: parseFloat(city.current_wind_speed),
                            hourly_wind_speed: city.hourly_wind_speed.map(v => parseFloat(v)),
                            current_clouds: parseFloat(city.current_clouds),
                            hourly_clouds: city.hourly_clouds.map(v => parseFloat(v)),
                            current_pressure: parseFloat(city.current_pressure),
                            hourly_pressure: city.hourly_pressure.map(v => parseFloat(v)),
                            current_humidity: parseFloat(city.current_humidity),
                            hourly_humidity: city.hourly_humidity.map(v => parseFloat(v)),
                            current_visibility: parseFloat(city.current_visibility),
                            hourly_visibility: city.hourly_visibility.map(v => parseFloat(v))
                        }
                    ]
                })
            ))
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
    }
)

module.exports = router
