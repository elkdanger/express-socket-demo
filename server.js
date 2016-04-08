'use strict'

let express = require('express')
let app = express()
let http = require('http').Server(app)

let io = require('socket.io')(http)

app.use(express.static('public'))

http.listen(3000, () => console.log('Listening on port 3000'))

var users = 0;

io.on('connection', socket => {
    
    console.log('A user connected')
    
    socket.broadcast.emit('joined')
    
    users++
    
    io.emit('users changed', users)
    
    socket.on('msg', msg => {
        io.emit('msg', msg)
    })
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
      users--  
      io.emit('users changed', users)
      io.emit('user disconnected')
    })
    
})