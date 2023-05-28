import React from "react";
// import Logout from "./Logout";
import { Card } from "react-bootstrap";
const ProductComp = ({ id, gambar, nama, hargabeli, hargajual, stock}) => {
  return (
    <div class="productcard">
      <Card style={{width: '30rem'}}>
            <Card.Link class="productlink" href="/detail">
          <Card.Img variant="top" src={gambar} height="500px"/>
                <Card.Body>
            <Card.Title >{ nama}</Card.Title>
                    <Card.Text class="producttitle">
              { stock}
                      </Card.Text>
                </Card.Body>
            </Card.Link>
        </Card>
    </div>
  );
};

export default ProductComp;
