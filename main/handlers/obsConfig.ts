import { type IpcMainEvent } from "electron";
import { store } from "../background";
import { getObs, delObs, saveObs } from "../ipcEvents";
import { ObsConfig } from "../interfaces";

export const getConfigs = (event: IpcMainEvent) => event.reply(getObs + '-response', store.get('obs') ?? [])

export const saveConfig = (payload: ObsConfig) => {
    const configs = store.get('obs') || []
    //check for duplicated data
    const index = configs.findIndex((config: ObsConfig) => config.ip === payload.ip && config.port === payload.port)
    if (index !== -1) {
      configs.splice(index, 1)
      store.set('obs', configs)
    }
    configs.push(payload)
    store.set('obs', configs)
  }

export const delConfig = (payload: ObsConfig) => {
    const configs = store.get('obs') || []
    const index = configs.findIndex((config: ObsConfig) => config.ip === payload.ip && config.port === payload.port)
    if (index !== -1) {
      configs.splice(index, 1)
      store.set('obs', configs)
    }
}
