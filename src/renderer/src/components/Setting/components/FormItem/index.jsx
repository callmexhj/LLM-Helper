import styles from './styles.module.scss'
import PropTypes from 'prop-types'

const FormItem = ({ mainTitle, subTitle, slot }) => {
	return (
		<div className={styles['setting-card-form']}>
			<div className={styles['setting-card-form-item']}>
				<div className={styles['setting-card-form-item-label']}>
					<span className={styles['setting-card-form-item-label-maintitle']}>
						{mainTitle}
					</span>
					<span className={styles['setting-card-form-item-label-subtitle']}>
						{subTitle}
					</span>
				</div>
				<div className={styles['setting-card-form-item-input']}>{slot}</div>
			</div>
		</div>
	)
}

FormItem.propTypes = {
	mainTitle: PropTypes.string,
	subTitle: PropTypes.string,
	slot: PropTypes.node
}

export default FormItem
