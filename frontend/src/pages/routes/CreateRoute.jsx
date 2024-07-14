import { useState, useCallback, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Map from '../../components/routes/Map'
import LocationInput from '../../components/routes/LocationInput'
import Waypoint from '../../components/routes/Waypoint'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import ClipLoader from 'react-spinners/ClipLoader'
import { useCreateRouteMutation } from '../../features/routes/routesApiSlice'

const CreateRoute = () => {
	const navigate = useNavigate()

	const [startPoint, setStartPoint] = useState(null)
	const [endPoint, setEndPoint] = useState(null)
	const [waypoints, setWaypoints] = useState([])
	const [vehicleType, setVehicleType] = useState('')
	const [description, setDescription] = useState('')
	const [showInstructions, setShowInstructions] = useState(true)
	const [showInstructionButton, setShowInstructionButton] = useState(false)
	const [totalDistance, setTotalDistance] = useState(0)
	const [totalTime, setTotalTime] = useState(0)
	const [createRoute, { isLoading, isSuccess, isError, error }] =
		useCreateRouteMutation()

	const position = [52.51, 13.4]
	const zoom = 12

	const handleCreateRoute = useCallback(async () => {
		const newRoute = {
			startPoint,
			endPoint,
			waypoints,
			vehicleType,
			description,
			totalDistance,
			totalTime,
		}
		await createRoute(newRoute).unwrap()
	}, [
		startPoint,
		endPoint,
		waypoints,
		vehicleType,
		description,
		totalDistance,
		totalTime,
		createRoute,
	])

	useEffect(() => {
		if (isSuccess) {
			toast.success('Route created successfully! Redirecting to home page.')
			setTimeout(() => {
				navigate('/')
			}, 3000)
		}
	}, [isSuccess, navigate])

	useEffect(() => {
		if (isError) {
			const errorMessage = error?.data?.message || 'An error occurred'
			toast.error(errorMessage)
		}
	}, [isError, error])

	if (isLoading) return <ClipLoader color='#28af60' />

	const handleWaypointSelect = (index, location) => {
		const newWaypoints = [...waypoints]
		newWaypoints[index] = {
			lat: parseFloat(location[0]),
			lng: parseFloat(location[1]),
		}
		setWaypoints(newWaypoints)
	}

	const handleRemoveWaypoint = (index) => {
		const newWaypoints = waypoints.filter((_, i) => i !== index)
		setWaypoints(newWaypoints)
	}

	return (
		<div className='createRoute'>
			<Toaster position='top-center' reverseOrder={false} />
			<div className='createRoute-sidebar'>
				<h2 className='createRoute-title'>Create Route</h2>
				<h3 className='createRoute-description'>Create your path</h3>
				<LocationInput
					placeholder='Start Point'
					onSelect={(location) =>
						setStartPoint({
							lat: parseFloat(location[0]),
							lng: parseFloat(location[1]),
						})
					}
				/>
				{waypoints.map((_, index) => (
					<Waypoint
						key={index}
						index={index}
						onSelect={handleWaypointSelect}
						onRemove={handleRemoveWaypoint}
					/>
				))}

				<button
					className='button createRoute-button center'
					onClick={() => setWaypoints([...waypoints, null])}
				>
					+ Add waypoint
				</button>

				<LocationInput
					placeholder='End Point'
					onSelect={(location) =>
						setEndPoint({
							lat: parseFloat(location[0]),
							lng: parseFloat(location[1]),
						})
					}
				/>

				{showInstructionButton && (
					<button
						className={
							showInstructions
								? 'button createRoute-buttonInstructions  center'
								: 'button createRoute-button center'
						}
						onClick={() => setShowInstructions(!showInstructions)}
					>
						{showInstructions ? 'Hide Instructions' : 'Show Instructions'}
					</button>
				)}

				<h3 className='createRoute-description'>Select vehicle type</h3>

				<Select
					value={vehicleType}
					onChange={(e) => setVehicleType(e.target.value)}
					options={[
						{ value: '', label: 'Choose', disabled: true },
						{ value: 'car', label: 'Car' },
						{ value: 'bicycle', label: 'Bicycle' },
						{ value: 'walking', label: 'Walking' },
						{ value: 'mixed', label: 'Mixed' },
					]}
				/>
				<h3 className='createRoute-description'>Share your thoughts</h3>
				<Textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Enter your thoughts'
					rows={4}
				/>

				<button
					className='button createRoute-button createRoute-buttonShare center'
					onClick={handleCreateRoute}
					disabled={isLoading}
				>
					Share the post
				</button>
				{isSuccess && <p>Route created successfully!</p>}
				{isError && <p>Error: {error.message}</p>}
			</div>
			<div className='createRoute-map'>
				<Map
					startPoint={startPoint}
					endPoint={endPoint}
					waypoints={waypoints}
					center={position}
					zoom={zoom}
					showInstructions={showInstructions}
					setShowInstructionButton={setShowInstructionButton}
					setTotalDistance={setTotalDistance}
					setTotalTime={setTotalTime}
				/>
			</div>
		</div>
	)
}

export default CreateRoute
