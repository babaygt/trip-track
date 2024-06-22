const express = require('express')
const {
	createConversation,
	getConversations,
} = require('../controllers/conversationController')
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()

router.post('/', verifyJWT, createConversation)
router.get('/:userId', verifyJWT, getConversations)

module.exports = router
