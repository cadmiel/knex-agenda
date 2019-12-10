const user = require('../models/user')

const index = async ({ knex }, req, res) => {

    try {
        const users = await user.findAll(knex)
    } catch (error) {
        console.log('erro', error)
    }

    res.send('contatos')
}

module.exports = {
    index
}