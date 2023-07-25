import Link from 'next/link';
import React, { useState } from 'react'
import { Container, Row, Col, Button, Collapse } from 'reactstrap'
import Empleados from './Empleados';

const Sidebar = ({isOpen, setIsOpen}: any) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);

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
            <Link href="/empleados" onClick={() => handleLinkClick(0)}>
              <i className={`${isOpen ?"active" :""} fa fa-users`}></i>
              <span className={`link-name ${isOpen && "active"}`}>Gestión de Empleados</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar