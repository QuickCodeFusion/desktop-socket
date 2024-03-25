import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-neutral-800 text-white h-screen">
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <Navbar/>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
