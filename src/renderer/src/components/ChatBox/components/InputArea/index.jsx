import { useState, useRef } from 'react'
import styles from './styles.module.scss'
import { ClearIco, RobotIco, ReChatIco, SendIco } from './Icos'
import { Input, message, Modal, Tooltip, Select } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ModelOptions } from '@renderer/components/ModelOptions'

const { TextArea } = Input

const InputArea = ({ onSubmit, onReChat, modelVersion, onModelChange }) => {
	const { isLoading } = useSelector((state) => state.system)
	const [isShowModelSelector, setIsShowModelSelector] = useState(false)
	const [value, setValue] = useState('')
	const [messageApi, contextHolder] = message.useMessage()
	// const [selectValue, setSelectValue] = useState(null)
	const timer = useRef(null)

	// useEffect(() => {
	// 	console.log(modelVersion)
	// 	setSelectValue(modelVersion)
	// }, [modelVersion])

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

	// 清空对话框
	const resetInputTextArea = () => {
		setValue('')
	}

	// 清空当前对话聊天记录
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

	const closseModelSelector = () => {
		setIsShowModelSelector(false)
		clearTimeout(timer.current)
	}

	const handleChooseModel = () => {
		setIsShowModelSelector(true)
		timer.current = setTimeout(closseModelSelector, 7000)
	}

	const ModelSelectorClass = () => {
		const classArray = [styles['input-area-button-group-item']]
		if (isShowModelSelector) {
			classArray.push(styles['input-area-button-group-item-selector'])
		}
		return classArray.join(' ')
	}

	const handleSelectChanged = (value) => {
		onModelChange(value)
		clearTimeout(timer.current)
		timer.current = setTimeout(closseModelSelector, 2000)
	}

	const handleSelectEnter = (open) => {
		clearTimeout(timer.current)
		if (open) return
		timer.current = setTimeout(closseModelSelector, 3000)
	}

	const ModelSelector = () => {
		return (
			<div className={styles['input-area-button-group-item-selector-content']}>
				<Select
					className={styles['input-area-button-group-item-selector-content-cust']}
					size="small"
					style={{ width: 100 }}
					value={modelVersion}
					onDropdownVisibleChange={handleSelectEnter}
					onChange={handleSelectChanged}
					// 清除父元素点击事件传递
					onClick={(e) => e.stopPropagation()}
					options={ModelOptions}
				/>
			</div>
		)
	}

	const isShowModelSelectorNode = () => {
		return isShowModelSelector ? <ModelSelector /> : <RobotIco />
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
				<Tooltip title={!isShowModelSelector && '切换模型'}>
					<div className={ModelSelectorClass()} onClick={handleChooseModel}>
						{isShowModelSelectorNode()}
					</div>
				</Tooltip>
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
	onReChat: PropTypes.func,
	modelVersion: PropTypes.string,
	onModelChange: PropTypes.func
}
export default InputArea
