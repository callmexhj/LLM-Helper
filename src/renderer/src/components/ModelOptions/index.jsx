import { OpenAIIco } from '@renderer/components/ChatBox/components/InputArea/Icos'
import styles from './styles.module.scss'

export const ModelOptions = [
	{
		label: (
			<div
				className={styles['input-area-button-group-item-selector-content-cust-group-title']}
			>
				<OpenAIIco />
				<span style={{ marginLeft: '5px' }}>OpenAI</span>
			</div>
		),
		title: 'OpenAI',
		options: [
			{ label: <span>GPT-3.5</span>, value: 'gpt-3.5' },
			{ label: <span>GPT-4.0</span>, value: 'gpt-4.0', disabled: false }
		]
	}
]
