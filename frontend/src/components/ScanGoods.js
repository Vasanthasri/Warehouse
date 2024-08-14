import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';
import './ScanGoods.css';

function ScanGoods() {
  const [result, setResult] = useState('');
  const [showScanner, setShowScanner] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      setShowScanner(false);
      setShowActions(true);
    }
  };

  const handleImport = async () => {
    try {
      await axios.post('http://localhost:5000/import', {
        name: result,
        weight: 1,
        expiryDate: new Date(),
        stockAmount: 1
      });
      alert('Item imported successfully!');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import item.');
    }
  };

  const handleExport = async () => {
    try {
      await axios.post('http://localhost:5000/export', { name: result });
      alert('Item exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export item.');
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="scan-goods-page">
      <h2>Scan Goods</h2>
      {showScanner && (
        <div className="qr-scanner-container">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="qr-scanner"
          />
        </div>
      )}
      {result && !showActions && <p className="scanned-result">Scanned Result: {result}</p>}
      {showActions && (
        <div className="action-buttons">
          <button onClick={handleImport} className="import-button">Import</button>
          <button onClick={handleExport} className="export-button">Export</button>
        </div>
      )}
    </div>
  );
}

export default ScanGoods;
