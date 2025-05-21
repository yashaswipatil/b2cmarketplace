import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo">MyMarketplace</div>
      <ul className="nav-links">
        <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/categories" activeClassName="active">Categories</NavLink></li>
        <li><NavLink to="/cart" activeClassName="active">Cart ({cartCount})</NavLink></li>
        <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
