import { baseApiSlice } from '../../api/baseApiSlice'

export const conversationApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createConversation: builder.mutation({
			query: ({ participantId }) => ({
				url: 'conversations',
				method: 'POST',
				body: { participantId },
			}),
			invalidatesTags: ['Conversations'],
		}),
		getConversations: builder.query({
			query: () => 'conversations', // Ensure this matches the backend route
			providesTags: ['Conversations'],
		}),
		sendMessage: builder.mutation({
			query: ({ conversationId, content }) => ({
				url: 'messages',
				method: 'POST',
				body: { conversationId, content },
			}),
			invalidatesTags: ['Messages'],
		}),
		getMessages: builder.query({
			query: (conversationId) => `messages/${conversationId}`,
			providesTags: ['Messages'],
		}),
	}),
})

export const {
	useCreateConversationMutation,
	useGetConversationsQuery,
	useSendMessageMutation,
	useGetMessagesQuery,
} = conversationApiSlice
