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

module.exports = {
    findAll,
    findById,
    save,
    remove
}
