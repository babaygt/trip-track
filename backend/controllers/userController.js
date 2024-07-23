const User = require('../models/User')
const Route = require('../models/Route')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
	const { name, username, email, password } = req.body

	// Confirm data
	if (!name || !username || !email || !password) {
		return res.status(400).json({ message: 'Please fill in all fields' })
	}

	// Check for duplicate username
	const duplicateUsername = await User.findOne({ username }).lean().exec()
	if (duplicateUsername) {
		return res.status(400).json({ message: 'Username already exists' })
	}

	// Check for duplicate email
	const duplicateEmail = await User.findOne({ email }).lean().exec()
	if (duplicateEmail) {
		return res.status(400).json({ message: 'Email already exists' })
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
		return res.status(201).json({
			message: `User ${user.username} created successfully`,
		})
	} else {
		return res.status(400).json({ message: 'Invalid user data' })
	}
})

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
		.select('-password')
		.lean()
		.exec()

	if (user) {
		return res.status(200).json(user)
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

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
			return res.status(400).json({ message: 'Username already exists' })
		}

		if (
			duplicateEmail &&
			duplicateEmail._id.toString() !== user._id.toString()
		) {
			return res.status(400).json({ message: 'Email already exists' })
		}

		if (req.body.password) {
			user.password = await bcrypt.hash(req.body.password, 10)
		}

		const updatedUser = await user.save()

		return res
			.status(200)
			.json({ message: `User ${updatedUser.username} updated successfully` })
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

// Follow user
const followUser = asyncHandler(async (req, res) => {
	const currentUser = await User.findById(req.user.id)
	const userToFollow = await User.findById(req.params.id)

	if (!userToFollow) {
		return res.status(404).json({ message: 'User not found' })
	}

	if (userToFollow._id.toString() === currentUser._id.toString()) {
		return res.status(400).json({ message: 'You cannot follow yourself' })
	}

	if (
		currentUser.following.includes(userToFollow._id) &&
		userToFollow.followers.includes(currentUser._id)
	) {
		return res
			.status(400)
			.json({ message: 'You are already following this user' })
	} else {
		currentUser.following.push(userToFollow._id)
		userToFollow.followers.push(currentUser._id)

		await currentUser.save()
		await userToFollow.save()

		return res.status(200).json({
			message: `You are now following ${userToFollow.username}`,
		})
	}
})

// Unfollow user
const unfollowUser = asyncHandler(async (req, res) => {
	const currentUser = await User.findById(req.user.id)
	const userToUnfollow = await User.findById(req.params.id)

	if (!userToUnfollow) {
		return res.status(404).json({ message: 'User not found' })
	}

	if (userToUnfollow._id.toString() === currentUser._id.toString()) {
		return res.status(400).json({ message: 'You cannot unfollow yourself' })
	}

	if (
		!currentUser.following.includes(userToUnfollow._id) &&
		!userToUnfollow.followers.includes(currentUser._id)
	) {
		return res.status(400).json({ message: 'You are not following this user' })
	} else {
		currentUser.following = currentUser.following.filter(
			(id) => id.toString() !== userToUnfollow._id.toString()
		)

		userToUnfollow.followers = userToUnfollow.followers.filter(
			(id) => id.toString() !== currentUser._id.toString()
		)

		await currentUser.save()
		await userToUnfollow.save()

		return res.status(200).json({
			message: `You have unfollowed ${userToUnfollow.username}`,
		})
	}
})

// Get followers
const getFollowers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
		.populate('followers', 'name username profilePicture')
		.lean()
		.exec()

	if (user) {
		return res.status(200).json(user.followers)
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

// Get following
const getFollowing = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
		.populate('following', 'name username profilePicture')
		.lean()
		.exec()

	if (user) {
		return res.status(200).json(user.following)
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

// Bookmark route
const bookmarkRoute = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
	const route = await Route.findById(req.params.routeId)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	if (user.bookmarks.includes(route._id)) {
		return res.status(400).json({ message: 'Route already bookmarked' })
	} else {
		user.bookmarks.push(route._id)

		await user.save()

		return res.status(200).json({
			message: `Route bookmarked successfully`,
		})
	}
})

// Unbookmark route
const unbookmarkRoute = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
	const route = await Route.findById(req.params.routeId)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	if (!user.bookmarks.includes(route._id)) {
		return res.status(400).json({ message: 'Route not bookmarked' })
	} else {
		user.bookmarks = user.bookmarks.filter(
			(id) => id.toString() !== route._id.toString()
		)

		await user.save()

		return res.status(200).json({
			message: `Route unbookmarked successfully`,
		})
	}
})

// Get bookmarks
const getBookmarks = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).populate('bookmarks')

	if (user) {
		return res.status(200).json(user.bookmarks)
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

// Secure profile
const secureProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (user) {
		user.secureProfile = !user.secureProfile

		await user.save()

		return res.status(200).json({
			message: `Profile is now ${user.secureProfile ? 'private' : 'public'}`,
		})
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

const getCurrentUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
		.select('-password')
		.lean()
		.exec() // Select all fields except password

	if (user) {
		return res.status(200).json(user)
	} else {
		return res.status(404).json({ message: 'User not found' })
	}
})

module.exports = {
	registerUser,
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
	getCurrentUser,
}
