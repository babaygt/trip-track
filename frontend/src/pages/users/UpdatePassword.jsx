import { useState, useEffect } from 'react'
import { useUpdateUserPasswordMutation } from '../../features/users/usersApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { InputBox } from '../../components/common/InputBox'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
	const navigate = useNavigate()

	const [formValues, setFormValues] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [updateUserPassword, { isLoading, isSuccess, isError, error }] =
		useUpdateUserPasswordMutation()

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (formValues.newPassword !== formValues.confirmPassword) {
			toast.error('New password and confirm password do not match')
			return
		}
		try {
			await updateUserPassword({
				oldPassword: formValues.oldPassword,
				newPassword: formValues.newPassword,
			}).unwrap()
			toast.success('Password updated successfully!')
			setFormValues({ oldPassword: '', newPassword: '', confirmPassword: '' })
		} catch (err) {
			console.error('Failed to update password:', err)
		}
	}

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	if (isLoading) {
		return <ClipLoader color='#28af60' loading={isLoading} size={150} />
	}

	if (isSuccess) {
		setTimeout(() => {
			navigate('/edit-profile')
		}, 2000)
	}

	return (
		<div className='update-password'>
			<Toaster position='top-center' reverseOrder={false} />
			<form className='update-password-form' onSubmit={handleSubmit}>
				<h2>Change Password</h2>
				<InputBox
					name='oldPassword'
					type='password'
					placeholder='Old Password'
					value={formValues.oldPassword}
					onChange={handleInputChange}
					icon='fi-rr-key'
					showLabel={true}
					labelText='Old Password'
				/>
				<InputBox
					name='newPassword'
					type='password'
					placeholder='New Password'
					value={formValues.newPassword}
					onChange={handleInputChange}
					icon='fi-rr-key'
					showLabel={true}
					labelText='New Password'
				/>
				<InputBox
					name='confirmPassword'
					type='password'
					placeholder='Confirm New Password'
					value={formValues.confirmPassword}
					onChange={handleInputChange}
					icon='fi-rr-key'
					showLabel={true}
					labelText='Confirm New Password'
				/>
				<button className='button button-primary center' type='submit'>
					Change Password
				</button>
			</form>
			{/* Go back to edit-profile text and link*/}
		</div>
	)
}

export default UpdatePassword
