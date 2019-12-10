const user = require('../models/user')

const login = async ({ knex }, req, res) => {
    res.render('auth/login')
}

const register = async ({ knex }, req, res) => {
    res.render('auth/register')
}

module.exports = {
    login,
    register
}