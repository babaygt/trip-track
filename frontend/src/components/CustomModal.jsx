import Modal from 'react-modal'

const CustomModal = ({ isOpen, onRequestClose, contentLabel, onConfirm }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel={contentLabel}
			className='modal'
			overlayClassName='modal-overlay'
		>
			<h2>{contentLabel}</h2>
			<div className='modal-actions'>
				<button className='button modal-cancel-button' onClick={onRequestClose}>
					Cancel
				</button>
				<button className='button modal-delete-button' onClick={onConfirm}>
					Delete
				</button>
			</div>
		</Modal>
	)
}

export default CustomModal
