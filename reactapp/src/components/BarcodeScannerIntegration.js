import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import NavbarComp from './NavbarComp';

const  BarcodeScannerIntegeration = () => {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleButtonClick = () => {
    const products = [
      { id: '123456', name: 'chair', location: 'chennai' },
      { id: '234567', name: 'samsung', location: 'bangalore' },
      { id: '345678', name: 'pen', location: 'coimbatore' },
      // Add more products as needed
    ];

    const product = products.find((p) => p.id === productId);

    if (product) {
      setProductDetails(product);
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
    setProductId('');
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
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
              <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productDetails && (
                <div>
                  <p>
                    <strong>ID:</strong> {productDetails.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {productDetails.name}
                  </p>
                  <p>
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
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The product ID you entered is incorrect. Please try again.
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default  BarcodeScannerIntegeration;