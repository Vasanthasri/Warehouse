import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ setGoodsList }) {
  const handleImport = (item) => {
    try {
      const parsedItem = JSON.parse(item);
      setGoodsList(prevList => [...prevList, { ...parsedItem, date: new Date().toLocaleDateString(), added: true }]);
    } catch (error) {
      console.error('Failed to parse item:', error);
    }
  };

  const handleExport = (item) => {
    const parsedItem = JSON.parse(item);
    setGoodsList(prevList => prevList.filter(good => good.item !== parsedItem.item));
  };

  return (
    <div className="home-page"> {/* Apply the CSS class here */}
      <h2>SS Warehouse</h2>
      <div className="button-container">
        <Link to="/scan-goods">
          <button>Scan Goods</button>
        </Link>
        <Link to="/view-goods">
          <button>View Goods</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
