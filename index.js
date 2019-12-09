
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT | 3000

const knex = require('knex')({
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
})

const app = require('./app')(knex)

knex.on('query', (query) => {
  console.log(query.sql)
})

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`)
})