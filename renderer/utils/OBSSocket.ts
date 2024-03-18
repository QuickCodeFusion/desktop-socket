import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();

export const useObs = () => {
    return obs
}