import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	useCommentOnRouteMutation,
	useGetRouteQuery,
} from '../../../features/routes/routesApiSlice'
import { selectCurrentUser } from '../../../features/users/userSlice'
import { useGetUserProfileQuery } from '../../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { useLocation, Link } from 'react-router-dom'
import Textarea from '../../common/Textarea'

const CommentSection = ({ routeId, commentBoxOpen }) => {
	const [commentText, setCommentText] = useState('')
	const { data: route, refetch } = useGetRouteQuery(routeId, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})
	const [commentOnRoute, { isLoading, isError, error }] =
		useCommentOnRouteMutation()
	const currentUser = useSelector(selectCurrentUser)
	const location = useLocation()

	const handleCommentSubmit = async (e) => {
		e.preventDefault()
		try {
			await commentOnRoute({ routeId, text: commentText }).unwrap()
			setCommentText('')
			refetch()
		} catch (err) {
			console.error('Failed to add comment:', err)
		}
	}

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	const sortedComments = route?.comments
		.slice()
		.sort((a, b) => new Date(b.date) - new Date(a.date))

	return (
		<div className='comment-section'>
			<Toaster position='top-center' reverseOrder={false} />

			{commentBoxOpen ? (
				currentUser ? (
					<form onSubmit={handleCommentSubmit}>
						<Textarea
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							placeholder='Add a comment...'
							rows={3}
						/>
						<button
							className='button comment-section-button'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <ClipLoader color='#fff' size={20} /> : 'Submit'}
						</button>
					</form>
				) : (
					<p>You must be logged in to comment.</p>
				)
			) : null}

			<ul>
				{location.pathname === '/' && sortedComments?.length ? (
					<>
						{sortedComments.slice(0, 3).map((comment) => (
							<CommentItem key={comment._id} comment={comment} />
						))}

						{sortedComments.length > 3 && (
							<Link to={`/route/${routeId}`} className='comment-section-text'>
								View all {sortedComments.length} comments
							</Link>
						)}
					</>
				) : // If location is /route/:id show all comments
				location.pathname === `/route/${routeId}` ? (
					sortedComments.map((comment) => (
						<CommentItem key={comment._id} comment={comment} />
					))
				) : null}
			</ul>
		</div>
	)
}

const CommentItem = ({ comment }) => {
	const { data: user } = useGetUserProfileQuery(comment.user)

	return (
		<li>
			<div className='comment-card'>
				<img
					src={user?.profilePicture}
					alt='Profile'
					className='comment-card-user-picture'
				/>
				<div>
					<div className='comment-card-header'>
						<p className='comment-card-username'>{user?.username}</p>
						<p className='comment-card-date'>
							{new Date(comment.date).toLocaleString()}
						</p>
					</div>
					<p className='comment-card-text'>{comment.text}</p>
				</div>
			</div>
		</li>
	)
}

export default CommentSection
