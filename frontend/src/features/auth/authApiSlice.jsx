import { baseApiSlice } from '../../api/baseApiSlice'
import { logOut } from './authSlice'

export const authApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					//const { data } =
					await queryFulfilled
					//console.log(data)
					dispatch(logOut())
					setTimeout(() => {
						dispatch(baseApiSlice.util.resetApiState())
					}, 1000)
				} catch (err) {
					console.log(err)
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/auth/refresh',
				method: 'GET',
			}),
		}),
	}),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
	authApiSlice
