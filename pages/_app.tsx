import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { AccentProvider } from '../context/AccentContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccentProvider>
      <Head>
        <title>Life OS 2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
      </Head>
      <Component {...pageProps} />
    </AccentProvider>
  )
}
