import { useEffect, useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'
import ChatBox from '../ChatBox'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedChatId, setChatList } from '@renderer/store/slice/chatSlice'
import { ConfigProvider } from 'antd'
import { createChatItem } from '@renderer/tools/genChatItem'

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

	// 默认指向第一个对话
	useEffect(() => {
		chatList.length > 0 && dispatch(setSelectedChatId(chatList[0].id))
	}, [chatList])

	useEffect(() => {
		if (chatList.length > 0) {
			const messagesCache = chatList.find((item) => {
				return item.id === selectedChatId
			})?.messages
			setMessages(messagesCache)
		}
	}, [selectedChatId])

	const changeChat = (chatId) => {
		dispatch(setSelectedChatId(chatId))
	}

	const createNewChat = () => {
		const chatListCache = [...chatList]
		chatListCache.unshift(createChatItem())
		dispatch(setChatList(chatListCache))
	}

	const deleteChat = (chatId) => {
		const chatListCache = [...chatList].filter((item) => {
			return item.id !== chatId
		})
		dispatch(setChatList(chatListCache))
	}

	return (
		<ConfigProvider theme={theme()}>
			<div className={styles.content}>
				<div className={styles.menu}>
					<Menu
						menuList={chatList}
						changeChat={changeChat}
						createNewChat={createNewChat}
						deleteChat={deleteChat}
					/>
				</div>
				<div className={styles['content-chat']}>
					<Header />
					<ChatBox messages={messages} />
				</div>
			</div>
		</ConfigProvider>
	)
}

export default Content
