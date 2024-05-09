import styles from './styles.module.scss'
import Ico from '@renderer/assets/chatIco.png'
import PropTypes from 'prop-types'
import MenuList from './components/MenuList'
import { TopMenuButtonGroup, BottomMenuButtonGroup } from './components/ButtonGroup'

const MenuTitle = () => (
	<div className={styles['menu-title']}>
		<h1>LLM Helper</h1>
		<img src={Ico} />
	</div>
)

const Menu = ({
	menuList,
	changeChat,
	createNewChat,
	deleteChat,
	clearChatList,
	showSystemSetting
}) => {
	return (
		<div className={styles.menu}>
			<MenuTitle />
			<TopMenuButtonGroup createNewChat={createNewChat} />
			<MenuList list={[...menuList]} changeChat={changeChat} deleteChat={deleteChat} />
			<BottomMenuButtonGroup
				clearChatList={clearChatList}
				showSystemSetting={showSystemSetting}
			/>
		</div>
	)
}

Menu.propTypes = {
	menuList: PropTypes.array,
	changeChat: PropTypes.func,
	createNewChat: PropTypes.func,
	deleteChat: PropTypes.func,
	clearChatList: PropTypes.func,
	showSystemSetting: PropTypes.func
}

export default Menu
