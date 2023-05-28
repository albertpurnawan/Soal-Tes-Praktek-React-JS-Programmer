import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import Logout from "./Logout";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
const NavbarComp = ({ Produk, setProduk, setTempProduk}) => {
  const [search, setSearch] = useState("");
    const [list, setList] = useState(Produk);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(list);
    const newList = list.filter((item) => 
      item.nama.toLowerCase().includes(search)
    );
    // setProduk(newList);
    setTempProduk(newList);
  }
  return (
    <div>
      <Navbar class="navbar">
        {/* <Container class="container"> */}
        <div class="containers">
          <Nav class="brand">
            <Navbar.Brand>Stock Gudang</Navbar.Brand>
          </Nav>
          <Nav class="search">
            <Form className="form d-flex col">
              <Form.Group class="formGroup">
                <Form.Control class="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={(e) => {setSearch(e.target.value)}} onKeyUp={(e) => { handleSearch(e)}}/>
              </Form.Group>
              <Button className="ms-4" onClick={(e) => { handleSearch(e)}}>Search</Button>
            </Form>
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
