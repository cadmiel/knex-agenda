const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const userRouter = (dependency) => {
    router.get('/user', userController.index.bind(null, dependency))
    return router
}

module.exports = {
    userRouter
}