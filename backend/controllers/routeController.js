const User = require('../models/User')
const Route = require('../models/Route')
const asyncHandler = require('express-async-handler')

// Create a new route
const createRoute = asyncHandler(async (req, res) => {
	const { startPoint, endPoint, waypoints, vehicleType, description } = req.body

	// Confirm data
	if (!startPoint || !endPoint || !waypoints || !vehicleType) {
		res.status(400).json({ message: 'Please fill in all required fields' })
	}

	const route = await Route.create({
		creator: req.body._id,
		startPoint,
		endPoint,
		waypoints,
		vehicleType,
		description,
	})

	if (route) {
		res.status(201).json({ message: 'Route created successfully' })
	} else {
		res.status(400).json({ message: 'Invalid route data' })
	}
})

// Get a specific route
const getRoute = asyncHandler(async (req, res) => {
	const route = await Route.findById(req.params.id)
		.populate('creator', 'name username')
		.lean()
		.exec()

	if (route) {
		res.status(200).json(route)
	} else {
		res.status(404).json({ message: 'Route not found' })
	}
})

// Update a route
const updateRoute = asyncHandler(async (req, res) => {
	const { startPoint, endPoint, waypoints, vehicleType, description } = req.body
	const route = await Route.findById(req.params.id)

	if (!route) {
		res.status(404).json({ message: 'Route not found' })
	}

	if (route.creator.toString() !== req.body._id.toString()) {
		res
			.status(401)
			.json({ message: 'You are not authorized to update this route' })
	}

	route.startPoint = startPoint || route.startPoint
	route.endPoint = endPoint || route.endPoint
	route.waypoints = waypoints || route.waypoints
	route.vehicleType = vehicleType || route.vehicleType
	route.description = description || route.description

	await route.save()

	res.status(200).json({ message: 'Route updated successfully' })
})

// Delete a route
const deleteRoute = asyncHandler(async (req, res) => {
	const route = await Route.findById(req.params.id)

	if (!route) {
		res.status(404).json({ message: 'Route not found' })
	}

	if (route.creator.toString() !== req.body._id.toString()) {
		res
			.status(401)
			.json({ message: 'You are not authorized to delete this route' })
	}

	await route.deleteOne()
	res.status(200).json({ message: 'Route deleted successfully' })
})

// Like a route
const likeRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Comment on a route
const commentOnRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get followed routes
const getFollowedRoutes = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get general routes
const getGeneralRoutes = asyncHandler(async (req, res) => {
	// ...implementation
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
}
