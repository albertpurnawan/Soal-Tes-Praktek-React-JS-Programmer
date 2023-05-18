import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Popup from './PopupComp';
const DetailComp = () => {
  const [isDelete, setisDelete] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const togglePopup = () => {
    setisDelete(!isDelete);
  }
  const toggleinput = () => {
    setisEdit(!isEdit);
  }
  
  return (
      <div class="detail1">
        <div class="detail2">
        <img src={"../../public/logo192.png"} class="image" />
        <div class="detailtext">
          <Form class="form d-flex " role="search">
            <Form.Group class="formGroup" controlId="formSearch">
              {!isEdit ? null: <div><p>Pilih gambar produk</p><Form.Control class="form-control me-2  mb-2" type="file" /></div>}
              {!isEdit ? <h1>Nama</h1>: <div><p>Nama produk</p><Form.Control class="form-control me-2  mb-2" size="lg" type="text" defaultValue="Nama" /></div>}
              {!isEdit ?  <h4>Harga beli</h4>: <div><p>Harga beli produk</p><Form.Control class="form-control me-2  mb-2" size="lg" type="number" defaultValue="Harga beli" /></div>}
              {!isEdit ? <h4>Harga jual</h4>: <div><p>harga jual produk</p><Form.Control class="form-control me-2  mb-2" size="lg" type="number" defaultValue="Harga jual" /></div>}
              {!isEdit ? <h4>stock</h4>: <div><p>Stock produk</p><Form.Control class="form-control me-2 mb-2" size="lg" type="number" defaultValue="stock" keyboardType='numeric'/></div>}
            </Form.Group>
          </Form>
        </div>
      </div>
        <div class="detailbutton">
          <Button variant="primary" size="lg" onClick={!isEdit ? toggleinput : toggleinput}>Edit</Button>{' '}
          <Button variant="danger" size="lg" onClick={!isDelete ? togglePopup : null}
    >Delete</Button>{' '}
        {isDelete && <Popup
          content={<>
            <h3><b>Delete Confirmation</b></h3>
            <p>Are you sure want to delete this item?</p>
            <div class="popupbutton">
              <Button variant="danger" size="lg" onClick={isDelete ? togglePopup : null}>Delete</Button>{' '}
              <Button variant="primary" size="lg" onClick={isDelete ? togglePopup : null}>Cancel</Button>{' '}
            </div>
          </>}
          handleClose={togglePopup}
        />}
      </div>
    </div>
  );
};

export default DetailComp;
