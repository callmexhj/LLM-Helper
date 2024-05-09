import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isShowSystemSetting: false,
	modelConfig: {
		activateModel: 'OpenAI',
		OpenAI: {
			apiKey: ''
		}
	},
	isLoading: false
}

export const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {
		setIsShowSystemSetting: (state, action) => {
			state.isShowSystemSetting = action.payload
		},
		updateOpenAIConfig: (state, action) => {
			state.modelConfig.OpenAI.apiKey = action.payload
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	}
})

export const { setIsShowSystemSetting, updateOpenAIConfig, setIsLoading } = systemSlice.actions
export default systemSlice.reducer
