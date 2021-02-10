const City = require('../models/City')
const Derivative = require('../models/Derivative')
const User = require('../models/User')

export const billing = async(city: string) => {
    const futures = await Derivative.find({type: 'futures', completed: false, city: city})
    for (const der of futures) {
        const city = await City.findOne({name: der.city})
        if((der.temp_reach && Number.parseFloat(city.current_temp) > Number.parseFloat(der.temp)) ||
            (!der.temp_reach && Number.parseFloat(city.current_temp) < Number.parseFloat(der.temp))) {
            const user = await User.findOne({email: der.email})
            await User.findOneAndUpdate({email: der.email},
                {$set: {balance: (Number.parseFloat(user.balance) + der.quantity).toString()}})
            await Derivative.findOneAndUpdate({_id: der._id}, {$set:
                    {duration_left: der.duration_left - 1}})
            if (der.duration_left === 1) {
                await Derivative.findOneAndUpdate({_id: der._id}, {$set:
                        {completed: true}})
            }
            await new Promise(r => setTimeout(r, 20))
        }
    }
}
