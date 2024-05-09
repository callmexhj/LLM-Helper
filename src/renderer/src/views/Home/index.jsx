import { useEffect } from 'react'
import styles from './styles.module.scss'
import Content from '@renderer/components/Content'
import { useSelector, useDispatch } from 'react-redux'
// import { setChatList, updateChatDate } from '@renderer/store/slice/chatSlice'
import { setChatList } from '@renderer/store/slice/chatSlice'
import { createChatItem } from '@renderer/tools/genChatItem'
// import genDatetime from '@renderer/tools/genDatetime'

const Home = () => {
	const dispatch = useDispatch()
	const { chatList } = useSelector((state) => state.chat)
	useEffect(() => {
		if (!chatList.length) {
			console.log('chatList is empty')
			dispatch(setChatList([createChatItem()]))
		}
		// else if (chatList.length && chatList[0].messages.length === 0) {
		// 	dispatch(
		// 		updateChatDate({
		// 			chatId: chatList[0].id,
		// 			newDate: genDatetime()
		// 		})
		// 	)
		// }
	}, [])
	return (
		<div className={styles.home}>
			<Content />
		</div>
	)
}

export default Home
