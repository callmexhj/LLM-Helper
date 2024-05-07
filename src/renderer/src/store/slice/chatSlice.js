import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		selectedChatId: '',
		chatList: []
	},
	reducers: {
		setSelectedChatId: (state, action) => {
			state.selectedChatId = action.payload
		},
		setChatList: (state, action) => {
			state.chatList = action.payload
			state.selectedChatId = action.payload[0].id
		},
		updateChatDate: (state, action) => {
			const { chatId, newDate } = action.payload
			const chatIndex = state.chatList.findIndex((item) => item.chatId === chatId)
			if (chatIndex !== -1) {
				state.chatList[chatIndex].date = newDate
				state.selectedChatId = chatId
			}
		}
	}
})

export const { setSelectedChatId, setChatList, updateChatDate } = chatSlice.actions
export default chatSlice.reducer
