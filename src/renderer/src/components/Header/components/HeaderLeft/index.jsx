import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

const HeaderLeft = () => {
	const { selectedChatId, chatList } = useSelector((state) => state.chat)
	const { isShowSystemSetting } = useSelector((state) => state.system)
	const [mainTitle, setMainTitle] = useState('')
	const [subTitle, setSubTitle] = useState('')

	// 选择对话更改后，同步修改Header
	useEffect(() => {
		const mainTitleFromStore = chatList.find((item) => item.id === selectedChatId)?.title
		const subTitleFromStore = chatList.find((item) => item.id === selectedChatId)?.chatAbstract
		setMainTitle(mainTitleFromStore)
		setSubTitle(subTitleFromStore)
	}, [selectedChatId])

	const mainTitleDisplayValue = () => {
		if (isShowSystemSetting) return '系统设置'
		else return mainTitle || '请新建对话'
	}

	const subTitleDisplayValue = () => {
		if (isShowSystemSetting) return '您可在此设置系统相关配置'
		else return subTitle || '请点击新建对话按钮以开始聊天'
	}

	return (
		<div className={styles['header-left']}>
			<span className={styles['header-left-maintitle']}>{mainTitleDisplayValue()}</span>
			<span className={styles['header-left-subtitle']}>{subTitleDisplayValue()}</span>
		</div>
	)
}

export default HeaderLeft
