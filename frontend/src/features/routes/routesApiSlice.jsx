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
		getRoutes: builder.query({
			query: () => '/routes',
			providesTags: ['Routes'],
		}),
		likeRoute: builder.mutation({
			query: ({ routeId, like }) => ({
				url: `/routes/like/${routeId}`,
				method: 'PUT',
				body: { like },
			}),
			invalidatesTags: ['Routes'],
		}),
	}),
})

export const {
	useCreateRouteMutation,
	useLazyGetSuggestionsQuery,
	useGetRoutesQuery,
	useLikeRouteMutation,
} = routesApiSlice
