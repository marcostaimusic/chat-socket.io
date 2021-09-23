require('dotenv').config()
const { connect, connection} = require('mongoose')
const mongoose = require('mongoose') 
const User = require('../models/user')
const mongoUri = `${process.env.CONNECTIONURL}${process.env.DATABASE}`
const controllerDebugger = require('debug')('app:controllers')


const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


async function createUser(req, res){
    const { username } = req.body
    await connect(mongoUri, config)
    controllerDebugger(username)
   
    try {
        const user = new User({ _id: new mongoose.Types.ObjectId(), username})
        controllerDebugger(user)
        await user.save()
        connection.close()
        res.send({message: "User created", user})
        return user
    } catch (err) {
        connection.close()
        return res.status(500).json(err)
    }
}


module.exports = createUser