import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { ToastContainer ,toast } from 'react-toastify';
import { EmpleadoApi, GeneralApi } from '@/apis/Apis';
import { AuthContext } from '@/Context/AuthContext';
import EmpleadoHook from '@/hooks/EmpleadoHook';
import ListAccesso from './ListAccesso';


const Login = () => {
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const LoginUser = async(event: any) => {
    event.preventDefault();
    try {
      const { data } = await GeneralApi.post("/user/login", formData);
      if(data.response){
        const date = new Date();
        const orgId = data.data.organizationId
        const organizationId = await organizationInfo(orgId);
        localStorage.setItem("orgId", orgId);
        if(organizationId){
          login(data.data.token, organizationId ,date);
        }
      } else{
        toast(data.message,{type: 'error'})
      }
    } catch (error: any) {
      const { data } = error.response;
      toast(data.message,{type: 'error'})
    }
  };

 
  const organizationInfo = async(id: string): Promise<string | null> => {
    try {
      const data = await GeneralApi.get(`/organizaciones/api/${id}`);
      const organizationId = data.data.data.organizationId
      return organizationId
    } catch (error: any) {
      toast(error.message,{type: 'error'})
      return null;
    }
  }
  return (
    <div className='acceso-container'>
      <div className={`login-container`}>
        <ToastContainer 
          position='top-right'
          autoClose={2000}
          newestOnTop={true}
          pauseOnHover
        />
        <h2 className='text-center'>Iniciar Sesión</h2>
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
              autoComplete='false'
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
                autoComplete='false'
              />
              <Label for="password" className='ml-2'>
                Contraseña
              </Label>
          </FormGroup>
          <div className='d-flex justify-content-center'>
            <Button color='primary' type='submit' >
              Acceder
            </Button>
          </div>
        </Form>      
      </div>
    </div>
  )
}

export default Login