import Autocomplete from './Autocomplete'

const LocationInput = ({ placeholder, onSelect }) => {
	return (
		<div>
			<Autocomplete placeholder={placeholder} onSelect={onSelect} />
		</div>
	)
}

export default LocationInput
