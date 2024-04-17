import { useObsBatchRequest, useObsRequest } from "@/utils/hooks/OBSSocket"
import { useCallback, useEffect, useState } from "react"
import Button from "./ui/Button"
import { Input } from "./ui/Input"
import { useRemoteSocket } from "./remoteSocketProvider"

export const SceneChange: React.FC<{
    scene: string
    setScene: React.Dispatch<React.SetStateAction<string>>
}> = ({scene, setScene}) => {
    const [selectedScene, setSelectedScenes] = useState('')
    const [mode, setMode] = useState<'program' | 'studio'>('program')
    const [autoMode, setAutoMode] = useState(false)
    const [newSceneName, setNewSceneName] = useState('')
    const { obsCall: createScene } = useObsRequest({ requestType: 'CreateScene', requestData: {sceneName: newSceneName} })
    const { obsCall: setProgramScene } = useObsRequest({ requestType: 'SetCurrentProgramScene', requestData: {sceneName: newSceneName} })
    const { obsCall: setPreviewScene } = useObsRequest({ requestType: 'SetCurrentPreviewScene', requestData: {sceneName: newSceneName} })
    const { sceneCommand, remoteSocket, loading } = useRemoteSocket()
    const { obsCall: setSceneAuto } = useObsRequest({ requestType: 'SetCurrentProgramScene', requestData: {sceneName: sceneCommand} })
    const sceneChangeWhenAuto = useCallback(() => {
        if (autoMode && remoteSocket) {
            setSceneAuto()
        }
    }, [autoMode, remoteSocket, sceneCommand])

    useEffect(() => {
        if (autoMode && sceneCommand !== null) {
            sceneChangeWhenAuto()
        }
    }, [sceneCommand])
    return (
        <div className="flex flex-col gap-4 p-4 items-center justify-center">
            <h1 className="text-2xl text-center">Cambio de escena</h1>
            <span className="flex gap-4">
                <label htmlFor="check">Activar modo estudio</label>
                <input name="check" type="checkbox" className="m-2" checked={mode === 'studio'} disabled={loading || remoteSocket === null} onChange={(e) => setMode(e.target.checked ? 'studio' : 'program')} />
            </span>
            <span className="flex gap-4">
                <Input value={newSceneName} onChange={e => setNewSceneName(e.target.value)} label="Scene name:" />
                <Button className="w-fit" disabled={!newSceneName} onClick={() => {
                    setSelectedScenes(newSceneName)
                    createScene()
                }}>Crear escena</Button>
            </span>
            <span className={`${mode === 'program' ? 'flex' : 'hidden'} flex-col gap-4`}>
                <Button className="w-fit" disabled={!newSceneName} onClick={() => setProgramScene()}> Cambiar a escena: {newSceneName}</Button>
            </span>
            <span className={`${mode === 'studio' ? 'flex' : 'hidden'} flex-col gap-4`}>
                <Button className="w-fit" disabled={!newSceneName} onClick={() => setPreviewScene()}> Cambiar a escena: {newSceneName} en preview</Button>
                <Button className="w-fit" disabled={!newSceneName} onClick={() => setProgramScene()}> Cambiar a escena: {newSceneName} en programa</Button>
            </span>
            <section>
                <h1 className="text-2xl text-center">Cambio de escena automático</h1>
                { autoMode && loading && <p>Recibiendo comando remoto...</p>}
                { autoMode && !loading && sceneCommand !== null && <p>Escena cambiada a: {sceneCommand}</p>}
                <span className="flex gap-4">
                    <label htmlFor="check">Activar modo automático</label>
                    <input name="check" type="checkbox" className="m-2" checked={autoMode} onChange={(e) => setAutoMode(e.target.checked)} />
                </span>
                <Button disabled={remoteSocket === null} onClick={() => remoteSocket.emit('Scene')}>Enviar comando de prueba</Button>
            </section>
        </div>
    )
}
