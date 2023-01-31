const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const userDB = {
    user: require('../model/user.json'),
    setUser: function (data) { this.user = data }
}

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are required' })
    //check for duplicate username in the database
    const duplicate = userDB.user.find(person => person.username === user)
    if (duplicate) return res.sendStatus(409)
    try {
        //Encrypt the pwd with bcrypt
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //store the new user
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        }
        userDB.setUser([...userDB.user, newUser])

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.user)
        )
        console.log(userDB.user)
        res.sendStatus(201).json({ 'success': `New user ${user} created` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser }

