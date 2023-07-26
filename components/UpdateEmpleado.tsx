import React, { useState } from 'react'
import { Col, Form, Input, Modal, ModalBody, Row } from 'reactstrap'
import FormEmpleado from './FormEmpleado'
import { ToastContainer, toast } from "react-toastify";

interface Props{
  id: string | undefined
}

const UpdateEmpleado = ({id}: Props) => {

  const onSuccess = async(message: string, type: any) => {
    toast(message, {
      type
    });
  }
  
  return (
    <>
      <ToastContainer 
        position='top-right'
        autoClose={2000}
        newestOnTop={true}
        pauseOnHover
      />
      <div className='container'>
        <FormEmpleado type='Actualizar' id={id} action={onSuccess} />  
      </div>
    </>
  )
}

export default UpdateEmpleado