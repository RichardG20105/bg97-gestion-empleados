import { EmpleadoApi } from '@/apis/Apis'
import EmpleadoHook from '@/hooks/EmpleadoHook'
import moment from 'moment'
import React, { useEffect, useState } from 'react'


const ListAccesso = () => {
  const { Accesos, fetchAccesos, isLoadingAccesos} = EmpleadoHook();
  useEffect(() => {
    console.log("Hola")
    fetchAccesos();
  }, []);

  const getTime = (fecha: string): string => {
    const date = moment(fecha)
    const time = date.format("LT")
    return time.toString();
  }

  return (
    <>
      {
        Accesos 
        && <div className='list-access'>
          <div className='row-header'>
            <p className='nombre'>Nombres</p>
            <p className='hora'>Hora</p>
          </div>
        {
          Accesos.map((item: any, index) => {
            return (
              <div className={`row-access ${item.type === "entrada" ?"entrada" : "salida"}`} key={index}>
                <div className='nombre'>
                  <p>{item.employee.name} {item.employee.lastname}</p>
                </div>
                <div className='hora'>
                  <p>{getTime(item.date_check_in)}</p>
                </div>
              </div>
            )
          })
          }
        </div>
      }
      
    </>
  )
}

export default ListAccesso