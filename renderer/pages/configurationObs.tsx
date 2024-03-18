import Head from "next/head"
import Input from "../components/ui/Input"
import { useState } from "react"
import Button from "../components/ui/Button"

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
                <title>ConfigurationObs</title>
            </Head>
            <h1>Configuracion de OBS</h1>
            <form onSubmit={() => console.log(form)} className="grid grid-cols-2">
                <Input type="text" label="Ip: " name="ip" setValue={handleInputChange}/>
                <Input type="text" label="Puerto: " name="puerto" setValue={handleInputChange}/>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="path" setValue={handleInputChange}/>
                <Button type="submit">Guardar</Button>
            </form>
        </div>        
    )
}

export default ConfigurationObs
