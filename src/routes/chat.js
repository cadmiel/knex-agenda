const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat')

const chatRouter = (dependency) => {
    router.get('/rooms', chatController.room.bind(null, dependency))
    return router
}

module.exports = {
    chatRouter
}