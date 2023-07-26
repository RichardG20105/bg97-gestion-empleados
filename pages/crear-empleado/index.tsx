import CreateEmpleado from '@/components/CreateEmpleado'
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
      <div className='header-title'>
        <h1 className='text-center mt-2'>Bienvenido al Registro de Empleado</h1>
        <span className='text-center mb-2'>Por favor, ingrese los siguientes datos</span>
      </div>
      <CreateEmpleado /> 
    </div>
  )
}

export default Inicio