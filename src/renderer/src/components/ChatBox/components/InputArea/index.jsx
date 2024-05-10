import { useState } from 'react'
import styles from './styles.module.scss'
import { ClearIco, RobotIco, ReChatIco, SendIco } from './Icos'
import { Input, message, Modal, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const { TextArea } = Input

const InputArea = ({ onSubmit, onReChat }) => {
	const { isLoading } = useSelector((state) => state.system)
	const [value, setValue] = useState('')
	const [messageApi, contextHolder] = message.useMessage()

	const handleOnSubmit = async () => {
		if (value.length === 0) {
			messageApi.warning('输入不能为空')
			return
		}
		await onSubmit(value)
		setValue('')
	}

	const handleKeyPress = (e) => {
		if (e && e.key === 'Enter' && !e.shiftKey) {
			e && e.preventDefault()
			handleOnSubmit()
		}
	}

	const resetInputTextArea = () => {
		setValue('')
	}

	const handleReChat = () => {
		Modal.confirm({
			title: '清空确认',
			content: '该操作将清空当前对话的聊天记录，请确认。',
			centered: true,
			onOk: () => {
				onReChat()
			},
			okText: '确认',
			cancelText: '取消'
		})
	}

	return (
		<div className={styles['input-area']}>
			{contextHolder}
			<div className={styles['input-area-button-group']}>
				<Tooltip title="清空输入框">
					<div
						className={styles['input-area-button-group-item']}
						onClick={resetInputTextArea}
					>
						<ClearIco />
					</div>
				</Tooltip>
				<Tooltip title="清空聊天">
					<div className={styles['input-area-button-group-item']} onClick={handleReChat}>
						<ReChatIco />
					</div>
				</Tooltip>
				<div className={styles['input-area-button-group-item']}>
					<RobotIco />
				</div>
			</div>
			<div className={styles['input-area-inputbox']}>
				<div className={styles['input-area-inputbox-content']}>
					<div className={styles['input-area-inputbox-input']}>
						<TextArea
							value={value}
							placeholder="请输入提问内容，按Enter快捷发送，Shift+Enter换行"
							onChange={(e) => setValue(e.target.value)}
							autoSize={{ minRows: 3, maxRows: 3 }}
							style={{ width: '100%', border: 'none' }}
							onKeyPress={handleKeyPress}
							disabled={isLoading}
						/>
					</div>
					<div className={styles['input-area-inputbox-button']}>
						<div
							className={styles['input-area-inputbox-button-ico']}
							onClick={handleOnSubmit}
						>
							<SendIco />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

InputArea.propTypes = {
	onSubmit: PropTypes.func,
	onReChat: PropTypes.func
}
export default InputArea
