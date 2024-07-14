export const formatDistance = (distance) => {
	if (distance >= 1000) {
		return `${(distance / 1000).toFixed(2)} km`
	}
	return `${distance.toFixed(2)} m`
}

export const formatTime = (time) => {
	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = Math.floor(time % 60)

	let timeString = ''
	if (hours > 0) {
		timeString += `${hours}h `
	}
	if (minutes > 0 || hours > 0) {
		timeString += `${minutes}m `
	}
	timeString += `${seconds}s`

	return timeString
}
