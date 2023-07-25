import React, { PropsWithChildren, useState } from 'react'
import Sidebar from '../Sidebar'

const Layout = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true)
  return (
    <>
      {
        isAuth ? 
        <div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`sidecontent ${isOpen ?"active" :""}`}>
            {props.children}
          </div>
        </div>

        : <div>
          Login
        </div>
      }
    </>
  )
}

export default Layout