const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

const authRouter = (dependency) => {
    router.get('/login', authController.auth.bind(null, dependency))
    router.get('/logout', authController.logout.bind(null, dependency))
    router.post('/login', authController.processAuth.bind(null, dependency))
    router.get('/register', authController.register.bind(null, dependency))
    return router
}

module.exports = {
    authRouter
}