import React, { useCallback, useState } from 'react';
import NavbarComp from '../components/NavbarComp';
import FooterComp from '../components/FooterComp';
import ProductComp from '../components/ProductComp';
import PaginationComp from '../components/PaginationComp';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Popup from '../components/PopupComp';
import { useFormik } from "formik";
import * as yup from 'yup';
import { uid } from 'uid';
import { Link } from 'react-router-dom';
import produk from '../data/produk';
import DetailComp from '../components/DetailComp';
    

function Addlist({isAdd,setisAdd,Produk,togglePopupAdd}) {
    const [gambar, setGambar] = useState("");
    const [nama, setNama] = useState("");
    const [hargabeli, setHargabeli] = useState(0);
    const [hargajual, setHargajual] = useState(0);
    const [stock, setStock] = useState(0);
    
    const [isGambar, setIsGambar] = useState(false);
    const [isNama, setIsNama] = useState(false);
    const [isHargabeli, setIsHargabeli] = useState(false);
    const [isHargajual, setIsHargajual] = useState(false);
    const [isStock, setIsStock] = useState(false);
    
    const [validated, setValidated] = useState(true);
    const MAX_FILE_SIZE = 100000; //100KB
    const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];


    const checkerGambar = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file && !file.name) {
            
            setIsGambar(false);
        }else
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
            const duplicate = Produk.filter((item) => item.nama === value);
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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isGambar && isNama && isHargabeli && isHargajual && isStock) {
            const id = uid;
            const modelData = {
                id: id,
                gambar: gambar,
                nama: nama,
                hargabeli: hargabeli,
                hargajual: hargajual,
                stock: stock
            }
            Produk.push(modelData)
            alert("Input Success");
        } else {
            alert("Input Failed");
        }
        setisAdd(false);
    }
    return (
        <div class="popupform">
            <h3><b>Add produk</b></h3>
            <Form class="form d-flex" noValidate validated={validated}>
                <Form.Group class="formGroup" controlId="formSearch">
                    <div>
                        <p style={{ verticalAlign: 'baseline', display: 'inline' }}>Pilih gambar produk</p>
                        <Form.Control class="form-control" name="gambar" onChange={(e) => { setGambar(e.target.files[0].name); checkerGambar(e); }} type="file" required/>
                        {/* <Form.Control.Feedback type="invalid">Format Correct.</Form.Control.Feedback> */}
                        {!isGambar ? <p style={{color: 'red'}}>Please Select File Below 100kb and with Extension jpg or png.</p> : null}
                    </div>
                    <div>
                        <p style={{ verticalAlign: 'baseline', display: 'inline' }}>Nama produk</p>
                        <Form.Control class="form-control me-2  mb-2" size="lg" name="nama" onChange={(e) => { setNama(e.target.value); checkerNama(e); }}  type="text" defaultValue="" required/>
                        {!isNama ? <p style={{color: 'red'}}>Please Input Nama Produk Baru.</p> : null}
                    </div>
                    <div>
                        <p style={{ verticalAlign: 'baseline', display: 'inline' }}>Harga beli produk</p>
                        <Form.Control class="form-control me-2  mb-2" size="lg" name="hargabeli" onChange={(e) => { setHargabeli(e.target.value); setIsHargabeli(checkerNumber(e)); }}  type="number" defaultValue="" required />
                        {!isHargabeli ? <p style={{color: 'red'}}>Please Input Harga Beli Produk with Number Only.</p> : null}
                    </div>
                    <div>
                        <p style={{ verticalAlign: 'baseline', display: 'inline' }}>Harga jual produk</p>
                        <Form.Control class="form-control me-2  mb-2" size="lg" name="hargajual" onChange={(e) => { setHargajual(e.target.value); setIsHargajual(checkerNumber(e)); }}  type="number" defaultValue="" required />
                        {!isHargajual ? <p style={{color: 'red'}}>Please Input Harga Jual Produk with Number Only.</p> : null}
                    </div>
                    <div>
                        <p style={{ verticalAlign: 'baseline', display: 'inline' }}>Stock produk</p>
                        <Form.Control class="form-control me-2 mb-2" size="lg" name="stock" onChange={(e) => { setStock(e.target.value); setIsStock(checkerNumber(e)); }}  type="number" defaultValue="" required />
                        {!isStock ? <p style={{color: 'red'}}>Please Input Stock with Number Only.</p> : null}
                    </div>
                </Form.Group>
                <div class="popupbutton">
                    <Button variant="success" size="lg" type='submit' onClick={(e) => handleSubmit(e)}>Add</Button>{' '}
                    <Button variant="primary" size="lg" onClick={isAdd ? togglePopupAdd : null}>Cancel</Button>{' '}
                </div>
            </Form>
        </div>
    )
}
function MainPage() {
    
    const [Produk, setProduk] = useState(produk);
    const [tempProduk, setTempProduk] = useState(Produk);
    const [isAdd, setisAdd] = useState(false);
    const [isDet, setisDet] = useState(false);
    const togglePopupAdd = () => {
        setisAdd(!isAdd);
    }
    const togglePopupDet = () => {
        setisDet(!isDet);
    }
    const paginate = (number) => {
        if (number !== 'all') {
            const perPage = 3;
            const firstIndexProduk = (number * perPage) - 3;
            const lastIndexProduk = (number * perPage);
            setTempProduk(Produk.slice(firstIndexProduk,lastIndexProduk));
        } else {
            setTempProduk(Produk);
        }
        
    }
    return (
        <div>
            <NavbarComp Produk={Produk} setProduk={setProduk} setTempProduk={setTempProduk} />
            <div class="main">
                <Button className="addbutton" variant="success" size="lg" onClick={!isAdd ? togglePopupAdd : togglePopupAdd}>Add +</Button>
                {isAdd && <Popup
                    content={<>
                        <Addlist isAdd={isAdd} setisAdd={setisAdd} Produk={Produk} togglePopupAdd={ togglePopupAdd}/>
                    </>}
                    handleClose={togglePopupAdd}
                />}
                <Row>
                {
                    tempProduk.map((current) => (
                        <Col>
                            {isDet && <Popup
                                content={<>
                                    <div class="detailpage">
                                        <DetailComp id={current.id} gambar={current.gambar} hargabeli={current.hargabeli} hargajual={current.hargajual} nama={current.nama} stock={current.stock} setisDet={setisDet} Produk={Produk} setProduk={setProduk} setTempProduk={setTempProduk} />
                                    </div>
                                </>}
                                id={current.id} gambar={current.gambar} hargabeli={current.hargabeli} hargajual={current.hargajual} nama={current.nama} stock={current.stock} handleClose={togglePopupDet}
                            />}
                            <Link onClick={!isDet ? togglePopupDet : togglePopupDet}>
                                <ProductComp id={current.id} gambar={current.gambar} hargabeli={current.hargabeli} hargajual={current.hargajual} nama={current.nama} stock={current.stock} />
                            </Link>
                        </Col>
                    ))
                }
                </Row>
                
            </div>
            <br/>
            <PaginationComp perpage={3} length={Produk.length} paginate={paginate}/>
            <br/>
            <FooterComp />
        </div>
    );
}

export default MainPage;