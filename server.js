require('dotenv').config()
const path = require('path') // Path va prima di tutto altrimenti express.static() non trova l'indirizzo della cartella public
const http = require('http')
const express = require('express')
const socketio = require("socket.io")
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)



//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when client connects
io.on('connection', (socket)=>{
    //console.log('New websocket connection')
    
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit('message', formatMessage('ChatBot', `Welcome to the chat ${user.username}`))  //Welcome current user

        //broadcast when a user connects, notifies anyone except the user that disconnects
        socket.broadcast
        .to(user.room) //only to the room of the user
        .emit('message', formatMessage('ChatBot', `${user.username} has joined the chat`))

        //send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })
    
    //listen to chat message    
    socket.on('chatMessage', (msg) =>{
        const user = getCurrentUser(socket.id)

        //emit the messages on to the room of the user
        io
        .to(user.room)
        .emit('message', formatMessage(user.username, msg))
        //console.log(msg) loggin chat message on server console
    })

    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id)

        if(user){
            io
            .to(user.room)
            .emit('message', formatMessage('ChatBot', `${user.username} has left the chat`)) //io.emit() emits to anyone

            //send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
        
    })

})

const PORT = process.env.PORT

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
} )




