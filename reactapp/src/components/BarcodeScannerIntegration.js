import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import NavbarComp from './NavbarComp';
import axios from 'axios';

const  BarcodeScannerIntegeration = () => {
  const [barcode, setBarcode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
      // Function to fetch data
      const fetchData = async (barcode) => {
        try {
          const response = await axios.get(`https://8080-fadddadbaeabecafaddeebcaddaceaeaadbdbabf.project.examly.io/product/barcode/${barcode}`);
          setProductDetails(response.data);
        } catch (error) {
          console.error('Error:', error);
          setProductDetails(false)
        }
      };
  
      // Call the fetch data function
     

  const handleButtonClick = () => {
    if (productDetails) {
      setDetailsModalOpen(true);
    } else {
      setErrorModalOpen(true);
      setTimeout(() => setErrorModalOpen(false), 2000); // Delay before closing the error modal
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  const handleCleanup = () => {
    setBarcode('');
  };

  useEffect(() => {
    handleCleanup();
  }, [productDetails]);

  return (
    <div>
      <NavbarComp />
      <center><h1 className="text-align:center">Barcode Scanner</h1></center>

      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="col-6">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Barcode ID"
            // value={barcode}
            onChange={(e) =>fetchData(e.target.value)}
          />
          <center>
            <button
              className="btn btn-primary btn-block"
              onClick={handleButtonClick}
            >
              Retrieve Product Details
            </button>
          </center>
          <Modal show={detailsModalOpen} onHide={handleCloseDetailsModal} centered>
            <Modal.Header closeButton>
            <Modal.Title class="text-secondary">  
                    <strong >Product Details</strong>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productDetails && (
                <div>
                  <p class="text-secondary">
                    <strong>ID:</strong> {productDetails.id}
                  </p>
                  <p class="text-secondary">
                    <strong>Name:</strong> {productDetails.name}
                  </p>
                  <p class="text-secondary">
                    <strong>Location:</strong> {productDetails.location}
                  </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetailsModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={errorModalOpen} onHide={handleCloseErrorModal} centered>
            <Modal.Header closeButton>
              <Modal.Title class="text-black-50">ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body   class="text-secondary">
              The Barcode is incorrect
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default  BarcodeScannerIntegeration;
