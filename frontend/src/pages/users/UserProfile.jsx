import { useParams, Link } from 'react-router-dom'
import {
	useGetUserProfileQuery,
	useGetUserRoutesQuery,
	useFollowUserMutation,
	useUnfollowUserMutation,
} from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import RoutePostCard from '../../components/routes/postCard/RoutePostCard'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, setUser } from '../../features/users/userSlice'

const UserProfile = () => {
	const { id } = useParams()
	const currentUser = useSelector(selectCurrentUser)
	const dispatch = useDispatch()

	const {
		data: user,
		isLoading: isLoadingUser,
		isError: isErrorUser,
		error: errorUser,
		refetch: refetchUser,
	} = useGetUserProfileQuery(id)
	const {
		data: routes,
		isLoading: isLoadingRoutes,
		isError: isErrorRoutes,
		error: errorRoutes,
	} = useGetUserRoutesQuery(id)

	const [followUser] = useFollowUserMutation()
	const [unfollowUser] = useUnfollowUserMutation()

	const handleFollow = async () => {
		try {
			const updatedUser = await followUser(id).unwrap()
			dispatch(setUser(updatedUser))
			refetchUser()
			toast.success('Followed successfully')
		} catch (err) {
			toast.error('Failed to follow user')
		}
	}

	const handleUnfollow = async () => {
		try {
			const updatedUser = await unfollowUser(id).unwrap()
			dispatch(setUser(updatedUser))
			refetchUser()
			toast.success('Unfollowed successfully')
		} catch (err) {
			toast.error('Failed to unfollow user')
		}
	}

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

	const isFollowing =
		currentUser && user.followers.includes(currentUser._id.toString())

	return (
		<div className='user-profile'>
			<Toaster position='top-center' reverseOrder={false} />
			{user && (
				<div className='user-profile-card'>
					<div className='user-profile-card-header'>
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
						<div className='user-profile-card-actions'>
							{currentUser && currentUser._id === user._id ? (
								<>
									<Link
										to='/edit-profile '
										className='button user-profile-button'
									>
										Edit Profile
									</Link>

									<Link
										to='/update-password'
										className='button user-profile-button-secondary'
									>
										Change Password
									</Link>
								</>
							) : (
								<button
									className={`button  ${
										isFollowing
											? 'user-profile-button-unfollow'
											: 'user-profile-button'
									}`}
									onClick={isFollowing ? handleUnfollow : handleFollow}
								>
									{isFollowing ? 'Unfollow' : 'Follow'}
								</button>
							)}
						</div>
					</div>

					<div className='user-stats'>
						<div className='user-stat'>
							<p className='user-stat-number'>{routes.length}</p>
							<p className='user-stat-label'>Routes</p>
						</div>

						<div className='user-stat'>
							<p className='user-stat-number'>{user.followers.length}</p>
							<Link to={`/user/${id}/followers`} className='user-stat-label'>
								<p>Followers</p>
							</Link>
						</div>

						<div className='user-stat'>
							<p className='user-stat-number'>{user.following.length}</p>
							<Link to={`/user/${id}/following`} className='user-stat-label'>
								<p>Following</p>
							</Link>
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
