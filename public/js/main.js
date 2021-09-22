// IF IT DOES NOT WORK IT IS BECAUSE THE STATIC INDEX.HTML MUST NOT BE LAUNCHED BY VISUAL STUDIO'S LIVE SERVER, 
// BUT TYPING LOCALHOST:${PORT} ON THE BROWSER'S URL STRING FIELD

const chatForm = document.getElementById("chat-form")

const socket = io()

//message from server
socket.on('message', (message) => {
    console.log(message)
    outputMessage(message)
})


//message submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault() //when you submit a form, submits to a file by default. e.preventDefault() to prevent this behaviour

    const msg = e.target.elements.msg.value //to access to the elements with id="msg" in the html event target which is chat-form
    //console.log(msg) //logging on the client side

    // Emit message to the server
    socket.emit('chatMessage', msg)
})


function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message') //adding a class name
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
                     <p class="text">${message}</p>`
    document.querySelector('.chat-messages').appendChild(div) //chat-messages is the chat messages div container
}