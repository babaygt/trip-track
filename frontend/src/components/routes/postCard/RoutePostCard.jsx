import RouteCardHeader from './RouteCardHeader'
import RouteCardDetails from './RouteCardDetails'
import RouteCardActions from './RouteCardActions'
import RouteCardDescription from './RouteCardDescription'
import RouteCardMap from './RouteCardMap'
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/users/userSlice'

const RoutePostCard = ({ route }) => {
	const { id: userId } = useAuth()
	const currentUser = useSelector(selectCurrentUser)

	// Ensuring currentUser is not null before accessing properties
	const isInitiallyLiked = currentUser && route.likes.includes(userId)
	const isInitiallyBookmarked =
		currentUser && currentUser.bookmarks.includes(route._id)

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
			/>
		</div>
	)
}

export default RoutePostCard
