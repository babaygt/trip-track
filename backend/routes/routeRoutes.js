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

router.post('/', createRoute)
router.get('/:id', getRoute)
router.put('/:id', updateRoute)
router.delete('/:id', deleteRoute)
router.put('/like/:id', likeRoute)
router.post('/comment/:id', commentOnRoute)
router.get('/followed', getFollowedRoutes)
router.get('/general', getGeneralRoutes)

module.exports = router
