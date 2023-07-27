import React, { PropsWithChildren, useContext, useState } from 'react'
import Sidebar from '../Sidebar'
import Home from '@/pages';
import Acceso from '../Acceso';
import { AuthContext } from '@/Context/AuthContext';

const Layout = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const {isLoggedIn} = useContext(AuthContext)
  return (
    <>
      {
        isLoggedIn ? 
        <div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`sidecontent ${isOpen ?"active" :""}`}>
            {props.children}
          </div>
        </div>

        : <div>
          <Acceso />
        </div>
      }
    </>
  )
}

export default Layout