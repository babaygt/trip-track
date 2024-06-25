const Select = ({ name, id, value, onChange, options }) => {
	return (
		<div className='select'>
			<select
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				className='select-input'
			>
				{options.map((option, index) => (
					<option key={index} value={option.value} disabled={option.disabled}>
						{option.label}
					</option>
				))}
			</select>
			<i className='fi fi-rr-angle-small-down select-icon'></i>
		</div>
	)
}

export default Select
