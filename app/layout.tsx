import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import HomeImgSrc from "@/public/images/forest.jpg"
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const monts = Montserrat({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Year 2024',
  description: 'Feliz año nuevo 2024!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={monts.className}>
        <Toaster />
        <div className="flex flex-col items-center justify-between bg-indigo-800/70 relative">

          <main className='text-center min-h-screen h-screen w-full flex flex-col'>
            <div className='flex-grow'>
              {children}
            </div>
            <div className="lg:flex-row items-center bg-indigo-900 lg:p-12 p-8 flex">
              <div className='flex-1 self-start text-left'>
                Creado por <Link className="font-bold transition duration-200 hover:text-indigo-300" href="https://github.com/ZenithGD">
                  Darío Marcos Casalé
                </Link> - 2023
              </div>
              <div className='flex-1 self-end'>
                <Link className="font-bold transition duration-200 hover:text-indigo-300" href="/credits">
                  <p className='text-right'>Créditos</p>
                </Link>
              </div>
            </div>
          </main>
          <div className='opacity-50 -z-10 fixed w-screen h-screen'>
            <Image className="object-cover" src={HomeImgSrc} alt="Home background image" priority fill />
          </div>
        </div>
      </body>
    </html>
  )
}
