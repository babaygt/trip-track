import { useState, useEffect, useRef, useCallback } from 'react'
import { useLazyGetSuggestionsQuery } from '../../features/routes/routesApiSlice'
import useDebounce from '../../hooks/useDebounce'
import { InputBox } from '../common/InputBox'

const Autocomplete = ({ onSelect, placeholder }) => {
	const [value, setValue] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [trigger] = useLazyGetSuggestionsQuery()
	const debouncedValue = useDebounce(value, 350)
	const selectedRef = useRef(false)

	const fetchSuggestions = useCallback(
		async (value) => {
			const { data } = await trigger(value)
			if (data) {
				setSuggestions(data)
			}
		},
		[trigger]
	)

	useEffect(() => {
		if (selectedRef.current) {
			selectedRef.current = false
			return
		}
		if (debouncedValue) {
			fetchSuggestions(debouncedValue)
		} else {
			setSuggestions([])
		}
	}, [debouncedValue, fetchSuggestions])

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	const handleSelect = (suggestion) => {
		const location = [suggestion.lat, suggestion.lon]
		onSelect(location)
		setValue(suggestion.display_name)
		setSuggestions([])
		selectedRef.current = true
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
