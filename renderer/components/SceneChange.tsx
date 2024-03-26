import { useObsBatchRequest, useObsRequest } from "@/utils/hooks/OBSSocket"
import { useEffect, useState } from "react"
import Button from "./ui/Button"
import { Input } from "./ui/Input"

export const SceneChange: React.FC<{
    scene: string
    setScene: React.Dispatch<React.SetStateAction<string>>
}> = ({scene, setScene}) => {
    const [selectedScene, setSelectedScene] = useState('')
    const [mode, setMode] = useState< 'program' | 'studio' >('program')
    const [value, setValue] = useState('')
    const { obsCall: obsCreateAndChangeScene } = useObsBatchRequest({
        requests: [{
            requestType: 'CreateScene',
            requestData: {
                sceneName: value
            }
        },
        {
            requestType: 'SetCurrentProgramScene',
            requestData: {
                sceneName: value
            }
        }]
    })
    const { obsCall: setSceneCall } = useObsRequest({ requestType: 'SetCurrentProgramScene', requestData: {sceneName: value} })
    const { obsCall: createSceneCall } = useObsRequest({ requestType: 'CreateScene', requestData: {sceneName: value} })
    const { obsCall: setPreviewSceneCall } = useObsRequest({ requestType: 'SetCurrentPreviewScene', requestData: {sceneName: value} })
    return (
        <div className="flex flex-col gap-4 p-4 items-center justify-center">
            <h1 className="text-2xl text-center">Cambio de escena</h1>
            <span className="flex gap-4">
                <label htmlFor="check"> Activar modo estudio</label>
                <input name="check" type="checkbox" className="m-2" onChange={(e) => setMode(e.target.checked ? 'studio' : 'program')} />
            </span>
            <span className="flex gap-4">
                <Input value={value} onChange={e => setValue(e.target.value)} setValue={setValue} label="Scene"></Input>
                <Button className="w-fit" disabled={!value} onClick={() => {
                    setSelectedScene(value)
                    createSceneCall()
                    console.log(value)
                }}>Crear escena</Button>
            </span>
            <span className={`${mode === 'studio' && 'hidden'} flex flex-col gap-4`}>
                <Button className="w-fit" disabled={!value} onClick={() => setSceneCall()}> Cambiar a escena {value}</Button>
                <Button className="w-fit" disabled={!value} onClick={() => obsCreateAndChangeScene()}> Crear y cambiar a escena {value}</Button>
            </span>
            <span className={`${mode === 'program' && 'hidden'} flex flex-col gap-4`}>
                <Button className="w-fit" disabled={!value} onClick={() => setPreviewSceneCall()}> Cambiar a escena {value} en prevista
                </Button>
                <Button className="w-fit" disabled={!value} onClick={() => obsCreateAndChangeScene()}> Cambiar a escena {value} en programa</Button>
            </span>
        </div>
    )
}