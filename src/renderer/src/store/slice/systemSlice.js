import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isShowSystemSetting: false
}

export const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {
		setIsShowSystemSetting: (state, action) => {
			state.isShowSystemSetting = action.payload
		}
	}
})

export const { setIsShowSystemSetting } = systemSlice.actions
export default systemSlice.reducer
