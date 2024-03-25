import { useEffect, useState } from "react"
import { authenticationString, delObs, getObs, saveObs } from "@/../main/ipcEvents"
import { type ObsConfig } from "@/../main/interfaces";

export const useObsConfigs = () => {
    const [obsConfigs, setObsConfig] = useState<ObsConfig[]>([])
    useEffect(() => {
        window.ipc.send(getObs, [])
        window.ipc.on(getObs + '-response', (data: ObsConfig[]) => {
            setObsConfig(data)
        })
    }, [])

    const saveConfig = (config: ObsConfig) => {
        window.ipc.send(saveObs, config)
    }

    const deleteConfig = (config: ObsConfig) => {
        window.ipc.send(delObs, config)
    }

    return {
        obsConfigs,
        saveConfig,
        deleteConfig
    }
}