import Head from "next/head"
import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { useObs } from "../utils/OBSSocket"

interface ObsConfig {
    ip: string
    puerto: string
    password: string
    name: string
}

const ConfigurationObs = () => {
    const [form, setForm] = useState({
        ip: "",
        puerto: "",
        password: "",
        name: ""
    })

    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const obs = useObs()

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
                <Input type="text" label="Puerto: " name="puerto" setValue={handleInputChange}/>
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
                        obs.connect(`ws://${form.ip}:${form.puerto}`, form.password)
                        .then(() => {
                            console.log("conectado")
                            setIsSuccess(true)
                            
                        })
                        .catch((error) => {
                            console.log(error)
                            setIsError(true)
                            setErrorMessage(error.message)
                        })
                    }} name="test" className="w-fit bg-slate-600">Probar conexión</Button>
                </span>
            </form>
            {isSuccess && <span className="text-green-500">
                <h1>Conectado</h1>
                <Button onClick={() => setIsSuccess(false)}>Ok</Button>
                </span>}
            {isError && <span className="text-red-500">
                <h1>{errorMessage}</h1>
                <Button onClick={() => setIsError(false)}>Ok</Button>
                </span>}
                {
                    configs && configs.map((item, index) => (
                        <div key={index}>
                            <p>Ip: {item.ip}</p>
                            <p>Puerto: {item.puerto}</p>
                            <p>Password: {item.password}</p>
                            <p>Name: {item.name}</p>
                        </div>
                    ))
                }

        </div>        
    )
}

export default ConfigurationObs
