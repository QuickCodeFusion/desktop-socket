import Head from "next/head"
import Input from "../components/ui/Input"
import { useState } from "react"

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
            <form className="grid grid-cols-2">
                <Input type="text" value={form.ip} label="Ip: " name="ip" setValue={handleInputChange}/>
                <Input type="text" value={form.puerto} label="Puerto: " name="puerto" setValue={handleInputChange}/>
                <Input type="text" value={form.password} label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text" value={form.path} label="Nombre de sesion: " name="path" setValue={handleInputChange}/>
            </form>
        </div>        
    )
}

export default ConfigurationObs