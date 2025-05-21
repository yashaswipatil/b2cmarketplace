import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./CategoryCarousel.css";

const categories = [
  { name: "Clothing", img: "https://picsum.photos/150?random=1" },
  { name: "Beauty", img: "https://picsum.photos/150?random=2" },
  { name: "Electronics", img: "https://picsum.photos/150?random=3" },
  { name: "Home", img: "https://picsum.photos/150?random=4" },
  { name: "Footwear", img: "https://picsum.photos/150?random=5" },
  { name: "Toys", img: "https://picsum.photos/150?random=6" },
];

const CategoryCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="carousel-container">
      <h2>Shop by Category</h2>
      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <Link to={`/categories/${cat.name.toLowerCase()}`}>
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
