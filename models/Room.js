const { Schema, model } = require('mongoose')
const Mongoose = require('mongoose')
const moment = require('moment')

const roomSchema = new Schema({
    _id : Mongoose.Types.ObjectId,
    name: {
        type: String,
        minlength: 2,
        maxlength: 50
    }
})

roomSchema.virtual('messages', {
    ref:'Message',
    localField: "name",
    foreignField: "room",
    justOne: false,
})

roomSchema.set('toObject', { virtuals: true });

const Room = model('Room', roomSchema)

module.exports = Room