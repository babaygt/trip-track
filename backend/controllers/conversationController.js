const Conversation = require('../models/Conversation')
const asyncHandler = require('express-async-handler')

// Create a new conversation
const createConversation = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get all conversations for a user
const getConversations = asyncHandler(async (req, res) => {
	// ...implementation
})

module.exports = {
	createConversation,
	getConversations,
}
