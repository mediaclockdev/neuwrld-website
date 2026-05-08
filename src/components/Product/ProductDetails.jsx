/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAPI, fetchCartAPI } from "../../features/cart/cartSlice";
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../../features/wishlist/wishlistSlice";
import { fetchProductDetails } from "../../features/products/productSlice";
import { Heart } from "lucide-react";
import CheckoutMoreProducts from "./CheckoutMoreProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const isInitialLoad = !product && !error;

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
    const allImages = new Set();
    const mainImg = data?.product?.image;

    // Helper to get full URL
    // Standard product image base: https://.../uploads/media/products/images/
    const getFullUrl = (url) => {
      if (!url || typeof url !== "string") return null;
      if (url.startsWith("http")) return url;
      
      // If it's a relative path, we try to prefix it with the base URL from the main image
      if (mainImg && mainImg.includes("/")) {
        const baseUrl = mainImg.substring(0, mainImg.lastIndexOf("/") + 1);
        return `${baseUrl}${url}`;
      }
      return null;
    };

    // 1. Add main image
    const fullMain = getFullUrl(mainImg);
    if (fullMain) allImages.add(fullMain);

    // 2. Add gallery images
    if (Array.isArray(data?.images)) {
      data.images.forEach((img) => {
        const full = getFullUrl(img.image);
        if (full) allImages.add(full);
      });
    }

    return Array.from(allImages);
  }, [data]);

  // console.log("FINAL IMAGES 👉", galleryImages);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (data?.product?.image) {
      setMainImage(data.product.image);
    }
  }, [data?.product?.image]);

  // Safe compare
  const eq = (a, b) => String(a) === String(b);

  // --------------------------------------------------------
  // AVAILABILITY CHECKS (based on real attribute ID mapping)
  // --------------------------------------------------------

  // --------------------------------------------------------
  // FIND MATCHING VARIANT ID
  // --------------------------------------------------------
  // const selectedVariant = useMemo(() => {
  //   const found =
  //     combinations.find((c) => {
  //       const attrs = c.attributes;
  //       return eq(attrs, data.current_attributes);
  //     }) || null;

  //   console.log("🔍 SELECTED VARIANT:", found);
  //   console.log("ONE COMBINATION:", combinations[0]);

  //   return found;
  // }, [combinations, data.current_attributes]);
  const selectedVariantId = useMemo(() => {
    return productInfo?.id ?? null;
  }, [productInfo]);

  const selectedSku = useMemo(() => {
    for (const attr of attributeOptions) {
      const currentOption = attr.options?.find((o) => o.is_current);
      if (currentOption?.sku) {
        return currentOption.sku;
      }
    }
    return null;
  }, [attributeOptions]);

  const isInWishlist = useMemo(() => {
    if (!selectedVariantId) return false;
    return wishlistItems.some(
      (item) => String(item.product_variant_id) === String(selectedVariantId)
    );
  }, [wishlistItems, selectedVariantId]);

  const handleWishlist = () => {
    if (!selectedVariantId) return;
    const action = isInWishlist
      ? removeFromWishlistAPI(selectedVariantId)
      : addToWishlistAPI(selectedVariantId);

    dispatch(action)
      .unwrap()
      .catch((err) => {
        if (err === "NOT_LOGGED_IN") {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
  };

  const isInCart = useMemo(() => {
    if (!selectedVariantId) return false;

    return cartItems.some(
      (item) => String(item.product_variant_id) === String(selectedVariantId)
    );
  }, [cartItems, selectedVariantId]);

  // --------------------------------------------------------
  // SAFE LOAD STATES
  // --------------------------------------------------------
  if (loading || isInitialLoad) {
    return (
      <div className="bg-black skeleton-shell">
        <div className="max-w-screen-2xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 sticky top-4">
                <div className="w-full h-[90vh] rounded-2xl skeleton-block-soft border border-zinc-800" />
                <div className="flex flex-row gap-4 overflow-x-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-lg skeleton-block"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <div className="h-10 w-2/3 rounded skeleton-block" />
                <div className="flex gap-3">
                  <div className="h-7 w-28 rounded skeleton-block" />
                  <div className="h-6 w-24 rounded skeleton-block" />
                </div>

                <div className="space-y-3">
                  <div className="h-6 w-40 rounded skeleton-block" />
                  <div className="h-4 w-full rounded skeleton-block-soft" />
                  <div className="h-4 w-11/12 rounded skeleton-block-soft" />
                  <div className="h-4 w-4/5 rounded skeleton-block-soft" />
                </div>

                <div className="space-y-3">
                  <div className="h-6 w-32 rounded skeleton-block" />
                  <div className="flex gap-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-20 rounded-lg skeleton-block-soft"
                      />
                    ))}
                  </div>
                </div>

                <div className="h-14 w-full rounded-xl skeleton-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <p className="p-4">Error loading product...</p>;
  if (!isInitialLoad && !loading && !productInfo.id) {
    return <p className="p-4">Product not found...</p>;
  }

  // --------------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------------
  // const handleAddToCart = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return alert("Login required");

  //   if (!selectedVariant?.variant_id) {
  //     alert("No variant selected");
  //     return;
  //   }

  //   const payload = {
  //     product_variant_id: productInfo.id,
  //     is_saved_for_later: 0,
  //     quantity: Number(quantity),
  //   };

  //   console.log("FINAL JSON PAYLOAD:", payload);
  //   try {
  //     await dispatch(addToCartAPI(payload)).unwrap();
  //     alert("Added to cart!");
  //   } catch (err) {
  //     console.error("Add To Cart Error:", err);
  //   }
  // };
  const handleCartButtonClick = async () => {
    // If already in cart → go to cart
    if (isInCart) {
      navigate("/cart");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
  alert("Please login first");
 navigate("/login", { state: { from: location.pathname } });
  return;
}

    if (!productInfo?.id) {
      alert("Product not ready");
      return;
    }

    const payload = {
      product_variant_id: productInfo.id, // ✅ FIXED
      is_saved_for_later: 0,
      quantity: Number(quantity),
    };

    try {
      await dispatch(addToCartAPI(payload)).unwrap();
      dispatch(fetchCartAPI());
      // No alert needed — UI will update automatically
    } catch (err) {
      console.error("Add To Cart Error:", err);
    }
  };
  const checkoutMoreProducts = data?.checkout_more_products ?? [];

  return (
    <div className="bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SIDE - IMAGES */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 sticky top-4">
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  {mainImage && (
                    <img
                      src={mainImage}
                      alt="Product"
                      className="w-full h-auto max-h-[70vh] sm:max-h-[600px] aspect-square object-contain p-6 sm:p-10 transition-all duration-500"
                    />
                  )}
                </div>

                {galleryImages.length > 0 && (
                  <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {galleryImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Product thumbnail ${i + 1}`}
                        className={`w-20 h-20 rounded-xl cursor-pointer border-2 flex-shrink-0 object-contain bg-white p-2 transition-all duration-300 ${
                          mainImage === img 
                            ? "border-white ring-2 ring-white/20" 
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                        onClick={() => setMainImage(img)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - DETAILS */}
            <div className="w-full lg:w-1/2 space-y-8">
              {/* TITLE & PRICE */}
              <div className="space-y-6">
                <h1 className="text-3xl font-semibold font-tektur text-white">
                  {productInfo.product_name}
                </h1>
                <div className="flex gap-3 ">
                  <p className="text-2xl font-tektur text-white">{productInfo.price}</p>
                  {productInfo.old_price && (
                    <p className="line-through text-gray-500">
                      {productInfo.old_price}
                    </p>
                  )}
                </div>
                {/* PRODUCT DETAILS */}
                {productInfo.product_details && (
                  <div>
                    <h3 className="text-xl font-semibold font-tektur text-white">Product Details</h3>
                    <div
                      className="prose max-w-none font-tektur text-white"
                      dangerouslySetInnerHTML={{
                        __html: productInfo.product_details,
                      }}
                    />
                  </div>
                )}

                {/* SPECIFICATIONS */}
                {productInfo.specifications && (
                  <div>
                    <h3 className="text-xl font-semibold font-tektur text-white">Specifications</h3>
                    <div
                      className="prose max-w-none font-tektur text-white"
                      dangerouslySetInnerHTML={{
                        __html: productInfo.specifications,
                      }}
                    />
                  </div>
                )}

                {/* CARE & MAINTENANCE */}
                {productInfo.care_maintenance && (
                  <div>
                    <h3 className="text-xl font-semibold font-tektur text-white">Care & Maintenance</h3>
                    <div
                      className="prose max-w-none font-tektur text-white"
                      dangerouslySetInnerHTML={{
                        __html: productInfo.care_maintenance,
                      }}
                    />
                  </div>
                )}

                {/* WARRANTY */}
                {productInfo.warranty && (
                  <div>
                    <h3 className="text-xl font-semibold font-tektur text-white">Warranty</h3>
                    <div
                      className="prose max-w-none font-tektur text-white"
                      dangerouslySetInnerHTML={{
                        __html: productInfo.warranty,
                      }}
                    />
                  </div>
                )}
              </div>

              {attributeOptions.map((attr) => (
                <div key={attr.id}>
                  <h3 className="text-lg font-semibold mb-2 font-tektur text-white">
                    Select {attr.name}
                  </h3>

                  <div className="flex gap-3 flex-wrap">
                    {attr.options.map((opt) => (
                      <button
                        key={opt.attribute_value_id}
                        onClick={() => navigate(`/products/${opt.matched_sku}`)}
                        className={`px-5 py-2 rounded-md font-tektur  ${
                          opt.is_current
                            ? "bg-black text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* ACTION BUTTONS */}
              <div className="flex gap-4">
                <button
                  onClick={handleCartButtonClick}
                  className={`flex-1 py-4 rounded-md text-lg transition font-tektur cursor-pointer hover:bg-gray-500 hover:text-gray-50 ${
                    isInCart ? "bg-gray-50 text-black" : "bg-gray-50 text-black"
                  }`}
                >
                  {isInCart ? "View Cart" : `Add to Cart – ${productInfo.price}`}
                </button>

                <button
                  onClick={handleWishlist}
                  className="px-6 py-4 rounded-md border border-gray-50 flex items-center justify-center transition hover:bg-zinc-900 group"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isInWishlist ? "fill-red-500 text-red-500" : "text-gray-50 group-hover:text-red-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 🔥 CHECKOUT MORE PRODUCTS */}
          <CheckoutMoreProducts products={checkoutMoreProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
