
const room = async ({ knex }, req, res) => {
    res.render('chat')
}

module.exports = {
    room
}