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
					dispatch(setUser(data))
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
		followUser: builder.mutation({
			query: (id) => ({
				url: `users/follow/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch (error) {
					console.error('Failed to follow user:', error)
				}
			},
		}),
		unfollowUser: builder.mutation({
			query: (id) => ({
				url: `users/unfollow/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch (error) {
					console.error('Failed to follow user:', error)
				}
			},
		}),
		getFollowers: builder.query({
			query: (id) => `users/followers/${id}`,
			providesTags: ['User'],
		}),
		getFollowing: builder.query({
			query: (id) => `users/following/${id}`,
			providesTags: ['User'],
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
	useFollowUserMutation,
	useUnfollowUserMutation,
	useGetFollowersQuery,
	useGetFollowingQuery,
} = usersApiSlice
