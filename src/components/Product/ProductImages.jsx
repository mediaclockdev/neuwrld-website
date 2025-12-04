import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../../features/products/productSlice";

const ProductImages = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((s) => s.product);

  // Always dispatch inside useEffect
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  // PREPARE IMAGES SAFELY **AFTER** product is loaded
  let images = [];
  if (product?.data?.product?.all_review_images?.length > 0) {
    images = product.data.product.all_review_images;
  } else if (product?.data?.product?.image) {
    images = [product.data.product.image];
  }

  // Hook MUST ALWAYS RUN, even if images is empty
  const [mainImage, setMainImage] = useState(null);

  // Set main image when images arrive
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [product]);

  // SAFE RETURNS (AFTER HOOKS)
  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error: {String(error)}</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
      <div className="flex flex-row lg:flex-col gap-4">
        <div className="w-full order-2 lg:order-1">
          {mainImage && (
            <img
              src={mainImage}
              alt="Product"
              className="w-80 lg:w-full aspect-square object-cover rounded shadow-md"
            />
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto justify-center order-1 lg:order-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`w-10 lg:w-20 h-10 lg:h-20 rounded cursor-pointer border-2 ${
                mainImage === img ? "border-black" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
