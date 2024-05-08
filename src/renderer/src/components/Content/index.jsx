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
	deleteChat
} from '@renderer/store/slice/chatSlice'
import { ConfigProvider } from 'antd'
import { createChatItem } from '@renderer/tools/genChatItem'
import genDatetime from '@renderer/tools/genDatetime'

const theme = () => {
	return {
		token: {
			colorPrimary: '#4096ff'
		}
	}
}

const Content = () => {
	const { chatList, selectedChatId } = useSelector((state) => state.chat)
	const [messages, setMessages] = useState([])
	const dispatch = useDispatch()

	// 根据选取的chatId，更新messages
	useEffect(() => {
		if (chatList.length > 0) {
			const messagesCache = chatList.find((item) => {
				return item.id === selectedChatId
			})?.messages
			setMessages(messagesCache)
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

	const changeChat = (chatId) => {
		dispatch(setSelectedChatId(chatId))
	}

	const createNewChat = () => {
		const chatListCache = [...chatList]
		chatListCache.unshift(createChatItem())
		dispatch(setChatList(chatListCache))
	}

	const handleDeleteChat = (chatId) => {
		dispatch(deleteChat(chatId))
	}

	// 更新message数组，并修改redux中的message数组
	const onSubmit = (value) => {
		return new Promise((resolve) => {
			const messageCache = [...messages]
			messageCache.push({
				role: 'user',
				content: value,
				date: genDatetime()
			})
			setMessages(messageCache)
			dispatch(
				updateChatMessage({
					chatId: selectedChatId,
					newMessage: messageCache
				})
			)
			resolve()
		})
	}

	return (
		<ConfigProvider theme={theme()}>
			<div className={styles.content}>
				<div className={styles.menu}>
					<Menu
						menuList={chatList}
						changeChat={changeChat}
						createNewChat={createNewChat}
						deleteChat={handleDeleteChat}
					/>
				</div>
				<div className={styles['content-chat']}>
					<Header />
					<ChatBox messages={messages} onSubmit={onSubmit} />
				</div>
			</div>
		</ConfigProvider>
	)
}

export default Content
