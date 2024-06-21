import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputBox } from '../../components/common/InputBox'
import { useRegisterMutation } from '../../features/users/usersApiSlice'
import { Toaster, toast } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

export const Register = () => {
	const navigate = useNavigate()

	const [formValues, setFormValues] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
	})

	const [showValidation, setShowValidation] = useState({
		username: false,
		password: false,
	})

	const [isFormValid, setIsFormValid] = useState(false)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	const handleFocus = (field) => {
		setShowValidation({
			...showValidation,
			[field]: true,
		})
	}

	const handleBlur = (field) => {
		setShowValidation({
			...showValidation,
			[field]: false,
		})
	}

	const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

	useEffect(() => {
		const isFormValid =
			formValues.name &&
			usernameRegex.test(formValues.username) &&
			formValues.email &&
			passwordRegex.test(formValues.password)
		setIsFormValid(isFormValid)
	}, [formValues])

	const [register, { isLoading, isSuccess, isError, error }] =
		useRegisterMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (isFormValid) {
			await register(formValues).unwrap()
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Account created successfully! Redirecting to login...')
			setTimeout(() => {
				navigate('/auth/login')
			}, 3000)
		}
	}, [isSuccess, navigate])

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
			<h1 className='authForm-title'>Join us today</h1>
			<InputBox
				name='name'
				type='text'
				placeholder='Name'
				icon='fi-rr-user'
				value={formValues.name}
				onChange={handleInputChange}
			/>
			<InputBox
				name='username'
				type='text'
				placeholder='Username'
				icon='fi-rr-user'
				value={formValues.username}
				onChange={handleInputChange}
				regex={usernameRegex}
				validationMessage='Username must be 5-20 characters long and can only contain letters, numbers, and underscores.'
				showValidation={showValidation.username}
				onFocus={() => handleFocus('username')}
				onBlur={() => handleBlur('username')}
			/>
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
				regex={passwordRegex}
				validationMessage='Password must be at least 8 characters long and contain at least one letter and one number.'
				showValidation={showValidation.password}
				onFocus={() => handleFocus('password')}
				onBlur={() => handleBlur('password')}
			/>
			<button
				className='button button-primary center'
				type='submit'
				disabled={!isFormValid}
			>
				Register
			</button>

			<div className='authForm-seperator'>
				<span>or</span>
			</div>

			<p className='authForm-text'>
				Already have an account?
				<Link to='/auth/login' className='authForm-link'>
					Login here
				</Link>
			</p>
		</form>
	)
}
