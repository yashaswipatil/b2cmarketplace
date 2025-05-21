import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from '../../components/Product/Product';
import CategoryCarousel from '../../components/Carousel/CategoryCarousel';
import { addToCart } from '../../redux/cartSlice';
import './Homepage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <CategoryCarousel />
      <h2 style={{ padding: '20px' }}>Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
