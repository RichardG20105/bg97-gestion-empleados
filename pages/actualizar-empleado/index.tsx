import UpdateEmpleado from '@/components/UpdateEmpleado'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Inicio = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  return (
    <div>
      <Head>
        <title>Gestión y control Empleados</title>
        <meta name="description" content="Creado por GB97 Ecuador"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <div className='header-title'>
        <h1 className='text-center mt-2'>Bienvenido al Actualizar de Empleado</h1>
        <span className='text-center mb-2'>Por favor, ingrese el número de cedula del Empleado a buscar</span>
      </div>
      <UpdateEmpleado id={id}/> 
    </div>
  )
}

export default Inicio