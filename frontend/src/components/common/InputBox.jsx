import { useState } from 'react'

export const InputBox = ({
	name,
	type,
	id,
	defaultValue,
	placeholder,
	icon,
	value,
	onChange,
	regex,
	validationMessage,
	showValidation,
	onFocus,
	onBlur,
}) => {
	const [passwordVisible, setPasswordVisible] = useState(false)
	return (
		<div className='inputBox'>
			<div className='inputBox-wrapper'>
				<input
					name={name}
					type={
						type === 'password' ? (passwordVisible ? 'text' : 'password') : type
					}
					id={id}
					defaultValue={defaultValue}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className='inputBox-input'
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				<i className={`fi ${icon} inputBox-icon`}></i>
				{type === 'password' ? (
					<i
						className={`fi fi-rr-eye${
							!passwordVisible ? '-crossed' : ''
						} inputBox-icon inputBox-icon--password`}
						onClick={() => setPasswordVisible((currentVal) => !currentVal)}
					></i>
				) : null}
			</div>
			{showValidation && !regex.test(value) && (
				<div className='inputBox-validation'>{validationMessage}</div>
			)}
		</div>
	)
}
