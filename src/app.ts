#!/usr/bin/env /home/web/.nvm/versions/node/v14.15.4/bin/node

// const fs = require('fs')
const {
    createServer,
    IncomingMessage,
    ServerResponse,
} = require('unit-http')

require('http').ServerResponse = ServerResponse
require('http').IncomingMessage = IncomingMessage

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

app.use('/wf/api/auth', require('./routes/auth.routes'))
app.use('/wf/api/profile', require('./routes/profile.routes'))
app.use('/wf/api/weather', require('./routes/weather.routes'))
app.use('/wf/api/derivative', require('./routes/derivative.routes'))

app.use('/wf/', express.static(path.join(__dirname, 'client', 'build')))

app.get('/wf/', (req: any, res: any) => {
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
        createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
