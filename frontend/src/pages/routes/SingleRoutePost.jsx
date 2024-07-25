import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetRouteQuery } from '../../features/routes/routesApiSlice'
import RoutePostCard from '../../components/routes/postCard/RoutePostCard'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const SingleRoutePost = () => {
	const { id } = useParams()
	const { data: route, isLoading, isError, error } = useGetRouteQuery(id)

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
			<div className='single-route-post'>
				{route ? (
					<RoutePostCard route={route} />
				) : (
					<h1 className='error-404-text'>
						No route found. Go back to{' '}
						<Link to='/' className='error-404-link'>
							Home Page
						</Link>
					</h1>
				)}
			</div>
		</>
	)
}

export default SingleRoutePost
