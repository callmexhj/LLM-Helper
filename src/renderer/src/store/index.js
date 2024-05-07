import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slice/chatSlice'

export default configureStore({
	reducer: {
		chat: chatSlice
	}
})
