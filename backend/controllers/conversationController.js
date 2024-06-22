const Conversation = require('../models/Conversation')
const asyncHandler = require('express-async-handler')

// Create a new conversation
const createConversation = asyncHandler(async (req, res) => {
	const { participantId } = req.body
	const userId = req.user.id

	if (!participantId) {
		return res.status(400).json({ message: 'Please provide a participant id' })
	}

	const existingConversation = await Conversation.findOne({
		participants: { $all: [participantId, userId] },
	})

	if (existingConversation) {
		return res.json(existingConversation)
	} else {
		const conversation = new Conversation({
			participants: [userId, participantId],
		})

		const createdConversation = await conversation.save()
		return res.status(201).json(createdConversation)
	}
})

// Get all conversations for a user
const getConversations = asyncHandler(async (req, res) => {
	const userId = req.user.id

	const conversations = await Conversation.find({
		participants: userId,
	}).populate('participants', 'name username profilePicture')

	return res.json(conversations)
})

module.exports = {
	createConversation,
	getConversations,
}
