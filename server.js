const path = require('path') // Path va prima di tutto altrimenti express.static() non trova l'indirizzo della cartella public
const http = require('http')
const express = require('express')
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)



//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when client connects
io.on('connection', (socket)=>{
    //console.log('New websocket connection')
    socket.emit('message', 'Welcome to the chat')  //Welcome current user

    //broadcast when a user connects, notifies anyone except the user that disconnects
    socket.broadcast.emit('message', 'A user has joined the chat')
    
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left the chat') //io.emit() emits to anyone
    })
    
    //listen to chat message
    socket.on('chatMessage', (msg) =>{
        io.emit('message', msg)
        //console.log(msg) loggin chat message on server console
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
} )




