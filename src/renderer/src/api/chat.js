import { OpenAIChat } from './LLMs/openai'

export const chat = (messages, modelConfig, handleResponseOnChatBox) => {
	const messagesBody = messages.slice(0, messages.length - 1).map((message) => {
		return {
			role: message.role,
			content: message.content
		}
	})
	const { activateModel } = modelConfig
	const modelConfigObject = modelConfig[activateModel]
	if (activateModel === 'OpenAI') {
		OpenAIChat(messagesBody, modelConfigObject, handleResponseOnChatBox)
	}
}
