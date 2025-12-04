import React from "react";
import Product from "../../../components/Product/ProductImages";
import ProductDetails from "../../../components/Product/ProductDetails";
import ProductDescription from "../../../components/Product/ProductDescription";

const ProductSummary = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex flex-col lg:flex-row w-full gap-10">
        <div className="w-auto lg:w-1/2">
          <Product />
        </div>
        <div className="w-auto lg:w-1/2">
          <ProductDetails />
        </div>
      </div>
      {/* <ProductDescription /> */}
    </div>
  );
};

export default ProductSummary;
