const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length is 6 symbols')
            .isLength({ min: 6 }),
        check('username', 'Only symbols, numbers and underline are available')
            .isAlphanumeric()
    ],
     async (req: any, res: any) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const {email, password, username} = req.body

            const candidate = await User.findOne({ email: email })

            if (candidate) {
                return res.status(400).json({ errors: [{msg: 'User already exist', param: 'email'}] })
            }

            const namesake = await User.findOne({ username: username })

            if (namesake) {
                return res.status(400).json({ errors: [{msg: 'Username is bisy', param: 'username'}] })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                username,
                password: hashedPassword,
                last_active: Date.now(),
                balance: '10000'
            })

            await user.save()

            res.status(200).json({ message: 'User has created' })

        } catch (e) {
            res.status(500).json({ message: 'Some error ' + JSON.stringify(e) })
        }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email please').normalizeEmail().isEmail(),
        check('password', 'Enter password please').exists()
    ],
    async (req: any, res: any) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect authorisation data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign(
                { userId: user.id, email: email, data: 'foobar' },
                config.get('jwtSecret')
            )

            await User.findOneAndUpdate({ email }, { $set: { last_active: Date.now() }})

            res.status(200).json({ token, username: user.username, email: user.email })

        } catch (e) {
            res.status(500).json({ message: 'Some error' })
        }
})

module.exports = router
