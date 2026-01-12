/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAPI } from "../../features/cart/cartSlice";
import { fetchProductDetails } from "../../features/products/productSlice";
import CheckoutMoreProducts from "./CheckoutMoreProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.product);

  // Fetch product details
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  const data = product?.data || {};
  // console.log("🔥 FULL PRODUCT DATA:", data);

  const productInfo = data.product || {};
  const attributeOptions = data.attribute_options || [];
  const combinations = data.combinations || [];

  // --------------------------------------------------------
  // IMAGE HANDLING
  // --------------------------------------------------------
  const galleryImages = useMemo(() => {
    if (Array.isArray(data?.images) && data.images.length > 0) {
      return data.images.map((img) => img.image);
    }
    return [];
  }, [data]);

  // console.log("FINAL IMAGES 👉", galleryImages);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (data?.product?.image) {
      setMainImage(data.product.image);
    }
  }, [data?.product?.image]);

  // --------------------------------------------------------
  // DYNAMIC ATTRIBUTE ID MAPPING
  // --------------------------------------------------------
  const COLOR_ID = attributeOptions.find((a) => a.name === "Color")?.id;
  const SIZE_ATTR = attributeOptions.find((a) =>
    a.name.toLowerCase().includes("size")
  );

  const SIZE_ID = SIZE_ATTR?.id;

  const MATERIAL_ID = attributeOptions.find((a) => a.name === "Material")?.id;

  console.log("ATTRIBUTE IDS:", { COLOR_ID, SIZE_ID, MATERIAL_ID });

  // Options
  const colorOptions =
    attributeOptions.find((a) => a.name === "Color")?.options || [];
  const sizeOptions = SIZE_ATTR?.options || [];



  // Defaults from API
  const defaultColor = data?.current_attributes?.[COLOR_ID] ?? null;
  const defaultSize = data?.current_attributes?.[SIZE_ID] ?? null;
  const defaultMaterial = data?.current_attributes?.[MATERIAL_ID] ?? null;

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedMaterial, setSelectedMaterial] = useState(defaultMaterial);
  const [quantity, setQuantity] = useState(1);

  // Sync defaults when product loads
  useEffect(() => {
    setSelectedColor(defaultColor);
    setSelectedSize(defaultSize);
    setSelectedMaterial(defaultMaterial);
  }, [defaultColor, defaultSize, defaultMaterial]);

  // Safe compare
  const eq = (a, b) => String(a) === String(b);

  // --------------------------------------------------------
  // AVAILABILITY CHECKS (based on real attribute ID mapping)
  // --------------------------------------------------------
  const isColorAvailable = (colorId) => {
    return combinations.some((c) => {
      const attrs = c.attributes;
      if (!eq(attrs[COLOR_ID], colorId)) return false;
      if (selectedSize && !eq(attrs[SIZE_ID], selectedSize)) return false;
      if (selectedMaterial && !eq(attrs[MATERIAL_ID], selectedMaterial))
        return false;
      return true;
    });
  };

  const isSizeAvailable = (sizeId) => {
    return combinations.some((c) => {
      const attrs = c.attributes;
      if (!eq(attrs[SIZE_ID], sizeId)) return false;
      if (selectedColor && !eq(attrs[COLOR_ID], selectedColor)) return false;
      if (selectedMaterial && !eq(attrs[MATERIAL_ID], selectedMaterial))
        return false;
      return true;
    });
  };

  const isMaterialAvailable = (materialId) => {
    return combinations.some((c) => {
      const attrs = c.attributes;
      if (!eq(attrs[MATERIAL_ID], materialId)) return false;
      if (selectedColor && !eq(attrs[COLOR_ID], selectedColor)) return false;
      if (selectedSize && !eq(attrs[SIZE_ID], selectedSize)) return false;
      return true;
    });
  };

  // --------------------------------------------------------
  // FIND MATCHING VARIANT ID
  // --------------------------------------------------------
  const selectedVariant = useMemo(() => {
    const found =
      combinations.find((c) => {
        const attrs = c.attributes;
        return eq(attrs, data.current_attributes);
      }) || null;

    console.log("🔍 SELECTED VARIANT:", found);
    console.log("ONE COMBINATION:", combinations[0]);

    return found;
  }, [selectedColor, selectedSize, selectedMaterial, combinations]);

  // --------------------------------------------------------
  // SAFE LOAD STATES
  // --------------------------------------------------------
  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error loading product...</p>;
  if (!productInfo.id) return <p className="p-4">Product not found...</p>;

  // --------------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------------
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    if (!selectedVariant?.variant_id) {
      alert("No variant selected");
      return;
    }

    const payload = {
      product_variant_id: productInfo.id,
      is_saved_for_later: 0,
      quantity: Number(quantity),
    };

    console.log("FINAL JSON PAYLOAD:", payload);
    try {
      await dispatch(addToCartAPI(payload)).unwrap();
      alert("Added to cart!");
    } catch (err) {
      console.error("Add To Cart Error:", err);
    }
  };
  const checkoutMoreProducts = data?.checkout_more_products ?? [];
  console.log("CHECKOUT MORE PRODUCTS 👉", checkoutMoreProducts);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE - IMAGES */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 sticky top-4">
              <div className="w-full">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Product"
                    className="w-full h-[90vh] aspect-square object-cover object-top rounded shadow-md"
                  />
                )}
              </div>

              <div className="flex flex-row gap-4 overflow-x-auto">
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Product thumbnail ${i + 1}`}
                    className={`w-20 h-20 rounded cursor-pointer border-2 flex-shrink-0 ${
                      mainImage === img ? "border-black" : "border-gray-200"
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* TITLE & PRICE */}
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold">
                {productInfo.product_name}
              </h1>
              <div className="flex gap-3 ">
                <p className="text-2xl">{productInfo.price}</p>
                {productInfo.old_price && (
                  <p className="line-through text-gray-500">
                    {productInfo.old_price}
                  </p>
                )}
              </div>
              {/* PRODUCT DETAILS */}
              {productInfo.product_details && (
                <div>
                  <h3 className="text-xl font-semibold">Product Details</h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: productInfo.product_details,
                    }}
                  />
                </div>
              )}

              {/* SPECIFICATIONS */}
              {productInfo.specifications && (
                <div>
                  <h3 className="text-xl font-semibold">Specifications</h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: productInfo.specifications,
                    }}
                  />
                </div>
              )}

              {/* CARE & MAINTENANCE */}
              {productInfo.care_maintenance && (
                <div>
                  <h3 className="text-xl font-semibold">Care & Maintenance</h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: productInfo.care_maintenance,
                    }}
                  />
                </div>
              )}

              {/* WARRANTY */}
              {productInfo.warranty && (
                <div>
                  <h3 className="text-xl font-semibold">Warranty</h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: productInfo.warranty,
                    }}
                  />
                </div>
              )}
            </div>

            {/* COLOR SELECTION */}
            {colorOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {colorOptions.map((opt) => {
                    const available = isColorAvailable(opt.attribute_value_id);

                    return (
                      <button
                        key={opt.attribute_value_id}
                        onClick={() => navigate(`/products/${opt.matched_sku}`)}
                        className={`px-5 py-2 rounded-md ${
                          opt.is_current ? "bg-black text-white" : "bg-gray-200"
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
                {!isColorAvailable(selectedColor) && selectedColor && (
                  <p className="text-sm text-red-500 mt-1">
                    This color is not available for selected size/material.
                  </p>
                )}
              </div>
            )}

            {/* SIZE SELECTION */}
            {sizeOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Size</h3>
                <div className="flex gap-3 flex-wrap">
                  {sizeOptions.map((opt) => {
                    const available = isSizeAvailable(opt.attribute_value_id);
                    console.log("[size]", opt);
                    return (
                      <button
                        key={opt.attribute_value_id}
                        onClick={() => navigate(`/products/${opt.matched_sku}`)}
                        className={`px-5 py-2 rounded-md ${
                          opt.is_current ? "bg-black text-white" : "bg-gray-200"
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
                {!isSizeAvailable(selectedSize) && selectedSize && (
                  <p className="text-sm text-red-500 mt-1">
                    This size is not available for selected color/material.
                  </p>
                )}
              </div>
            )}

            {/* MATERIAL SELECTION - Currently commented out, but kept for future use */}
            {/* {materialOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Material</h3>
                <div className="flex gap-3 flex-wrap">
                  {materialOptions.map((opt) => {
                    const available = isMaterialAvailable(
                      opt.attribute_value_id
                    );
                    return (
                      <button
                        key={opt.attribute_value_id}
                        disabled={!available}
                        onClick={() =>
                          setSelectedMaterial(opt.attribute_value_id)
                        }
                        className={`px-5 py-2 rounded-md ${
                          eq(selectedMaterial, opt.attribute_value_id)
                            ? "bg-black text-white"
                            : "bg-gray-200"
                        } ${!available && "opacity-40 cursor-not-allowed"}`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
                {!isMaterialAvailable(selectedMaterial) && selectedMaterial && (
                  <p className="text-sm text-red-500 mt-1">
                    This material is not available for selected color/size.
                  </p>
                )}
              </div>
            )} */}

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-md text-lg"
            >
              Add to Cart – {productInfo.price}
            </button>
          </div>
        </div>

        {/* 🔥 CHECKOUT MORE PRODUCTS */}
        <CheckoutMoreProducts products={checkoutMoreProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
