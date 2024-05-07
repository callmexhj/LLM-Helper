import styles from './styles.module.scss'
import { ClearIco, RobotIco, ReChatIco, SendIco } from './Icos'
import { Input } from 'antd'

const { TextArea } = Input

const InputArea = () => {
	return (
		<div className={styles['input-area']}>
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
							autoSize={{ minRows: 3 }}
							style={{ width: '100%', border: 'none' }}
						/>
					</div>
					<div className={styles['input-area-inputbox-button']}>
						<div className={styles['input-area-inputbox-button-ico']}>
							<SendIco />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InputArea
