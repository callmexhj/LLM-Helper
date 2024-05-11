import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	selectedChatId: '',
	chatList: []
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSelectedChatId: (state, action) => {
			state.selectedChatId = action.payload
		},
		setChatList: (state, action) => {
			state.chatList = [...action.payload]
		},
		deleteChat: (state, action) => {
			const chatIndex = state.chatList.findIndex((item) => item.id === action.payload)
			if (chatIndex !== -1) {
				state.chatList.splice(chatIndex, 1)
			}
		},
		updateChatMessage: (state, action) => {
			const { chatId, newMessage } = action.payload
			const chatIndex = state.chatList.findIndex((item) => item.id === chatId)
			if (chatIndex !== -1) {
				state.chatList[chatIndex].messages = [...newMessage]
			}
		},
		updateChatModelVersion: (state, action) => {
			const { chatId, modelVersion } = action.payload
			const chatIndex = state.chatList.findIndex((item) => item.id === chatId)
			if (chatIndex !== -1) {
				state.chatList[chatIndex].modelVersion = modelVersion
			}
		}
	}
})

export const {
	setSelectedChatId,
	setChatList,
	updateChatMessage,
	deleteChat,
	updateChatModelVersion
} = chatSlice.actions
export default chatSlice.reducer
