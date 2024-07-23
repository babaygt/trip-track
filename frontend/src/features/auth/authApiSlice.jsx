import { baseApiSlice } from '../../api/baseApiSlice'
import { logOut, setCredentials } from './authSlice'
import { setUser, clearUser } from '../users/userSlice'
import { usersApiSlice } from '../users/usersApiSlice'

export const authApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth',
				method: 'POST',
				body: { ...credentials },
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setCredentials({ accessToken: data.accessToken }))
					const userDetails = await dispatch(
						usersApiSlice.endpoints.getCurrentUser.initiate()
					).unwrap()
					dispatch(setUser(userDetails))
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(logOut())
					dispatch(clearUser())
					setTimeout(() => {
						dispatch(baseApiSlice.util.resetApiState())
					}, 1000)
				} catch (err) {
					console.log(err)
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({ url: '/auth/refresh', method: 'GET' }),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setCredentials({ accessToken: data.accessToken }))
					// Fetch user details after setting credentials
					await dispatch(
						usersApiSlice.endpoints.getCurrentUser.initiate()
					).unwrap()
				} catch (err) {
					console.error('Error refreshing token:', err)
					dispatch(logOut()) // Ensure logout if refresh fails
				}
			},
		}),
	}),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
	authApiSlice
