import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { ToastContainer ,toast } from 'react-toastify';
import { EmpleadoApi, GeneralApi } from '@/apis/Apis';
import { AuthContext } from '@/Context/AuthContext';

interface Props {
  type: "Login" | "Acceso"
}

const Login = ({type}: Props) => {
  const {login} = useContext(AuthContext)
  const [Cedula, setCedula] = useState("")
  const [tipo, setTipo] = useState("")
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const [labels, setLabels] = useState({
    titulo: "",
    boton: ""
  })

  useEffect(() => {
    if(type === "Acceso"){
      setLabels({
        titulo: "Control de Acceso",
        boton: "Entrada",
      });
    } else{
      setLabels({
        titulo: "Iniciar Sesión",
        boton: "Acceder",
      });
    }
  }, [type])

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputCedula = (event: any) => {
    const { value } = event.target;
    setCedula(value);
  }

  const LoginUser = async(event: any) => {
    event.preventDefault();
    try {
      const { data } = await GeneralApi.post("/user/login", formData);
      if(data.response){
        localStorage.setItem('token', data.data.token)
        login();
      } else{
        toast(data.message,{type: 'error'})
      }
    } catch (error: any) {
      console.log(error)
      toast(error.message,{type: 'error'})
    }
  };

  const AccesoUser = async(event: any) => {
    event.preventDefault();
    try {
      const dataRegistro = {
        type: tipo,
        num_document: Cedula
      }
      const { data } = await EmpleadoApi.post('/employees/api/register', dataRegistro)

      if(data.response){
        toast(data.message, {
          type: 'success'
        });
      } else{
        toast(data.message, {
          type: 'error'
        });
      }
    } catch (error: any) {
      toast(error.message, {
        type: 'error'
      });
    }
  };
  return (
    <div className='login-container'>
      <ToastContainer 
        position='top-right'
        autoClose={2000}
        newestOnTop={true}
        pauseOnHover
      />
      <h2 className='text-center'>{labels.titulo}</h2>
      {
        type === "Login" &&
        <Form onSubmit={LoginUser} >
          <FormGroup 
            floating
          >
            <Input 
              id='userName'
              name='userName'
              placeholder='usuario'
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
            <Label for="userName" className='ml-2'>
              Usuario
            </Label>
          </FormGroup>
          
            <FormGroup 
              floating
              className='flex-grow-1'
            >
              <Input 
                id='password'
                name='password'
                placeholder='contraseña'
                value={formData.password}
                onChange={handleInputChange}
                type='password'
                required
              />
              <Label for="password" className='ml-2'>
                Contraseña
              </Label>
            </FormGroup>
            
          
          <div className='d-flex justify-content-center'>
            <Button color='primary' type='submit' >
              {labels.boton}
            </Button>
          </div>
        </Form>   
      }
      
      {
        type === "Acceso" &&
        <Form onSubmit={AccesoUser}>
          
          <FormGroup floating>
            <Input 
              id="num_document"
              name="num_document"
              placeholder='Cedula'
              value={Cedula}
              onChange={handleInputCedula}
              required
            />
            <Label>Cedula</Label>
          </FormGroup>
          <div className='d-flex justify-content-center'>
            <button className='button-control entrada' type='submit' onClick={() => setTipo('entrada')}>
              {labels.boton}
            </button>
            {
              type === 'Acceso' &&
              <button className='button-control salida' type='submit' onClick={() => setTipo('salida')}> 
                Salida
              </button>
            }
          </div>
        </Form>
      }
    </div>
  )
}

export default Login