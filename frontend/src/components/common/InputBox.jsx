import { useState } from 'react'

export const InputBox = ({
	name,
	type,
	id,
	defaultValue,
	placeholder,
	icon,
}) => {
	const [passwordVisible, setPasswordVisible] = useState(false)
	return (
		<div className='inputBox'>
			<input
				name={name}
				type={
					type === 'password' ? (passwordVisible ? 'text' : 'password') : type
				}
				id={id}
				defaultValue={defaultValue}
				placeholder={placeholder}
				className='inputBox-input'
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
	)
}
