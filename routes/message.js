const express = require('express')
const router = express.Router()
const writeMessage = require('../controllers/message.controller')

router.post('/users/:id/messages', writeMessage)

module.exports = router