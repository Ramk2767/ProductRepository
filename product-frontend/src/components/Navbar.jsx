import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/products" className="navbar-brand">
        <Package size={24} />
        ProductAdmin
      </NavLink>
      <div className="navbar-nav">
        <NavLink 
          to="/products" 
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Products
        </NavLink>
        <NavLink 
          to="/products/add" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Add Product
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
