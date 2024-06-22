const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization

	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'User not authenticated' })
	}

	const token = authHeader.split(' ')[1]

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ message: 'Invalid token' })
		req.user = decoded.UserInfo // Add user object to request object
		next()
	})
}

module.exports = verifyJWT
