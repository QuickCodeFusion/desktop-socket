import Link from "next/link"
import Button from "./ui/Button"
import { useObsStatus } from "@/utils/hooks/OBSSocket"
import { useEffect, useState } from "react"
import { useRemoteSocket } from "./remoteSocketProvider"

const Navbar = () => {
    const items = [{
            name: "Inicio",
            path: "/home"
        },
        {
            name: "Configuracion de OBS",
            path: "/configurationObs",
            activeObs: true
        },
        {
            name: "Configuracion remota",
            path: "/remoteConfig",
            activeRemote: true
        },
        {
            name: "Conexiones a OBS",
            path: "/conexionesObs"
        }
    ]

    const { isConnected } = useObsStatus()

    const [isConnectedRemote, setIsConnectedRemote] = useState(false)

    const { remoteSocket } = useRemoteSocket()
    useEffect(() => {
        if (remoteSocket) {
            remoteSocket.on('connect', () => {
                setIsConnectedRemote(true)
            })
            remoteSocket.on('disconnect', () => {
                setIsConnectedRemote(false)
            })
        }
    }, [remoteSocket])

    return(
        <div className="w-screen grid grid-cols-3 place-items-center center p-2 bg-obs-blue-500/55">
            <span className="flex justify-center gap-4 col-span-3">
                {
                    items.map((item, index) => 
                            <Button key={index} className="w-fit bg-obs-blue-500 flex gap-2 items-center">
                                <Link className="place-self-center" href={item.path} >
                                {item.name}
                                </Link>
                                { item.activeObs && <div className={`rounded-full h-3 w-3 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>}
                                { item.activeRemote && <div className={`rounded-full h-3 w-3 ${isConnectedRemote ? "bg-green-500" : "bg-red-500"}`}></div>}
                            </Button>
                    )
                }
            </span>
            {/* <span className="flex items-center gap-2 place-self-start rounded-sm p-2 bg-obs-blue-500/55 ">
                <p className="text-center">
                    {isConnected ? "Conectado" : "Desconectado"}
                </p>
                <div className={`rounded-full h-3 w-3 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
            </span> */}
        </div>
    )
}

export default Navbar
