import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProductImages = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const allProducts = [...products.men, ...products.women];

  // Finding the product by id
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="p-4">Product not found.</p>;
  }
  // All images for this product
  const productImages = product.images || [product.img];

  // State for main displayed image
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
      <div className="flex flex-row lg:flex-col gap-4">
        {/* Main Image */}
        <div className="w-full  order-2 lg:order-1">
          <img
            src={mainImage}
            alt={product.name}
            className="w-80 lg:w-full aspect-square object-cover rounded shadow-md transition-all duration-300"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto justify-center sm:justify-start order-1 lg:order-2">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name}-view-${index}`}
              className={`w-10 lg:w-20 h-10 lg:h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                mainImage === img ? "border-gray-100" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
              onMouseEnter={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
