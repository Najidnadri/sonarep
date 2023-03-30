import Head from 'next/head'
import InputCard from '@/components/sections/home/inputCard'
import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { SocketContext } from '@/context/socket'
import LoadingScreen from '@/components/sections/home/loadingScreen';
import { useRouter } from "next/router"
import { Analysis, AnalysisContext } from '@/context/analysisContext';
import SonarLoading from '@/components/sonarLoading';
import { login } from "../../utils/sonarAPI";



export default function Home() {
  useEffect(() => socketInit(), [])

  /*
    VARIABLES
  */
  let {socket, setSocket} = useContext(SocketContext);
  let { analysis, setAnalysis } = useContext(AnalysisContext);
  let [loading, setloading] = useState(false);
  let [progress, setProgress] = useState<string | null>(null);
  let [sonarInit, setSonatInit] = useState(true);
  let [startCmd, setStartCmd] = useState('');
  let [startProgress, setStartProgress] = useState('init');
  let router = useRouter();
  

  /*
    ONMOUNTED
  */
  const socketInit = () => {
    fetch('api/socket').then(() => {

      if (setSocket) {
        let spawnedsocket = io();
        setSocket(spawnedsocket);
        
        spawnedsocket.on('connect', () => {
          console.log('web socket connected');
          spawnedsocket.emit('reqStartCmd');
          spawnedsocket.emit('sonarQubeInit');
        })

        spawnedsocket.on('analyzeResponse', msg => {
          let response: Analysis = JSON.parse(msg);
          console.log("Analyze Response Receied. Status: ", response.__status__);
          if (response.__status__ === '200' || parseInt(response.__status__!) < 201) {
            setloading(false);
            setAnalysis!(response);
            router.push('/response');
          } else {
            setloading(false);
            alert('Something Went Wrong when Analyzing')
          }
        })

        spawnedsocket.on('analyzeProgress', msg => {
          setProgress(msg);
          if (msg === 'Complete Deletion') {
            setProgress(null);
          }
        })

        spawnedsocket.on('respStartCmd', msg => {
          setStartCmd(msg)
        })

        spawnedsocket.on('sonarInitResp', (msg) => {
          let data = JSON.parse(msg);
          if (parseInt(data.__status__) < 201 || parseInt(data.__status__) === 409) {
            setStartProgress('login')
            login().then(() => {
              setSonatInit(false);
            })
          } else {
            alert(data.msg)
          }
        })
      }

    })
  }

  /*
    EVENT HANDLER
  */
  let onSubmit = (url: string) => {
    setloading(true);
    socket!.emit('startAnalyze', JSON.stringify({
      url: url
    }))
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
        { sonarInit && <SonarLoading startCmd={startCmd} progress={startProgress} />}
        { loading && <LoadingScreen progress={progress} /> }
        { !loading && <InputCard handleSubmit={onSubmit}/> }
      </main>
    </>
  )
}
