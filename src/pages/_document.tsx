import { Html, Head, Main, NextScript } from 'next/document'
import NavComp from '@/components/Nav'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavComp />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
