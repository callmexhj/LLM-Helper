import { genChatId } from '@renderer/tools/genChatId'
import genDatetime from '@renderer/tools/genDatetime'

export const createChatItem = () => {
	return {
		id: genChatId(),
		title: '新的对话',
		chatAbstract: '空白对话',
		messages: [
			{
				role: 'assistant',
				content: '你好，我是你的助理，请问有什么可以帮您的？',
				date: genDatetime()
			}
		],
		date: genDatetime()
	}
}
