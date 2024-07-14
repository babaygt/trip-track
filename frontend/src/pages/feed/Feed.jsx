import { useState, useEffect } from 'react'
import { useGetRoutesQuery } from '../../features/routes/routesApiSlice'
import { Toaster, toast } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import RoutePostCard from '../../components/routes/postCard/RoutePostCard'

export const Feed = () => {
	const { data: routes, isLoading, isError, error } = useGetRoutesQuery()
	const [displayedRoutes, setDisplayedRoutes] = useState([])
	const [showLoadMore, setShowLoadMore] = useState(true)

	const loadMoreRoutes = () => {
		const newRoutes = routes.slice(
			displayedRoutes.length,
			displayedRoutes.length + 3
		)
		setDisplayedRoutes((prevRoutes) => [...prevRoutes, ...newRoutes])
		if (displayedRoutes.length + newRoutes.length >= routes.length) {
			setShowLoadMore(false)
		}
	}

	useEffect(() => {
		if (routes) {
			setDisplayedRoutes(routes.slice(0, 3)) // Load initial 3 routes
		}
	}, [routes])

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	if (isLoading) {
		return (
			<div className='center'>
				<ClipLoader color='#28af60' loading={isLoading} size={150} />
			</div>
		)
	}

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='feed-container'>
				{displayedRoutes.map((route) => (
					<RoutePostCard key={route._id} route={route} />
				))}
				{showLoadMore && (
					<button
						onClick={loadMoreRoutes}
						className='button button-primary center'
					>
						Load More
					</button>
				)}
			</div>
		</>
	)
}
