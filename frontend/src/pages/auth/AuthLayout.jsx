import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
	return (
		<section className='authForm'>
			<Outlet />
		</section>
	)
}
