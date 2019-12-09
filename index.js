const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { user } = require('./router/user')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT | 3000

const knex = require('knex')({
    client: process.env.DB_CONNECTION,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  })

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user',user({ knex }))

app.get('/',(req, res) =>{
    name = 'cadmiel jorge'
    res.render('home',{name})
})

app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})