import RouteCardHeader from './RouteCardHeader'
import RouteCardDetails from './RouteCardDetails'
import RouteCardActions from './RouteCardActions'
import RouteCardDescription from './RouteCardDescription'
import RouteCardMap from './RouteCardMap'
import CommentSection from './CommentSection' // Import the CommentSection component
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/users/userSlice'
import { useState } from 'react'

const RoutePostCard = ({ route }) => {
	const currentUser = useSelector(selectCurrentUser)
	const userId = currentUser?._id

	// Ensuring currentUser is not null before accessing properties
	const isInitiallyLiked = currentUser && route.likes.includes(userId)
	const isInitiallyBookmarked =
		currentUser && currentUser.bookmarks.includes(route._id)

	const [commentBoxOpen, setCommentBoxOpen] = useState(false)

	return (
		<div className='route-card'>
			<RouteCardHeader
				profilePicture={route.creator.profilePicture}
				name={route.creator.name}
				createdAt={route.createdAt}
			/>
			<div className='route-card-map-main'>
				<RouteCardMap
					startPoint={route.startPoint}
					endPoint={route.endPoint}
					waypoints={route.waypoints}
				/>
				<RouteCardDetails
					totalDistance={route.totalDistance}
					totalTime={route.totalTime}
					vehicleType={route.vehicleType}
				/>
			</div>
			<RouteCardDescription description={route.description} />
			<RouteCardActions
				routeId={route._id}
				initialLikes={route.likes.length}
				isInitiallyLiked={isInitiallyLiked}
				isInitiallyBookmarked={isInitiallyBookmarked}
				commentBoxOpen={commentBoxOpen}
				setCommentBoxOpen={setCommentBoxOpen}
				currentUser={currentUser}
				totalCommentsLength={route.comments.length}
			/>
			<CommentSection routeId={route._id} commentBoxOpen={commentBoxOpen} />{' '}
		</div>
	)
}

export default RoutePostCard
