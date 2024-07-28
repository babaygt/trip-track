import { useParams } from 'react-router-dom'
import {
	useGetUserProfileQuery,
	useGetFollowersQuery,
} from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import UserCard from '../../components/users/UserCard'

const FollowersPage = () => {
	const { id } = useParams()
	const { data: user, isLoading: isLoadingUser } = useGetUserProfileQuery(id)
	const {
		data: followers,
		isLoading: isLoadingFollowers,
		isError,
		error,
	} = useGetFollowersQuery(id)

	if (isLoadingUser || isLoadingFollowers) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isError) {
		toast.error(error?.data?.message || 'Failed to load followers')
		return <p>Error loading followers.</p>
	}

	return (
		<div className='followers-page'>
			<Toaster position='top-center' reverseOrder={false} />
			<h2>{user.username}&apos;s Followers</h2>
			{followers.length > 0 ? (
				followers.map((user) => <UserCard key={user._id} user={user} />)
			) : (
				<p>No followers found.</p>
			)}
		</div>
	)
}

export default FollowersPage
