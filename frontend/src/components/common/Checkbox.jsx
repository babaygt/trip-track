const Checkbox = ({ id, label, checked, onChange }) => {
	return (
		<div className='checkbox'>
			<label htmlFor={id} className='checkbox-label'>
				<input
					type='checkbox'
					id={id}
					className='checkbox-input'
					checked={checked}
					onChange={onChange}
				/>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
