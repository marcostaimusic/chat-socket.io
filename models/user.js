const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    username: {
        type: String,
        minlength: 3,
        maxlength: 255,
        default: 'Tizio',
        required: true
    },
  },
{
    timestamps: true // sostituisce   // createdAt : { type: Date, default: new Date()
})

userSchema.set('toJSON', {
    transform: (doc, user) => {
        user.id = user._id
        delete user._id,
        delete user.__v
    }
})

const User = model('User', userSchema)

module.exports = User