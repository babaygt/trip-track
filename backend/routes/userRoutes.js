const express = require('express')
const router = express.Router()
const {
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
	getUserRoutes,
} = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/register', registerUser)
router.get('/profile/:id', getUserProfile) // Public
router.put('/profile', verifyJWT, updateUserProfile)
router.put('/follow/:id', verifyJWT, followUser)
router.put('/unfollow/:id', verifyJWT, unfollowUser)
router.get('/followers/:id', getFollowers) // Public
router.get('/following/:id', getFollowing) // Public
router.put('/bookmark/:routeId', verifyJWT, bookmarkRoute)
router.put('/unbookmark/:routeId', verifyJWT, unbookmarkRoute)
router.get('/bookmarks/:id', getBookmarks) // Public
router.put('/secure', verifyJWT, secureProfile)
router.get('/current', verifyJWT, getCurrentUser)
router.get('/:id/routes', getUserRoutes) // Public

module.exports = router
