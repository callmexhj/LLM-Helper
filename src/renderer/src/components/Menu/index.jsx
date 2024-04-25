import styles from './styles.module.scss'
import Ico from '@renderer/assets/chatIco.png'

const MenuTitle = () => {
	return (
		<div className={styles['menu-title']}>
			<h1>LLM Helper</h1>
			<img src={Ico} />
		</div>
	)
}

const Menu = () => {
	return (
		<div className={styles.menu}>
			<MenuTitle />
		</div>
	)
}

export default Menu
