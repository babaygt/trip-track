import { useState } from 'react'
import { useLazyGetSuggestionsQuery } from '../../features/routes/routesApiSlice'
import { InputBox } from '../common/InputBox'

const Autocomplete = ({ onSelect, placeholder }) => {
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [trigger] = useLazyGetSuggestionsQuery()

	const fetchSuggestions = async (value) => {
		const { data } = await trigger(value)
		if (data) {
			setSuggestions(data)
		}
	}

	const handleChange = (e) => {
		const newValue = e.target.value
		setValue(newValue)
		fetchSuggestions(newValue)
	}

	const handleSelect = (suggestion) => {
		const location = [suggestion.lat, suggestion.lon]
		onSelect(location)
		setValue(suggestion.display_name)
		setSuggestions([])
	}

	return (
		<div className='autoComplete'>
			<InputBox
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				icon='fi-rr-search'
			/>
			{suggestions.length > 0 && (
				<ul className='autoComplete-suggestions'>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => handleSelect(suggestion)}
							className='autoComplete-suggestion'
						>
							{suggestion.display_name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Autocomplete
