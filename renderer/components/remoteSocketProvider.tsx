import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

interface RemoteSocketContextI {
   remoteSocket: Socket | null
   connectRemoteSocket: (url: string) => void
   sceneCommand: any
   loading: boolean
}

const RemoteSocketContext = createContext<RemoteSocketContextI>({
   remoteSocket: null,
   connectRemoteSocket: (url: string) => {},
   sceneCommand: null,
   loading: false
})

export const useRemoteSocket = () => useContext(RemoteSocketContext)

export const RemoteSocketProvider = ({ children }) => {
   const [remoteSocket, setRemoteSocket] = useState<Socket | null>(null)
   const [sceneCommand, setSceneCommand] = useState<any>(null)
   const [loading, setLoading] = useState<boolean>(false)

   const connectRemoteSocket = async (url: string) => {
      try {
         const newSocket = io(`ws://${url}`)
   
         setRemoteSocket(newSocket)
   
         console.log("new socket", newSocket)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      const sceneCommandListener = () => {
         setLoading(true)
         if (remoteSocket) {
            remoteSocket.on("setScene", (data) => {
               setSceneCommand(data)
               setLoading(false)
            })
         }
      }
      sceneCommandListener()
   }, [remoteSocket])
   
   return (
      <RemoteSocketContext.Provider
         value={{
            remoteSocket,
            connectRemoteSocket,
            sceneCommand,
            loading
         }}
      >
         {children}
      </RemoteSocketContext.Provider>
   )
}
