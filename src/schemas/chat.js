const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    user_name: String,
    message: String,
    room: String,
    created_at: String
})

const chatModel = mongoose.model('Chat', chatSchema)

module.exports = {
    chatModel
}