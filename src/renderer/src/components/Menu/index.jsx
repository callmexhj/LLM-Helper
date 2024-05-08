import styles from './styles.module.scss'
import Ico from '@renderer/assets/chatIco.png'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'
import {
	PlusOutlined,
	CloseOutlined,
	SettingOutlined,
	ClearOutlined,
	GithubOutlined
} from '@ant-design/icons'

const MenuTitle = () => (
	<div className={styles['menu-title']}>
		<h1>LLM Helper</h1>
		<img src={Ico} />
	</div>
)

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

const TopMenuButtonGroup = ({ createNewChat }) => {
	return (
		<div className={styles['menu-button-group']}>
			<Button
				className={styles['menu-button-group-item']}
				icon={<PlusOutlined />}
				onClick={createNewChat}
			>
				新增对话
			</Button>
		</div>
	)
}
TopMenuButtonGroup.propTypes = {
	createNewChat: PropTypes.func
}

const BottomMenuButtonGroup = ({ clearChatList }) => {
	const handleClearChatList = () => {
		Modal.confirm({
			title: '清空确认',
			content: '该操作将清空全部历史聊天记录，请确认。',
			centered: true,
			onOk: () => {
				clearChatList()
			},
			okText: '确认',
			cancelText: '取消'
		})
	}
	return (
		<div className={styles['menu-button-group-bottom']}>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				danger
				icon={<ClearOutlined />}
				onClick={handleClearChatList}
			/>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				icon={<SettingOutlined />}
			/>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				icon={<GithubOutlined />}
			/>
		</div>
	)
}
BottomMenuButtonGroup.propTypes = {
	clearChatList: PropTypes.func
}

const Menu = ({ menuList, changeChat, createNewChat, deleteChat, clearChatList }) => {
	return (
		<div className={styles.menu}>
			<MenuTitle />
			<TopMenuButtonGroup createNewChat={createNewChat} />
			<MenuList list={[...menuList]} changeChat={changeChat} deleteChat={deleteChat} />
			<BottomMenuButtonGroup clearChatList={clearChatList} />
		</div>
	)
}

Menu.propTypes = {
	menuList: PropTypes.array,
	changeChat: PropTypes.func,
	createNewChat: PropTypes.func,
	deleteChat: PropTypes.func,
	clearChatList: PropTypes.func
}

export default Menu
