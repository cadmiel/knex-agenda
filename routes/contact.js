const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')

const contactRouter = (dependency) => {
    router.get('/contact', contactController.index.bind(null, dependency))
    return router
}

module.exports = {
    contactRouter
}