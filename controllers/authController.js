const bcrypt = require('bcrypt')
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
        res.json({ 'success': `User ${user} is logged in!` })
    } else {
        res.sendStatus(401)
    }
}
module.exports = { handleLogin }
