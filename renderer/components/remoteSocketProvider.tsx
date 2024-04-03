import { createContext, useContext, useState } from "react"
import { Socket, io } from "socket.io-client"

interface RemoteSocketContextI {
   remoteSocket: Socket | null
   connectRemoteSocket: (url: string) => void
}

const RemoteSocketContext = createContext<RemoteSocketContextI>({
   remoteSocket: null,
   connectRemoteSocket: (url: string) => {}
})

export const useRemoteSocket = () => useContext(RemoteSocketContext)

export const RemoteSocketProvider = ({ children }) => {
   const [remoteSocket, setRemoteSocket] = useState(null)

   const connectRemoteSocket = (url: string) => {
      const newSocket = io(url)
  
      setRemoteSocket(newSocket)
  
      console.log("new socket", newSocket)
   }
   
   return (
      <RemoteSocketContext.Provider
         value={{
            remoteSocket,
            connectRemoteSocket
         }}
      >
         {children}
      </RemoteSocketContext.Provider>
   )
}
