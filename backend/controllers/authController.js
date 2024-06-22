const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// Login user
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Confirm data
	if (!email || !password) {
		return res.status(400).json({ message: 'Please fill in all fields' })
	}

	// Check if user exists
	const user = await User.findOne({ email }).exec()

	if (!user) {
		return res.status(401).json({ message: 'User does not exist' })
	}

	// Validate password
	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	// Create access token
	const accessToken = jwt.sign(
		{
			UserInfo: {
				id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '15m' }
	)

	// Create refresh token
	const refreshToken = jwt.sign(
		{ UserInfo: { id: user._id } },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	)

	// Set refresh token in cookie
	res.cookie('jwt', refreshToken, {
		httpOnly: true, // cookie cannot be accessed by client-side scripts (XSS protection)
		secure: true, // if true cookie will only be sent over HTTPS
		sameSite: 'None', // cookie will be sent on requests from other sites (CSRF protection)
		maxAge: 7 * 24 * 60 * 60 * 1000, // cookie will expire in 7 days
	})

	// Send access token to client
	res.json({ accessToken })
})

// Refresh token
const refresh = (req, res) => {
	const cookies = req.cookies

	if (!cookies?.jwt)
		return res.status(401).json({ message: 'User not authenticated' })

	const refreshToken = cookies.jwt

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		asyncHandler(async (err, decoded) => {
			if (err) return res.status(403).json({ message: 'Invalid token' })

			const user = await User.findById(decoded.UserInfo.id).exec()

			if (!user) return res.status(401).json({ message: 'User not found' })

			// Create new access token
			const accessToken = jwt.sign(
				{
					UserInfo: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			)

			res.json({ accessToken })
		})
	)
}

// Logout user
const logout = (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) // No content
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res.json({ message: 'Logged out' })
}

module.exports = { login, refresh, logout }
