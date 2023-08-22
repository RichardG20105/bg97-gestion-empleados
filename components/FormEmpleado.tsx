import { EmpleadoApi } from '@/apis/Apis';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { AuthContext } from '@/Context/AuthContext';

interface Props {
  id?: string,
  type: "Crear" | "Actualizar";
  action: (message: string, type: any) => void
}

const FormEmpleado = ({id, type, action}: Props) => {
  const router = useRouter();
  const { organizationId } = useContext(AuthContext);
  const [sub, setSub] = useState(false)
  const buttonName = type === "Crear" ? "Guardar" :"Actualizar"
  const [formData, setFormData] = useState({
    num_document: "",
    name: "",
    lastname: "",
    cellphone: "",
    job_position: "operario",
    organization: localStorage.getItem("orgId"),
  })

  const [validData, setValidData] = useState({
    num_document: false,
    name: false,
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
        });
      }
    } catch (error: any) {
      action(error.message, "error");
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
      cellphone: "",
      job_position: "operario",
      organization: "",
    })

    setValidData({
      name: false,
      num_document: false,
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
      console.log(error)
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
              minLength={10}
              maxLength={10}
              required
              autoComplete='false'
            />
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
              autoComplete='false'
              required
            />
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
                  autoComplete='false'
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
                autoComplete='false'
              />
              <Label for="cellphone">
                Telefono
              </Label>
            </FormGroup>
        </div>
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