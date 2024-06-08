const User = require('../models/User')
const Route = require('../models/Route')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
	const { name, username, email, password } = req.body

	// Confirm data
	if (!name || !username || !email || !password) {
		res.status(400).json({ message: 'Please fill in all fields' })
	}

	// Check for duplicate username
	const duplicateUsername = await User.findOne({ username }).lean().exec()

	if (duplicateUsername) {
		res.status(400).json({ message: 'Username already exists' })
	}

	// Check for duplicate email
	const duplicateEmail = await User.findOne({ email }).lean().exec()

	if (duplicateEmail) {
		res.status(400).json({ message: 'Email already exists' })
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10) // 10 is the salt

	const user = await User.create({
		name,
		username,
		email,
		password: hashedPassword,
	})

	if (user) {
		res.status(201).json({
			message: ` User ${user.username} created successfully`,
		})
	} else {
		res.status(400).json({ message: 'Invalid user data' })
	}
})

// Login user
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Confirm data
	if (!email || !password) {
		res.status(400).json({ message: 'Please fill in all fields' })
	}

	// Check if user exists
	const user = await User.findOne({ email }).lean().exec()

	if (user) {
		// Check if password is correct
		if (await bcrypt.compare(password, user.password)) {
			res.status(200).json({ message: `Welcome back, ${user.username}` })
		} else {
			res.status(401).json({ message: 'Invalid email or password' })
		}
	} else {
		res.status(401).json({ message: 'Invalid email or password' })
	}
})

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
		.select('-password')
		.lean()
		.exec()

	if (user) {
		res.status(200).json(user)
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body._id)

	if (user) {
		user.name = req.body.name || user.name
		user.username = req.body.username || user.username
		user.email = req.body.email || user.email
		user.bio = req.body.bio || user.bio
		user.profilePicture = req.body.profilePicture || user.profilePicture

		// Check for duplicate username

		const duplicateUsername = await User.findOne({ username: user.username })
			.lean()
			.exec()

		// Check for duplicate email
		const duplicateEmail = await User.findOne({ email: user.email })
			.lean()
			.exec()

		// Allow updates to the original user
		if (
			duplicateUsername &&
			duplicateUsername._id.toString() !== user._id.toString()
		) {
			res.status(400).json({ message: 'Username already exists' })
		}

		if (
			duplicateEmail &&
			duplicateEmail._id.toString() !== user._id.toString()
		) {
			res.status(400).json({ message: 'Email already exists' })
		}

		if (req.body.password) {
			user.password = await bcrypt.hash(req.body.password, 10)
		}

		const updatedUser = await user.save()

		res
			.status(200)
			.json({ message: `User ${updatedUser.username} updated successfully` })
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})

// Follow user
const followUser = asyncHandler(async (req, res) => {
	// ...implementation
})

// Unfollow user
const unfollowUser = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get followers
const getFollowers = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get following
const getFollowing = asyncHandler(async (req, res) => {
	// ...implementation
})

// Bookmark route
const bookmarkRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Unbookmark route
const unbookmarkRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get bookmarks
const getBookmarks = asyncHandler(async (req, res) => {
	// ...implementation
})

// Secure profile
const secureProfile = asyncHandler(async (req, res) => {
	// ...implementation
})

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
	followUser,
	unfollowUser,
	getFollowers,
	getFollowing,
	bookmarkRoute,
	unbookmarkRoute,
	getBookmarks,
	secureProfile,
}
