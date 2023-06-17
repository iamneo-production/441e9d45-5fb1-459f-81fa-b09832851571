import React, { useState } from 'react';

const BarcodeScannerIntegration = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');

  const handleBarcodeScan = (event) => {
    const scannedData = event.target.value;
    setScannedBarcode(scannedData);
  };

  return (
    <div>
      <h2>Barcode Scanner Integration</h2>
      <input type="text" value={scannedBarcode} onChange={handleBarcodeScan} placeholder="Scan barcode..." />
      <p>Scanned Barcode: {scannedBarcode}</p>
    </div>
  );
};

export default BarcodeScannerIntegration;
