import { useGetBookmarksQuery } from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import RoutePostCard from '../../components/routes/postCard/RoutePostCard'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/users/userSlice'

const BookmarksPage = () => {
	const currentUser = useSelector(selectCurrentUser)
	const { data: bookmarks, isLoading, isError, error } = useGetBookmarksQuery()

	console.log(bookmarks)

	if (isLoading) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isError) {
		toast.error(error?.data?.message || 'Failed to load bookmarks')
		return <p>Error loading bookmarks.</p>
	}

	return (
		<div className='bookmarks-page'>
			<Toaster position='top-center' reverseOrder={false} />
			<h2>{currentUser.username}&apos;s Bookmarks</h2>
			{bookmarks.length > 0 ? (
				bookmarks.map((route) => (
					<RoutePostCard key={route._id} route={route} />
				))
			) : (
				<p>No bookmarks found.</p>
			)}
		</div>
	)
}

export default BookmarksPage
