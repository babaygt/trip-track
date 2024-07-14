const RouteCardHeader = ({ profilePicture, name, createdAt }) => {
	return (
		<div className='route-card-header'>
			<img
				src={profilePicture}
				alt='Profile'
				className='route-card-profile-picture'
			/>
			<div>
				<h3 className='route-card-title'>{name}</h3>
				<p className='route-card-subtitle'>
					{new Date(createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	)
}

export default RouteCardHeader
