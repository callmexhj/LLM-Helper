import { useState } from 'react'
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
	const [isMaximize, setIsMaximize] = useState(false)

	const handleMinimize = () => {
		window.api.minimize()
	}

	const handleClose = () => {
		window.api.close()
	}

	const handleMaximize = () => {
		setIsMaximize(true)
		window.api.maximize()
	}

	const handleDefaultScreen = () => {
		setIsMaximize(false)
		window.api.defaultScreen()
	}

	const fullOrDefaultScreen = () => {
		if (!isMaximize) {
			return (
				<Ico icoType={'fullscreen'} size={24} isPointer={true} onClick={handleMaximize} />
			)
		} else {
			return (
				<Ico
					icoType={'defaultscreen'}
					size={24}
					isPointer={true}
					onClick={handleDefaultScreen}
				/>
			)
		}
	}

	return (
		<div className={styles['header-right']}>
			<Ico icoType={'minimize'} size={24} isPointer={true} onClick={handleMinimize} />
			{fullOrDefaultScreen()}
			<Ico icoType={'close'} size={24} isPointer={true} onClick={handleClose} />
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
