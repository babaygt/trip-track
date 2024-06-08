const Message = require('../models/Message')
const asyncHandler = require('express-async-handler')

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get messages for a conversation
const getMessages = asyncHandler(async (req, res) => {
	// ...implementation
})

module.exports = {
	sendMessage,
	getMessages,
}
