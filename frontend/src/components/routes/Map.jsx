import { useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Routing from './RoutingMachine'
import 'leaflet/dist/leaflet.css'

const ZoomControlPosition = () => {
	const map = useMap()
	useEffect(() => {
		map.zoomControl.setPosition('bottomright')
	}, [map])
	return null
}

const Map = ({
	startPoint,
	endPoint,
	waypoints,
	center,
	zoom,
	showInstructions,
	setShowInstructionButton,
	setTotalDistance,
	setTotalTime,
	draggableWaypoints = true,
	routeWhileDragging = true,
}) => {
	const memoizedRouting = useMemo(
		() =>
			startPoint &&
			endPoint && (
				<Routing
					startPoint={startPoint}
					endPoint={endPoint}
					waypoints={waypoints.filter(Boolean)}
					showInstructions={showInstructions}
					setShowInstructionButton={setShowInstructionButton}
					setTotalDistance={setTotalDistance}
					setTotalTime={setTotalTime}
					draggableWaypoints={draggableWaypoints}
					routeWhileDragging={routeWhileDragging}
				/>
			),
		[
			startPoint,
			endPoint,
			waypoints,
			showInstructions,
			setShowInstructionButton,
			setTotalDistance,
			setTotalTime,
			draggableWaypoints,
			routeWhileDragging,
		]
	)

	return (
		<MapContainer center={center} zoom={zoom} className='map-container'>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{memoizedRouting}
			<ZoomControlPosition />
		</MapContainer>
	)
}

export default Map
