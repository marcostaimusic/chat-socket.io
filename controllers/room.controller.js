require('dotenv').config()
const { connect, connection } = require('mongoose')
const Mongoose = require('mongoose')
const Room = require('../models/Room')
const mongoUri = `${process.env.CONNECTIONURL}${process.env.DATABASE}`
const controllerDebugger = require('debug')('app:controller')

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function createRoom(req, res){
    const { name } = req.body
    await connect(mongoUri, config)

    try {
        const room = new Room({ _id: new Mongoose.Types.ObjectId(), name})
        await room.save()
        // const rooms = await Room.findOne().populate('messages')
        // const messages = rooms.messages
        connection.close()
        res.send({message:"Room created", room})
        return room
    } catch(err){
        connection.close()
        res.status(500).json(err)
    }
}

async function getRoom(req, res){
    const id = req.params.id
    await connect(mongoUri, config)

    try {
        const room = await Room.findById(id).populate('messages')
        const messages = room.messages
        connection.close()
        res.send({message:`Messages for ${room.name}:`, room, messages})
        return room
    } catch(err){
        connection.close()
        res.status(500).json(err)
    }


}

module.exports = {createRoom, getRoom}