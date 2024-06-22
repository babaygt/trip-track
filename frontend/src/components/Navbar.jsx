import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import navLogo from '../assets/images/nav-logo.png'
import { InputBox } from './common/InputBox'
import { selectCurrentToken, logOut } from '../features/auth/authSlice'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect } from 'react'

export const Navbar = () => {
	const dispatch = useDispatch()
	const token = useSelector(selectCurrentToken)
	const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation()

	const handleLogout = async () => {
		await sendLogout().unwrap()
		dispatch(logOut())
	}

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='nav-wrapper'>
				<div className='nav-logo'>
					<NavLink to='/'>
						<img src={navLogo} alt='Navigation Logo' />
					</NavLink>
				</div>

				<div>
					<InputBox
						name='search'
						type='text'
						id='search'
						placeholder='Search...'
						icon='fi-rr-search'
					/>
				</div>

				<nav className='primary-navigation'>
					<ul className='nav-list'>
						<li className='nav-item'>
							<NavLink to='/'>Home</NavLink>
						</li>
						{token ? (
							<li className='nav-item'>
								{isLoading ? (
									<ClipLoader color='#28af60' size={25} />
								) : (
									<button onClick={handleLogout} className='button-logout'>
										Logout
									</button>
								)}
							</li>
						) : (
							<>
								<li className='nav-item'>
									<NavLink to='/auth/register'>Register</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/auth/login'>Login</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</>
	)
}
