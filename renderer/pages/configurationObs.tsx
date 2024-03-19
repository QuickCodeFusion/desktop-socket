import Head from "next/head"
import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { useObs, useObsConnect } from "../utils/OBSSocket"

interface ObsConfig {
    ip: string
    port: string
    password: string
    name: string
}

const ConfigurationObs = () => {
    const [form, setForm] = useState({
        ip: "",
        port: "",
        password: "",
        name: ""
    })

    const { data, error, isLoading, isError, isSuccess, connect, disconnect, testConnect } = useObsConnect({rawIp: form.ip, rawPort: form.port, password: form.password, name: form.name})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const [configs, setConfigs] = useState([])

    useEffect(() => {
        window.ipc.on("get-obs-config", (data: ObsConfig[]) => {
            setConfigs(data)
        })
        window.ipc.send("get-obs", {})
    }, [])
    
    return (
        <div className="flex gap-10 items-center flex-col p-4">
            <Title>Configuracion de OBS</Title>
            <form onSubmit={(e) => e.preventDefault()} className="grid  grid-cols-2">
                <Input type="text" label="Ip: " name="ip" setValue={handleInputChange}/>
                <Input type="text" label="Puerto: " name="port" setValue={handleInputChange}/>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="name" setValue={handleInputChange}/>
                <span className="place-self-center col-span-2 m-10 flex gap-4 w-full justify-center">
                    <Button onClick={() => {
                        window.ipc.send("save-obs", form)
                        setConfigs((prev) => {
                            return [...prev, form]
                        })
                    }} name="save" type="submit" className="w-fit">Guardar</Button>
                    <Button onClick={() => {
                        testConnect()
                    }} name="test" className="w-fit bg-slate-600">Probar conexión</Button>
                    <Button onClick={() => connect()} name="connect" className="w-fit bg-slate-600">Conectar</Button>
                </span>
            </form>
            {isSuccess && <span className="border bg-slate-500 text-green-500">
                <h1>Conectado</h1>
                <Button onClick={() => disconnect()}>Ok</Button>
                </span>}
            {isError && <span className="border bg-slate-500 text-red-500">
                <h1>{error}</h1>
                <Button onClick={() => disconnect()}>Ok</Button>
                </span>}
                {
                    configs && configs.map((item, index) => (
                        <div key={index}>
                            <p>Ip: {item.ip}</p>
                            <p>Puerto: {item.port}</p>
                            <p>Password: {item.password}</p>
                            <p>Name: {item.name}</p>
                            <Button onClick={() => {
                                window.ipc.send("delete-obs", item)
                                setConfigs((prev) => {
                                    return prev.filter((oldItem) => {
                                        if (oldItem.ip === item.ip && oldItem.port === item.port) {
                                            disconnect()
                                            return false
                                        }
                                        return true
                                    })
                                })
                            }}>Olvidar</Button>
                            <Button onClick={() => connect()}>Conectar</Button>
                        </div>
                    ))
                }
        </div>        
    )
}

export default ConfigurationObs
