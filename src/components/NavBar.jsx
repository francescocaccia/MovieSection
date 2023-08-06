import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import film from "../film.svg";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img src={film} alt="logo" height={50} width={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Caratteristiche</Nav.Link>
            <Nav.Link href="#pricing">Prezzi</Nav.Link>
            <Nav.Link href="#contact">Contatti</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Accedi</Nav.Link>
            <Nav.Link href="#signup">Registrati</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
