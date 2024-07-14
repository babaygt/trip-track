import { formatDistance, formatTime } from '../../../utils/formatters'

const RouteCardDetails = ({ totalDistance, totalTime, vehicleType }) => {
	const distance = formatDistance(totalDistance)
	const time = formatTime(totalTime)

	return (
		<div className='route-card-details'>
			<div className='route-card-details-box'>
				<p className='route-card-details-key'>Distance</p>
				<p className='route-card-details-value'>{distance}</p>
			</div>
			<div className='route-card-details-box'>
				<p className='route-card-details-key'>Time</p>
				<p className='route-card-details-value'>{time}</p>
			</div>
			<div className='route-card-details-box'>
				<p className='route-card-details-key'>Vehicle Type</p>
				<p className='route-card-details-value'>{vehicleType}</p>
			</div>
		</div>
	)
}

export default RouteCardDetails
