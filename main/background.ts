import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from 'electron-store'

export interface ObsConfig {
  ip: string
  puerto: string
  password: string
  name: string
}

export interface WebSocketConfig {
  ip: string
  puerto: string
  nick: string
}

interface StoreI {
  obs: ObsConfig[]
  websocket: WebSocketConfig[]
}

const store = new Store<any>()

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('get-obs', (event) => {
  event.reply('get-obs-config', store.get('obs') || [])
})

ipcMain.on('save-obs', (_event, arg) => {
  const configs = store.get('obs') || []
  //check for duplicated data
  const index = configs.findIndex((config: ObsConfig) => config.ip === arg.ip && config.puerto === arg.puerto)
  if (index !== -1) {
    configs.splice(index, 1)
    store.set('obs', configs)
  }
  configs.push(arg)
  store.set('obs', configs)

})
