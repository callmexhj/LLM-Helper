import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 窗口位置缓存
let currentScreen = null
// 检查窗口位置并调整窗口位置以确保不会溢出屏幕
function adjustWindowPosition(mainWindow) {
	const currentScreen = screen.getDisplayMatching(mainWindow.getBounds())

	const workArea = currentScreen.workArea
	const windowBounds = mainWindow.getBounds()

	let newX = windowBounds.x
	let newY = windowBounds.y

	// 如果窗口的右边界大于屏幕的右边界，调整x坐标
	if (windowBounds.x + windowBounds.width > workArea.x + workArea.width) {
		newX = workArea.x + workArea.width - windowBounds.width
	}

	// 如果窗口的底边界大于屏幕的底边界，调整y坐标
	if (windowBounds.y + windowBounds.height > workArea.y + workArea.height) {
		newY = workArea.y + workArea.height - windowBounds.height
	}

	// 如果窗口的左边界小于屏幕的左边界，调整x坐标
	if (windowBounds.x < workArea.x) {
		newX = workArea.x
	}

	// 如果窗口的顶边界小于屏幕的顶边界，调整y坐标
	if (windowBounds.y < workArea.y) {
		newY = workArea.y
	}
	// 更新窗口位置
	mainWindow.setPosition(newX, newY, true)
}

function createWindow() {
	// Create the browser window.

	const defaultWidth = 900 // 默认宽度
	const defaultHeight = 670 // 默认高度

	const mainWindow = new BrowserWindow({
		width: defaultWidth,
		height: defaultHeight,
		transparent: true,
		frame: false,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
		currentScreen = mainWindow.getPosition()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
	// 导航栏按钮功能实现
	ipcMain.on('minimize', () => mainWindow.minimize())
	ipcMain.on('maximize', () => {
		// 记录窗口位置
		currentScreen = mainWindow.getPosition()
		mainWindow.maximize()
	})
	ipcMain.on('close', () => mainWindow.close())

	// 回归默认窗口大小
	ipcMain.on('defaultScreen', () => {
		mainWindow.unmaximize()
		mainWindow.setSize(defaultWidth, defaultHeight)
		// 设置窗口位置为上一次打开的位置
		mainWindow.setPosition(...currentScreen)
	})

	// 在窗口被移动时检查位置
	mainWindow.on('moved', () => {
		adjustWindowPosition(mainWindow)
	})

	mainWindow.on('will-move', (event) => {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize()
			event.preventDefault()
			mainWindow.setSize(defaultWidth, defaultHeight)
		}
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.on('ping', () => console.log('pong'))

	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
