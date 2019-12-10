const { userRouter } = require('./user')
const { contactRouter } = require('./contact')

const routers = (dependency) => {
    return [
        userRouter(dependency),
        contactRouter(dependency),
    ]
}

module.exports = { routers }