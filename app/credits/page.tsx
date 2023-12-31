import Link from 'next/link'
import React from 'react'

import Image from 'next/image'
import HomeImgSrc from "@/public/images/forest.jpg"
import SnowImgSrc from "@/public/images/reactsnow.gif"

type Props = {}

function Credits({ }: Props) {
  return (
    <div className='lg:p-24 md:p-12 p-6'>
      <h1 className="text-4xl font-bold mb-5">Créditos</h1>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-8">
        <Link 
          className="filter shadow-md rounded-md bg-indigo-200 text-indigo-900 p-5 text-sm flex gap-4 justify-between items-center transition hover:scale-105 duration-300" 
          href="https://www.flaticon.com/free-icons/christmas" 
          title="christmas icons"
        >
          <p className="w-1/3">Fondo creado por <span className='font-bold'>Takeshi Ishikawa</span>, <br/> de Vecteezy </p>
          <div className="w-2/3">
            <Image 
              className="rounded-lg object-cover" 
              src={HomeImgSrc} 
              alt="Background" 
              layout='responsive' />
          </div>
        </Link>
        <Link 
          className="filter shadow-md rounded-md bg-indigo-200 text-indigo-900 p-5 text-sm flex gap-4 justify-between items-center transition hover:scale-105 duration-300" 
          href="https://github.com/cahilfoley/react-snowfall" 
          title="snow"
        >
          <p className="w-1/3">Copos de nieve creados por <span className='font-bold'>cahilfoley</span></p>
          <div className="w-2/3">
            <Image 
              className="rounded-lg object-cover" 
              src={SnowImgSrc} 
              alt="Snow package"
              layout='responsive'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Credits