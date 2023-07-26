import { EmpleadoApi } from '@/apis/EmpleadoApi';
import React, { useEffect, useState } from 'react'
import { Button, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import UpdateEmpleado from './UpdateEmpleado';
import EmpleadoHook from '@/hooks/EmpleadoHook';
import Link from 'next/link';

const ListEmpleado = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const MaxPagesDisplayed = 10;

  const {Empleados, fetchEmpleados, loading, totalPages} = EmpleadoHook();
  
  useEffect(() => {
    fetchEmpleados(currentPage)
  }, [currentPage]);

  const generatePageNumbers = () => {
    if (totalPages <= MaxPagesDisplayed) {
      // If the total number of pages is less than or equal to the maximum number of pages to display,
      // show all pages without ellipsis
      return Array.from({ length: totalPages }).map((_, index) => index + 1);
    }

    // Calculate the number of pages to display on each side of the current page
    const pagesToShow = Math.floor((MaxPagesDisplayed - 1) / 2);
    let startPage = Math.max(currentPage - pagesToShow, 1);
    let endPage = Math.min(currentPage + pagesToShow, totalPages);

    // Ensure that we have MAX_PAGES_DISPLAYED pages in total
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
  
  return (
    <>
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
                        <button className='button-delete'>
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
    </>
  )
}

export default ListEmpleado