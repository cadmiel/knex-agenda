const { userRouter } = require('./user')
const { authRouter } = require('./auth')

const routers = (dependency) => {
    return [
        userRouter(dependency),
        authRouter(dependency),
    ]
}

module.exports = { routers }