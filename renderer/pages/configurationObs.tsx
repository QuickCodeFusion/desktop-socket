import { Input } from "../components/ui/Input"
import { useCallback, useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "@/components/ui/Title"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ConfirmationModal from "@/components/ConfirmationModal"
const schema = z.object({
    ip: z.string().min(7).ip({version: "v4", message: "La IP ingresada no es válida. Compruebe que sea una dirección IPv4"}),
    port: z.string().min(1).max(5).regex(/^\d{1,5}$/),
    password: z.string().min(1),
    name: z.string().min(1).trim()
})
const ConfigurationObs = () => {
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
      })
    const onSubmit = (values: z.infer<typeof schema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <div className="flex flex-col m-10 items-center">
                <Title>Configuracion de OBS Websocket</Title>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 place-items-center gap-4">
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
                    <span className="grid grid-cols-3 gap-2 p-4 col-span-2">
                        <Button disabled={Object.keys(form.formState.errors).length > 0} className="disabled:bg-red-600" type="submit">Guardar</Button>
                        <Button className="disabled:bg-red-600">Probar conexión</Button>
                        <Button className="disabled:bg-red-600">Conectar</Button>
                    </span>
                </form>
            </div>
            <ConfirmationModal isOpen={modal.probarConexion} title={"Probar la conección"} description={"¿Desea probar la conección?"} isOpen={modal.probarConexion} onCancel={() => setModal({ ...modal, probarConexion: false })} onConfirm={() => setModal({ ...modal, probarConexion: false })}/>
        </Form>
    )
}

export default ConfigurationObs
