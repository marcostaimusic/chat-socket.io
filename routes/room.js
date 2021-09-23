const express = require('express')
const router = express.Router()
const {createRoom, getRoom} = require('../controllers/room.controller')

router.post('/rooms', createRoom)
router.get('/rooms/:id/', getRoom)

module.exports = router