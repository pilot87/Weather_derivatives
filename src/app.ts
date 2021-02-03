#!/usr/bin/env /home/web/.nvm/versions/node/v14.15.4/bin/node
const fs = require('fs')
const {
    createServer,
    IncomingMessage,
    ServerResponse,
} = require('unit-http')

require('http').ServerResponse = ServerResponse
require('http').IncomingMessage = IncomingMessage

fs.appendFileSync('/site/WD/ex/log.log', 'point 0\n')
console.log('piont 0\n')

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

fs.appendFileSync('/site/WD/ex/log.log', 'point 1\n')
console.log('piont 1\n')

const base: string = config.get('baseUrl')

app.use(base + '/api/auth', require('./routes/auth.routes'))
app.use(base + '/api/profile', require('./routes/profile.routes'))
app.use(base + '/api/weather', require('./routes/weather.routes'))
app.use(base + '/api/derivative', require('./routes/derivative.routes'))

fs.appendFileSync('/site/WD/ex/log.log', 'point 2\n')
console.log('piont 2\n')

app.use(base + '/', express.static(path.join(__dirname, 'client', 'build')))

app.get(base + '/*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = config.get('port') || 5000

fs.appendFileSync('/site/WD/ex/log.log', 'point 3\n')
console.log('piont 3\n')

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    } catch (e) {
        console.log('Server Error', e.message)
        fs.appendFileSync('/site/WD/ex/log.log', 'Server Error' + e + '\n')
        process.exit(1)
    }
}

fs.appendFileSync('/site/WD/ex/log.log', 'point 4\n')
console.log('piont 4\n')

start()

fs.appendFileSync('/site/WD/ex/log.log', 'point 5\n')
console.log('piont 5\n')
