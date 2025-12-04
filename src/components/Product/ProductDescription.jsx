import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDescription = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const allProducts = [...products.men, ...products.women];
  const product = allProducts.find((p) => p.id === parseInt(id));
  return (
    <div className=" max-w-screen-2xl space-y-6 px-4 lg:px-6 py-6 mx-auto">
      <div>
        <p className="text-lg font-normal font-inter">Product Description</p>
        <p className="text-base font-light font-inter">{product.description}</p>
      </div>
      <div>
        <p className="text-lg font-normal font-inter">Material & Care</p>
        <p className="text-base font-light font-inter">{product.material}</p>
      </div>
      <div>
        <p className="text-lg font-normal font-inter">Shipping & Returns</p>
        <p className="text-base font-light font-inter">
          {product.shippingAndReturns}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
