 
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './index.css';

function  App() {
    const [info]=useState([
      {id:1 ,name :" pencil",quantity :1,idno :121 },
      {id:2 ,name :" pen",quantity :12,idno :23 },
      {id:3 ,name :" cycle",quantity :11,idno :21 },
      {id:4 ,name :" dolls",quantity :14,idno :32 },
 ])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
      return (
        <div> 
         
           <center><h2 >ALERT</h2> </center> 
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>QUANTITY </th>
              <th> ID NO</th>
              <th>ACTION </th>
            </tr>
          </thead>
          <tbody>
            {info.map((data)=>(
                 <tr>
                 <td>{data.name}</td>
                 <td>{data.quantity}</td>
                 <td>{data.idno}</td>
                 <td><button variant="primary" onClick={handleShow}>ORDER</button></td>
               </tr>
            ))}
            
          </tbody>
        </Table>
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> ORDER ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder=" enter the e-mail"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> QUANTITY</Form.Label>
              <Form.Control
                type= "number"
                placeholder="enter the quantity "
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
           ORDER
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      );
    }
    
    
    
    
    
export default  App;