import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import leftPng from './left.png'
import PropTypes from 'prop-types'

const HeaderLeft = ({ backToChatBox }) => {
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
		if (isShowSystemSetting) return ''
		else return subTitle || '请点击新建对话按钮以开始聊天'
	}

	const BackButton = () => {
		if (isShowSystemSetting) {
			return (
				<div className={styles['header-left-back']}>
					<img src={leftPng} alt="返回" onClick={backToChatBox} />
				</div>
			)
		} else {
			return null
		}
	}

	return (
		<div className={styles['header-left']}>
			{BackButton()}
			<div className={styles['header-left-right']}>
				<span className={styles['header-left-maintitle']}>{mainTitleDisplayValue()}</span>
				<span className={styles['header-left-subtitle']}>{subTitleDisplayValue()}</span>
			</div>
		</div>
	)
}

HeaderLeft.propTypes = {
	backToChatBox: PropTypes.func
}

export default HeaderLeft
