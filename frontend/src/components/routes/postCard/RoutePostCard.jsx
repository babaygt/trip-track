import RouteCardHeader from './RouteCardHeader'
import RouteCardDetails from './RouteCardDetails'
import RouteCardActions from './RouteCardActions'
import RouteCardDescription from './RouteCardDescription'
import RouteCardMap from './RouteCardMap'

const RoutePostCard = ({ route }) => {
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
			<RouteCardActions />
		</div>
	)
}

export default RoutePostCard
