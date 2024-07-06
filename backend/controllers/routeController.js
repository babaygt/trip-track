const User = require('../models/User')
const Route = require('../models/Route')
const asyncHandler = require('express-async-handler')
const axios = require('axios')

// Create a new route
const createRoute = asyncHandler(async (req, res) => {
	const {
		startPoint,
		endPoint,
		waypoints,
		vehicleType,
		description,
		totalDistance,
		totalTime,
	} = req.body

	// Confirm data
	if (
		!startPoint ||
		!endPoint ||
		!waypoints ||
		!vehicleType ||
		totalDistance == null ||
		totalTime == null
	) {
		return res
			.status(400)
			.json({ message: 'Please fill in all required fields' })
	}

	const route = await Route.create({
		creator: req.user.id,
		startPoint,
		endPoint,
		waypoints,
		vehicleType,
		description,
		totalDistance,
		totalTime,
	})

	if (route) {
		return res.status(201).json({ message: 'Route created successfully' })
	} else {
		return res.status(400).json({ message: 'Invalid route data' })
	}
})

// Get a specific route
const getRoute = asyncHandler(async (req, res) => {
	const route = await Route.findById(req.params.id)
		.populate('creator', 'name username')
		.lean()
		.exec()

	if (route) {
		return res.status(200).json(route)
	} else {
		return res.status(404).json({ message: 'Route not found' })
	}
})

// Update a route
const updateRoute = asyncHandler(async (req, res) => {
	const { startPoint, endPoint, waypoints, vehicleType, description } = req.body
	const route = await Route.findById(req.params.id)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	if (route.creator.toString() !== req.user.id.toString()) {
		return res
			.status(401)
			.json({ message: 'You are not authorized to update this route' })
	}

	route.startPoint = startPoint || route.startPoint
	route.endPoint = endPoint || route.endPoint
	route.waypoints = waypoints || route.waypoints
	route.vehicleType = vehicleType || route.vehicleType
	route.description = description || route.description

	await route.save()

	return res.status(200).json({ message: 'Route updated successfully' })
})

// Delete a route
const deleteRoute = asyncHandler(async (req, res) => {
	const route = await Route.findById(req.params.id)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	if (route.creator.toString() !== req.user.id.toString()) {
		return res
			.status(401)
			.json({ message: 'You are not authorized to delete this route' })
	}

	await route.deleteOne()
	return res.status(200).json({ message: 'Route deleted successfully' })
})

// Like a route
const likeRoute = asyncHandler(async (req, res) => {
	const route = await Route.findById(req.params.id)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	const userId = req.user.id
	const isLiked = route.likes.includes(userId)

	if (isLiked) {
		route.likes = route.likes.filter(
			(like) => like.toString() !== userId.toString()
		)
	} else {
		route.likes.push(userId)
	}

	await route.save()
	return res.status(200).json({
		message: isLiked
			? 'Route unliked successfully'
			: 'Route liked successfully',
	})
})

// Comment on a route
const commentOnRoute = asyncHandler(async (req, res) => {
	const { text } = req.body
	const route = await Route.findById(req.params.id)

	if (!route) {
		return res.status(404).json({ message: 'Route not found' })
	}

	const comment = {
		user: req.user.id,
		text,
	}

	route.comments.push(comment)
	await route.save()
	return res.status(201).json({ message: 'Comment added successfully' })
})

// Get followed routes
const getFollowedRoutes = asyncHandler(async (req, res) => {
	const userId = req.params.userId
	const user = await User.findById(userId).populate('following', 'username')

	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	const routes = await Route.find({
		creator: { $in: user.following },
	}).populate('creator', 'name username profilePicture')

	return res.json(routes)
})

// Get general routes
const getGeneralRoutes = asyncHandler(async (req, res) => {
	const routes = await Route.find({})
		.sort({ likes: -1 })
		.populate('creator', 'name username profilePicture')
	return res.json(routes)
})

// Get suggestions for places
const getSuggestions = asyncHandler(async (req, res) => {
	const { q } = req.query

	if (!q) {
		return res.status(400).json({ message: 'Query parameter is required' })
	}

	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/search?format=json&q=${q}`
		)
		return res.status(200).json(response.data)
	} catch (error) {
		return res.status(500).json({ message: 'Error fetching suggestions' })
	}
})

module.exports = {
	createRoute,
	getRoute,
	updateRoute,
	deleteRoute,
	likeRoute,
	commentOnRoute,
	getFollowedRoutes,
	getGeneralRoutes,
	getSuggestions,
}
