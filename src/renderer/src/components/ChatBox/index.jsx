import styles from './styles.module.scss'
import MessageItem from './components/MessageItem'
import InputArea from './components/InputArea'
import PropTypes from 'prop-types'

const ChatBox = ({ messages }) => {
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
			<div className={styles['chatbox-messages']}>{Messages()}</div>
			<InputArea />
		</div>
	)
}

ChatBox.propTypes = {
	messages: PropTypes.array
}

export default ChatBox
