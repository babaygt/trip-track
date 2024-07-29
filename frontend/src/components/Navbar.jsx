import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import navLogo from '../assets/images/nav-logo.png'
import { InputBox } from './common/InputBox'
import { selectCurrentToken, logOut } from '../features/auth/authSlice'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useSearchUsersMutation } from '../features/users/usersApiSlice'
import { selectCurrentUser } from '../features/users/userSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import useDebounce from '../hooks/useDebounce'
import usePersist from '../hooks/usePersist'
import SearchResults from './common/SearchResults'

export const Navbar = () => {
	const dispatch = useDispatch()
	const token = useSelector(selectCurrentToken)
	const currentUser = useSelector(selectCurrentUser)
	const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation()
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebounce(searchQuery, 300)
	const [searchUsers, { data: searchResults }] = useSearchUsersMutation()
	const [isSearchFocused, setIsSearchFocused] = useState(false)
	const [persist, setPersist] = usePersist()

	const handleLogout = async () => {
		if (persist) {
			setPersist(false)
		}

		await sendLogout().unwrap()
		dispatch(logOut())
	}

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	useEffect(() => {
		if (debouncedSearchQuery) {
			searchUsers({ query: debouncedSearchQuery })
		}
	}, [debouncedSearchQuery, searchUsers])

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value)
	}

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='nav-wrapper'>
				<div className='nav-logo'>
					<NavLink to='/'>
						<img src={navLogo} alt='Navigation Logo' />
					</NavLink>
				</div>

				<div className='search'>
					<InputBox
						name='search'
						type='text'
						id='search'
						placeholder='Search...'
						icon='fi-rr-search'
						value={searchQuery}
						onChange={handleSearchChange}
						onFocus={() => setIsSearchFocused(true)}
						onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Timeout to allow click
					/>
					{isSearchFocused && searchResults && searchResults.length > 0 && (
						<SearchResults
							results={searchResults}
							onResultClick={() => setIsSearchFocused(false)}
						/>
					)}
				</div>

				<nav className='primary-navigation'>
					<ul className='nav-list'>
						<li className='nav-item'>
							<NavLink to='/'>Home</NavLink>
						</li>

						{token ? (
							<>
								<li className='nav-item'>
									<NavLink to='/create-route'>Create Route</NavLink>
								</li>

								<li className='nav-item'>
									<NavLink to='/bookmarks'>Bookmarks</NavLink>
								</li>

								<li className='nav-item'>
									<Link to={`/user/${currentUser._id}`}>
										<img
											src={currentUser.profilePicture}
											alt='Profile'
											className='nav-user-profile-picture'
										/>
									</Link>
								</li>

								<li className='nav-item'>
									{isLoading ? (
										<ClipLoader color='#28af60' size={25} />
									) : (
										<button
											onClick={handleLogout}
											className='button button-logout'
										>
											Logout
										</button>
									)}
								</li>
							</>
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
