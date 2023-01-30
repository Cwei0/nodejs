const express = require('express');
const Router = express.Router()

const logoutController = require('../controllers/logoutController')

Router.get('/', logoutController.handleLogout)

module.exports = Router