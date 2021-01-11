const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/rename', auth,
    [
        check('username', 'Only symbols, numbers and underline are available')
            .isAlphanumeric()
    ],
    async(req: any, res: any) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }
            const email = req.user.email
            const { username } = req.body
            console.log(email)
            console.log(username)
            await User.findOneAndUpdate({ email }, { $set: { username: username }})
            res.status(200).json({username: username})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
})

router.post('/chpasswd', auth,
    [
        check('password', 'Minimum password length is 6 symbols')
            .isLength({ min: 6 }),
    ],
    async(req: any, res: any) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }
            const email = req.user.email
            const { password } = req.body
            const hashedPassword = await bcrypt.hash(password, 12)
            await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword }})
            res.status(200).json({message: 'Password successfully changed'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
})

router.post('/balance', auth,
    async(req: any, res: any) => {
        try {
            const email = req.user.email
            const user = await User.findOne({ email })
            res.status(200).json({balance: Number.parseFloat(user.balance)})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
})

module.exports = router
