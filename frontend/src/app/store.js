import { configureStore } from '@reduxjs/toolkit'
import { baseApiSlice } from '../api/baseApiSlice'

export const store = configureStore({
	reducer: {
		[baseApiSlice.reducerPath]: baseApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApiSlice.middleware),
	devTools: true,
})
