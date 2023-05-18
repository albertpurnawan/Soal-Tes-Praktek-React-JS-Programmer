import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import Logout from "./Logout";
import { Navbar, Nav, Form } from "react-bootstrap";
const NavbarComp = () => {
  return (
    <div>
      <Navbar class="navbar">
        {/* <Container class="container"> */}
        <div class="containers">
          <Nav class="brand">
            <Navbar.Brand>Stock Gudang</Navbar.Brand>
          </Nav>
          <Nav class="search">
            <Form class="form d-flex " role="search">
              <Form.Group class="formGroup" controlId="formSearch">
                <Form.Control class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              </Form.Group>
              </Form>
            {/* <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </Nav>
          <Nav>
            <Nav.Link><FontAwesomeIcon icon={faCircleUser} /></Nav.Link>
          </Nav>
           </div>
        {/* </Container> */}
      </Navbar>
    </div>
  );
};

export default NavbarComp;
