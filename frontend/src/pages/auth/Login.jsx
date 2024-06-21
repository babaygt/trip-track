import { Link } from 'react-router-dom'
import { InputBox } from '../../components/common/InputBox'

export const Login = () => {
	return (
		<form className='authForm-form'>
			<h1 className='authForm-title'>Welcome back</h1>
			<InputBox
				name='email'
				type='email'
				placeholder='Email'
				icon='fi-rr-envelope'
			/>
			<InputBox
				name='password'
				type='password'
				placeholder='Password'
				icon='fi-rr-key'
			/>
			<button className='button button-primary center'>Login</button>

			<div className='authForm-seperator'>
				<span>or</span>
			</div>

			<p className='authForm-text'>
				Don&apos;t have an account ?
				<Link to='/auth/register' className='authForm-link'>
					Join us today!
				</Link>
			</p>
		</form>
	)
}
