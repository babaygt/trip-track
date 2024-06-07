const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
	lat: { type: Number, required: true },
	lng: { type: Number, required: true },
})

const routeSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		startPoint: { type: pointSchema, required: true },
		endPoint: { type: pointSchema, required: true },
		waypoints: [pointSchema],
		vehicleType: { type: String, required: true },
		descriptiom: { type: String, required: true },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		comments: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				text: { type: String, required: true },
				date: { type: Date, default: Date.now },
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Route', routeSchema)
