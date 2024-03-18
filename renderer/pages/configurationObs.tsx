import Head from "next/head"
import Input from "../components/Input"
import { useState } from "react"

const ConfigurationObs = () => {
    const [form, setForm] = useState({})

    return (
        <div className="border flex gap-10 items-center flex-col">
            <Head>
                <title>ConfigurationObs</title>
            </Head>
            <h1>ConfigurationObs</h1>
            <form className="grid grid-cols-1">
                <Input type="text" label="Ip: " name="ip" setValue={setForm}/>
                <Input type="text" label="Port: " name="port" setValue={setForm}/>
                <Input type="text" label="Password: " name="password" setValue={setForm}/>
                <Input type="text" label="Path: " name="path" setValue={setForm}/>
            </form>
        </div>        
    )
}

export default ConfigurationObs