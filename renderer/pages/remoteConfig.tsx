import Head from "next/head"
import { useState } from "react"
import { Input } from "../components/ui/Input"
import Button from "../components/ui/Button"
import { Title } from "../components/ui/Title"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRemoteSocket } from "@/components/remoteSocketProvider"

const schema = z.object({
    ip: z.string({description: "La IP contiene caracteres no validos"}),
    port: z.string().min(1).max(5).regex(/^\d{1,5}$/),
    nick: z.string().min(1)
})
const remoteConfig: React.FC = () => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ip: "0.0.0.0",
            port: "",
            nick: ""
        }
    })

    const { connectRemoteSocket } = useRemoteSocket()

    const onSubmit = (values: z.infer<typeof schema>) => {
        const uri = `${values.ip}` + (values.port ? `:${values.port}` : '')
        connectRemoteSocket(uri)
    }
    
    return (
        <Form {...form}>
            <Title className="text-center">Configuracion de Websocket Remoto</Title>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:grid grid-cols-3 p-4 place-items-center">
                <FormField
                control={form.control}
                name='ip'
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Dirección IP: </FormLabel>
                    <FormControl>
                        <Input type="text" {...field}/>
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
                        <Input type="text" placeholder="4455" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name='nick'
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre de estación</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Estación" {...field} />
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
                />
                <Button disabled={!form.formState.isValid} className="disabled:bg-red-600 w-1/2 col-start-2" type="submit">Conectar</Button>
            </form>
        </Form>
    )
}

export default remoteConfig
