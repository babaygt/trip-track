const express = require('express')
const router = express.Router()
const { sendMessage, getMessages } = require('../controllers/messageController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/', verifyJWT, sendMessage)
router.get('/:conversationId', verifyJWT, getMessages)

module.exports = router
