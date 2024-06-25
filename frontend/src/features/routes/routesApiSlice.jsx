import { baseApiSlice } from '../../api/baseApiSlice'

export const routesApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createRoute: builder.mutation({
			query: (newRoute) => ({
				url: '/routes',
				method: 'POST',
				body: newRoute,
			}),
			invalidatesTags: ['Routes'],
		}),
		getSuggestions: builder.query({
			query: (query) => `/routes/suggestions?q=${query}`,
		}),
	}),
})

export const { useCreateRouteMutation, useLazyGetSuggestionsQuery } =
	routesApiSlice
