import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FormEmpleado from './FormEmpleado';

const CreateEmpleado = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
  }

  const closeModal = () => {
    setModal(false)
  }
  return (
    <div>
      <div className='container-search'>
        <span className='title'>Gestion de Empleados</span>
        <Button className='button' onClick={toggle}> 
          <span>Nuevo Empleado</span>
          <i className='fa fa-plus'></i>
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody>
          <FormEmpleado type='Crear' action={closeModal} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CreateEmpleado