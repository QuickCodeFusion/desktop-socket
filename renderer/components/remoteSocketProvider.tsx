import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

interface RemoteSocketContextI {
   remoteSocket: Socket | null
   connectRemoteSocket: (url: string) => void
   sceneCommand: any
}

const RemoteSocketContext = createContext<RemoteSocketContextI>({
   remoteSocket: null,
   connectRemoteSocket: (url: string) => {},
   sceneCommand: null
})

export const useRemoteSocket = () => useContext(RemoteSocketContext)

export const RemoteSocketProvider = ({ children }) => {
   const [remoteSocket, setRemoteSocket] = useState<Socket | null>(null)
   const [sceneCommand, setSceneCommand] = useState<any>(null)

   const connectRemoteSocket = async (url: string) => {
      try {
         const newSocket = io(url)
   
         setRemoteSocket(newSocket)
   
         console.log("new socket", newSocket)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      const sceneCommandListener = () => {
         if (remoteSocket) {
            remoteSocket.on("SceneCommand", (data) => {
               setSceneCommand(data)
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
            sceneCommand
         }}
      >
         {children}
      </RemoteSocketContext.Provider>
   )
}
