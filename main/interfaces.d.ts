export interface ObsConfig {
    ip: string
    port: string
    password: string
    name: string
  }
  
  export interface WebSocketConfig {
    ip: string
    port: string
    nick: string
  }
  
  export interface StoreI {
    obs: ObsConfig[]
    websocket: WebSocketConfig[]
  }
  