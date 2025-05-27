// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { FaChevronDown, FaHome, FaTags, FaShoppingCart, FaUser } from 'react-icons/fa';
import SearchBar from '../SearchBar/SearchBar';  
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

  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',       // fixed position to stay at top
        top: 0,                 // stick to top
        left: 0,                // align to left edge
        width: '100%',          // full width
        padding: '10px 20px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        zIndex: 1000,            // ensure it stays on top of other elements
      }}
    >
      <div
        className="logo"
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          flex: '1 1 150px',
          minWidth: '150px',
        }}
      >
        MyMarketplace
      </div>

      {isMobile ? (
        <>
          {/* Mobile search bar below logo */}
          <div style={{ flexBasis: '100%', margin: '10px 0' }}>
            <SearchBar />
          </div>

          <div className="nav-dropdown" style={{ width: '100%' }}>
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
                justifyContent: 'space-between',
                width: '100%',
                boxSizing: 'border-box',
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
                  marginTop: '4px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  listStyle: 'none',
                  padding: '4px 0',
                  borderRadius: '4px',
                  width: '100%',
                  boxSizing: 'border-box',
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
        </>
      ) : (
        <>
          {/* Desktop: SearchBar placed in the middle */}
          <div style={{ flex: '1 1 300px', margin: '0 20px' }}>
            <SearchBar />
          </div>

          <ul
            className="nav-links"
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '20px',
              margin: 0,
              padding: 0,
              alignItems: 'center',
              flex: '1 1 auto',
              justifyContent: 'flex-end',
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
        </>
      )}
    </nav>
  );
};

export default Navbar;
