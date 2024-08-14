import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/scan-goods">Scan Goods</Link>
      <Link to="/view-goods">View Goods</Link> 
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      
    </nav>
  );
}

export default Navbar;
