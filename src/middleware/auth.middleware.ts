import {config, jwt} from '../app'
// const jwt = require('jsonwebtoken')
// const config = require('config')

const User = require('../models/User')

module.exports = async(req: { user: { email: any }, headers: any, method: string }, res: any, next: any) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Not authorised' })
    }

    req.user = jwt.verify(token, config.get('jwtSecret'))
    const email = req.user.email
    const rec = await User.findOne({ email })
    if (Date.now() - rec.last_active.getTime() > 3*3600*1000) { // more than three hour
      return res.status(511).json({ message: 'Disconnected due inactivity' })
    }
    await User.findOneAndUpdate({ email }, { $set: { last_active: Date.now() }})

    next()

  } catch (e) {
    console.log(JSON.stringify(e))
    res.status(401).json({ message: e.message })
  }
}
