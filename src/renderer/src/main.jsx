import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from '@renderer/views/Home'
import '@renderer/assets/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>
)
