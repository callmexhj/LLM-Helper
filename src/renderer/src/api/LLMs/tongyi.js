const modelPath = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'

const handleError = (error, handler) => {
	handler({
		isStop: true,
		value: String(error),
		error: true
	})
}

const handleResult = async (value, lastResultIndex, handleResponseOnChatBox) => {
	const decoder = new TextDecoder('utf-8')
	const responseString = decoder.decode(value)
	// 按api接口格式截取字符串后转换成数组
	const jsonStringArray = responseString.split('data:')
	if (jsonStringArray.length > 1) {
		const {
			output: { text }
		} = JSON.parse(jsonStringArray[1])
		// 适应content message组件的文字递增模式进行改造，截取每次新增的字符串作为chrome消息传递内容
		const removedContent = text.substring(lastResultIndex)
		if (removedContent) {
			console.log(jsonStringArray, removedContent)
			await handleResponseOnChatBox({
				isStop: false,
				value: removedContent,
				error: false
			})
		}
		return text.length
	} else {
		handleError('No result, Please check your model config', handleResponseOnChatBox)
	}
}

const chatWithTongyi = async (messages, apiKey, modelName, handleResponseOnChatBox) => {
	try {
		const response = await fetch(modelPath, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
				'X-DashScope-SSE': 'enable'
			},
			body: JSON.stringify({
				model: modelName,
				input: {
					messages
				}
			})
		})
		const responseReader = response.body.getReader()
		// 记录上次回答的长度以在后续步骤进行新增字符串切割
		let lastResultIndex = 0
		let isReading = true
		while (isReading) {
			const { done, value } = await responseReader.read()
			if (done) {
				await handleResponseOnChatBox({
					isStop: true,
					value: '',
					error: false
				})
				break
			}
			lastResultIndex = await handleResult(value, lastResultIndex, handleResponseOnChatBox)
		}
	} catch (error) {
		handleError(error, handleResponseOnChatBox)
	}
}

export const tongyiChat = async (
	messages,
	tongyiModelConfig,
	modelName,
	handleResponseOnChatBox
) => {
	try {
		const { apiKey } = tongyiModelConfig
		const messagesWithoutFirst = [...messages]
		messagesWithoutFirst.shift()
		await chatWithTongyi(messagesWithoutFirst, apiKey, modelName, handleResponseOnChatBox)
	} catch (error) {
		handleError(error, handleResponseOnChatBox)
	}
}
