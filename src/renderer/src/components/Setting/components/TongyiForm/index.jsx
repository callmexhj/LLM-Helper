import { Input } from 'antd'
import FormItem from '../FormItem'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const TongyiForm = ({ onTongyiKeyChange }) => {
	const { modelConfig } = useSelector((state) => state.system)
	return (
		<div className={styles['tongyi-form']}>
			<FormItem
				mainTitle={'通义千问 API-Key'}
				subTitle={'需要从阿里云控制台获取'}
				slot={
					<Input.Password
						value={modelConfig.Tongyi.apiKey}
						onChange={onTongyiKeyChange}
						type="text"
						placeholder="请输入 Tongyi API-Key"
					/>
				}
			/>
		</div>
	)
}

TongyiForm.propTypes = {
	onTongyiKeyChange: PropTypes.func
}

export default TongyiForm
