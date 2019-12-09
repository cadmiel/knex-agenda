const user = require('../model/user')

const index = async({ knex }, req, res) =>{

    try{
        const users = await user.findAll(knex)
        console.log(users)
    }catch(error) {
        console.log('erro',error)
    }
    
    res.send('usuarios')
}

module.exports = {
    index
}