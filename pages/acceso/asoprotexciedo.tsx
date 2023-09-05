import { accessData } from '@/apis/AccesData'
import Acceso from '@/components/Acceso'
import Head from 'next/head'
import React from 'react'

const asoprotexciedo = () => {
  const data = accessData['/acceso/asoprotexciedo']
  return (
    <div>
      <Head>
        <title>Gestión y control Empleados</title>
        <meta name="description" content="Creado por GB97 Ecuador"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <Acceso id={data.id}/>
    </div>
  )
}

export default asoprotexciedo