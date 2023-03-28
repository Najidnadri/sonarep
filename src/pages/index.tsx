import Head from 'next/head'
import InputCard from '@/components/sections/home/inputCard'
import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { SocketContext } from '@/context/socket'
import LoadingScreen from '@/components/sections/home/loadingScreen';

export default function Home() {
  useEffect(() => socketInit(), [])

  /*
    VARIABLES
  */
  let {socket, setSocket} = useContext(SocketContext);
  let [loading, setloading] = useState(false);

  /*
    ONMOUNTED
  */
  const socketInit = () => {
    fetch('api/socket').then(() => {
      if (setSocket) {
        let spawnedsocket = io();
        setSocket(spawnedsocket);
        spawnedsocket.on('connect', () => {
          console.log('web socket connected')
        })
        spawnedsocket.on('update-input', msg => {
          console.log(msg);
        })
      }

    })
  }

  /*
    EVENT HANDLER
  */
  let onSubmit = (url: string) => {
    setloading(true);
    socket?.emit('startAnalyze', url)
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
        { loading && <LoadingScreen /> }
        { !loading && <InputCard handleSubmit={onSubmit}/> }
      </main>
    </>
  )
}
