const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require("./config")
const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role,
    }
    return jwt.sign(payload, secret, {expiresIn : "24h"})
}


class authController {
    async registration(req, res) {
        try {
            console.log(req.body)
            const { email, login, password } = req.body;
            const candidateEmail = await User.findOne({ email })
            const candidateLogin = await User.findOne({ login })

            if (candidateEmail) {
                return res.status(400).json({ message: "Пользователь с таким emain уже существует" })
            }
            if (candidateLogin) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: 'USER' })
            const user = new User({ email, login, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: "Пользователь успешно зарегистрирован" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Registration Error" })
        }
    }

    async login(req, res) {
        try {

        const { login, password} = req.body;   
        const user = await User.findOne({login})

        if(!user) {
            return res.status(400).json({message : `Пользователь с ${login} не найден`})
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword) {
            return res.status(400).json({message : `Введён не верный пароль`})
        }
        const token = generateAccessToken(user._id, user.roles)

            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Registration Error" })
        }
    }

    async getUsers(req, res) {
        try {

            res.json('server work')

        } catch (e) {

        }
    }
}

module.exports = new authController()