import { useSelector } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'

const MenuList = ({ list, changeChat, deleteChat }) => {
	const { selectedChatId } = useSelector((state) => state.chat)

	const handleCheck = (chatId) => {
		changeChat(chatId)
	}

	const menuItemClass = (chatId) => {
		const classList = [styles['menu-item']]
		if (chatId === selectedChatId) classList.push(styles['menu-item-checked'])
		return classList.join(' ')
	}

	const CloseIco = (chatId) => {
		return (
			chatId === selectedChatId && (
				<CloseOutlined
					onClick={() => deleteChat(chatId)}
					className={styles['menu-item-ico']}
				/>
			)
		)
	}

	return (
		<div className={styles['menu-lists']}>
			{list.map((item) => {
				return (
					<div
						className={menuItemClass(item.id)}
						key={item.id}
						onClick={() => handleCheck(item.id)}
					>
						<div className={styles['menu-item-top']}>
							<span className={styles['menu-item-title']}>{item.title}</span>
							{CloseIco(item.id)}
						</div>
						<div className={styles['menu-item-bottom']}>
							<span className={styles['menu-item-chat-abstract']}>
								{item.chatAbstract}
							</span>
							<span className={styles['menu-item-chat-date']}>{item.date}</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}

MenuList.propTypes = {
	list: PropTypes.array,
	changeChat: PropTypes.func,
	deleteChat: PropTypes.func
}

export default MenuList
