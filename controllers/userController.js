const User = require('../model/User')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(204).type('txt').send('there is no user')
    res.json(users)
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).type('txt').send('Employee ID is required')
    const user = await User.findById(req.params.id).exec()
    if (!user) return res.status(404).type('txt').send(`No user with id ${req.params.id} exists`)
    res.json(user)
}

const updateUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).type('txt').send('Employee ID is required')
    const user = await User.findById(req.body.id).exec()
    if (!user) {
        return res.status(404).type('txt').send(`No user with id ${req.body.id} exists`)
    }
    try {
        const result = await user.update({
            $set: { roles: req.body.roles }
        })
        res.json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).type('txt').send('Employee ID is required')
    }
    const user = await User.findById(req.body.id).exec()
    if (!user) {
        return res.status(404).type('txt').send(`No user with id ${req.body.id} exists`)
    }
    const result = await user.deleteOne({ _id: req.body.id })
    res.json(result)
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}
