import { EmpleadoApi } from '@/apis/Apis'
import React, { useEffect, useState } from 'react'

const EmpleadoHook = () => {
  const [Empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(false)
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
      console.log(error.message)
    }
  }

  return {
    fetchEmpleados,
    Empleados,
    loading,
    setLoading,
    totalPages,
  }
}

export default EmpleadoHook