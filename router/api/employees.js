const express = require('express');
const router = express.Router()
const employeesController = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

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
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployeeInfo)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee)


router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router