import Autocomplete from './Autocomplete'

const Waypoint = ({ index, onSelect, onRemove }) => {
	return (
		<div className='createRoute-waypoint'>
			<Autocomplete
				placeholder={`Waypoint ${index + 1}`}
				onSelect={(location) => onSelect(index, location)}
			/>
			<i
				className='fi fi-sr-cross-circle icon icon--delete'
				onClick={() => onRemove(index)}
				title='Remove waypoint'
			></i>
		</div>
	)
}

export default Waypoint
