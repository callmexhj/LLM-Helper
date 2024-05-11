import styles from './styles.module.scss'
import { modelList } from '@renderer/configs/modelList'

export const ModelOptions = modelList.map((item) => {
	return {
		label: (
			<div
				className={styles['input-area-button-group-item-selector-content-cust-group-title']}
			>
				{item.icon}
				<span style={{ marginLeft: '5px' }}>{item.name}</span>
			</div>
		),
		title: item.name,
		options: item.versions.map((version) => {
			return { label: <span>{version.label}</span>, value: version.value }
		})
	}
})
