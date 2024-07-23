import { configureStore } from '@reduxjs/toolkit'
import { baseApiSlice } from '../api/baseApiSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
	reducer: {
		[baseApiSlice.reducerPath]: baseApiSlice.reducer,
		auth: authReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApiSlice.middleware),
	devTools: true,
})
