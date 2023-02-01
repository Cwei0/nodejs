const Employee = require('../model/Employee')

const getAllEmployee = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) return res.status(204).json({ "message": "No employees found" })
    res.json(employees)
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).type('txt').send('First and Last name must be provided')
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(404)
    }
}

const updateEmployeeInfo = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).type('txt').send('Employee ID is required')
    }
    const employee = await Employee.findById(req.body.id).exec()
    if (!employee) {
        return res.status(204).json({ 'message': `No employee matches ID ${req.body.id}` })
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname
    if (req.body?.lastname) employee.lastname = req.body.lastname
    const result = await employee.save()
    res.json(result)

}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).type('txt').send('Employee ID is required')
    }
    const employee = await Employee.findById(req.body.id).exec()
    if (!employee) {
        return res.status(204).json({ 'message': `No employee matches ID ${req.body.id}` })
    }
    const result = await employee.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).type('txt').send('Employee ID is required')
    const employee = await Employee.findById(req.params.id).exec()
    if (!employee) {
        return res.status(204).json({ 'message': `No employee matches ID ${req.params.id}` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployee,
    getEmployee,
    deleteEmployee,
    createNewEmployee,
    updateEmployeeInfo
}