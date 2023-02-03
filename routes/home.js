const express = require('express')
//  This allows you to handle different routes within your Express.js application.
const router = express.Router()
const homeController = require('../controllers/home')
// when a GET request is made to the root URL of the application (i.e. '/'), the homeController.getIndex function should handle the request.
router.get('/', homeController.getIndex)


//  the router is exported as a module here, it can now be used in other files to specify routes.
module.exports = router