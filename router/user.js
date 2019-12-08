const express = require('express')
const router = express.Router()
const userController = require('../controller/user') 

const user = () => {
    router.get('/',userController.index.bind(null,'ola'))
    return router
}

module.exports = {
    user
}