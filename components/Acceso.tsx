import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Login from './Login'
import ListAccesso from './ListAccesso'
import { ToastContainer, toast } from 'react-toastify'
import { type } from 'os'
import EmpleadoHook from '@/hooks/EmpleadoHook'

interface Props {
  id: string
}

const Acceso = ({id}: Props) => {
  const [Cedula, setCedula] = useState("")
  const [tipo, setTipo] = useState("");
  const { fetchAccesos, isLoadingAccesos, registerAcceso } = EmpleadoHook();

  useEffect(() => {
    fetchAccesos(id)
  }, []);
  
  const AccesoUser = async(event: any) => {
    event.preventDefault();
    try {
      const dataRegistro = {
        type: tipo,
        num_document: Cedula,
        organization: id
      }
      const result = await registerAcceso(dataRegistro);

      if(result.response){
        setCedula("");
        fetchAccesos(id);
        toast(result.message, {
          type: 'success'
        });
      } else{
        toast(result.message, {
          type: 'error'
        });
      }
    } catch (error: any) {
      toast(error.message, {
        type: 'error'
      });
    }
  };
  
  const handleInputCedula = (event: any) => {
    const { value } = event.target;
    setCedula(value);
  }

  return (
    <div className='acceso-container'>
      <div className={`login-container acceso`}>
        <ToastContainer 
          position='top-right'
          autoClose={2000}
          newestOnTop={true}
          pauseOnHover
        />
        <h2 className='text-center'>Control de Acceso</h2>
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
                Entrada
              </button>
              
                <button className='button-control salida' type='submit' onClick={() => setTipo('salida')}> 
                  Salida
                </button>
            </div>
          </Form>
      </div>
      {
        isLoadingAccesos &&
        <ListAccesso id={id} /> 
      }
    </div>
  )
}

export default Acceso