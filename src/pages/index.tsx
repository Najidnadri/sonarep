import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Test from '@/components/test'
import Test2 from '@/components/sections/home/test2'


export default function Home() {
  return (
    <>
      <Head>
        <title>SONAREP</title>
        <meta name="description" content="Sonarqube Assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Test></Test>
        <Test2></Test2>
      </main>
    </>
  )
}
