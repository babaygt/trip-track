import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode' // Use named import instead of default import

const useAuth = () => {
	const token = useSelector(selectCurrentToken)

	if (token) {
		const decodedUser = jwtDecode(token)
		const { id, name, username, email } = decodedUser.UserInfo

		return {
			id,
			name,
			username,
			email,
		}
	}

	return null // User is not authenticated
}

export default useAuth
