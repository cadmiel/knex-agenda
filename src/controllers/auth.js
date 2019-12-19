const user = require('../models/user')

const auth = async ({ knex }, req, res) => {
    res.render('auth/login')
}

const processAuth = async ({ knex }, req, res) => {
    try{
        const dt = await user.auth(knex, req.body)
        req.session.user = dt
        req.session.save()
        res.redirect('/')
    }catch(err){
        res.redirect('/login')
    }
    
}

const logout = ({ knex }, req, res) => {
    req.session.destroy(() => {})
    res.redirect('/login')
}

const register = async ({ knex }, req, res) => {
    res.render('auth/register')
}

module.exports = {
    auth,
    register,
    processAuth,
    logout
}