import { useParams } from 'react-router-dom'
import {
	useGetUserProfileQuery,
	useGetFollowingQuery,
} from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import UserCard from '../../components/users/UserCard'

const FollowingPage = () => {
	const { id } = useParams()
	const { data: user, isLoading: isLoadingUser } = useGetUserProfileQuery(id)
	const {
		data: following,
		isLoading: isLoadingFollowing,
		isError,
		error,
	} = useGetFollowingQuery(id)

	if (isLoadingUser || isLoadingFollowing) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isError) {
		toast.error(error?.data?.message || 'Failed to load following')
		return <p>Error loading following.</p>
	}

	return (
		<div className='following-page'>
			<Toaster position='top-center' reverseOrder={false} />
			<h2>{user.username}&rsquo;s Following</h2>
			{following.length > 0 ? (
				following.map((user) => <UserCard key={user._id} user={user} />)
			) : (
				<p>No following found.</p>
			)}
		</div>
	)
}

export default FollowingPage
