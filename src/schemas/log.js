const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    user_name: String,
    message: String,
    created_at: String
})

const logModel = mongoose.model('Log', logSchema)

module.exports = {
    logModel
}