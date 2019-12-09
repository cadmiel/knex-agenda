const express = require('express')
const router = express.Router()
const userController = require('../controller/user') 

const user = (dependency) => {
    router.get('/',userController.index.bind(null,dependency))
    return router
}

module.exports = {
    user
}