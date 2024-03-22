import Button from "@/components/ui/Button"
import { Title } from "@/components/ui/Title"
import { useObsConfigs } from "@/utils/hooks/useObsConfig"

const conexionesObs = () => {

    const { obsConfigs, deleteConfig } = useObsConfigs()
    
    return(
        <div className="flex flex-col items-center">
            <Title>Conexiones a OBS</Title>
            <div className="grid grid-cols-4 p-4">
                {
                    obsConfigs.map((config, index) =>
                        <div key={index} className="flex flex-col border p-4 gap-2 w-fit border-obs-blue-500 bg-obs-blue-400/20 rounded-md">
                            <p>Nombre: {config.name}</p>
                            <p>IP: {config.ip}</p>
                            <p>Puerto: {config.port}</p>
                            <Button className="" onClick={() => deleteConfig(config)}>Eliminar</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default conexionesObs