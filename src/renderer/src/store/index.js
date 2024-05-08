import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slice/chatSlice'
import systemSlice from './slice/systemSlice'

export default configureStore({
	reducer: {
		chat: chatSlice,
		system: systemSlice
	}
})
