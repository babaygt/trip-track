const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 1 minutes
	max: 5, // limit each IP to 5 requests per windowMs
	message: 'Too many login attempts. Please try again after a 1 minute pause.',
	handler: (req, res) => {
		res.status(429).json({
			message:
				'Too many login attempts. Please try again after a 1 minute pause.',
		})
	},
	standartHeaders: true, // This will include Retry-After header in the response to tell the client when they can try again
	legacyHeaders: false, // Disable X-RateLimit-* headers
})

module.exports = loginLimiter
