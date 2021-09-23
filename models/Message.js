const { Schema, model } = require('mongoose')
const Mongoose = require('mongoose')



const messageSchema = new Schema({
    _id: Mongoose.Types.ObjectId,
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        maxlength: 300,
        required: true
    },
    room: {
        type: String,
        minlength:3,
        maxlenght: 50,
        required: true
    },
    // time: {
    //     type: Date,
    //     default: new Date()
    // },
     
},{
    timestamps: true
})

messageSchema.set('toJSON', {
    transform: (doc, message) =>{
        message.id = message._id,
        delete message._id
        delete message.__v
    }
})

const Message = model('Message', messageSchema)

module.exports = Message