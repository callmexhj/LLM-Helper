import { useRef } from 'react'
import styles from './styles.module.scss'
import MessageItem from './components/MessageItem'
import InputArea from './components/InputArea'
import PropTypes from 'prop-types'

const ChatBox = ({ messages, onSubmit }) => {
	const chatBoxMessagesRef = useRef(null)

	const handleSubmit = async (value) => {
		// 滑动到消息框最下方
		await onSubmit(value)
		if (chatBoxMessagesRef.current) {
			const { scrollHeight, clientHeight } = chatBoxMessagesRef.current
			chatBoxMessagesRef.current.scrollTop = scrollHeight - clientHeight
		}
	}

	const Messages = () => {
		return (
			messages &&
			messages.map((item, index) => {
				return <MessageItem key={index} value={item} />
			})
		)
	}

	return (
		<div className={styles.chatbox}>
			<div className={styles['chatbox-messages']} ref={chatBoxMessagesRef}>
				{Messages()}
			</div>
			<div className={styles['chatbox-input']}>
				<InputArea onSubmit={handleSubmit} />
			</div>
		</div>
	)
}

ChatBox.propTypes = {
	messages: PropTypes.array,
	onSubmit: PropTypes.func
}

export default ChatBox
