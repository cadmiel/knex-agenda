const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { user } = require('./router/user')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user',user())

app.get('/',(req, res) =>{
    name = 'cadmiel jorge'
    res.render('home',{name})
})

app.listen(3000, ()=>{
    console.log('rodando servidor')
})