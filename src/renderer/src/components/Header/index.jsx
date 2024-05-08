import styles from './styles.module.scss'
import HeaderRight from './components/HeaderRight'
import HeaderLeft from './components/HeaderLeft'

const Header = () => {
	return (
		<div className={styles.header}>
			<HeaderLeft />
			<HeaderRight />
		</div>
	)
}

export default Header
