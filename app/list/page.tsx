'use client'

import YearResolution from '@/components/yearresolution'
import React, { MouseEventHandler, useId, useRef, useState } from 'react'

import { HiArrowLeft, HiCheck, HiPencil, HiPlusCircle, HiSave, HiSaveAs } from "react-icons/hi";

import { Mountains_of_Christmas } from 'next/font/google'
import toast from 'react-hot-toast';
const chr = Mountains_of_Christmas({
  weight: "400",
  subsets: ['latin'],
  display: "swap"
})

const options = {
  allowTaint: true,
  useCORS: true,
  backgroundColor: "#6976b4",
  removeContainer: true,
};

type Props = {}

function List({ }: Props) {

  const listRef = useRef(null)
  const [list, setList] = useState<string[]>([])
  const [editText, setEditText] = useState<string>("")
  const [editId, setEditId] = useState<number>(-1)

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)

  const [editing, setEditing] = useState<boolean>(true)

  function editCallback(id: number) {
    toast.dismiss();
    return (prevText: string) => {
      setShowEditModal(true)
      setEditId(id)
      setEditText(prevText)
    }
  }

  function deleteCallback(id: number) { 
    return () => {
      let prevList = list.filter((v, vid) => id != vid)
      setList(prevList)
    }
  }

  function addResolution(e: React.MouseEvent<HTMLButtonElement>) {
    setShowCreateModal(true)
  }

  function onModalEditClose(save: boolean) {

    if (save) {
      let prevList = [ ...list ]
      prevList[editId] = editText

      setList(prevList)
    }
    setShowEditModal(false)
    setEditId(0)
    setEditText("")
  }

  function onModalCreateClose(save: boolean) {

    if (save) {
      let prevList = [ ...list ]
      console.log("push", editText)
      prevList.push(editText)

      toast.success("¡Nuevo propósito añadido!")

      setList(prevList)
    }
    setShowCreateModal(false)
    setEditText("")


  }

  async function saveSnapshot(e: React.MouseEvent<HTMLButtonElement>) {
    const listElement = listRef.current;

    if (!listElement) return;

    if ( list.length === 0 ) {
      toast.error("¡Aún no has añadido ningún propósito!")
      return;
    }
    
    setEditing(false)

    try {
      // lazy load this package
      const html2canvas = await import(
        /* webpackPrefetch: true */ "html2canvas"
      );

      const result = await html2canvas.default(listElement, options);

      const asURL = result.toDataURL("image/jpeg");
      // as far as I know this is a quick and dirty solution
      const anchor = document.createElement("a");
      anchor.href = asURL;
      anchor.download = "listapropositos.jpeg";
      anchor.click();
      anchor.remove();
      // maybe this part should set state with `setURLData(asURL)`
      // and when that's set to something you show the download button 
      // which has `href=URLData`, so that people can click on it
    } catch (reason) {
      console.log(reason);
    }
  }

  return (
    <div className='min-h-screen relative'>
      <div
        className='h-full lg:p-24 md:p-12 p-6 z-10'
        ref={listRef}
      >
        <h1 className={chr.className + " text-6xl py-2"}>Mi lista de propósitos</h1>
        <div
          className='flex flex-col gap-4 pt-12'>
          { list.length > 0 
            ? list.map((e, key) =>
                <YearResolution
                  editable={editing}
                  key={key}
                  content={e}
                  position={key + 1}
                  onEdit={editCallback(key)}
                  onDelete={deleteCallback(key)}
                />
              )
            : <p>No has añadido ningún propósito.</p>
          }
        </div>
      </div>
      <div className='fixed bottom-0 flex md:flex-row flex-col gap-4 justify-center w-screen pb-8 z-50 pointer-events-none p-8'>
        {editing && <button
          className={
            "flex justify-center gap-2 items-center py-3 px-5 " +
            "bg-gradient-to-b from-violet-500 to-indigo-600 rounded-full " +
            "transition duration-300 hover:scale-105 filter drop-shadow-md pointer-all"
          }
          onClick={addResolution}
        >
          <HiPlusCircle /> 
          <p className='font-bold'>Añadir propósito</p>
        </button>
        }
        {
          editing
            ? <button
              className={
                "flex justify-center gap-2 items-center py-3 px-5 " +
                "bg-gradient-to-b from-green-400 to-green-700 rounded-full " +
                "transition duration-300 hover:scale-105 filter drop-shadow-md pointer-all"
              }
              onClick={saveSnapshot}
            >
              <HiSaveAs /> 
              <p className='font-bold'>Guardar</p>
            </button>
            : <button
              className={
                "flex justify-center gap-2 items-center py-3 px-5 " +
                "bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full " +
                "transition duration-300 hover:scale-105 filter drop-shadow-md pointer-all"
              }
              onClick={() => setEditing(true)}
            >
              <HiPencil /> 
              <p className='font-bold'>Volver a editar</p>
            </button>
        }
      </div>
      {
        showEditModal && <div className='fixed top-0 w-screen h-screen flex justify-center items-center z-50 bg-black/10 backdrop-blur-sm'>
          <div className='bg-indigo-300 lg:w-1/2 w-full rounded-lg backdrop-blur-lg m-4'>
            <div className='flex bg-indigo-600 justify-between p-4 rounded-t-lg'>
              <p className='font-bold'>Editar propósito</p>
            </div>
            <div className='p-4'>
              <textarea
                rows={7}
                onChange={(e: any) => setEditText(e.target.value)}
                placeholder="Escribe tu propósito de fin de año"
                defaultValue={editText}
                className="w-full text-indigo-900 text-sm p-2 rounded-md resize-none" />
              <div className='flex justify-between gap-4 pt-2'>
                <button
                  className={
                    "flex justify-center gap-2 items-center py-2 px-4 " +
                    "bg-gradient-to-b from-red-400 to-red-700 rounded-full " +
                    "transition duration-300 hover:scale-105 filter drop-shadow-md"
                  }
                  onClick={() => onModalEditClose(false)}
                >
                  <HiArrowLeft />
                  <p className='font-bold'>Atrás</p>
                </button>
                <button
                  className={
                    "flex justify-center gap-2 items-center py-2 px-4 " +
                    "bg-gradient-to-b from-green-400 to-green-700 rounded-full " +
                    "transition duration-300 hover:scale-105 filter drop-shadow-md"
                  }
                  onClick={() => onModalEditClose(true)}
                >
                  <HiCheck /> 
                  <p className='font-bold'>Aceptar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {
        showCreateModal && <div className='fixed top-0 w-screen h-screen flex justify-center items-center z-50 bg-black/10 backdrop-blur-sm'>
          <div className='bg-indigo-300 lg:w-1/2 w-full rounded-lg backdrop-blur-lg m-4'>
          <div className='flex bg-indigo-600 justify-between p-4 rounded-t-lg'>
              <p className='font-bold'>Nuevo propósito</p>
            </div>
            <div className='p-4'>
              <textarea
                rows={7}
                onChange={(e: any) => setEditText(e.target.value)}
                placeholder="Escribe tu propósito de fin de año"
                className="w-full text-indigo-900 text-sm p-2 rounded-md resize-none" />
              <div className='flex justify-between gap-4 pt-2'>
                <button
                  className={
                    "flex justify-center gap-2 items-center py-2 px-4 " +
                    "bg-gradient-to-b from-red-400 to-red-700 rounded-full " +
                    "transition duration-300 hover:scale-105 filter drop-shadow-md"
                  }
                  onClick={() => onModalCreateClose(false)}
                >
                  <HiArrowLeft />
                  <p className='font-bold'>Atrás</p>
                </button>
                <button
                  className={
                    "flex justify-center gap-2 items-center py-2 px-4 " +
                    "bg-gradient-to-b from-green-400 to-green-700 rounded-full " +
                    "transition duration-300 hover:scale-105 filter drop-shadow-md"
                  }
                  onClick={() => onModalCreateClose(true)}
                >
                  <HiCheck /> 
                  <p className='font-bold'>Crear</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default List