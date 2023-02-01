const User = require('../model/User')

const handleLogout = async (req, res) => {
    //on clientside, also delete access tokens
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content 
    const refreshToken = cookies.jwt

    //Is the refresh token in the DB?
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec()
    if (!foundUser) {
        //if the refresh token is not in the DB, it still okay to delete cookies
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' })
        return res.sendStatus(204)
    }

    //Delete the refresh token in the DB
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }) //secure: true - only serves on https
    res.sendStatus(204)
}

module.exports = { handleLogout }