import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { validateIpV4, validatePort } from "../utils/validations"

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    // const dotIp = () => {
    //     const ipFormated = form.ip.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1.')
    //     setForm({ ...form, ip: ipFormated })
    // };
    

    useEffect(() => {
        const validateForm = () => {
            const errors = {
                ip: !validateIpV4(form.ip) ? 'El formato de IP no es correcto' : '',
                puerto: !validatePort(form.puerto) ? 'El puerto debe ser un número válido' : '',
                password: '',
                name: ''
            };
            setErrors(errors);
        };

        validateForm();
    },[form])

    return (
        <div className="flex gap-10 items-center flex-col p-4">
            <Title>Configuracion de OBS</Title>
            <form onSubmit={(e) => e.preventDefault()} className="grid  grid-cols-2">
                <div className="flex flex-col">
                    <Input type="text" label="Ip: " name="ip" setValue={handleInputChange}/>
                    {error.ip !== '' && <p className="text-red-500">{error.ip}</p>}
                </div>
                <div>
                    <Input type="text" label="Puerto: " name="puerto" setValue={handleInputChange}/>
                    {error.puerto !== '' && <p className="text-red-500">{error.puerto}</p>}
                </div>
                <Input type="password" label="Password: " name="password" setValue={handleInputChange}/>
                <Input type="text"  label="Nombre de sesion: " name="name" setValue={handleInputChange}/>
                <span className="place-self-center col-span-2 m-10 flex gap-4 w-full justify-center">
                    <Button name="save" type="submit" className="w-fit">Guardar</Button>
                    <Button name="test" className="w-fit bg-slate-600">Probar conexión</Button>
                </span>
            </form>
        </div>        
    )
}

export default ConfigurationObs
