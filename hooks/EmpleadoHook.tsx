import { AuthContext } from '@/Context/AuthContext'
import { EmpleadoApi } from '@/apis/Apis'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'

const EmpleadoHook = () => {
  const [Empleados, setEmpleados] = useState([])
  const [Accesos, setAccesos] = useState([])

  const [loading, setLoading] = useState(false)
  const [isLoadingAccesos, setIsLoadingAccesos] = useState(false)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(0)  

  const fetchEmpleados = async(currentPage: number) => {
    setEmpleados([]);
    try {
      const { data } = await EmpleadoApi.get(`/employees/api?limit=${limit}&page=${currentPage}`,{
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      if(data.response){
        setEmpleados(data.data)
        setTotalPages(data.pagination.totalPages);
        setLoading(true)
      }
    } catch (error: any) {
      
    }
  }

  const filterEmpleado = async(currentPage: number, buscador: string) => {
    setEmpleados([]);
    const filterName = {
      name: buscador
    };
    const filterNumDocument = {
      num_document: buscador
    };
    try {
      const { data } = await EmpleadoApi.post(`/employees/api/filter?limit=${limit}&page=${currentPage}`,filterName,{
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });

      if(data.data.length > 0){
        setEmpleados(data.data)
        setTotalPages(data.pagination.totalPages);
        setLoading(true)
      } else {
         try {
          const { data } = await EmpleadoApi.post(`/employees/api/filter?limit=${limit}&page=${currentPage}`,filterNumDocument,{
          headers: {
            "Authorization": localStorage.getItem('token')
          }
          });
          if(data.data.length > 0){
            setEmpleados(data.data)
            setTotalPages(data.pagination.totalPages);
            setLoading(true)
          }
        } catch (error:any) {
          
        }
      }
    } catch (error: any) {
      
    }
  };

  const registerAcceso = async(dataRegistro: any): Promise<{response: boolean, message: string}> => {
    try {
      const { data } = await EmpleadoApi.post('/employees/api/register', dataRegistro)
      if(data.response){
        setIsLoadingAccesos(false);
        fetchAccesos();
        return {response: data.response, message: data.message}
      } else{
        return {response: data.response, message: data.message}
      }
    } catch (error: any) {
      return {response: false, message: error.message}
    }
  }

  const fetchAccesos = async() => {
    setAccesos([])
    try {
      const { data } = await EmpleadoApi.get('/employees/api/check-employees?limit=none')
      if(data.response){
        filterAccesos(data.data);
        setIsLoadingAccesos(true);
      }
    } catch (error: any) {
      
    }
  }

  const filterAccesos = (data: any[]) => {
    const adjustedData = data.filter((item) => {
      const originalDate = moment(item.date_check_in);
      const adjustedDate = originalDate.subtract(5, 'hours');
      return {
        ...item,
        date_check_in: adjustedDate.toISOString(), // Convierte la fecha a formato ISO para mantener el formato original
      };
    });
    const todayAdjusted = moment().startOf('day');
    const filteredData: any = adjustedData.filter((item) => {
      const date_check_in = moment(item.createdAt);
    
      // Verificar si la fecha 'createdAt' es igual al día de hoy
      return date_check_in.isSame(todayAdjusted, 'day');
    });
    setAccesos(filteredData);
  }

  return {
    fetchEmpleados,
    fetchAccesos,
    registerAcceso,
    filterEmpleado,
    Empleados,
    Accesos,
    loading,
    setLoading,
    setIsLoadingAccesos,
    isLoadingAccesos,
    totalPages,
  }
}

export default EmpleadoHook