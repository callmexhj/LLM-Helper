import { genChatId } from '@renderer/tools/genChatId'
import genDatetime from '@renderer/tools/genDatetime'

export const createChatItem = () => {
	return {
		id: genChatId(),
		title: '新的对话',
		chatAbstract: '空白对话',
		messages: [],
		date: genDatetime()
	}
}
