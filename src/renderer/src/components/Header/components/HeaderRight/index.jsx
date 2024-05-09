import { useState } from 'react'
import Ico from '@renderer/components/Icos'
import styles from './styles.module.scss'

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

export default HeaderRight
