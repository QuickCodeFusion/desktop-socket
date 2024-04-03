import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import { RemoteSocketProvider } from '@/components/remoteSocketProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RemoteSocketProvider>
      <main className="bg-neutral-800 text-white h-screen">
        <Head>
          <title>Home - Nextron (with-tailwindcss)</title>
        </Head>
        <Navbar/>
        <Component {...pageProps} />
      </main>
    </RemoteSocketProvider>
  )
}

export default MyApp
