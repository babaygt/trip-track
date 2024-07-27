import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserProfileMutation } from '../../features/users/usersApiSlice'
import { selectCurrentUser, setUser } from '../../features/users/userSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { InputBox } from '../../components/common/InputBox'
import Textarea from '../../components/common/Textarea'

const EditProfile = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const currentUser = useSelector(selectCurrentUser)
	const [formValues, setFormValues] = useState({
		name: '',
		username: '',
		email: '',
		bio: '',
		profilePicture: '',
	})

	const [updateUserProfile, { isLoading, isError, error }] =
		useUpdateUserProfileMutation()

	useEffect(() => {
		if (currentUser) {
			setFormValues({
				name: currentUser.name,
				username: currentUser.username,
				email: currentUser.email,
				bio: currentUser.bio,
				profilePicture: currentUser.profilePicture,
			})
		}
	}, [currentUser])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const updatedUser = await updateUserProfile(formValues).unwrap()
			dispatch(setUser(updatedUser))
			toast.success('Profile updated successfully!')
			navigate(`/user/${currentUser._id}`)
		} catch (err) {
			console.error('Failed to update profile:', err)
			toast.error('Failed to update profile')
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

	return (
		<div className='edit-profile'>
			<Toaster position='top-center' reverseOrder={false} />
			<form className='edit-profile-form' onSubmit={handleSubmit}>
				<h2>Edit Profile</h2>
				<InputBox
					name='name'
					type='text'
					placeholder='Name'
					value={formValues.name}
					icon='fi-rr-user'
					onChange={handleInputChange}
					showLabel={true}
					labelText='Name'
				/>
				<InputBox
					name='username'
					type='text'
					placeholder='Username'
					value={formValues.username}
					icon='fi-rr-user'
					onChange={handleInputChange}
					showLabel={true}
					labelText='User Name'
				/>
				<InputBox
					name='email'
					type='email'
					placeholder='Email'
					value={formValues.email}
					icon='fi-rr-envelope'
					onChange={handleInputChange}
					showLabel={true}
					labelText='Email'
				/>
				<Textarea
					name='bio'
					placeholder='Bio'
					value={formValues.bio}
					onChange={handleInputChange}
					rows={4}
					icon='fi-rr-text'
					showLabel={true}
					labelText='Bio'
				/>
				<InputBox
					name='profilePicture'
					type='text'
					placeholder='Profile Picture URL'
					value={formValues.profilePicture}
					icon='fi-rr-picture'
					onChange={handleInputChange}
					showLabel={true}
					labelText='Profile Picture URL'
				/>
				<button className='button button-primary center' type='submit'>
					Update Profile
				</button>
			</form>
		</div>
	)
}

export default EditProfile
