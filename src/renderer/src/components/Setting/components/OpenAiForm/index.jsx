import { Input } from 'antd'
import FormItem from '../FormItem'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const OpenAIForm = ({ onOpenAIKeyChange }) => {
	const { modelConfig } = useSelector((state) => state.system)
	return (
		<div className={styles['openai-form']}>
			<FormItem
				mainTitle={'OpenAI Key'}
				subTitle={'需要从OpenAI控制台获取'}
				slot={
					<Input.Password
						value={modelConfig.OpenAI.apiKey}
						onChange={onOpenAIKeyChange}
						type="text"
						placeholder="请输入OpenAI Key"
					/>
				}
			/>
		</div>
	)
}

OpenAIForm.propTypes = {
	onOpenAIKeyChange: PropTypes.func
}

export default OpenAIForm
