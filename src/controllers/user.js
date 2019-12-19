const user = require('../models/user')

const resetForm = () => { return { action:'/user',  method:'POST', user: {}} }

const findAll = async ({ knex }, req, res) => {

    let users = {}
    
    try {
        users = await user.findAll(knex) 
    } catch (error) {
        console.log('erro', error)
    }
    
    res.render('user', { users })
}

const findById = async ({ knex }, req, res) => {

    const form = resetForm()

    try {
        form.user = await user.findById(knex, req.params.id) 
    } catch (error) {
        console.log('erro', error)
    }
    
    form.action = form.action + '/' + req.params.id + '?_method=PUT'

    res.render('user/form', { form })
}

const register = async ({ knex }, req, res) => {   
    const form = resetForm() 
    res.render('user/form', { form })
}

const removeById = async ({ knex }, req, res) => {

    try {
        await user.remove(knex, req.params.id) 
        res.redirect('/users')
    } catch (error) {
        console.log('erro', error)
    }
    
}

const save = async ({ knex }, req, res) => {

    try {
        data =  req.body
        delete data._method
        
        await user.save(knex, data, req.params.id) 
        res.redirect('/users')
    } catch (error) {
        console.log('erro', error)
    }
    res.send('erro')
    res.render('user',{users:[]})
}

module.exports = {
    findAll,
    findById,
    removeById,
    save,
    register
}