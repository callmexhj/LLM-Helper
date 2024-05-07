import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '@renderer/views/Home'
import '@renderer/assets/main.scss'
import store from '@renderer/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Home />
		</Provider>
	</React.StrictMode>
)
