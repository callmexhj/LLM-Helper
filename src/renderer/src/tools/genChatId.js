export const genChatId = () => {
	const characters = 'abcdefghijklmnopqrstuvwxyz'
	const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length)) // 生成随机字母
	const timestamp = new Date().getTime().toString() // 获取当前时间戳
	const randomNumber = Math.floor(Math.random() * 1000) // 生成随机数字，取值范围0-999
	return randomLetter + timestamp + randomNumber
}
