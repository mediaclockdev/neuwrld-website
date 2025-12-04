import React from "react";
import { useSelector } from "react-redux";

const ProductDescription = () => {
  // Get product details from redux
  const { product, loading, error } = useSelector((state) => state.product);

  // Extract actual product safely
  const data = product?.data?.product || null;

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error loading product description.</p>;
  if (!data) return <p className="p-4">Product not found.</p>;

  return (
    <div className="max-w-screen-2xl space-y-6 px-4 lg:px-6 py-6 mx-auto">
      <div>
        <p className="text-lg font-normal font-inter">Product Description</p>
        <p className="text-base font-light font-inter">
          {data.description || "No description available."}
        </p>
      </div>

      <div>
        <p className="text-lg font-normal font-inter">Material & Care</p>
        <p className="text-base font-light font-inter">
          {data.material || "Material details not provided."}
        </p>
      </div>

      <div>
        <p className="text-lg font-normal font-inter">Shipping & Returns</p>
        <p className="text-base font-light font-inter">
          {data.shipping_return_policy || "No shipping info available."}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
