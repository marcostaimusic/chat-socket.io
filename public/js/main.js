// IF IT DOES NOT WORK IT IS BECAUSE THE STATIC INDEX.HTML MUST NOT BE LAUNCHED BY VISUAL STUDIO'S LIVE SERVER, 
// BUT TYPING LOCALHOST:${PORT} ON THE BROWSER'S URL STRING FIELD

const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages") // for the scroll behaviour
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

//get username and room from url using qs in the chat.html body script
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix : true
})

// console.log(username, room) //logging on the front the username and the room selected from the url

const socket = io()

//join chatroom
socket.emit('joinRoom', {username, room})


//get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room)
    outputUsers(users)
})


//message from server
socket.on('message', (message) => {
    console.log(message) //console.log the message object on the front end
    outputMessage(message)

    //scroll down behaviour
    chatMessages.scrollTop = chatMessages.scrollHeight
    
})


//message submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault() //when you submit a form, submits to a file by default. e.preventDefault() to prevent this behaviour

    const msg = e.target.elements.msg.value //to access to the elements with id="msg" in the html event target which is chat-form
    //console.log(msg) //logging on the client side

    // Emit message to the server
    socket.emit('chatMessage', msg)

    //clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus() //refocus on the message input field
})


function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message') //adding a class name
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                     <p class="text">${message.text}</p>`
    document.querySelector('.chat-messages').appendChild(div) //chat-messages is the chat messages div container
}

//add room name to DOM
function outputRoomName(room){
    roomName.innerText = room
}

function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')} 
    ` //se non metto le '' in join vengono fuori delle virgole come spaziatori...
}


module.exports = outputMessage