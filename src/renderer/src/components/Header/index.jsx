import styles from './styles.module.scss'
import Ico from '../Icos'

const HeaderLeft = () => {
	return (
		<div className={styles['header-left']}>
			<span className={styles['header-left-maintitle']}>Header MainTitle</span>
			<span className={styles['header-left-subtitle']}>Header SubTitle</span>
		</div>
	)
}

const HeaderRight = () => {
	return (
		<div className={styles['header-right']}>
			<Ico icoType={'fullscreen'} size={24} isPointer={true} />
			<Ico icoType={'close'} size={24} />
		</div>
	)
}

const Header = () => {
	return (
		<div className={styles.header}>
			<HeaderLeft />
			<HeaderRight />
		</div>
	)
}

export default Header
