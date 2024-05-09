import { useState } from 'react'
import styles from './styles.module.scss'
import { ClearIco, RobotIco, ReChatIco, SendIco } from './Icos'
import { Input, message } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const { TextArea } = Input

const InputArea = ({ onSubmit }) => {
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

	return (
		<div className={styles['input-area']}>
			{contextHolder}
			<div className={styles['input-area-button-group']}>
				<div className={styles['input-area-button-group-item']}>
					<ClearIco />
				</div>
				<div className={styles['input-area-button-group-item']}>
					<ReChatIco />
				</div>
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
	onSubmit: PropTypes.func
}
export default InputArea
