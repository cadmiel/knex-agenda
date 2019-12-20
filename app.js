const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const path = require('path')
const { routers } = require('./src/routes')
const methodOverride = require('method-override')
const session = require('express-session')
const sharedSession = require('express-socket.io-session')
const redis = require('socket.io-redis')
const { chatModel } = require('./src/schemas/chat')

io.adapter(redis(
    {
        host: process.env.REDIS_HOST,
        port:process.env.REDIS_PORT,
        requestsTimeout: process.env.REDIS_TIMEOUT,
        key: process.env.REDIS_KEY
    }))

//     io.of('/').adapter.clients((err, clients) => {
//         console.log(err,clients); // an array containing all connected socket ids
//       });

io.on('connection', socket => {
    // console.log('usuário conectado', socket.id)
    // console.log('sessão socket', socket.handshake.session)
    socket.on('sendMsg', data => {
        // console.log(msg)
        chat = new chatModel({
            user_name: data.user_name,
            message: data.message,
            room: data.roomSelected,
            created_at: data.created_at
        })
        chat.save()
        io.to(data.roomSelected).emit('listMSG', data)
    })

    socket.on('roomSelected', roomSelected => {
        socket.join(roomSelected)
        // console.log(socket.adapter.rooms)
    })

    socket.on('viewAllMsg', roomSelected => {

        chatModel.find({room:roomSelected}, function (err, chats) {
            io.to(roomSelected).emit('sendAllMsg', chats) 
          });

    
    })

})

const init = (knex) => {
    app.set('views', path.join(__dirname, 'src/views'))
    app.set('view engine', 'ejs')

    const expressSession = session(
        {
            secret: process.env.SESSION_SECRET,
            name: process.env.SESSION_NAME,
            saveUninitialized: true,
            cookie: { secure: false, maxAge: 10 * 60 * 1000 }
        }
    )

    app.use(expressSession)
    app.use(methodOverride('_method'))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: false }))
    io.use(sharedSession(expressSession, { autoSave: true }))

    app.use((req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user
        }
        //else {
        //     res.locals.user = {}
        // }
        next()
    })

    app.use(...routers(knex))

    app.get('/', (req, res) => {
        res.render('home')
    })

    return http
}

module.exports = init