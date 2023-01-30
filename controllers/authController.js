const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromise = require('fs').promises
const path = require('path')
const userDB = {
    user: require('../model/user.json'),
    setUser: function (data) { this.user = data }
}

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are required' })
    const foundUser = userDB.user.find(person => person.username === user)
    if (!foundUser) return res.sendStatus(401)
    //check for password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        //create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50s' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REQUEST_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        //saving refreshToken with current user
        const otherUser = userDB.user.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        userDB.setUser([...otherUser, currentUser])
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.user)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}
module.exports = { handleLogin }
