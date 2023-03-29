import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Socket } from 'socket.io-client/build/esm/socket'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'


interface SocketState {
    socket?: Socket<DefaultEventsMap, DefaultEventsMap> | null,
    setSocket?: Dispatch<SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>>
}

// interface SocketState {
//     socket?: string,
//     setSocket?: string
// }

export const SocketContext = createContext<SocketState>({});

