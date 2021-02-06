//#start
let base = ''

import express = require('express')
export const {Router} = require('express')
export const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
export const jwt = require('jsonwebtoken')

import {forecast} from './shedule/weather.update'

const app: express.Application = express()

const rule = new schedule.RecurrenceRule()
rule.second = 15
schedule.scheduleJob(rule, () => {
    forecast()
})
// @ts-ignore
app.use(express.json({ extended: true }))

app.use(base + '/api/auth', require('./routes/auth.routes'))
app.use(base + '/api/profile', require('./routes/profile.routes'))
app.use(base + '/api/weather', require('./routes/weather.routes'))
app.use(base + '/api/derivative', require('./routes/derivative.routes'))

app.use(base + '/', express.static(path.join(__dirname, 'client', 'build')))

app.get(base + '*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = config.get('port') || 443

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
//#app
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
