export default () => {
	let now = new Date()
	let year = now.getFullYear()
	let month = (now.getMonth() + 1).toString().padStart(2, '0')
	let day = now.getDate().toString().padStart(2, '0')
	let hours = now.getHours().toString().padStart(2, '0')
	let minutes = now.getMinutes().toString().padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}`
}
