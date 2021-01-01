const {Router} = require('express')
const City = require('../models/City')

const router = Router()

const normalcdf = (X: number) => {   //HASTINGS.  MAX ERROR = .000001
    const T = 1 / (1 + 0.2316419 * Math.abs(X))
    const D = 0.3989423 * Math.exp(-X * X / 2)
    let Prob = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
    if (X > 0) {
        Prob = 1 - Prob
    }
    return Prob
}

router.post(
    'rate',
    async (req: any, res: any) => {
        try {
            const {city, duration, temp, rich} = req.body

            if(duration < 5) {
                return res.status(400).json('duration should be >= 5')
            }

            const {expected_value, variance, standard_deviation} = City.findOne({name: city})
            const index: number = Math.floor(duration/180)

            const possibility = (1 / (standard_deviation[index] * Math.sqrt(2 * Math.PI)) *
                Math.exp(-1 * (temp - expected_value[index])**2 / (2 * variance[index])))

            let Phi: number
            if(standard_deviation === 0) {
                if (temp < expected_value) {
                    Phi = 0
                } else {
                    Phi = 1
                }
            }

            Phi = Math.round(100000 * normalcdf((temp - expected_value) / standard_deviation)) / 100000
            if(rich === true) {
                Phi = 1 - Phi
            }

            const rate = 0.20 * Phi * 1.1

            res.status(200).json({rate: rate})

        } catch (e) {
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

module.exports = router
