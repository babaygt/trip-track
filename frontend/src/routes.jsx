import { AuthLayout } from './pages/auth/AuthLayout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Feed } from './pages/feed/Feed'
import MainLayout from './components/layout/MainLayout'
import PersistLogin from './features/auth/PersistLogin'
import CreateRoute from './pages/routes/CreateRoute'
import SingleRoutePost from './pages/routes/SingleRoutePost'
import UserProfile from './pages/users/UserProfile'

const routes = [
	{
		element: <PersistLogin />,
		children: [
			{
				path: '/',
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <Feed />,
					},
					{
						path: 'create-route',
						element: <CreateRoute />,
					},
					{
						path: 'route/:id',
						element: <SingleRoutePost />,
					},
					{
						path: 'user/:id',
						element: <UserProfile />,
					},
				],
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
]

export default routes
