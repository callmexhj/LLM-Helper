import styles from './styles.module.scss'
import HeaderRight from './components/HeaderRight'
import HeaderLeft from './components/HeaderLeft'
import PropTypes from 'prop-types'

const Header = ({ backToChatBox }) => {
	return (
		<div className={styles.header}>
			<HeaderLeft backToChatBox={backToChatBox} />
			<HeaderRight />
		</div>
	)
}

Header.propTypes = {
	backToChatBox: PropTypes.func
}

export default Header
