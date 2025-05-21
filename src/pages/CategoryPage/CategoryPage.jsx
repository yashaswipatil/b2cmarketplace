import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Product/Product";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) =>
          p.category.toLowerCase().includes(categoryName.toLowerCase())
        );
        setProducts(filtered.length ? filtered : data); 
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found for "{categoryName}"</p>;

  return (
    <div>
      <h2 style={{ padding: "20px" }}>
        Category: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
