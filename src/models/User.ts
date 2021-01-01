import {Schema, model, Types} from 'mongoose'

const schema = new Schema({
    email: {type: String, required: true, unique: true, index: true},
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    derivatives: [{ type: Types.ObjectId, ref: 'Derivative' }],
    last_active: {type: Date, required: true},
    balance: {type: String, required: true}
})

module.exports = model('User', schema)