import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { useParams } from 'react-router-dom';

// Add Google Font dynamically
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

function Collections() {
  const { category } = useParams();
  const { products } = useContext(shopDataContext);

  // Normalize category name
  const formatCategory = (cat) => {
    if (!cat) return "All";
    switch (cat.toLowerCase()) {
      case "men":
      case "mens":
        return "Men";
      case "women":
        return "Women";
      case "kids":
        return "Kids";
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  const selectedCategory = formatCategory(category);

  // Filtering products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="px-30 md:px-8 lg:px-20 py-30 min-h-screen bg-gradient-to-l from-[burlywood] to-[bisque] text-black">
      {/* Heading */}
      <div className="text-center">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {selectedCategory} Collection
        </h2>
        {/* Divider Line with gold gradient */}
        <div className="w-40 h-[3px] bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 mx-auto mt-3 rounded-full shadow-md"></div>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap gap-6 justify-center mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center text-black text-lg font-medium mt-8">
            No products found in {selectedCategory} category.
          </p>
        )}
      </div>
    </div>
  );
}

export default Collections;
