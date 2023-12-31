'use client'

import Snowfall from 'react-snowfall'

import { Mountains_of_Christmas } from 'next/font/google'
import Link from 'next/link'

const chr = Mountains_of_Christmas({
  weight: "400",
  subsets: ['latin'],
  display: "swap"
})

import { HiPencilAlt } from "react-icons/hi";

export default function Home() {
  return (
    <>
      <div className='z-50'>
        <Snowfall
          // Changes the snowflake color
          color="rgba(255, 255, 255, 0.6)"
          // Controls the number of snowflakes that are created (default 150)
          snowflakeCount={100}
        />
      </div>

      <div className='lg:p-24 md:p-12 p-6'>
        <h1 className={chr.className + " text-6xl py-2"}>Propósitos de Año Nuevo</h1>
        <h2 className={chr.className + " text-6xl glowy"}>~2024~</h2>
        <p className='pt-8'>
          Con esta página web, aprovecho para desearte un feliz año nuevo 2024, y que la salud y la buena suerte te acompañen en este nuevo camino. Espero que todos tus propósitos y objetivos se cumplan, y para ello, he creado esta pequeña aplicación en la que puedes escribir y guardar tus propósitos de fin de año. 
        </p>
        <div className='pt-8 flex justify-center'>
          <Link href="/list">
            <div className={
              "flex justify-center gap-2 items-center py-3 px-5 " +
              "bg-gradient-to-b from-violet-400 to-indigo-600 rounded-full " +
              "transition duration-300 hover:scale-105 filter drop-shadow-md"
            }>
              <HiPencilAlt />
              <p className='font-bold'>Crear mi lista</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
