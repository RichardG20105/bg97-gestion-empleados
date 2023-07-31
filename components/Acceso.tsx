import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Login from './Login'
import ListAccesso from './ListAccesso'

const Acceso = () => {
  const [activeNum, setActiveNum] = useState(1)
  return (
    <div className='acceso-container '>
      <div>
        <button type='button' className={`button-login button-option ${activeNum === 1 ?"active" :""}`} onClick={() => setActiveNum(1)}>Login</button>
        <button type='button' className={`button-acceso button-option ${activeNum === 2 ?"active" :""}`} onClick={() => setActiveNum(2)}>Acceso</button>
        {
          activeNum === 1 
          ? <Login type='Login' />
          : <Login type='Acceso' />
        }
      </div>
    </div>
  )
}

export default Acceso