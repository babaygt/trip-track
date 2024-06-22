const Message = require('../models/Message')
const Conversation = require('../models/Conversation')
const asyncHandler = require('express-async-handler')

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
	const { conversationId, content } = req.body
	const userId = req.user.id

	if (!conversationId || !content || !userId) {
		return res.status(400).json({
			message: 'Please provide a conversation id, content, and user id',
		})
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

	const receiver = conversation.participants.find(
		(participant) => participant.toString() !== userId.toString()
	)

	if (!receiver) {
		return res.status(400).json({ message: 'Receiver not found' })
	}

	const message = new Message({
		conversation: conversationId,
		sender: userId,
		receiver,
		content,
	})

	const createdMessage = await message.save()
	return res.status(201).json(createdMessage)
})

// Get messages for a conversation
const getMessages = asyncHandler(async (req, res) => {
	const { conversationId } = req.params
	const userId = req.user.id // Get userId from the verified token

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

	return res.json(messages)
})

module.exports = {
	sendMessage,
	getMessages,
}
