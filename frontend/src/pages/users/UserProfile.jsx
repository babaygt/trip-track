import { useParams } from 'react-router-dom'
import {
	useGetUserProfileQuery,
	useGetUserRoutesQuery,
} from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import RoutePostCard from '../../components/routes/postCard/RoutePostCard'

const UserProfile = () => {
	const { id } = useParams()
	const {
		data: user,
		isLoading: isLoadingUser,
		isError: isErrorUser,
		error: errorUser,
	} = useGetUserProfileQuery(id)
	const {
		data: routes,
		isLoading: isLoadingRoutes,
		isError: isErrorRoutes,
		error: errorRoutes,
	} = useGetUserRoutesQuery(id)

	if (isLoadingUser || isLoadingRoutes) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isErrorUser) {
		toast.error(errorUser?.data?.message || 'Failed to load user profile')
		return <p>Error loading user profile.</p>
	}

	if (isErrorRoutes) {
		toast.error(errorRoutes?.data?.message || 'Failed to load user routes')
		return <p>Error loading user routes.</p>
	}

	return (
		<div className='user-profile'>
			<Toaster position='top-center' reverseOrder={false} />
			{user && (
				<div className='user-profile-card'>
					<div className='user-info'>
						<img
							src={user.profilePicture}
							alt='Profile'
							className='user-profile-picture'
						/>
						<div>
							<h2 className='user-name'>{user.name}</h2>
							<p className='user-username'>@{user.username}</p>
						</div>
					</div>
					<div className='user-bio'>
						<p className='user-bio-text'>{user.bio} </p>
					</div>
				</div>
			)}
			{routes && routes.length > 0 ? (
				<div className='user-routes'>
					<h3 className='user-routes-username'>{user.name}&apos;s Routes</h3>
					{routes.map((route) => (
						<RoutePostCard key={route._id} route={route} />
					))}
				</div>
			) : (
				<p>No routes created by this user.</p>
			)}
		</div>
	)
}

export default UserProfile
