import { useEffect, useState } from "react"
import io from 'socket.io-client';
import { validateIpV4, validatePort } from "../validations";



export const useRemoteSocket = ({rawIp, rawPort, password}: {rawIp: string, rawPort: string, password: string}) => {
    const ip = rawIp.trim()
    const port = rawPort.trim()
    const [data, setData] = useState<any>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    
    const URL = `http://localhost:3000`

    console.log(URL);
    
    
    const socket = io(URL)
    const connectRemoteSocket = () => {
        if (!validateIpV4(ip) || !validatePort(port)) {
            setError('La IP o el puerto no son validos')
            setIsError(true)
            setIsLoading(false)
            return;
        }

        setIsLoading(true)

        socket.on('connect', () => {
            socket.emit('join', {password})
            setIsConnected(true)
            setIsError(false)
            setIsLoading(false)
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        })

        socket.on('error', (err: any) => {
        setError(err);
        setIsError(true);
        setIsLoading(false);
        });

        setData(socket)
    }

    return {
        data,
        isError,
        isLoading,
        error,
        isConnected,
        connectRemoteSocket
    }

    
}

export const useRemoteSocketStatus = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

        const socket = io('http://localhost:3000')

            socket.on('connected', (message) => {
                setIsConnected(true)
                console.log(message);
            })
            
            socket.on('disconnect', () => {
                setIsConnected(false)
            })
           

        useEffect(() => {
            console.log('PAPAIAAAAAAAAAAAAAAAA', isConnected);
            
        },[isConnected])



    return { isConnected }
}