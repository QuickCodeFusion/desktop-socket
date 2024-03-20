import { Input } from "../components/ui/Input"
import { useCallback, useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { Title } from "@/components/ui/Title"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
const schema = z.object({
    ip: z.string().min(7).regex(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, "La IP ingresada no es válida. Compruebe que sea una dirección IPv4"),
    port: z.string().min(1).max(5).regex(/^\d{1,5}$/),
    password: z.string().min(1),
    name: z.string().min(1)
})
const ConfigurationObs = () => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ip: "0.0.0.0",
            port: "",
            password: "",
            name: ""
        },
      })
    const onSubmit = (values: z.infer<typeof schema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <Title>Configuracion de OBS Websocket</Title>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2">
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
                        <Input type="text" placeholder="shadcn" {...field} />
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
                <Button disabled={Object.keys(form.formState.errors).length > 0} className="disabled:bg-red-600" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ConfigurationObs
