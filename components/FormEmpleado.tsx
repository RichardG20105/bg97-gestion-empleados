import { EmpleadoApi } from '@/apis/Apis';
import React, { useEffect, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';


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
  action: (message: string, type: any) => void
}

const FormEmpleado = ({id, type, action}: Props) => {
  const router = useRouter();
  const [sub, setSub] = useState(false)
  const buttonName = type === "Crear" ? "Guardar" :"Actualizar"
  const [formData, setFormData] = useState({
    num_document: "",
    name: "",
    lastname: "",
    cellphone: "",
    job_position: "operario",
  })

  const [validData, setValidData] = useState({
    num_document: false,
    name: false,
    // job_position: false
  });


  useEffect(() => {
    if(type === "Actualizar"){
      fetchPerson();
    }
  }, [])

  const fetchPerson = async() => {
    try {
      const {data} = await EmpleadoApi.get(`/employees/api/${id}`,{
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      if(data.response){
        setFormData(data.data)
        setValidData({
          num_document: true,
          name: true,
          // job_position: true
        });
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSub(true);
    
    if(isFormValid()){
      if(type === "Crear"){
        CreatePerson();
      } else{
        UpdatePerson();
      }
    }
  };

  const clearFormData = () => {
    setFormData({
      num_document: "",
      name: "",
      lastname: "",
      job_position: "operario",
      cellphone: "",
    })

    setValidData({
      name: false,
      num_document: false,
      // job_position: false
    })
  }

  const CreatePerson = async() => {
    try {
      const {data} = await EmpleadoApi.post('/employees/api', formData, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      })
      if(data.response){
        action("Persona Creada Exitosamente", "success")
        clearFormData();
      }
      else{
        action(data.message, "error");
      }
    } catch (error: any) {
      action(error.message, "error");
    }
  }

  const UpdatePerson = async() => {
    try{
      const {data} = await EmpleadoApi.put(`/employees/api/${id}`, formData, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      if(data.response){
        action(data.message, "success")
        returnList();
      }else{
        action(data.message, "error")
        returnList();
      }
    }catch(error: any){
      action(error.message, "error");
    }
  }

  const returnList = () => {
    router.push('/listar-empleados');
  }
  
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidData({ ...validData, [name]: !!value });
  };

  const isFormValid = () => {
    return formData.num_document.length === 10 &&
    formData.name.trim() !== '';
    // && formData.job_position.trim() !== '';
  };
  return (
    <div className='crear-container'>
      <ToastContainer 
        position='top-right'
        autoClose={2000}
        newestOnTop={true}
        pauseOnHover
      />
      <Form
        className='p-3'
        onSubmit={handleSubmit}
      >
        <div className='d-flex flex-row'>
          <i className='fa fa-id-card mx-2 mt-3 d-flex justify-content-center' />
          <FormGroup 
            className='flex-grow-1'
            floating
          >
            <Input
              id="num_document"
              name='num_document'
              placeholder='Cedula'
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
        <div className='d-flex flex-row'>
          <i className='fa fa-user mx-2 mt-3 d-flex justify-content-center' />
          <FormGroup 
            className='flex-grow-1'
            floating
          >
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
        <div className='d-flex flex-row'>
          <i className='fa fa-user mx-2 mt-3 d-flex justify-content-center' />
          <FormGroup 
            className='flex-grow-1'
            floating
          >
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
        
        <div className='d-flex flex-row'>
          <i className='fa fa-phone mx-2 mt-3 d-flex justify-content-center' />
          <FormGroup 
            className='flex-grow-1'
            floating
          >
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

        {/* <div className='d-flex flex-row'>
          <i className='fa fa-person mx-2 mt-2 d-flex justify-content-center'></i>
          <Col md={6}>
            <FormGroup
              className='mx-1'
            >
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
        </div> */}
        <div className='d-flex justify-content-center'>
          <Button className='button' type='submit'>
            {buttonName}
          </Button>
          {
            type === "Crear" ?
            <button className='button-clear' type='reset' onClick={clearFormData}>
              <i className='fa fa-cancel'></i>
            </button>
            :
            <button className='button-cancel' type='button' onClick={returnList}>
              Cancelar
            </button>
          }
        </div>
      </Form>
    </div>
  )
}

export default FormEmpleado