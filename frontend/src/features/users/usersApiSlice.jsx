import { baseApiSlice } from '../../api/baseApiSlice'

export const usersApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: 'users/register',
				method: 'POST',
				body: credentials,
			}),
		}),
	}),
})

export const { useRegisterMutation } = usersApiSlice
