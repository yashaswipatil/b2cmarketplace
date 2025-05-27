import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Product/Product';
import CategoryCarousel from '../../components/Carousel/CategoryCarousel';
import { addToCart } from '../../redux/cartSlice';
import { fetchSearchResults } from '../../redux/productSlice';
import Loader from '../../components/Ui/Loader';
import NoDataMessage from '../../components/Ui/NodataMessage';
import './Homepage.css';
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();
  const { searchResults: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchSearchResults(''));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div>
      <CategoryCarousel />

      <h2 style={{ padding: '20px', textAlign: 'center' }}>Featured Products</h2>

      <div style={{ minHeight: '18.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <Loader height="6.25rem" />
        ) : error ? (
          <p style={{ textAlign: 'center' }}>Error: {error}</p>
        ) : products.length === 0 ? (
          <NoDataMessage>No products found</NoDataMessage>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
