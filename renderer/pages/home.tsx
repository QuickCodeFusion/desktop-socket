import { SceneChange } from '@/components/SceneChange'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
export default function HomePage() {
  const [scene, setScene] = useState('')
  return (
    <>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      
      <main className="bg-neutral-800 text-white h-screen">
        <SceneChange scene={scene} setScene={setScene} />
      </main>
    </>
  )
}
