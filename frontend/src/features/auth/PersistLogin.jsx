import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'

const PersistLogin = () => {
	const [persist] = usePersist()
	const token = useSelector(selectCurrentToken)
	const effectRan = useRef(false)
	const navigate = useNavigate()

	const [trueSuccess, setTrueSuccess] = useState(false)

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation()

	useEffect(() => {
		if (
			effectRan.current === true ||
			import.meta.env.NODE_ENV !== 'development'
		) {
			const verifyRefreshToken = async () => {
				try {
					await refresh()
					setTrueSuccess(true)
				} catch (err) {
					console.error(err)
				}
			}

			if (!token && persist) verifyRefreshToken()
		}

		return () => (effectRan.current = true)
	}, [token, persist, refresh])

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
			navigate('/auth/login')
		}
	}, [isError, error, navigate])

	let content
	if (!persist) {
		content = <Outlet />
	} else if (isLoading) {
		content = <ClipLoader color='#28af60' />
	} else if (isSuccess && trueSuccess) {
		content = <Outlet />
	} else if (token && isUninitialized) {
		content = <Outlet />
	}

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			{content}
		</>
	)
}

export default PersistLogin
