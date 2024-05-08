import styles from './styles.module.scss'
import MessageItem from './components/MessageItem'
import InputArea from './components/InputArea'
import PropTypes from 'prop-types'

const ChatBox = ({ messages, onSubmit }) => {
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
			<div className={styles['chatbox-input']}>
				<InputArea onSubmit={onSubmit} />
			</div>
		</div>
	)
}

ChatBox.propTypes = {
	messages: PropTypes.array,
	onSubmit: PropTypes.func
}

export default ChatBox
