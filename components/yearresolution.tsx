'use client'

import React, { useEffect, useState } from 'react'

import { HiTrash, HiPencil } from "react-icons/hi";

type YResolutionProps = {
  position: number,
  content: string,
  onEdit: (content: string) => void,
  onDelete: () => void,
  editable: boolean
}

function YearResolution(props: YResolutionProps) {

  function handleClick() {
    props.onEdit(props.content)
  }

  return (
    <div
      className='bg-indigo-400 rounded-lg flex gap-2 filter shadow-md'
    >
      <p className='bg-indigo-600 p-4 flex-shrink rounded-l-lg w-12'>{props.position}</p>
      <div className='p-2 flex-grow flex items-center gap-2'>
        <p className='text-left flex-grow'>{props.content}</p>
        {props.editable && <>
          <button
            className={
              "flex justify-center gap-2 items-center p-3 " +
              "bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full " +
              "transition duration-300 hover:scale-105 filter drop-shadow-md"
            }
            onClick={() => props.onEdit(props.content)}
          >
            <HiPencil />
          </button>

          <button
            className={
              "flex justify-center gap-2 items-center p-3 " +
              "bg-gradient-to-b from-red-400 to-red-700 rounded-full " +
              "transition duration-300 hover:scale-105 filter drop-shadow-md"
            }
            onClick={() => props.onDelete()}
          >
            <HiTrash />
          </button>
        </>}
      </div>
    </div>
  )
}

export default YearResolution