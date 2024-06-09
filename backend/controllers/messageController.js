const Message = require('../models/Message')
const Conversation = require('../models/Conversation')
const asyncHandler = require('express-async-handler')

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
	const { conversationId, content, userId } = req.body

	if (!conversationId || !content || !userId) {
		res.status(400).json({
			message: 'Please provide a conversation id, content, and user id',
		})
		return
	}

	const conversation = await Conversation.findById(conversationId)

	if (!conversation) {
		res.status(404).json({ message: 'Conversation not found' })
		return
	}

	if (!conversation.participants.includes(userId)) {
		res
			.status(401)
			.json({ message: 'You are not a participant in this conversation' })
		return
	}

	const receiver = conversation.participants.find(
		(participant) => participant.toString() !== userId.toString()
	)

	if (!receiver) {
		res.status(400).json({ message: 'Receiver not found' })
		return
	}

	const message = new Message({
		conversation: conversationId,
		sender: userId,
		receiver,
		content,
	})

	const createdMessage = await message.save()
	res.status(201).json(createdMessage)
})

// Get messages for a conversation
const getMessages = asyncHandler(async (req, res) => {
	const { conversationId } = req.params
	const { userId } = req.query // Get userId from query parameters

	if (!userId) {
		return res.status(400).json({ message: 'User ID is required' })
	}

	const conversation = await Conversation.findById(conversationId)

	if (!conversation) {
		return res.status(404).json({ message: 'Conversation not found' })
	}

	if (!conversation.participants.includes(userId)) {
		return res
			.status(401)
			.json({ message: 'You are not a participant in this conversation' })
	}

	const messages = await Message.find({ conversation: conversationId })
		.populate('sender', 'name username profilePicture')
		.sort({ createdAt: -1 })

	res.json(messages)
})

module.exports = {
	sendMessage,
	getMessages,
}
