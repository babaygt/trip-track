const express = require('express')
const router = express.Router()
const {
	createRoute,
	getRoute,
	updateRoute,
	deleteRoute,
	likeRoute,
	commentOnRoute,
	getFollowedRoutes,
	getGeneralRoutes,
} = require('../controllers/routeController')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', getGeneralRoutes) // Public
router.post('/', verifyJWT, createRoute)
router.get('/:id', getRoute) // Public
router.put('/:id', verifyJWT, updateRoute)
router.delete('/:id', verifyJWT, deleteRoute)
router.put('/like/:id', verifyJWT, likeRoute)
router.post('/comment/:id', verifyJWT, commentOnRoute)
router.get('/followed/:userId', verifyJWT, getFollowedRoutes)

module.exports = router
