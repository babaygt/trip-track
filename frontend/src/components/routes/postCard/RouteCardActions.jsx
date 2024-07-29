import { useState, useEffect } from 'react'
import {
	useLikeRouteMutation,
	useBookmarkRouteMutation,
	useUnbookmarkRouteMutation,
	useDeleteRouteMutation,
} from '../../../features/routes/routesApiSlice'
import { toast } from 'react-hot-toast'
import CustomModal from '../../CustomModal'

const RouteCardActions = ({
	routeId,
	initialLikes,
	isInitiallyLiked,
	isInitiallyBookmarked,
	commentBoxOpen,
	setCommentBoxOpen,
	currentUser,
	totalCommentsLength,
	creatorId,
}) => {
	const [likeRoute] = useLikeRouteMutation()
	const [bookmarkRoute] = useBookmarkRouteMutation()
	const [unbookmarkRoute] = useUnbookmarkRouteMutation()
	const [deleteRoute] = useDeleteRouteMutation()

	const [liked, setLiked] = useState(isInitiallyLiked)
	const [bookmarked, setBookmarked] = useState(isInitiallyBookmarked)
	const [likesCount, setLikesCount] = useState(initialLikes)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		setLiked(isInitiallyLiked)
		setLikesCount(initialLikes)
	}, [initialLikes, isInitiallyLiked])

	const handleLike = async () => {
		if (!currentUser) {
			toast.error('You must be logged in to like a route.')
			return
		}

		setLiked(!liked)
		setLikesCount(liked ? likesCount - 1 : likesCount + 1)

		try {
			await likeRoute({ routeId, like: !liked }).unwrap()
		} catch (error) {
			console.error('Failed to like/unlike the route:', error)
			setLiked(liked)
			setLikesCount(liked ? likesCount + 1 : likesCount - 1)
		}
	}

	const handleBookmark = async () => {
		if (!currentUser) {
			toast.error('You must be logged in to bookmark a route.')
			return
		}

		setBookmarked(!bookmarked)
		try {
			if (!bookmarked) {
				await bookmarkRoute({ routeId }).unwrap()
			} else {
				await unbookmarkRoute({ routeId }).unwrap()
			}
		} catch (error) {
			console.error('Failed to toggle bookmark:', error)
			setBookmarked(bookmarked)
		}
	}

	const handleCommentBox = () => {
		if (!currentUser) {
			toast.error('You must be logged in to comment on a route.')
			return
		}

		setCommentBoxOpen(!commentBoxOpen)
	}

	const handleDelete = async () => {
		try {
			await deleteRoute(routeId).unwrap()
			toast.success('Route deleted successfully.')
		} catch (error) {
			toast.error('Failed to delete the route.')
		} finally {
			setIsDeleteModalOpen(false)
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

			<div
				className={`route-card-actions-box  ${
					commentBoxOpen ? 'color-primary-700 ' : ''
				}`}
			>
				<span className={`route-card-actions-logo`} onClick={handleCommentBox}>
					<i className='fi fi-rr-comment-dots'></i>
				</span>

				<span className='route-card-actions-count'>{totalCommentsLength}</span>
			</div>

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

			{currentUser && currentUser._id === creatorId && (
				<span
					className='route-card-actions-logo route-card-actions-delete'
					onClick={() => setIsDeleteModalOpen(true)}
				>
					<i className='fi fi-rr-trash'></i>
				</span>
			)}

			<CustomModal
				isOpen={isDeleteModalOpen}
				onRequestClose={() => setIsDeleteModalOpen(false)}
				contentLabel='Are you sure you want to delete this route?'
				onConfirm={handleDelete}
			/>
		</div>
	)
}

export default RouteCardActions
