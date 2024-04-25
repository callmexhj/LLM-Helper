import Header from '../Header'
import Menu from '../Menu'
import ChatBox from '../ChatBox'
import styles from './styles.module.scss'

const Content = () => {
	return (
		<div className={styles.content}>
			<div className={styles.menu}>
				<Menu />
			</div>
			<div className={styles['content-chat']}>
				<Header />
				<ChatBox />
			</div>
		</div>
	)
}

export default Content
