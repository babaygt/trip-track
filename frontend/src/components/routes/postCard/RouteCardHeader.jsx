import { Link } from 'react-router-dom'

const RouteCardHeader = ({
	profilePicture,
	name,
	createdAt,
	creatorId,
	creatorUsername,
}) => {
	return (
		<div className='route-card-header'>
			<img
				src={profilePicture}
				alt='Profile'
				className='route-card-profile-picture'
			/>
			<div className='route-card-header-info'>
				<h3 className='route-card-title'>{name}</h3>
				<Link to={`/user/${creatorId}`}>
					<h3 className='route-card-username'>@{creatorUsername}</h3>
				</Link>
				<p className='route-card-subtitle'>
					{new Date(createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	)
}

export default RouteCardHeader
