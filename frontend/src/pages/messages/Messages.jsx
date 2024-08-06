import { Link } from 'react-router-dom'
import { useGetConversationsQuery } from '../../features/conversations/conversationApiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster, toast } from 'react-hot-toast'

const Messages = () => {
	const {
		data: conversations,
		isLoading,
		isError,
		error,
	} = useGetConversationsQuery({
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})

	if (isLoading) {
		return <ClipLoader color='#28af60' loading size={150} />
	}

	if (isError) {
		toast.error(error?.data?.message || 'Failed to load conversations')
		return <p>Error loading conversations.</p>
	}

	return (
		<div className='messages-page'>
			<Toaster position='top-center' reverseOrder={false} />
			<h2 className='messages-page-title'>Your Conversations</h2>
			{conversations.length > 0 ? (
				conversations.map((conversation) => (
					<Link
						to={`/messages/${conversation._id}`}
						key={conversation._id}
						className='conversation-link'
					>
						<div className='conversation-card'>
							<img
								src={conversation.participants[1].profilePicture}
								alt='Profile'
								className='conversation-participant-picture'
							/>
							<h3>{conversation.participants[1].name}</h3>
							<p>@{conversation.participants[1].username}</p>
						</div>
					</Link>
				))
			) : (
				<p>You have no conversations yet.</p>
			)}
		</div>
	)
}

export default Messages
