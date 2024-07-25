import { AuthLayout } from './pages/auth/AuthLayout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Feed } from './pages/feed/Feed'
import MainLayout from './components/layout/MainLayout'
import PersistLogin from './features/auth/PersistLogin'
import CreateRoute from './pages/routes/CreateRoute'
import SingleRoutePost from './pages/routes/SingleRoutePost' // Import the SingleRoutePost component

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
						path: 'route/:id', // Define the path for the single route post
						element: <SingleRoutePost />,
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
