import { Link } from 'react-router-dom'
import { InputBox } from '../../components/common/InputBox'

export const Register = () => {
	return (
		<form className='authForm-form'>
			<h1 className='authForm-title'>Join us today</h1>
			<InputBox
				name='fullname'
				type='text'
				placeholder='Fullname'
				icon='fi-rr-user'
			/>
			<InputBox
				name='username'
				type='text'
				placeholder='Username'
				icon='fi-rr-user'
			/>
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
			<button className='button button-primary center'>Register</button>

			<div className='authForm-seperator'>
				<span>or</span>
			</div>

			<p className='authForm-text'>
				Already have an account ?
				<Link to='/auth/login' className='authForm-link'>
					Login here
				</Link>
			</p>
		</form>
	)
}
