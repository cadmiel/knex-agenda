const { userRouter } = require('./user')
const { authRouter } = require('./auth')
const { chatRouter } = require('./chat')

const routers = (dependency) => {
    return [
        userRouter(dependency),
        authRouter(dependency),
        chatRouter(dependency)
    ]
}

module.exports = { routers }