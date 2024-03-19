import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { validateIpV4, validatePort } from "../utils/validations"
import { useObs } from "../utils/OBSSocket"

const ConfigurationObs = () => {
    const [form, setForm] = useState({
        ip: "",
        puerto: "",
        password: "",
        name: ""
    })

    const [error, setErrors] = useState({
        ip: '',
        puerto: '',
        password: '',
        name: ''
    })

    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const obs = useObs()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }
    

    useEffect(() => {
        const validateForm = () => {
            const errors = {
                ip: form.ip !== '' && !validateIpV4(form.ip) ? 'El formato de IP no es correcto' : '',
                puerto: form.puerto !== '' && !validatePort(form.puerto) ? 'El puerto debe ser un número válido' : '',
                password: '',
                name: ''
            };
            setErrors(errors);
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
                    <Input type="text" label="Puerto: " className={error.ip !== '' && 'border-red-400 focus:border-red-600'} name="puerto" setValue={handleInputChange}/>
                    {error.puerto !== '' && <p className="text-red-500">{error.puerto}</p>}
                </span>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="name" setValue={handleInputChange}/>
                <span className="place-self-center col-span-2 m-10 flex gap-4 w-full justify-center">
                    <Button name="save"
                     disabled={form.ip === '' || form.puerto === '' || form.password === '' || form.name === '' || error.ip !== '' || error.puerto !== '' || error.password !== '' || error.name !== ''}
                     type="submit" className={'w-fit  disabled:bg-slate-400 disabled:hover:disabled'}>Guardar</Button>
                    <Button disabled={form.ip === '' || form.puerto === '' || form.password === '' || form.name === '' || error.ip !== '' || error.puerto !== '' || error.password !== '' || error.name !== ''} onClick={() => {
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
                    }} name="test" className="w-fit disabled:bg-slate-400 disabled:hover:disabled bg-slate-600">Probar conexión</Button>
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

        </div>        
    )
}

export default ConfigurationObs
