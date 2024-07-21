import { useState, useEffect } from 'react'
import { useLikeRouteMutation } from '../../../features/routes/routesApiSlice'

const RouteCardActions = ({ routeId, initialLikes, isInitiallyLiked }) => {
	const [likeRoute] = useLikeRouteMutation()
	const [liked, setLiked] = useState(isInitiallyLiked)
	const [likesCount, setLikesCount] = useState(initialLikes)

	useEffect(() => {
		setLiked(isInitiallyLiked)
		setLikesCount(initialLikes)
	}, [initialLikes, isInitiallyLiked])

	const handleLike = async () => {
		setLiked(!liked)
		setLikesCount(liked ? likesCount - 1 : likesCount + 1)

		try {
			await likeRoute({ routeId, like: !liked }).unwrap()
		} catch (error) {
			// Handle error, possibly revert the like state if it fails
			console.error('Failed to like/unlike the route:', error)
			setLiked(liked)
			setLikesCount(liked ? likesCount + 1 : likesCount - 1)
		}
	}

	return (
		<div className='route-card-actions'>
			<div
				className={`route-card-actions-box ${
					liked ? 'route-card-actions-box--liked' : ''
				}`}
			>
				<span className='route-card-actions-logo'>
					<i className='fi fi-rr-social-network' onClick={handleLike}></i>
				</span>
				<span className='route-card-actions-count'>{likesCount}</span>
			</div>

			<span className='route-card-actions-logo'>
				<i className='fi fi-rr-comment-dots'></i>
			</span>
			<span className='route-card-actions-logo'>
				<i className='fi fi-rr-share'></i>
			</span>

			<span className='route-card-actions-logo'>
				<i className='fi fi-rr-bookmark'></i>
			</span>
		</div>
	)
}

export default RouteCardActions
