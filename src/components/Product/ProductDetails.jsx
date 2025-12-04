import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get product details from Redux
  const { product, loading, error } = useSelector((state) => state.product);

  // Extract product safely
  const data = product?.data?.product || null;

  // Safely extract color & size options from attribute_options
  const colorOptions = data?.attribute_options?.[0]?.options || [];
  const sizeOptionsFromApi = data?.attribute_options?.[1]?.options || [];

  // If no sizes exist in API, fallback to static sizes
  const sizeOptions =
    sizeOptionsFromApi.length > 0
      ? sizeOptionsFromApi.map((s) => s.value)
      : ["XS", "S", "M", "L", "XL"];

  // Material options (you can also get this from API if available)
  const materialOptions = ["Cotton", "Polyester", "Leather", "Silk"];

  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedMaterial, setSelectedMaterial] = useState("Cotton");
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error loading product.</p>;
  if (!data) return <p className="p-4">Product not found.</p>;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 lg:space-y-8">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl lg:text-4xl font-medium text-gray-900 mb-2">
                Product Details
              </h1>
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                {data.details ||
                  "Elevate your ethnic wardrobe with this stylish blouse from NEUWRL0. Designed in Style 1, this blouse offers a perfect blend of comfort and elegance. The regular fit ensures ease of movement, making it ideal for all-day wear during festive occasions, weddings, and cultural events. Expertly crafted in India, it reflects fine craftsmanship and attention to detail. Whether paired with a traditional saree or a contemporary drape, this blouse adds a touch of sophistication to your overall look. Comes with a 7-day return policy for a worry-free shopping experience."}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="border-t pt-6">
              <h2 className="text-xl lg:text-2xl font-medium mb-4">
                Product Specifications
              </h2>
              <p className="text-sm lg:text-base text-gray-700">
                <span className="font-semibold">Category:</span> Blouses.{" "}
                <span className="font-semibold">Material:</span> Assorted
                Fabrics.{" "}
                <span className="font-semibold">Available Colors:</span> Red,
                Blue, Green, Brown.{" "}
                <span className="font-semibold">Sizes:</span> XS, S, M, L, XL
                (where applicable).
              </p>
            </div>

            {/* Select Color */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Color</h3>
              <div className="flex gap-3 flex-wrap">
                {["Red", "Blue", "Green", "Black"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Material */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Material</h3>
              <div className="flex gap-3 flex-wrap">
                {materialOptions.map((material) => (
                  <button
                    key={material}
                    onClick={() => setSelectedMaterial(material)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedMaterial === material
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Size */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors min-w-[60px] ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-md hover:border-gray-400 flex items-center justify-center text-base font-normal"
                >
                  -
                </button>

                <span className="text-lg font-normal min-w-[40px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-md hover:border-gray-400 flex items-center justify-center text-base font-normal"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    ...data,
                    quantity,
                    selectedSize,
                    selectedColor,
                    selectedMaterial,
                  })
                )
              }
              className="w-full bg-black hover:bg-black/85 text-white py-4 rounded-md font-normal text-base transition-colors"
            >
              Add to Cart – {data.price}
            </button>

            {/* Shipping & Returns */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping & Returns</h3>
              <p className="text-sm lg:text-base text-gray-700">
                {data.shipping_return_policy ||
                  "Free shipping on orders over $50. 7-day return policy for a worry-free shopping experience."}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
            <p className="text-sm text-gray-600">
              {data.total_rating || 0} Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
