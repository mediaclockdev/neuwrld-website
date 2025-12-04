import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import uploadicon from "../../assets/svg/icons/upload.svg";
import { addToCart } from "../../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const allProducts = [...products.men, ...products.women];
  const product = allProducts.find((p) => p.id === parseInt(id));
  const dispatch = useDispatch();

  const sizeOptions = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="p-4">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-3 lg:space-y-6">
      {/* Badges */}
      <div className="flex gap-2">
        <span className="bg-black text-white text-xs px-2 py-1 rounded">
          HOT
        </span>
        <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
          LIMITED EDITION
        </span>
      </div>

      {/* Product Title + Price */}
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold">{product.name}</h2>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-base lg:text-xl ">{product.price}</p>
          <p className="line-through text-gray-500">{product.originalPrice}</p>
          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
            25% OFF
          </span>
        </div>
      </div>

      {/* Colors */}
      <div>
        <p className="font-medium">Color</p>
        <div className="flex gap-3 mt-2">
          <div className="size-5 lg:size-7 rounded-full border border-black bg-gray-400 cursor-pointer"></div>
          <div className="size-5 lg:size-7 rounded-full border border-gray-300 bg-gray-600 cursor-pointer"></div>
          <div className="size-5 lg:size-7 rounded-full border border-gray-300 bg-gray-800 cursor-pointer"></div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <p className="font-medium ">Size</p>
        <div className="flex gap-2 ">
          {sizeOptions.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedSize(item)}
              className={`px-4 lg:px-6 py-2 border rounded-md text-sm lg:text-base ${
                selectedSize === item
                  ? "border-black"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600  cursor-pointer underline">
          Size Guide
        </p>
      </div>

      {/* Custom Embroidery */}
      <div>
        <p className="font-medium">Custom Embroidery (Optional)</p>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center gap-2">
          <img src={uploadicon} alt="upload" className="w-6 h-6" />
          <p className="text-sm text-gray-600">Upload your design</p>
          <input type="file" id="fileUpload" className="hidden" />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="font-medium">Quantity</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="border px-3 py-1 rounded"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="border px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={() => dispatch(addToCart(product))}
        className="w-full bg-black text-white py-3 rounded-md font-medium cursor-pointer"
      >
        Add to Cart - {product.price}
      </button>

      {/* Wishlist + Share */}
      <div className="flex items-center justify-center gap-6 text-gray-600">
        <p className="cursor-pointer">♡ Wishlist</p>
        <p className="cursor-pointer">↗ Share</p>
      </div>

      {/* Customer Reviews */}
      <div className="border-t pt-4">
        <p className="text-gray-700">Customer Reviews</p>
        <p className="text-sm text-gray-500">Based on 127 reviews</p>
        <p className="text-yellow-500 font-bold mt-1">★★★★☆ (4.2)</p>
      </div>
    </div>
  );
};

export default ProductDetails;
