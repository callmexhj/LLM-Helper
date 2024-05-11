import { OpenAIChat } from './LLMs/openai'
import { tongyiChat } from './LLMs/tongyi'
import { modelList } from '@renderer/configs/modelList'

// 根据模型版本来分流请求函数
const isWhatModel = (modelName, modelVersion) => {
	const modelVersionItem = modelList
		.find((model) => model.name === modelName)
		?.versions.find((version) => version.value === modelVersion)
	return modelVersionItem
}

export const chat = (messages, modelConfig, handleResponseOnChatBox, modelVersion) => {
	const messagesBody = messages.slice(0, messages.length - 1).map((message) => {
		return {
			role: message.role,
			content: message.content
		}
	})
	if (isWhatModel('OpenAI', modelVersion)) {
		OpenAIChat(messagesBody, modelConfig.OpenAI, handleResponseOnChatBox)
	} else if (isWhatModel('Tongyi', modelVersion)) {
		tongyiChat(messagesBody, modelConfig.Tongyi, modelVersion, handleResponseOnChatBox)
	}
}
