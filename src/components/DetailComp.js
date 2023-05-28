import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Popup from './PopupComp';
const DetailComp = ({ id, gambar, hargabeli, hargajual, nama, stock, setisDet, Produk,setProduk,setTempProduk }) => {
  const [isDelete, setisDelete] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [list, setList] = useState(Produk);
  const [inputGambar, setInputgambar] = useState(gambar);
  const [inputNama, setInputnama] = useState(nama);
  const [inputHargabeli, setInputhargabeli] = useState(hargabeli);
  const [inputHargajual, setInputhargajual] = useState(hargajual);
  const [inputStock, setInputstock] = useState(stock);

  const togglePopup = () => {
    setisDelete(!isDelete);
  }
  const toggleinput = () => {
    setisEdit(!isEdit);
  }

  const [isGambar, setIsGambar] = useState(true);
    const [isNama, setIsNama] = useState(true);
    const [isHargabeli, setIsHargabeli] = useState(true);
    const [isHargajual, setIsHargajual] = useState(true);
    const [isStock, setIsStock] = useState(true);
    
    const [validated, setValidated] = useState(true);
    const MAX_FILE_SIZE = 100000; //100KB
    const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

    
    const checkerGambar = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file.size > MAX_FILE_SIZE) {
            setIsGambar(false);
        }else
        if (!SUPPORTED_FORMATS.includes(file.type)) {
            
            setIsGambar(false);
        } else {
            setIsGambar(true);
        }
        
    }
    const checkerNama = (e) => {
        let value = e.target.value;
        if (value === "") {
            setIsNama(false);
        } else {
          const duplicate = list.filter((item) => item.nama === value);
            if (duplicate.length === 1) {
                console.log(duplicate);
                setIsNama(false);
            } else {
                setIsNama(true);
            }
        }
        
    }
    const checkerNumber = (e) => {
      let value = e.target.value;
      if (/\d/.test(value)) {
        return true;
      } else {
          return false;
      }
    }
  
  const handleDelete = (event) => {
    console.log(event);
    event.preventDefault();
    const newList = list.filter((item) => item.id !== id);
    setProduk(newList);
    setTempProduk(newList);
    setList(newList);
    setisDelete(false);
    setisDet(false);
    alert("Delete Success");
  }

  const handleEdit = (event) => {
    event.preventDefault();
    if (isGambar && isNama && isHargabeli && isHargajual && isStock) {
      const newList = list.map((item) => {
        if (item.id === id) {
            const modelData = {
              id: id,
              gambar: inputGambar,
              nama: inputNama,
              hargabeli: inputHargabeli,
              hargajual: inputHargajual,
              stock: inputStock
            }
            return modelData;
          }
          return item;
        });
      setProduk(newList);
      setTempProduk(newList);
      alert("Edit Success");
    }  else {
      alert("Edit Failed");
    }
    setisEdit(false);
  }
  return (
      <div class="detail1">
        <div class="detail2">
        <img src={gambar} class="image" />
        <div class="detailtext">
          <Form class="form d-flex" validated={validated}>
            <Form.Group class="formGroup">
              {!isEdit ? null : <div><p>Pilih gambar produk</p><Form.Control class="form-control me-2  mb-2" type="file" onChange={(e) => { setInputgambar(e.target.files[0].name); checkerGambar(e);}}/>{!isGambar ? <p style={{color: 'red'}}>Please Select File Below 100kb and with Extension jpg or png.</p> : null}</div>}
              {!isEdit ? <div><h5>Nama Produk</h5><h1>{nama}</h1></div> : <div><p>Nama produk</p><Form.Control class="form-control me-2  mb-2" s type="text" defaultValue={nama} onChange={(e) => { setInputnama(e.target.value); checkerNama(e);}}/>{!isNama ? <p style={{color: 'red'}}>Please Input Nama Produk Baru.</p> : null}</div>}
              {!isEdit ? <div><h5>Harga Beli Produk</h5><h3>{hargabeli}</h3></div> : <div><p>Harga beli produk</p><Form.Control class="form-control me-2  mb-2" type="number" defaultValue={hargabeli} onChange={(e) => { setInputhargabeli(e.target.value); setIsHargabeli(checkerNumber(e)); }}/>{!isHargabeli ? <p style={{color: 'red'}}>Please Input Harga Beli Produk with Number Only.</p> : null}</div>}
              {!isEdit ? <div><h5>Harga Jual Produk</h5><h3>{hargajual}</h3></div>: <div><p>harga jual produk</p><Form.Control class="form-control me-2  mb-2"  type="number" defaultValue={hargajual} onChange={(e) => { setInputhargajual(e.target.value); setIsHargajual(checkerNumber(e)); }}/>{!isHargajual ? <p style={{color: 'red'}}>Please Input Harga Jual Produk with Number Only.</p> : null}</div>}
              {!isEdit ? <div><h5>Stock Produk</h5><h3>{stock}</h3></div> : <div><p>Stock produk</p><Form.Control class="form-control me-2 mb-2" type="number" defaultValue={stock} onChange={(e) => { setInputstock(e.target.value); setIsStock(checkerNumber(e)); }}/>{!isStock ? <p style={{color: 'red'}}>Please Input Stock with Number Only.</p> : null}</div>}
            </Form.Group>
          </Form>
        </div>
      </div>
      <div class="detailbutton">
        {!isEdit ? <Button variant="primary" size="lg" onClick={!isEdit ? toggleinput : toggleinput}>Edit</Button> : <Button variant="success" size="lg" onClick={(e) => { handleEdit(e) }}>Confirm</Button>}
        {!isEdit ? <Button variant="danger" size="lg" onClick={!isDelete ? togglePopup : null}>Delete</Button>: <Button variant="primary" size="lg" onClick={!isEdit ? toggleinput : toggleinput}>Cancel</Button>}
        {isDelete && <Popup
          content={<>
            <h3><b>Delete Confirmation</b></h3>
            <p>Are you sure want to delete this item?</p>
            <div class="popupbutton">
              <Button variant="danger" size="lg" onClick={(e) => {handleDelete(e)}}>Delete</Button>{' '}
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
