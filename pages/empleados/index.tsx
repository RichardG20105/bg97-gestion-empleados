import Empleados from '@/components/Empleados'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'
import React, { useState } from 'react'

const Inicio = () => {
  return (
    <div>
      <Head>
        <title>Gestión y control Empleados</title>
        <meta name="description" content="Creado por GB97 Ecuador"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <Empleados/> 
    </div>
  )
}

export default Inicio