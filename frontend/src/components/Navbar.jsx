import { NavLink } from 'react-router-dom'
import navLogo from '../assets/images/nav-logo.png'
import { InputBox } from './common/InputBox'

export const Navbar = () => {
	return (
		<>
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

						<li className='nav-item'>
							<NavLink to='/auth/register'>Register</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/auth/login'>Login</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
