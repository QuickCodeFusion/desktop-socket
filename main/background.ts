import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from 'electron-store'
import { authenticationString, delObs, getObs, saveObs } from './ipcEvents'
import { passwordHash } from './utils'
import { delConfig, getConfigs, saveConfig } from './handlers/obsConfig'
import { ObsConfig, StoreI } from './interfaces'

export const store = new Store<StoreI>()

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
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

ipcMain.on(getObs, (event) => getConfigs(event))

ipcMain.on(saveObs, (_event, payload: ObsConfig) => saveConfig(payload))

ipcMain.on(delObs, (_event, payload: ObsConfig) => delConfig(payload))

ipcMain.on(authenticationString, (_event, { salt, challenge, password }) => {
  const hash = passwordHash(password, salt, challenge)
  _event?.reply('authentication-response',hash)
})