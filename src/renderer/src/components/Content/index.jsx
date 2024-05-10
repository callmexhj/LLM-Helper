import { useEffect, useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'
import ChatBox from '../ChatBox'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
	setSelectedChatId,
	setChatList,
	updateChatMessage,
	deleteChat,
	updateChatModelVersion
} from '@renderer/store/slice/chatSlice'
import {
	setIsShowSystemSetting,
	updateOpenAIConfig,
	setIsLoading
} from '@renderer/store/slice/systemSlice'
import { ConfigProvider, message } from 'antd'
import { createChatItem } from '@renderer/tools/genChatItem'
import genDatetime from '@renderer/tools/genDatetime'
import Setting from '../Setting'
import { chat } from '@renderer/api/chat'

const theme = () => {
	return {
		token: {
			colorPrimary: '#4096ff'
		}
	}
}

const Content = () => {
	const { chatList, selectedChatId } = useSelector((state) => state.chat)
	const { isShowSystemSetting, modelConfig, isLoading } = useSelector((state) => state.system)
	const [messages, setMessages] = useState([])
	const dispatch = useDispatch()
	const [messageApi, contextHolder] = message.useMessage()
	const [modelVersion, setModelVersion] = useState(null)
	let messageContentCache = ''

	useEffect(() => {
		if (!chatList.length) {
			createNewChat()
		}
	}, [])

	useEffect(() => {
		console.log(messages)
	}, [messages])

	// 根据选取的chatId，更新messages
	useEffect(() => {
		console.log(selectedChatId, chatList)
		if (chatList.length > 0) {
			const chatItem = chatList.find((item) => {
				return item.id === selectedChatId
			})
			const messagesCache = chatItem.messages
			setMessages(messagesCache)
			setModelVersion(chatItem.modelVersion)
		}
	}, [selectedChatId])

	// 在chatList长度变化时，更新selectedChatId
	useEffect(() => {
		if (chatList.length > 0) {
			dispatch(setSelectedChatId(chatList[0].id))
		} else {
			dispatch(setSelectedChatId(''))
			setMessages([])
		}
	}, [chatList.length])

	// 当isLoading变化时，调用chat
	useEffect(() => {
		isLoading && chat(messages, modelConfig, handleResponseOnChatBox)
	}, [isLoading])

	// 当结束对话时，更新redux
	useEffect(() => {
		!isLoading &&
			dispatch(
				updateChatMessage({
					chatId: selectedChatId,
					newMessage: messages
				})
			)
	}, [messages, isLoading])

	const changeChat = (chatId) => {
		dispatch(setIsShowSystemSetting(false))
		dispatch(setSelectedChatId(chatId))
	}

	const createNewChat = () => {
		const chatListCache = [...chatList]
		const chatItem = createChatItem()
		chatListCache.unshift(chatItem)
		dispatch(setChatList(chatListCache))
		// createChatBoxNode(chatItem.id)
	}

	const handleDeleteChat = (chatId) => {
		dispatch(deleteChat(chatId))
	}

	// 传递给chat函数的回调函数
	const handleResponseOnChatBox = (response) => {
		const messageCache = JSON.parse(JSON.stringify(messages))
		if (response.isStop) {
			messageContentCache = ''
			// 错误展示
			if (response.error) {
				messageCache[messageCache.length - 1].content = response.value
				setMessages(messageCache)
				messageApi.error(response.value)
			}
			dispatch(setIsLoading(false))
			return
		}
		messageContentCache += response.value
		messageCache[messageCache.length - 1].content = messageContentCache
		setMessages(messageCache)
	}

	// 更新message数组，并修改redux中的message数组
	const onSubmit = (value) => {
		console.log(value)
		return new Promise((resolve) => {
			const messageCache = [...messages]
			messageCache.push(
				{
					role: 'user',
					content: value,
					date: genDatetime()
				},
				{
					role: 'assistant',
					content: '分析中...',
					date: genDatetime()
				}
			)
			setMessages([...messageCache])
			dispatch(
				updateChatMessage({
					chatId: selectedChatId,
					newMessage: messageCache
				})
			)
			dispatch(setIsLoading(true))
			resolve()
		})
	}

	const clearChatList = () => {
		dispatch(setChatList([]))
		messageApi.success('清空成功')
	}

	const showSystemSetting = () => {
		dispatch(setIsShowSystemSetting(!isShowSystemSetting))
	}

	// 更新OpenaiKey并存储到redux
	const handleOpenAIKeyChange = ({ target }) => {
		dispatch(updateOpenAIConfig(target.value))
	}

	// 重置当前聊天记录
	const handleReChat = () => {
		const initMessages = [
			{
				role: 'assistant',
				content: '你好，我是你的助理，请问有什么可以帮您的？',
				date: genDatetime()
			}
		]
		setMessages([...initMessages])
		dispatch(
			updateChatMessage({
				chatId: selectedChatId,
				newMessage: [...initMessages]
			})
		)
	}

	const handleModelChange = (value) => {
		setModelVersion(value)
		dispatch(updateChatModelVersion({ chatId: selectedChatId, modelVersion: value }))
	}

	const contentValue = () => {
		if (isShowSystemSetting) return <Setting onOpenAIKeyChange={handleOpenAIKeyChange} />
		else
			return (
				<ChatBox
					messages={messages}
					onSubmit={onSubmit}
					onReChat={handleReChat}
					modelVersion={modelVersion}
					onModelChange={handleModelChange}
				/>
			)
	}

	const backToChatBox = () => {
		dispatch(setIsShowSystemSetting(false))
	}

	return (
		<ConfigProvider theme={theme()}>
			{contextHolder}
			<div className={styles.content}>
				<div className={styles.menu}>
					<Menu
						menuList={chatList}
						changeChat={changeChat}
						createNewChat={createNewChat}
						deleteChat={handleDeleteChat}
						clearChatList={clearChatList}
						showSystemSetting={showSystemSetting}
					/>
				</div>
				<div className={styles['content-chat']}>
					<Header backToChatBox={backToChatBox} />
					{contentValue()}
				</div>
			</div>
		</ConfigProvider>
	)
}

export default Content
