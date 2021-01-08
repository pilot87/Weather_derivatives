import {Schema, model, Types} from 'mongoose'

const schema = new Schema({
    completed: {type: Boolean, required: true},
    quantity: {type: Number, required: true},
    email: { type: String, required: true},
    duration: { type: Number, required: true},
    duration_left: { type: Number, required: true},
    city: { type: String, required: true},
    type: { type: String, required: true },
    hidden: {type: Boolean, required: true},
    temp: {type: String, required: true },
    temp_reach: {type: Boolean, required: true },
    wind_speed: {type: String, required: false },
    wind_speed_reach: {type: Boolean, required: false },
    clouds: {type: String, required: false },
    clouds_reach: {type: Boolean, required: false },
    pressure: {type: String, required: false },
    pressure_reach: {type: Boolean, required: false },
    humidity: {type: String, required: false },
    humidity_reach: {type: Boolean, required: false },
    visibility: {type: String, required: false },
    visibility_reach: {type: Boolean, required: false }
})

module.exports = model('Derivative', schema)
