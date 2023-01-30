const userDB = {
    user: require('../model/user.json'),
    setUser: function (data) { this.user = data }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    //on clientside, also delete access tokens
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content 
    const refreshToken = cookies.jwt

    //Is the refresh token in the DB?
    const foundUser = userDB.user.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204)
    }

    //Delete the refresh token
    const otherUser = userDB.user.find(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' }
    userDB.setUser([...otherUser, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'user.json'),
        JSON.stringify(userDB.user)
    )
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) //secure: true - only serves on https
    res.sendStatus(204)
}

module.exports = { handleLogout }