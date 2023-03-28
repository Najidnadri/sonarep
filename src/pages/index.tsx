import Head from 'next/head'
import InputCard from '@/components/sections/home/inputCard'
import { useContext, useEffect } from 'react'
import io from 'socket.io-client';
import { SocketContext } from '@/context/socket'

export default function Home() {
  useEffect(() => socketInit(), [])
  let {socket, setSocket} = useContext(SocketContext);

  const socketInit = () => {
    fetch('api/socket').then(() => {
      if (setSocket) {
        let spawnedsocket = io();
        setSocket(spawnedsocket);
        spawnedsocket.on('connect', () => {
          console.log('web socket connected')
        })

      }

    })
  }

  return (
    <>
      <Head>
        <title>SONAREP</title>
        <meta name="description" content="Sonarqube Assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InputCard />
      </main>
    </>
  )
}
