const Textarea = ({ name, id, value, placeholder, onChange, rows }) => {
	return (
		<div className='textarea'>
			<textarea
				name={name}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				rows={rows}
				className='textarea-input'
			></textarea>
		</div>
	)
}

export default Textarea
