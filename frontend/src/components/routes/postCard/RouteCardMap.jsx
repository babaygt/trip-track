import Map from '../Map'

const RouteCardMap = ({ startPoint, endPoint, waypoints }) => {
	return (
		<div className='route-card-map-container'>
			<Map
				startPoint={startPoint}
				endPoint={endPoint}
				waypoints={waypoints}
				center={startPoint}
				zoom={13}
				showInstructions={false}
				setShowInstructionButton={() => {}}
				setTotalDistance={() => {}}
				setTotalTime={() => {}}
				draggableWaypoints={false}
				routeWhileDragging={false}
			/>
		</div>
	)
}

export default RouteCardMap
