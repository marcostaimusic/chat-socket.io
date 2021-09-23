const express = require('express')
const router = express.Router()
const writeMessage = require('../controllers/message.controller')

router.post('/message', writeMessage)

module.exports = router