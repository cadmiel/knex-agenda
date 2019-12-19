const bcrypt = require('bcryptjs')

const generateHashPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const findAll = async (knex) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const findById = async (knex, id) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .where('id', id)
            .first()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const save = async (knex, data, id) => {
    return new Promise((resolve, reject) => {
        const criterion = knex('users')

        if (data.password) {
            data.password = generateHashPassword(data.password)
        } else {
            delete data.password
        }
     
        if (id) {
            criterion.where({ 'id': id }).update(data)
        } else {
            criterion.insert(data)
        }

        criterion
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const remove = async (knex, id) => {
    return new Promise((resolve, reject) => {
        knex('users')
            .where({ 'id': id })
            .del()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

const auth = async (knex, body) => {
    
    return new Promise((resolve, reject) => {
        knex('users')
            .where('email', body.email)
            .first()
            .then(data => {
                
                if (data && bcrypt.compareSync(body.password, data.password)) {
                    resolve(data)
                } else {
                    reject('Usuário ou senha inválido')
                }

            })
            .catch(error => reject(error))
    })
}

module.exports = {
    findAll,
    findById,
    save,
    remove,
    auth
}
