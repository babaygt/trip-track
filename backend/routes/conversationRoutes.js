const express = require('express')
const {
	createConversation,
	getConversations,
} = require('../controllers/conversationController')
const router = express.Router()

router.post('/', createConversation)
router.get('/:userId', getConversations)

module.exports = router
