import OpenAI from 'openai'

export const OpenAIChat = async (messages, openAiModelConfig, handleResponseOnChatBox) => {
	try {
		console.log(messages, openAiModelConfig)
		const openai = new OpenAI({
			apiKey: openAiModelConfig.apiKey,
			dangerouslyAllowBrowser: true,
			timeout: 5000
		})
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages,
			stream: true
		})
		for await (const chunk of completion) {
			if (chunk.choices) {
				await handleResponseOnChatBox({
					isStop: chunk.choices[0].finish_reason === 'stop',
					value: chunk.choices[0].delta.content,
					error: false
				})
			}
		}
	} catch (error) {
		console.log(1111)
		handleResponseOnChatBox({
			isStop: true,
			value: String(error),
			error: true
		})
	}
}
