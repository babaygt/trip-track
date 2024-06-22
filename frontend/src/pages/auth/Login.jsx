import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { InputBox } from '../../components/common/InputBox'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { setCredentials } from '../../features/auth/authSlice'
import { Toaster, toast } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

export const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	})

	const [isFormValid, setIsFormValid] = useState(false)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	useEffect(() => {
		const isFormValid = formValues.email && formValues.password
		setIsFormValid(isFormValid)
	}, [formValues])

	const [login, { isLoading, isSuccess, isError, error, data }] =
		useLoginMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (isFormValid) {
			await login(formValues).unwrap()
		}
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(setCredentials({ accessToken: data.accessToken }))
			toast.success('Login successful! Redirecting...')
			setTimeout(() => {
				navigate('/')
			}, 2000)
		}
	}, [isSuccess, data, navigate, dispatch])

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	if (isLoading) return <ClipLoader color='#28af60' />

	return (
		<form className='authForm-form' onSubmit={handleSubmit}>
			<Toaster position='top-center' reverseOrder={false} />
			<h1 className='authForm-title'>Welcome back</h1>
			<InputBox
				name='email'
				type='email'
				placeholder='Email'
				icon='fi-rr-envelope'
				value={formValues.email}
				onChange={handleInputChange}
			/>
			<InputBox
				name='password'
				type='password'
				placeholder='Password'
				icon='fi-rr-key'
				value={formValues.password}
				onChange={handleInputChange}
			/>
			<button
				className='button button-primary center'
				type='submit'
				disabled={!isFormValid}
			>
				Login
			</button>

			<div className='authForm-seperator'>
				<span>or</span>
			</div>

			<p className='authForm-text'>
				Don&apos;t have an account?
				<Link to='/auth/register' className='authForm-link'>
					Join us today!
				</Link>
			</p>
		</form>
	)
}
