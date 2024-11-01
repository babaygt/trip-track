const mongoose = require('mongoose')

const dbConnect = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || 'mongodb://mongodb/trip-track'
		)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

module.exports = dbConnect
