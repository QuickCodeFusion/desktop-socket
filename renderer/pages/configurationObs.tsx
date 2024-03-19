import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { validateIpV4, validatePort } from "../utils/validations"
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

    const [inputError, setErrors] = useState({
        ip: '',
        port: '',
        password: '',
        name: ''
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
        

    useEffect(() => {
        const validateForm = () => {
            const newInputError = {
                ip: form.ip !== '' && !validateIpV4(form.ip) ? 'El formato de IP no es correcto' : '',
                port: form.port !== '' && !validatePort(form.port) ? 'El puerto debe ser un número válido' : '',
                password: '',
                name: ''
            };
            setErrors(newInputError);
        };

        validateForm();
    },[form])

    console.log(error);

    return (
        <div className="flex gap-10 items-center flex-col p-4">
            <Title>Configuracion de OBS</Title>
            <form onSubmit={(e) => e.preventDefault()} className="grid  grid-cols-2">
                <span className="flex flex-col items-center justify-self-end ">
                    <Input type="text" label="Ip: " name="ip" className={error.ip !== '' && 'border-red-400 focus:border-red-600'} setValue={handleInputChange}/>
                    {error.ip !== '' && <p className="text-red-500">{error.ip}</p>}
                </span>
                <span className="flex flex-col items-center justify-self-end ">
                    <Input type="text" label="Puerto: " className={error.port !== '' && 'border-red-400 focus:border-red-600'} name="port" setValue={handleInputChange}/>
                    {error.port !== '' && <p className="text-red-500">{error.port}</p>}
                </span>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="name" setValue={handleInputChange}/>
                <span className="place-self-center col-span-2 m-10 flex gap-4 w-full justify-center">
                    <Button name="save"
                    onClick={() => {
                        window.ipc.send("save-obs", form)
                        setConfigs((prev) => {
                            return [...prev, form]
                        })
                    }}
                     disabled={form.ip === '' || form.port === '' || form.password === '' || form.name === '' || error.ip !== '' || error.port !== '' || error.password !== '' || error.name !== ''}
                     type="submit" className={'w-fit  disabled:bg-slate-400 disabled:hover:disabled'}>Guardar</Button>
                    <Button disabled={form.ip === '' || form.port === '' || form.password === '' || form.name === '' || error.ip !== '' || error.port !== '' || error.password !== '' || error.name !== ''} onClick={() => {
                        testConnect()
                    }} name="test" className="w-fit disabled:bg-slate-400 disabled:hover:disabled bg-slate-600">Probar conexión</Button>
                    <Button onClick={() => connect()} disabled={form.ip === '' || form.port === '' || form.password === '' || form.name === '' || error.ip !== '' || error.port !== '' || error.password !== '' || error.name !== ''} name="connect" className="w-fit bg-slate-600">Conectar</Button>
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
