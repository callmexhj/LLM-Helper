import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Ico from '../Icos'
import { useSelector } from 'react-redux'

const HeaderLeft = () => {
	const { selectedChatId, chatList } = useSelector((state) => state.chat)
	const [mainTitle, setMainTitle] = useState('')
	const [subTitle, setSubTitle] = useState('')

	// 选择对话更改后，同步修改Header
	useEffect(() => {
		const mainTitleFromStore = chatList.find((item) => item.id === selectedChatId)?.title
		const subTitleFromStore = chatList.find((item) => item.id === selectedChatId)?.chatAbstract
		setMainTitle(mainTitleFromStore)
		setSubTitle(subTitleFromStore)
	}, [selectedChatId])
	return (
		<div className={styles['header-left']}>
			<span className={styles['header-left-maintitle']}>{mainTitle || '请新建对话'}</span>
			<span className={styles['header-left-subtitle']}>
				{subTitle || '请点击新建对话按钮以开始聊天'}
			</span>
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
