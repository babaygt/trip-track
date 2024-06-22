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
} = require('../controllers/userController')

router.post('/register', registerUser)
router.get('/profile/:id', getUserProfile)
router.put('/profile', updateUserProfile)
router.put('/follow/:id', followUser)
router.put('/unfollow/:id', unfollowUser)
router.get('/followers/:id', getFollowers)
router.get('/following/:id', getFollowing)
router.put('/bookmark/:routeId', bookmarkRoute)
router.put('/unbookmark/:routeId', unbookmarkRoute)
router.get('/bookmarks', getBookmarks)
router.put('/secure', secureProfile)

module.exports = router
