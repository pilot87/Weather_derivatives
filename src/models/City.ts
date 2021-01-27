import {Schema, model} from 'mongoose'

const schema = new Schema({
  name: {type: String, required: true},
  current_temp: {type: String, required: true},
  hourly_temp: [{type: String, required: true}],
  current_wind_speed: {type: String, required: true},
  hourly_wind_speed: [{type: String, required: true}],
  current_clouds: {type: String, required: true},
  hourly_clouds: [{type: String, required: true}],
  current_pressure: {type: String, required: true},
  hourly_pressure: [{type: String, required: true}],
  current_humidity: {type: String, required: true},
  hourly_humidity: [{type: String, required: true}],
  current_visibility: {type: String, required: true},
  hourly_visibility: [{type: String, required: true}],
  expected_value: [{type: String, required: true}],
  variance: [{type: String, required: true}],
  standard_deviation: [{type: String, required: true}],
  history_temp: [{type: String, required: true}],
  init_phase: {type: Boolean, required: true}
})

module.exports = model('City', schema)
