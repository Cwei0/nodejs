const jwt = require('jsonwebtoken')
require('dotenv').config()
const userDB = {
    user: require('../model/user.json'),
    setUser: function (data) { this.user = data }
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt


    const foundUser = userDB.user.find(person => person.refreshToken === refreshToken)
    if (!foundUser) return res.sendStatus(403) // Forbidden
    //evaluate the jwt token

    jwt.verify(
        refreshToken,
        process.env.REQUEST_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded) return res.sendStatus(403)
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '50s' }
            )
            res.json({ accessToken })
        }
    )

}
module.exports = { handleRefreshToken }