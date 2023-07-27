import { EmpleadoApi } from '@/apis/Apis';
import React, { useEffect, useState } from 'react'
import {  Button, Col, Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import EmpleadoHook from '@/hooks/EmpleadoHook';
import Link from 'next/link';
import Swal from 'sweetalert2'

const ListEmpleado = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [buscador, setBuscador] = useState('');
  const MaxPagesDisplayed = 10;

  const {Empleados, fetchEmpleados, filterEmpleado,setLoading, loading, totalPages} = EmpleadoHook();
  
  useEffect(() => {
    fetchEmpleados(currentPage)
  }, [currentPage]);

  const generatePageNumbers = () => {
    if (totalPages <= MaxPagesDisplayed) {
      return Array.from({ length: totalPages }).map((_, index) => index + 1);
    }

    const pagesToShow = Math.floor((MaxPagesDisplayed - 1) / 2);
    let startPage = Math.max(currentPage - pagesToShow, 1);
    let endPage = Math.min(currentPage + pagesToShow, totalPages);

    while (endPage - startPage < MaxPagesDisplayed - 1) {
      if (startPage > 1) {
        startPage--;
      } else if (endPage < totalPages) {
        endPage++;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => startPage + index);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPageClick = () => {
    setCurrentPage(totalPages);
  };

  const handleBuscador = (event:any) => {
    const { value }= event.target;
    setBuscador(value);
  }

  const deleteEmpleado = async(id:string) => {
    try {
      const { data } = await EmpleadoApi.post(`/employees/api/delete/${id}`,{
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      
      if(data.response){
        setLoading(false)
        fetchEmpleados(1);
        Swal.fire(
          'Eliminado',
          `${data.message}`,
          'success'
        )
      } else {
        Swal.fire(
          'Error',
          `${data.message}`,
          'error'
        )
      }
    } catch (error: any) {
      Swal.fire(
        'Error',
        `${error.message}`,
        'error'
      )
    }
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Desea eliminarlo?',
      text: 'No podra recuperarlo despues',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if(result.isConfirmed){
        deleteEmpleado(id);      
      }
    })
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if(buscador !== ''){
      setLoading(false)
      filterEmpleado(1, buscador);
    }
  }  

  const handleClear = (event:any) => {
    event.preventDefault();
    setLoading(false)
    fetchEmpleados(1);
    setBuscador('')
  }
  return (
    <>
    <div className='form-filter'>
      <Form
        onSubmit={handleSubmit}
        >
          <div className='d-flex'>
          <FormGroup floating >
              <Input
                id="buscador"
                name="buscador"
                value={buscador}
                onChange={handleBuscador}
                placeholder='Buscador'
                className='filter-input'
              />
              <Label>Buscador</Label>
            </FormGroup>
            <button type='submit' className='button-search submit'>
              <i className='fa fa-search'></i>
            </button>
            <button type='button' className='button-search clear' onClick={handleClear}>
              <i className='fa fa-close' />
            </button>
          </div>
      </Form>
    </div>
      
      {
        loading &&
        <div className='list-container'>
            
          <Table
            className='custom-table mt-2'
            striped
            size='sm'
            responsive
            bordered
          >
            <thead>
              <tr>
                <th className='header-table text-center'>#</th>
                <th className='header-table text-center'>Cedula</th>
                <th className='header-table text-center'>Nombres</th>
                <th className='header-table text-center'>Apellidos</th>
                <th className='header-table text-center'>Telefono</th>
                <th className='header-table text-center'></th>
              </tr>
            </thead>
            <tbody>
              {
                Empleados.map((row:any, index) => (
                  <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{row.num_document}</td>
                    <td>{row.name}</td>
                    <td>{row.lastname}</td>
                    <td>{row.cellphone}</td>
                    <td>
                      <div className='text-center'>
                      <Link href={`/actualizar-empleado?id=${row._id}`} passHref>
                        <button className='button-edit'>
                          <i className='fa fa-pencil'></i>
                        </button>
                      </Link>
                        <button className='button-delete' onClick={() => handleDelete(row._id)}>
                          <i className='fa fa-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <div className='d-flex justify-content-center'>
            <Pagination>
              <PaginationItem
                  disabled={currentPage === 1}
              >
                <PaginationLink
                  first
                  onClick={handleFirstPageClick}
                />
              </PaginationItem>
              <PaginationItem
                  disabled={currentPage === 1}
              >
                <PaginationLink
                  previous
                  onClick={handlePrevPageClick}
                />
              </PaginationItem>
              {
                generatePageNumbers().map((pageNumber, index, array) => (
                  <PaginationItem key={pageNumber} active={currentPage === pageNumber}>
                    <PaginationLink onClick={() => handlePageChange(pageNumber)}>{pageNumber}</PaginationLink>
                  </PaginationItem>
                ))
              }
              <PaginationItem
                  disabled={currentPage === totalPages}
              >
                <PaginationLink
                  next
                  onClick={handleNextPageClick}
                />
              </PaginationItem>
              <PaginationItem
                  disabled={currentPage === totalPages}
              >
                <PaginationLink 
                  last
                  onClick={handleLastPageClick}
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      }
      {
        !loading &&
        <div className='bg-light'>
          <h1 className='text-center'>No existen registros</h1>
        </div>
      }
    </>
  )
}

export default ListEmpleado