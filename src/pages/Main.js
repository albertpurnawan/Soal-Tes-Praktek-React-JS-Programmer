import React, { useState } from 'react';
import NavbarComp from '../components/NavbarComp';
import FooterComp from '../components/FooterComp';
import ProductComp from '../components/ProductComp';
import PaginationComp from '../components/PaginationComp';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Popup from '../components/PopupComp';
import * as formik from 'formik';
import * as yup from 'yup';
function Addlist({ setData, isAdd, togglePopup, schema, validated}) {
    function HandleSubmit(event) {
        const gambar = event.target.elements.name.gambar;
        const nama = event.target.elements.name.nama;
        const hargabeli = event.target.elements.name.hargabeli;
        const hargajual = event.target.elements.name.hargajual;
        const stock = event.target.elements.name.stock;
        const newData = {
            id: 4,
            gambar,
            nama,
            hargabeli,
            hargajual,
            stock
        }
        setData((lastData) => {
            return lastData.concat()
        })
    }
    return (
        <div>
            <Button className="addbutton" variant="success" size="lg" onClick={!isAdd ? togglePopup : togglePopup}>Add +</Button>
                {isAdd && <Popup
                    content={<>
                                    <h3><b>Add produk</b></h3>
                    <formik.Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            id: 3,
                            gambar: "gambar3.jpg",
                            nama: "Produk 3",
                            hargabeli: 20,
                            hargajual: 30,
                            stock: 15
                        }}
                    >
                    {({ handleChange, errors }) => (
                    <Form class="form d-flex " noValidate validated={validated} onSubmit={HandleSubmit}>
                        <Form.Group class="formGroup" controlId="formSearch">
                            <div>
                                <p>Pilih gambar produk</p>
                                <Form.Control class="form-control me-2  mb-2" name="gambar" onChange={handleChange} isInvalid={!!errors.gambar} type="file" required />
                            </div>
                            <div>
                                <p>Nama produk</p>
                                <Form.Control class="form-control me-2  mb-2" size="lg" name="nama" onChange={handleChange} isInvalid={!!errors.nama} type="text" defaultValue="" required />
                            </div>
                            <div>
                                <p>Harga beli produk</p><Form.Control class="form-control me-2  mb-2" size="lg" name="hargabeli" onChange={handleChange} isInvalid={!!errors.hargabeli} type="number" defaultValue="0" required />
                            </div>
                            <div>
                                <p>harga jual produk</p><Form.Control class="form-control me-2  mb-2" size="lg" name="hargajual" onChange={handleChange} isInvalid={!!errors.hargajual} type="number" defaultValue="0" required />
                            </div>
                            <div>
                                <p>Stock produk</p><Form.Control class="form-control me-2 mb-2" size="lg" name="stock" onChange={handleChange} isInvalid={!!errors.stock} type="number" defaultValue="0" required />
                            </div>
                        </Form.Group>
                    <div class="popupbutton">
                    <Button variant="success" size="lg" type="submit">Add</Button>{' '}
                    <Button variant="primary" size="lg" onClick={isAdd ? togglePopup : null}>Cancel</Button>{' '}
                    </div>
                                        </Form>
                )}
                </formik.Formik>
                </>}
                handleClose={togglePopup}
                />}
        </div>
    )
}
function MainPage() {
    const [isAdd, setisAdd] = useState(false);
    const togglePopup = () => {
        setisAdd(!isAdd);
    }

const listData = [
  {
    id: 1,
    gambar: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/08/23/3492973024.png",
    nama: "Produk 1",
    hargabeli: 10,
    hargajual: 15,
    stock: 20
  },
  {
    id: 2,
    gambar: "https://press.ikidane-nippon.com/wordpress/wp-content/uploads/2021/04/1-1.jpg",
    nama: "Produk 2",
    hargabeli: 5,
    hargajual: 8,
    stock: 10
  },
  {
    id: 3,
    gambar: "https://static.sehatq.com/content/review/product/image/767120211206100834.jpeg",
    nama: "Produk 3",
    hargabeli: 20,
    hargajual: 30,
    stock: 15
  }
    ];
    
    const [data, setData] = useState(listData)

      const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };
    const MAX_FILE_SIZE = 102400; //100KB
    const SUPPORTED_FORMATS = ['image/jpg', 'image/png'];
    

    const schema = yup.object().shape({
        id: yup.string().required(),
        gambar: yup
      .mixed()
      .required('A file is required')
      .test('file size',
        'upload file', (value) => !value || (value && value.size <= MAX_FILE_SIZE))
      .test('format',
        'upload file', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
        nama: yup.string().required(),
        hargabeli: yup.number().required(),
        hargajual: yup.number().required(),
        stock: yup.number().required()
    });


    return (
        <div>
            <NavbarComp />
            <div class="main">
                <Addlist setData={setData} isAdd={isAdd} togglePopup={togglePopup} schema={schema} validated={ validated} />
                <Row>
                {
                    data.map((current) => (
                        <Col><ProductComp id={current.id} gambar={current.gambar} hargabeli={current.hargabeli} hargajual={current.hargajual} nama={current.nama} stock={current.stock} /></Col>
                    ))
                }
                </Row>
                
            </div>
            <br/>
            <PaginationComp />
            <br/>
            <FooterComp />
        </div>
    );
}

export default MainPage;