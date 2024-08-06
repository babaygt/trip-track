import { Link } from 'react-router-dom'
import {
	useFollowUserMutation,
	useUnfollowUserMutation,
} from '../../features/users/usersApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, setUser } from '../../features/users/userSlice'
import { toast } from 'react-hot-toast'

const UserCard = ({ user }) => {
	const currentUser = useSelector(selectCurrentUser)
	const dispatch = useDispatch()
	const [followUser] = useFollowUserMutation()
	const [unfollowUser] = useUnfollowUserMutation()

	const isFollowing = currentUser && currentUser.following.includes(user._id)

	const handleFollow = async () => {
		try {
			const updatedUser = await followUser(user._id).unwrap()
			dispatch(setUser(updatedUser))
			toast.success('Followed successfully')
		} catch (err) {
			toast.error(err.data.message || 'Failed to follow user')
		}
	}

	const handleUnfollow = async () => {
		try {
			const updatedUser = await unfollowUser(user._id).unwrap()
			dispatch(setUser(updatedUser))
			toast.success('Unfollowed successfully')
		} catch (err) {
			toast.error(err.data.message || 'Failed to unfollow user')
		}
	}

	return (
		<div className='user-card'>
			<img
				src={user.profilePicture}
				alt={user.username}
				className='user-card-picture'
			/>
			<div className='user-card-info'>
				<Link to={`/user/${user._id}`} className='user-card-name'>
					{user.name}
				</Link>
				<p className='user-card-username'>@{user.username}</p>
			</div>
			<button
				className={`button ${
					isFollowing ? 'user-card-unfollow' : 'user-card-follow'
				}`}
				onClick={isFollowing ? handleUnfollow : handleFollow}
			>
				{isFollowing ? 'Unfollow' : 'Follow'}
			</button>
		</div>
	)
}

export default UserCard
