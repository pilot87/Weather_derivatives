const City = require('../models/City')
const Derivative = require('../models/Derivative')
const User = require('../models/User')

import {base} from './weather.update'

export const billing = async () => {
    for (const city in base) {
        await billing_city(base[city])
    }
}

const billing_city = async (city: string) => {
    // console.log(city)
    const futures = await Derivative.find({type: 'futures', completed: false, city: city})
    for (const der of futures) {
        const city = await City.findOne({name: der.city})
        await Derivative.findOneAndUpdate({_id: der._id}, {$set:
                {duration_left: der.duration_left - 1}})
        if((der.temp_reach && Number.parseFloat(city.current_temp) > Number.parseFloat(der.temp)) ||
            (!der.temp_reach && Number.parseFloat(city.current_temp) < Number.parseFloat(der.temp))) {
            const user = await User.findOne({email: der.email})
            await User.findOneAndUpdate({email: der.email},
                {$set: {balance: (Number.parseFloat(user.balance) + der.quantity).toString()}})
            await Derivative.findOneAndUpdate({_id: der._id}, {$set:
                    {paid: der.paid + 1}})
            await new Promise(r => setTimeout(r, 20))
        }
        if (der.duration_left < 2) {
            await Derivative.findOneAndUpdate({_id: der._id}, {$set:
                    {completed: true}})
        }
    }
}
