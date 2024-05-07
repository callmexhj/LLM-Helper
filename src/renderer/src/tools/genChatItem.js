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
				content: '你好',
				date: '2024-05-07 21:09:21'
			},
			{
				role: 'user',
				content: '你是谁啊',
				date: '2024-05-07 21:09:21'
			},
			{
				role: 'assistant',
				content: '你好',
				date: '2024-05-07 21:09:21'
			},
			{
				role: 'user',
				content: '你是谁啊',
				date: '2024-05-07 21:09:21'
			},
			{
				role: 'assistant',
				content: '你好',
				date: '2024-05-07 21:09:21'
			},
			{
				role: 'user',
				content: '你是谁啊',
				date: '2024-05-07 21:09:21'
			}
		],
		date: genDatetime()
	}
}
