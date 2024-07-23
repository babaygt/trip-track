import { useState, useEffect } from 'react'
import {
	useLikeRouteMutation,
	useBookmarkRouteMutation,
	useUnbookmarkRouteMutation,
} from '../../../features/routes/routesApiSlice'

const RouteCardActions = ({
	routeId,
	initialLikes,
	isInitiallyLiked,
	isInitiallyBookmarked,
}) => {
	const [likeRoute] = useLikeRouteMutation()
	const [bookmarkRoute] = useBookmarkRouteMutation()
	const [unbookmarkRoute] = useUnbookmarkRouteMutation()

	const [liked, setLiked] = useState(isInitiallyLiked)
	const [bookmarked, setBookmarked] = useState(isInitiallyBookmarked)
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

	const handleBookmark = async () => {
		setBookmarked(!bookmarked)
		try {
			if (!bookmarked) {
				await bookmarkRoute({ routeId }).unwrap()
			} else {
				await unbookmarkRoute({ routeId }).unwrap()
			}
		} catch (error) {
			console.error('Failed to toggle bookmark:', error)
			setBookmarked(bookmarked) // Revert if failed
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
					<i
						className={`fi ${
							liked ? 'fi-sr-thumbs-up' : 'fi-rr-social-network'
						} `}
						onClick={handleLike}
					></i>
				</span>
				<span className='route-card-actions-count'>{likesCount}</span>
			</div>

			<span className='route-card-actions-logo'>
				<i className='fi fi-rr-comment-dots'></i>
			</span>
			<span className='route-card-actions-logo'>
				<i className='fi fi-rr-share'></i>
			</span>

			<span
				className={`route-card-actions-logo ${
					bookmarked ? 'route-card-actions-box--bookmarked' : ''
				}`}
				onClick={handleBookmark}
			>
				<i
					className={`fi ${bookmarked ? 'fi-sr-bookmark' : 'fi-rr-bookmark'} `}
				></i>
			</span>
		</div>
	)
}

export default RouteCardActions
