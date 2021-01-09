const {Router} = require('express')
const City = require('../models/City')
const User = require('../models/User')
const Derivative = require('../models/Derivative')
const auth = require('../middleware/auth.middleware')

const router = Router()

const normalcdf = (X: number) => {
    const T = 1 / (1 + 0.2316419 * Math.abs(X))
    const D = 0.3989423 * Math.exp(-X * X / 2)
    let Prob = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
    if (X > 0) {
        Prob = 1 - Prob
    }
    return Prob
}

const rate = async (city: string, duration: number, temp: number, rich: boolean) => {

    const {standard_deviation, expected_value } = await City.findOne({name: city})

    const index: number = Math.floor(duration/180)

    let Phi: number

    if(standard_deviation[index] === 0) {
        if (temp < expected_value[index]) {
            Phi = 0
        } else {
            Phi = 1
        }
    } else {
        Phi = Math.round(100000 * normalcdf((temp - expected_value[index]) / standard_deviation[index])) / 100000
        if(rich) {
            Phi = 1 - Phi
        }
    }

    // return 0.20 * Phi * 1.1
    // console.log(Phi + ' ' + city + ' ' + standard_deviation[index])
    return 1.05 * Phi
}

router.post('/rate', auth,
    async (req: any, res: any) => {
        try {
            // console.log('rate')
            const {city, duration, temp, rich} = req.body
            // console.log(city, duration, temp, rich)

            if(duration < 5) {
                res.status(400).json({message: 'duration should be more than 5 minutes'})
            }

            // console.log(rate(city, duration, temp, rich))

            const di = await rate(city, duration, temp, rich)

            res.status(200).json({city: city, rate: di})

        } catch (e) {
            if (e === 'duration should be more than 5 minutes') {
                res.status(400).json({message: e})
            }
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

router.post('/daily_index', auth,
    async (req: any, res: any) => {
        try {
            // console.log('daily_index')
            const { city, temp, rich } = req.body
            // console.log(city)

            const di = await rate(city, 60 * 24, temp, rich)

            // console.log(di)

            res.status(200).json({city: city, rate: di})

        } catch (e) {
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

router.post('/daily_index_info', auth,
    async (req: any, res: any) => {
        try {
            // console.log('daily_index')
            const { city, rich, l, init_step } = req.body
            // console.log(city)

            const index: number = Math.floor(60 * 24 / 180)

            const { expected_value } = await City.findOne({name: city})
            let temp: number[]
            let di: number[]
            let step = init_step

            do {
                temp = []
                di = []

                for (let t = 0; t < 2 * l + 1; t++) {
                    temp.push(expected_value[index] - (l - t) * step)
                }

                for (const t of temp) {
                    const i = await rate(city, 60 * 24, t, rich)
                    di.push(i)
                }

                step = step / 2
            } while (Math.max(... di) > 1) // || Math.min(... di) < 0.0001 Math.max(... di) >= 1)

            let di2 = []

            for (const i of di) {
                di2.push(1 - i)
            }

            res.status(200).json({city: city, rate: di, rate2: di2, temp: temp})

        } catch (e) {
            console.log('error in daily_index_info ')
            console.log(e)
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

router.post('/buy', auth,
    async (req: any, res: any) => {
        try {
            const {city, duration, temp, rich, quantity, hidden} = req.body

            if(duration < 5) {
                return res.status(400).json({message: 'duration should be more than 5 minutes'})
            }

            const di = await rate(city, duration, temp, rich)

            const condidate_city = await City.findOne({name: city})

            if (!condidate_city) {
                return res.status(400).json({message: 'City is not trackable'})
            }

            const amount = di * quantity * duration
            const email = req.user.email
            const user = await User.findOne({ email })

            if (amount > user.balance) {
                res.status(400).json({message: 'Your balance is not enouph'})
            }

            if (quantity < 1) {
                res.status(400).json({message: 'Quantity should be more than 0'})
            }

            if (duration < 1) {
                res.status(400).json({message: 'Duration should be more than 0'})
            }

            const derivative = new Derivative({
                completed: false,
                quantity: quantity,
                email: email,
                duration: duration,
                duration_left: duration,
                city: city,
                type: 'futures',
                hidden: hidden,
                temp: temp,
                temp_reach: rich
            })

            await derivative.save()

            await User.findOneAndUpdate({email}, {$set: {balance: user.balance - amount}})

            res.status(200).json({message: 'success'})

        } catch (e) {
            if (e === 'duration should be more than 5 minutes') {
                res.status(400).json({message: e})
            }
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

router.post('/daily_params', auth,
    async (req: any, res: any) => {
        try {
            // console.log('daily_index')
            // const {  } = req.body
            // console.log(city)

            const index: number = Math.floor(60 * 24 / 180)

            const cities = await City.find()

            const stats = cities.map((city: any) => {
                return ({
                    name: city.name,
                    expected_value: city.expected_value[index],
                    standard_deviation: city.standard_deviation[index]
                })
            })

            res.status(200).json({stats: stats})

        } catch (e) {
            console.log('error in stats ')
            console.log(e)
            res.status(500).json({message: 'Server error: ' + JSON.stringify(e)})
        }
    }
)

module.exports = router
