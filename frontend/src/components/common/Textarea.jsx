const Textarea = ({
	name,
	id,
	value,
	placeholder,
	onChange,
	rows,
	icon,
	showLabel = false,
	labelText,
}) => {
	return (
		<div className='textarea'>
			{showLabel && (
				<label htmlFor={id} className='textarea-label'>
					{labelText ? labelText : name}
				</label>
			)}
			<div className='textarea-wrapper'>
				<textarea
					name={name}
					id={id}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					rows={rows}
					className='textarea-input'
				></textarea>
				{icon && <i className={`fi ${icon} textarea-icon`}></i>}
			</div>
		</div>
	)
}

export default Textarea
