import { AuthContext } from '@/Context/AuthContext'
import { EmpleadoApi } from '@/apis/Apis'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'

const EmpleadoHook = () => {
  const { organizationId } = useContext(AuthContext);
  const [Empleados, setEmpleados] = useState([]);
  const [Accesos, setAccesos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isLoadingAccesos, setIsLoadingAccesos] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEmpleados = async(currentPage: number) => {
    setEmpleados([]);
    const filter = {
      "organization.organizationId": organizationId,
    }
    try {
      const { data } = await EmpleadoApi.post(`/employees/api/filter?limit=${limit}&page=${currentPage}`, filter,{
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      if(data.data.length > 0){
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
      "name": buscador,
      "organization.organizationId": organizationId,
    };
    const filterNumDocument = {
      "num_document": buscador,
      "organization.organizationId": organizationId,
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
      if(data.data.length > 0){
        setIsLoadingAccesos(false);
        await fetchAccesos(dataRegistro.organization);
        return {response: data.response, message: data.message}
      } else{
        return {response: data.response, message: data.message}
      }
    } catch (error: any) {
      return {response: false, message: error.message}
    }
  }

  const fetchAccesos = async(id: string) => {
    console.log("Hola")
    setAccesos([]);
    setIsLoadingAccesos(false)
    const filter = {
      "employee.organization": id,
    }
    try {
      const { data } = await EmpleadoApi.post('/employees/api/check-employees-filter?limit=10000', filter)
      if(data.data.length > 0){
        setAccesos(data.data);
        setIsLoadingAccesos(true);
      }
    } catch (error: any) {
      console.log(error)
    }
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