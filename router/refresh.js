const express = require('express');
const Router = express.Router()

const refreshtokenController = require('../controllers/refreshtokenController')

Router.get('/', refreshtokenController.handleRefreshToken)

module.exports = Router