const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { routers } = require('./routes')

const init = (knex) => {
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.use((req, res, next) =>{
        res.locals = {
            name: 'Cadmiel Jorge'
        }
        next()
    })

    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(...routers({ knex }))

    app.get('/', (req, res) => {
        res.render('home')
    })

    return app
}

module.exports = init