import { baseApiSlice } from '../../api/baseApiSlice'
import { setUser } from './userSlice'

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: 'users/register',
				method: 'POST',
				body: credentials,
			}),
		}),
		getCurrentUser: builder.query({
			query: () => 'users/current',
			providesTags: ['User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data)) // Dispatch Redux action to update user state
				} catch (error) {
					console.error('Failed to fetch current user:', error)
				}
			},
		}),

		getUserProfile: builder.query({
			query: (id) => `users/profile/${id}`,
			providesTags: ['User'],
		}),

		getUserRoutes: builder.query({
			query: (id) => `users/${id}/routes`,
			providesTags: ['Routes'],
		}),
		updateUserProfile: builder.mutation({
			query: (updatedUser) => ({
				url: 'users/profile',
				method: 'PUT',
				body: updatedUser,
			}),
			invalidatesTags: ['User'],
		}),
		updateUserPassword: builder.mutation({
			query: (passwords) => ({
				url: 'users/profile/password',
				method: 'PUT',
				body: passwords,
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const {
	useRegisterMutation,
	useGetCurrentUserQuery,
	useGetUserProfileQuery,
	useGetUserRoutesQuery,
	useUpdateUserProfileMutation,
	useUpdateUserPasswordMutation,
} = usersApiSlice
