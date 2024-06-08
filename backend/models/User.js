const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			default: '',
		},
		profilePicture: {
			type: String,
			default: '',
		},
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		secureProfile: {
			type: Boolean,
			default: false,
		},
		bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
		admin: {
			type: Boolean,
			default: false,
		},
		conversations: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', userSchema)
