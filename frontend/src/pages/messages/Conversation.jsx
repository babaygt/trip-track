import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
	useGetMessagesQuery,
	useSendMessageMutation,
} from '../../features/conversations/conversationApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/users/userSlice'
import { InputBox } from '../../components/common/InputBox'

const Conversation = () => {
	const { conversationId } = useParams()
	const currentUser = useSelector(selectCurrentUser)
	const {
		data: messages,
		isLoading,
		isError,
		error,
	} = useGetMessagesQuery(conversationId, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})
	const [sendMessage] = useSendMessageMutation()
	const [messageContent, setMessageContent] = useState('')

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSendMessage = async () => {
		if (!messageContent) return

		try {
			await sendMessage({ conversationId, content: messageContent }).unwrap()
			setMessageContent('')
		} catch (err) {
			toast.error('Failed to send message')
		}
	}

	if (isLoading) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isError) {
		toast.error(error?.data?.message || 'Failed to load messages')
		return <p>Error loading messages.</p>
	}

	console.log(messages)
	return (
		<div className='conversation-page'>
			<Toaster position='top-center' reverseOrder={false} />
			<h2 className='conversation-page-title'>Conversation</h2>
			{messages.length > 0 ? (
				<div className='conversation-page-messages'>
					{messages?.map((message) => (
						<div
							key={message._id}
							className={`conversation-page-message ${
								message.sender._id === currentUser._id ? 'sent' : 'received'
							}`}
						>
							<img
								src={message.sender.profilePicture}
								alt='Profile'
								className='conversation-page-message-sender-picture'
							/>
							<div className='conversation-page-message-content'>
								<p className='conversation-page-message-text'>
									{message.content}
								</p>
								<span className='conversation-page-message-time'>
									{new Date(message.createdAt).toLocaleString()}
								</span>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			) : (
				<p>No messages yet.</p>
			)}
			<div className='conversation-page-message-input'>
				<InputBox
					type='text'
					placeholder='Type a message...'
					value={messageContent}
					onChange={(e) => setMessageContent(e.target.value)}
					icon='fi-rr-pen-field'
				/>

				<button
					className='button conversation-page-message-send-button'
					onClick={handleSendMessage}
				>
					Send
				</button>
			</div>
		</div>
	)
}

export default Conversation
