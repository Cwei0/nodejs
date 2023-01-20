const express = require('express');
const router = express.Router()
const employeesController = require('../../controllers/employeesController')

//App.route() fn used to chain route handlers
// app.route('/book')
//     .get((req, res) => {
//         res.send('Get a random book')
//     })
//     .post((req, res) => {
//         res.send('Add a book')
//     })
//     .put((req, res) => {
//         res.send('Update the book')
//     })

router.route('/')
    .get(employeesController.getAllEmployee)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployeeInfo)
    .delete(employeesController.deleteEmployee)


router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router