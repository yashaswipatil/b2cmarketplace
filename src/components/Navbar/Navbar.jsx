import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { FaChevronDown, FaHome, FaTags, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', to: '/', icon: <FaHome /> },
    { name: 'Categories', to: '/categories', icon: <FaTags /> },
    { name: `Cart (${cartCount})`, to: '/cart', icon: <FaShoppingCart /> },
    { name: 'Profile', to: '/profile', icon: <FaUser /> },
  ];

  // Selected item state defaults to Home
  const [selected, setSelected] = useState(navLinks[0]);

  // When location changes, update selected accordingly
  // (optional: you can sync this with location.pathname if you want)
  
  return (
    <nav className="navbar" style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>MyMarketplace</div>

      {isMobile ? (
        <div className="nav-dropdown" style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="nav-dropdown-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '140px',
              justifyContent: 'space-between',  // <-- This aligns text left and icon right
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selected.icon}
              {selected.name}
            </span>
            <FaChevronDown />
          </button>

          {dropdownOpen && (
            <ul
              className="nav-dropdown-menu"
              role="listbox"
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                background: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                listStyle: 'none',
                margin: 0,
                padding: '4px 0',
                width: '160px',
                borderRadius: '4px',
              }}
            >
              {navLinks.map(({ name, to, icon }) => (
                <li key={to} role="option" style={{ padding: '8px 12px' }}>
                  <Link
                    to={to}
                    onClick={() => {
                      setSelected({ name, to, icon });
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      color: selected.name === name ? '#007bff' : '#333',
                      fontWeight: selected.name === name ? 'bold' : 'normal',
                    }}
                  >
                    {icon}
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul
          className="nav-links"
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
              Cart ({cartCount})
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
