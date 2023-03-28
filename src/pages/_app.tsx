import '@/styles/globals.css'
import '@/styles/main.css'
import '@/styles/base.css'
import type { AppProps } from 'next/app'
import { SocketContext } from '@/context/socket'
import { useState } from 'react'
import { Socket } from 'socket.io-client/build/esm/socket'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export default function App({ Component, pageProps }: AppProps) {
  let [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  return (
    <>
        <SocketContext.Provider value={{socket, setSocket}}>
          <Component {...pageProps} />
        </SocketContext.Provider>
    </>

  )
}
