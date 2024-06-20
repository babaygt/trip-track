import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: '/http://localhost:3500' }),
	tagTypes: ['Routes', 'User'],
	endpoints: (builder) => ({}),
})
