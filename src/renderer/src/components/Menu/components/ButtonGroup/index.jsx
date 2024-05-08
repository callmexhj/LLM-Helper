import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'
import { PlusOutlined, SettingOutlined, ClearOutlined, GithubOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

export const TopMenuButtonGroup = ({ createNewChat }) => {
	return (
		<div className={styles['menu-button-group']}>
			<Button
				className={styles['menu-button-group-item']}
				icon={<PlusOutlined />}
				onClick={createNewChat}
			>
				新增对话
			</Button>
		</div>
	)
}
TopMenuButtonGroup.propTypes = {
	createNewChat: PropTypes.func
}

export const BottomMenuButtonGroup = ({ clearChatList, showSystemSetting }) => {
	const { isShowSystemSetting } = useSelector((state) => state.system)
	const handleClearChatList = () => {
		Modal.confirm({
			title: '清空确认',
			content: '该操作将清空全部历史聊天记录，请确认。',
			centered: true,
			onOk: () => {
				clearChatList()
			},
			okText: '确认',
			cancelText: '取消'
		})
	}
	return (
		<div className={styles['menu-button-group-bottom']}>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				danger
				icon={<ClearOutlined />}
				onClick={handleClearChatList}
			/>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				type={isShowSystemSetting ? 'primary' : ''}
				icon={<SettingOutlined />}
				onClick={showSystemSetting}
			/>
			<Button
				className={styles['menu-button-group-bottom-item']}
				shape="circle"
				icon={<GithubOutlined />}
			/>
		</div>
	)
}
BottomMenuButtonGroup.propTypes = {
	clearChatList: PropTypes.func,
	showSystemSetting: PropTypes.func
}
