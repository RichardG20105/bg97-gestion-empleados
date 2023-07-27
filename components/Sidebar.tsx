import { AuthContext } from '@/Context/AuthContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { Container, Row, Col, Button, Collapse } from 'reactstrap'

const Sidebar = ({isOpen, setIsOpen}: any) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const {logout} = useContext(AuthContext)
  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>  
      <div className={`sidebar ${isOpen ?"active" :""}` }>
        <div className={`logo-details ${(isOpen) ?'active' :""}`}>
          {
            isOpen &&
            <span className="logo-name">Logo</span>
          }
          <a onClick={toggleSidebar}>
            <i className={isOpen ?'active fa fa-bars-staggered' :'fa fa-bars'}/>
          </a>
        </div>
        <hr className='divisor'/>
        <ul className={`nav-links`}>
          <li className={activeLink === 0 ? 'active' : ''}>
            <Link href="/crear-empleado" onClick={() => handleLinkClick(0)}>
              <i className={`${isOpen ?"active" :""} fa fa-user-plus`}></i>
              <span className={`link-name ${isOpen && "active"}`}>Crear Empleado</span>
            </Link>
          </li>
          <li className={activeLink === 1 ? 'active' : ''}>
            <Link href="/listar-empleados" onClick={() => handleLinkClick(1)}>
              <i className={`${isOpen ?"active" :""} fa fa-list`}></i>
              <span className={`link-name ${isOpen && "active"}`}>Listar Empleados</span>
            </Link>
          </li>
          <li className={activeLink === 3 ? 'active' : ''}>
            <Link href="/" onClick={() => logout()}>
              <i className={'fa fa-right-from-bracket'}></i>
              <span className={`link-name ${isOpen && "active"}`}>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar