import OBSWebSocket, { EventSubscription } from 'obs-websocket-js';
import { useEffect, useState } from 'react';
import { validateIpV4, validatePort } from '../validations';

const obs = new OBSWebSocket();

interface ObsConfig {
    rawIp: string
    rawPort: string
    password: string
    name?: string
}

interface ConnectHookReturn {
    error: string
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    data: {
        obsWebSocketVersion?: string;
        rpcVersion?: number;
        authentication?: {
            challenge: string;
            salt: string;
        };
        negotiatedRpcVersion?: number;
    }
    connect: () => Promise<void>
    disconnect: () => void
    testConnect: () => Promise<void>
}

export const useObs = () => {
    return obs
}

export const useObsConnect = ({ rawIp, rawPort, password, name }: ObsConfig): ConnectHookReturn => {
    const ip = rawIp.trim();
    const port = rawPort.trim();
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({} as ConnectHookReturn['data']);

    const connectWebSocket = async () => {
        if (!validateIpV4(ip) || !validatePort(port)) {
            setError('La IP o el puerto no son validos')
            setIsError(true)
            setIsLoading(false)
            return;
        }

        setIsLoading(true)

        try {
            await obs.connect(`ws://${ip}:${port}`, password)
            .then(data => setData(data))
            setIsSuccess(true)
            setIsError(false)
            setIsLoading(false)
        } catch (err) {
            if(err.code === 1006){
                setError('No se pudo conectar con el servidor. Por favor, compruebe que el servidor este activo y que la IP y el puerto sean correctos o esta intentando conectarse a un servidor con IP y puerto de red (LAN)')
                setIsError(true)
                setIsLoading(false)
                return
            }
            setError(err.message)
            setIsError(true)
            setIsLoading(false)
        }
    };

    const disconnectWebSocket = () => {
        obs.disconnect()
        setIsSuccess(false)
        setIsError(false)
    };

    const testConnectionBeforeConnect = async () => {
        try {
            await obs.connect(`ws://${ip}:${port}`, password)
            .then(data => setData(data))
            setIsSuccess(true)
            setIsError(false)
        } catch (err) {
            switch (err.code) {
                case 1006:
                    setError('No se pudo conectar con el servidor. Por favor, compruebe que el servidor este activo y que la IP y el puerto sean correctos o esta intentando conectarse a un servidor con IP y puerto de red (LAN)')
                    break;
                case 4000:
                    setError('Error desconocido (4000). Contacte con los desarrolladores')
                    break;
                case 4003:
                    setError('Faltan datos. Por favor, llene todos los campos')
                    break;
                case 4004:
                    setError('La IP o el puerto no son validos. Por favor, compruebe que la IP y el puerto sean correctos')
                    break;
                case 4005:
                    setError('La IP o el puerto no son validos. Por favor, compruebe que la IP y el puerto sean correctos')
                    break;
                case 4008:
                    setError('Ya esta conectado. Por favor, desconecte antes de intentar conectarse de nuevo')
                    break;
                case 4009:
                    setError('Autenticación fallida. Por favor, compruebe la contraseña')
                    break;
                case 4010:
                    setError('Versión de protocolo RPC incompatible. Verifique la versión RPC de su servidor OBS Websocket o contacte con los desarrolladores')
                    break;
                case 4011:
                    setError('La sesión websocket ha sido invalidada por el servidor. Probablemente ha sido expulsado del servidor. Caso contrario, por favor contacte con los desarrolladores')
                    break;
                default:
                    setError(`Error desconocido (${err.code}: ${err.message}). Contacte con los desarrolladores`)
                    break;
            }
        }
    };

    return {
        error,
        isError,
        isSuccess,
        isLoading,
        data,
        connect: connectWebSocket,
        testConnect: testConnectionBeforeConnect,
        disconnect: disconnectWebSocket
    };
};


export const useObsStatus = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [isDisconnected, setIsDisconnected] = useState(false)
    const [authentication, setAuthentication] = useState({} as ConnectHookReturn['data']['authentication'])

    obs.on('ConnectionOpened', () => {
        setIsConnected(true)
        setIsDisconnected(false)
    })

    obs.on('ConnectionClosed', () => {
        setIsDisconnected(true)
        setIsConnected(false)
    })

    obs.on('Hello', (data) => {
        setAuthentication(data.authentication)
    })

    return { isConnected, isDisconnected, authentication }
}
