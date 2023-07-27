import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Home() {
  
  return (
    <div>
      <Head>
        <title>Gestión y control Empleados</title>
        <meta name="description" content="Creado por GB97 Ecuador"/> 
        <link rel="icon" href="/logo.ico"/>
      </Head>
      <h1 className="text-center pt-3">Gestión de Empleados</h1>

      <div className="d-flex justify-content-center central-container">
      <div className="container-inicio">
        <h3 className="text-center">Bienvenido a la pagina Gestion de Empleados</h3>
        <h4 className="text-center">En esta página podra realizar los siguiente</h4>

        <Row className="row-container">
          <Col md='6'>
            <Container className="custom-container">
              <i className="fa fa-user-plus" />
              <h4 className="text-center">Creación de Empleados</h4>
              <p className="text-center">Permite registrar un nuevo empleado en el sistema</p>
            </Container>
          </Col>
          <Col md='6'>
            <Container className="custom-container">
              <i className="fa fa-bars" />
              <h4 className="text-center">Listar Empleados</h4>
              <p className="text-center">Permite listar, modificar y eliminar un empleado del sistema</p>
            </Container>
          </Col>
        </Row>
      </div>
      </div>
    </div>
  )
}