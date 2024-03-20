import OBSWebSocket from 'obs-websocket-js';
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
        obsWebSocketVersion: string;
        rpcVersion: number;
        authentication?: {
        challenge: string;
        salt: string;
    };
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
            setIsSuccess(true)
            setIsError(false)
            setIsLoading(false)
            obs.on('Hello', (data) => {
                setData(data)
            })

        } catch (err) {
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
            setIsSuccess(true)
            setIsError(false)
            await obs.disconnect()
        } catch (err) {
            setError(err.message)
            setIsError(true)
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

    obs.on('ConnectionOpened', () => {
        setIsConnected(true)
        setIsDisconnected(false)
    })

    obs.on('ConnectionClosed', () => {
        setIsDisconnected(true)
        setIsConnected(false)
    })

    return { isConnected, isDisconnected }
}
