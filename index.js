
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { logModel } = require('./src/schemas/log')
mongoose.Promise = global.Promise
const port = process.env.PORT | 3000
const mongodb = process.env.MONGO_DB || 'mongodb://localhost:27017/knex'
dotenv.config()

const knex = require('knex')({
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
})

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {

    const app = require('./app')({ knex, logModel })

    knex.on('query', (query) => {
      console.log(query.sql)
    })

    app.listen(port, () => {
      console.log(`servidor rodando na porta ${port}`)
    })
  }).catch((error) => {
    console.log('Erro', error)
  })

