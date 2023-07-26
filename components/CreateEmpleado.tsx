import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FormEmpleado from './FormEmpleado';
import { ToastContainer, toast } from "react-toastify";

const CreateEmpleado = () => {

  const onSuccess = async(message: string, type: any) => {
    toast.success(message, {
      type
    });
  }
  return (
    <div className='container'>
      <ToastContainer 
        position='top-right'
        autoClose={2000}
        newestOnTop={true}
        pauseOnHover
      />
      <FormEmpleado type='Crear' action={onSuccess}  />
    </div>
  )
}

export default CreateEmpleado