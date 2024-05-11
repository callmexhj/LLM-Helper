import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isShowSystemSetting: false,
	modelConfig: {
		OpenAI: {
			apiKey: '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'
		},
		Tongyi: {
			apiKey: 'sk-c7cc2109f9004e128aeaacca7da3329a'
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
		updateTongyiConfig: (state, action) => {
			state.modelConfig.Tongyi.apiKey = action.payload
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	}
})

export const { setIsShowSystemSetting, updateOpenAIConfig, setIsLoading, updateTongyiConfig } =
	systemSlice.actions
export default systemSlice.reducer
