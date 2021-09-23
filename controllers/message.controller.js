require('dotenv').config()
const { connect, connection } = require('mongoose')
const mongoose = require('mongoose')
const Message = require('../models/Message')
const mongoUri = `${process.env.CONNECTIONURL}${process.env.DATABASE}`
const controllerDebugger = require('debug')('app:controllers')

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

 
async function writeMessage(req, res){
    const id = req.params.id
    const { text, room } = req.body
    await connect(mongoUri, config)
    try {
        const message = new Message ({_id: new mongoose.Types.ObjectId(),
                user: id,
                text,
                room
            })
        controllerDebugger(message)
        await message.save()
        connection.close()
        res.send({message: "Message sent", message})
        return message
    } catch (err) {
        connection.close()
        return res.status(500).json(err)
    }
}

module.exports = writeMessage