const Conversation = require('../models/Conversation')
const asyncHandler = require('express-async-handler')

// Create a new conversation
const createConversation = asyncHandler(async (req, res) => {
	const { participantId, userId } = req.body

	if (!participantId) {
		res.status(400).json({ message: 'Please provide a participant id' })
	}

	const existingConversation = await Conversation.findOne({
		participants: { $all: [participantId, userId] },
	})

	if (existingConversation) {
		res.json(existingConversation)
	} else {
		const conversation = new Conversation({
			participants: [userId, participantId],
		})

		const createdConversation = await conversation.save()
		res.status(201).json(createdConversation)
	}
})

// Get all conversations for a user
const getConversations = asyncHandler(async (req, res) => {
	const userId = req.params.userId

	const conversations = await Conversation.find({
		participants: userId,
	}).populate('participants', 'name username profilePicture')

	res.json(conversations)
})

module.exports = {
	createConversation,
	getConversations,
}
