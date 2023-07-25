import { EmpleadoApi } from '@/apis/EmpleadoApi';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const JobOptions = [
  {
    name: "administrador",
    label: "Administrador"
  }, 
  {
    name: "operario",
    label: "Operario"
  },
  {
    name: "contador",
    label: "Contador",

  }
]

interface Props {
  id?: string,
  type: "Crear" | "Actualizar";
  action: () => void
}

const FormEmpleado = ({id, type, action}: Props) => {
  const [sub, setSub] = useState(false)
  const [formData, setFormData] = useState({
    num_document: "",
    name: "",
    lastname: "",
    cellphone: "",
    job_position: "",
  })

  const [validData, setValidData] = useState({
    num_document: false,
    name: false,
    job_position: false
  });

  useEffect(() => {
    if(type === "Actualizar"){
      fetchPerson();
    }
  }, [])

  const fetchPerson = () => {
    console.log(id)
  }
  

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSub(true);
    
    console.log(isFormValid())
    if(isFormValid()){
      if(type === "Crear"){
        CreatePerson();
      }
    }
  };

  const CreatePerson = async() => {
    try {
      const {data} = await EmpleadoApi.post('/employees/api', formData)
      if(data.response){
        console.log("Exito")
      }
      else{
        console.log(data.message);
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidData({ ...validData, [name]: !!value });
  };

  const isFormValid = () => {
    return formData.num_document.length === 10 &&
    formData.name.trim() !== '' && 
    formData.job_position.trim() !== '';
  };
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <div className='d-flex justify-content-center'>
        <h2>
          Nuevo Empleado
        </h2>
      </div>
      <div>
          <FormGroup floating>
            <Input
              id="num_document"
              name='num_document'
              placeholder='Cedula'
              className='input'
              value={formData.num_document}
              onChange={handleInputChange}
              invalid={!validData.num_document && sub}
              minLength={10}
              maxLength={10}
            />
            <FormFeedback>
              El Cedula es requerida
            </FormFeedback>
            <Label for="num_document" className='ml-2'>
              Cedula
            </Label>
          </FormGroup>
      </div>
      <div>
        <FormGroup floating>
          <Input
            id="name"
            name="name"
            placeholder='Nombre'
            value={formData.name}
            onChange={handleInputChange}
            invalid={!validData.name && sub}
          />
          <FormFeedback>
            El Nombre es requerido
          </FormFeedback>
          <Label for="name">
            Nombre
          </Label>
        </FormGroup>
      </div>
      <div>
        <FormGroup floating>
              <Input 
                id="lastname"
                name="lastname"
                placeholder='Apellido'
                value={formData.lastname}
                onChange={handleInputChange}
              />
              <Label for="lastname">
                Apellido
              </Label>
            </FormGroup>
      </div>
      
      <div>
          <FormGroup floating>
            <Input 
              id="cellphone"
              name="cellphone"
              placeholder='Telefono'
              value={formData.cellphone}
              onChange={handleInputChange}
            />
            <Label for="cellphone">
              Telefono
            </Label>
          </FormGroup>
      </div>

      <div>
        <Col md={6}>
          <FormGroup>
            <Input
              id="job_position"
              name="job_position"
              type="select"
              value={formData.job_position}
              onChange={handleInputChange}
              invalid={!validData.job_position && sub}
            >
              <option value="" disabled selected>
                Escoja una opción...
              </option>
              {
                JobOptions.map(({name, label}) => {
                  return (
                    <option value={name}>
                      {label}
                    </option>
                  )
                })
              }
            </Input>
            <FormFeedback>
              Debe seleccionar una opción
          </FormFeedback>
          </FormGroup>
        </Col>
      </div>
      <div className='d-flex justify-content-center'>
        <Button className='button' type='submit'>
          Guardar
        </Button>
      </div>
    </Form>
  )
}

export default FormEmpleado