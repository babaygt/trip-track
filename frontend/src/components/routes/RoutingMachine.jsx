import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMap } from 'react-leaflet'

const Routing = ({
	startPoint,
	endPoint,
	waypoints,
	showInstructions,
	setShowInstructionButton,
	setTotalDistance,
	setTotalTime,
	draggableWaypoints,
	routeWhileDragging,
}) => {
	const map = useMap()
	const [routingControl, setRoutingControl] = useState(null)

	useEffect(() => {
		if (!map || !startPoint || !endPoint) return

		const control = L.Routing.control({
			waypoints: [
				L.latLng(startPoint.lat, startPoint.lng),
				...waypoints.map((point) => L.latLng(point.lat, point.lng)),
				L.latLng(endPoint.lat, endPoint.lng),
			],
			lineOptions: {
				styles: [
					{
						color: 'blue',
						opacity: 0.6,
						weight: 4,
					},
				],
			},
			addWaypoints: true,
			draggableWaypoints: draggableWaypoints,
			fitSelectedRoutes: true,
			showAlternatives: false,
			routeWhileDragging: routeWhileDragging,
			altLineOptions: {
				styles: [
					{
						color: 'red',
						opacity: 0.4,
						weight: 4,
					},
				],
			},
		}).addTo(map)

		control.on('routesfound', function (e) {
			setShowInstructionButton(true)
			const routes = e.routes
			const summary = routes[0].summary
			const totalDistance = summary.totalDistance
			const totalTime = summary.totalTime

			setTotalDistance(totalDistance)
			setTotalTime(totalTime)
		})

		setRoutingControl(control)

		return () => map.removeControl(control)
	}, [
		map,
		startPoint,
		endPoint,
		waypoints,
		setShowInstructionButton,
		setTotalDistance,
		setTotalTime,
		draggableWaypoints,
		routeWhileDragging,
	])

	useEffect(() => {
		if (routingControl) {
			if (showInstructions) {
				routingControl.show()
			} else {
				routingControl.hide()
			}
		}
	}, [routingControl, showInstructions])

	return null
}

export default Routing
