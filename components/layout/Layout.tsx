import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Home from '@/pages';
import Acceso from '../Acceso';
import { AuthContext } from '@/Context/AuthContext';
import Login from '../Login';
import { useRouter } from 'next/router';
import { accessData } from '@/apis/AccesData';

const Layout = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const {isLoggedIn} = useContext(AuthContext);
  const router = useRouter();

  const isPublicRoute = accessData.hasOwnProperty(router.pathname);
  
  return (
    <>
      {
        isLoggedIn ? 
        <div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`sidecontent ${isOpen ? "active" : ""}`}>
            {props.children}
          </div>
        </div>

        : isPublicRoute ? (
          props.children
        ) : (
          <Login />
        )
      }
    </>
  )
}

export default Layout