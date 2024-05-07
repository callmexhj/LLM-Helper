import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import robotPng from './robot.png'
import girlPng from './girl.png'

const MessageItem = ({ value }) => {
	const messageItemClass = () => {
		const className = [styles['message-item']]
		if (value.role === 'assistant') {
			className.push(styles['message-item-assistant'])
		} else if (value.role === 'user') {
			className.push(styles['message-item-user'])
		}
		return className.join(' ')
	}

	return (
		<div className={messageItemClass()}>
			<div className={styles['message-item-avatar']}>
				<img src={value.role === 'assistant' ? robotPng : girlPng} />
			</div>
			<div className={styles['message-item-message']}>{value.content}</div>
			<div className={styles['message-item-subinfo']}>{value.date}</div>
		</div>
	)
}

MessageItem.propTypes = {
	value: PropTypes.object
}

export default MessageItem
