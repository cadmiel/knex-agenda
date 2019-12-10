const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

const authRouter = (dependency) => {
    router.get('/login', authController.login.bind(null, dependency))
    router.get('/register', authController.register.bind(null, dependency))
    return router
}

module.exports = {
    authRouter
}