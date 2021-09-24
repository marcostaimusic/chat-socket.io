require('dotenv').config()
const express = require('express')
var cors = require('cors');
const app = express()
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
const roomRoute = require('./routes/room')
const port = process.env.PORT

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute)
app.use('/', messageRoute)
app.use('/', roomRoute)






app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
