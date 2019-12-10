const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const userRouter = (dependency) => {
    router.get('/users', userController.findAll.bind(null, dependency))
    router.get('/user/:id', userController.findById.bind(null, dependency))
    router.get('/user/:id/delete', userController.removeById.bind(null, dependency))
    router.post('/user', userController.save.bind(null, dependency))
    router.put('/user/:id', userController.save.bind(null, dependency))
    router.get('/user', userController.register.bind(null, dependency))
    return router
}

module.exports = {
    userRouter
}