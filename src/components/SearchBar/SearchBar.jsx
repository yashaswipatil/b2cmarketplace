import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchTerm,
  fetchSearchResults,
  clearSearchResults,
} from '../../redux/productSlice';

import './Searchbar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm, searchResults} = useSelector(
    (state) => state.products
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length > 2) {
        dispatch(fetchSearchResults(searchTerm));
        setShowDropdown(true);
      } else {
        dispatch(clearSearchResults());
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSelect = (product) => {
    alert(`You selected: ${product.title}`);
    dispatch(clearSearchResults());
    dispatch(setSearchTerm(''));
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="searchbar-container" ref={inputRef}>
      <input
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search products..."
        className="searchbar-input"
      />
      {showDropdown && searchResults.length > 0 && (
        <ul className="searchbar-dropdown">
          {searchResults.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product)}
              className="searchbar-item"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
