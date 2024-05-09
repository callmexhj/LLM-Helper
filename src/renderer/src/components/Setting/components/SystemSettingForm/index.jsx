import styles from './styles.module.scss'
import FormItem from '../FormItem'
import { Segmented } from 'antd'

const SystemSettingForm = () => {
	return (
		<div className={styles['system-setting-form']}>
			<FormItem
				mainTitle={'系统语言'}
				slot={
					<Segmented
						options={['中文', 'English']}
						block
						onChange={(value) => {
							console.log(value) // string
						}}
					/>
				}
			/>
			<FormItem
				mainTitle={'主题颜色'}
				slot={
					<Segmented
						options={['亮色模式', '暗夜模式']}
						block
						onChange={(value) => {
							console.log(value) // string
						}}
					/>
				}
			/>
		</div>
	)
}

export default SystemSettingForm
