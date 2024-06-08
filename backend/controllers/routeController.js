const User = require('../models/User')
const Route = require('../models/Route')
const asyncHandler = require('express-async-handler')

// Create a new route
const createRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Get a specific route
const getRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Update a route
const updateRoute = asyncHandler(async (req, res) => {
	// ...implementation
})

// Delete a route
const deleteRoute = asyncHandler(async (req, res) => {
	// ...implementation
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
