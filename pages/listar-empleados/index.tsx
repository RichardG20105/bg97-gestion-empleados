import ListEmpleado from '@/components/ListEmpleado'
import Head from 'next/head'
import React from 'react'

const Inicio = () => {
  return (
    <div>
      <Head>
        <title>Gestión y control Empleados</title>
        <meta name="description" content="Creado por GB97 Ecuador"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <div className='header-title'>
        <h1 className='text-center py-2'>Listado de Empleados</h1>
        
      </div>
      <ListEmpleado />
    </div>
  )
}

export default Inicio