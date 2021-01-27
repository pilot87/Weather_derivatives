import express = require('express')
export const {Router} = require('express')
export const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
export const jwt = require('jsonwebtoken')

import {forecast} from './shedule/weather.update'
import {billing} from './shedule/billing.update'

const app: express.Application = express()

const rule = new schedule.RecurrenceRule()
rule.second = 15
schedule.scheduleJob(rule, () => {
    forecast()
    billing()
})
// @ts-ignore
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/weather', require('./routes/weather.routes'))
app.use('/api/derivative', require('./routes/derivative.routes'))

console.log(JSON.stringify(process.env.NODE_ENV))

if (process.env.NODE_ENV === 'production') {
    console.log(__dirname)
    app.use('/', express.static(path.join(__dirname, '../', 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
