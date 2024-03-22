import { Input } from "../components/ui/Input"
import { SyntheticEvent, useCallback, useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "@/components/ui/Title"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useObsConfigs } from "@/utils/hooks/useObsConfig"
import { useObsConnect, useObsStatus } from "@/utils/hooks/OBSSocket"
import { type ObsConfig } from "@/../main/interfaces";
import ConfirmationModal from "@/components/ConfirmationModal"

const schema = z.object({
    ip: z.string({description: "La IP contiene caracteres no validos"}).ip({version: "v4", message: "La IP ingresada no es válida. Compruebe que sea una dirección IPv4"}),
    port: z.string().min(1, { message: "El puerto es requerido" }).max(5, { message: "El puerto no puede ser mayor a 5 caracteres" }).regex(/^\d{1,5}$/, { message: "El puerto solo puede ser numerico" }),
    password: z.string().min(4, { message: "La contraseña es requerida" }),
    name: z.string().trim()
})
const ConfigurationObs = () => {
    const { saveConfig, deleteConfig, obsConfigs } = useObsConfigs()
    const { isConnected } = useObsStatus()
    const [modal, setModal] = useState({
        conectar: false,
        guardar: false,
        probarConexion: false
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ip: "0.0.0.0",
            port: "4455",
            password: "",
            name: ""
        },
        mode: "all"
      })

    const { connect, error, isError, isSuccess, isLoading, testConnect, disconnect } = useObsConnect({ rawIp: form.getValues().ip, rawPort: form.getValues().port, password: form.getValues().password, name: form.getValues().name })
    const onSubmit = (values: z.infer<typeof schema>, event: SyntheticEvent) => {
        console.log(values, form.formState.isDirty, form.formState.isValid)
    }


    useEffect(() => {
        if (!obsConfigs.length) return
        const lastConfig = obsConfigs[obsConfigs.length - 1]
        form.setValue("ip", lastConfig.ip)
        form.setValue("port", lastConfig.port)
        form.setValue("password", lastConfig.password)
        form.setValue("name", lastConfig.name)
    }, [obsConfigs])

    useEffect(() => {
        if(isError){
            alert(error)
        }
    },[error, isError])
    return (
        <Form {...form}>
            <div className="flex flex-col m-10 items-center">
                <Title>Configuracion de OBS Websocket</Title>
                <form className="grid grid-cols-2 place-items-center gap-4">
                    <FormField
                    control={form.control}
                    name='ip'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Dirección IP</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="shadcn" {...field}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='port'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Puerto: </FormLabel>
                        <FormControl>
                            <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre de sesión</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Sesion" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
                    <span className="grid grid-cols-3 gap-2 p-4 col-span-2">
                        <Button onClick={form.handleSubmit(() => setModal({ ...modal, guardar: true }))} disabled={!form.formState.isValid || !isConnected}>Guardar</Button>
                        <Button onClick={form.handleSubmit((values) => {testConnect()
                        setModal({ ...modal, probarConexion: true })})} disabled={!form.formState.isValid}>Probar conexión</Button>
                        <Button onClick={form.handleSubmit((values) => setModal({ ...modal, conectar: true }))} disabled={!form.formState.isValid}>Conectar</Button>
                    </span>
            </div>
            <ConfirmationModal isOpen={modal.probarConexion} title={"Resultados de la conexión"} description={`Ip: ${form.getValues().ip} \nPuerto: ${form.getValues().port} \nNombre de sesión: ${form.getValues().name}`} onCancel={() => {
                disconnect()
                setModal({ ...modal, probarConexion: false })}}
                onConfirm={() => {
                disconnect()
                setModal({ ...modal, probarConexion: false })}}/>

            <ConfirmationModal
             isOpen={modal.conectar} title={`¿Desea conectarse a ${form.getValues().ip}?`} description={`La aplicacion tendra acceso total a su servidor de OBS Websocket en el puerto: ${form.getValues().port}`} onCancel={() => setModal({ ...modal, conectar: false })}
             onConfirm={() => {setModal({ ...modal, conectar: false });
             connect()}}/>

            <ConfirmationModal isOpen={modal.guardar} title={`¿Desea guardar la configuración de este servidor de OBS Websocket?`} description={`Ip: ${form.getValues().ip} \nPuerto: ${form.getValues().port} \nNombre de sesión: ${form.getValues().name}`} onCancel={() => setModal({ ...modal, guardar: false })} onConfirm={form.handleSubmit((values: ObsConfig) => {
                            if (values === form.formState.defaultValues) return
                            if (!form.formState.isValid) return
                            saveConfig(values)
                            setModal({ ...modal, guardar: false })
                        })}/>
        </Form>
    )
}

export default ConfigurationObs
