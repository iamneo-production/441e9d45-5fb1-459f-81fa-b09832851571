import React, { useState } from 'react';

const BarcodeScannerIntegration = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');

  const handleBarcodeScan = (e) => {
    const barcode = e.target.value;
    setScannedBarcode(barcode);
    // Process the scanned barcode (e.g., make an API call, update the inventory, etc.)
  };

  return (
    
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container bg-dark p-3 border rounded">
        <h2 className="mt-4 text-white">Barcode Scanner Integration</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Scan barcode"
            value={scannedBarcode}
            onChange={handleBarcodeScan}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">Scan</button>
          </div>
        </div>
        {scannedBarcode && <p className="mt-2">Scanned Barcode: {scannedBarcode}</p>}
      </div>
    </div>
  );
};

export default BarcodeScannerIntegration;


// import React, { useState } from 'react';

// const BarcodeScannerIntegration = () => {
//   const [scannedBarcode, setScannedBarcode] = useState('');

//   const handleBarcodeScan = (e) => {
//     const barcode = e.target.value;
//     setScannedBarcode(barcode);
//     // Process the scanned barcode (e.g., make an API call, update the inventory, etc.)
//   };

//   return (
//     <div>
//       <h2>Barcode Scanner Integration</h2>
//       <input type="text" placeholder="Scan barcode" className='form-control'value={scannedBarcode} onChange={handleBarcodeScan} />
//       {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
//     </div>
//   );
// };

// export default BarcodeScannerIntegration;
