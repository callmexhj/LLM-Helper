import styles from './styles.module.scss'
import Content from '@renderer/components/Content'
// import { setChatList, updateChatDate } from '@renderer/store/slice/chatSlice'
// import genDatetime from '@renderer/tools/genDatetime'

const Home = () => {
	return (
		<div className={styles.home}>
			<Content />
		</div>
	)
}

export default Home
