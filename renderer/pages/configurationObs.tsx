import Head from "next/head"
import Input from "../components/ui/Input"
import { useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"

const ConfigurationObs = () => {
    const [form, setForm] = useState({
        ip: "",
        puerto: "",
        password: "",
        path: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className="flex gap-10 items-center flex-col p-4">
            <Head>
                <title>Configuracion de OBS</title>
            </Head>
            <Title>Configuracion de OBS</Title>
            <form onSubmit={(e) => e.preventDefault()} className="grid  grid-cols-2">
                <Input type="text" label="Ip: " name="ip" setValue={handleInputChange}/>
                <Input type="text" label="Puerto: " name="puerto" setValue={handleInputChange}/>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="path" setValue={handleInputChange}/>
                <span className="place-self-center col-span-2 m-10 flex gap-4 w-full justify-center">
                    <Button name="test" type="submit" className="w-fit">Guardar</Button>
                    <Button className="w-fit bg-slate-600">Probar conexión</Button>
                </span>
            </form>
        </div>        
    )
}

export default ConfigurationObs
