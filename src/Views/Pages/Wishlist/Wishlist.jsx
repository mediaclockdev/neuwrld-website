import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../../components/Product/ProductCard";
import {
  fetchWishlistAPI,
  removeFromWishlistAPI,
} from "../../../features/wishlist/wishlistSlice";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((s) => s.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistAPI())
      .unwrap()
      .catch((err) => {
        if (err === "NOT_LOGGED_IN") navigate("/login");
      });
  }, [dispatch, navigate]);
  console.log("WISHLIST ITEM:", items);

  if (loading) {
    return (
      <div className="bg-black min-h-screen px-6 py-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="h-8 w-48 bg-zinc-800 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-zinc-900 animate-pulse border border-zinc-800"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-black min-h-[90vh] flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Icon Section */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
            <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-full shadow-2xl">
              <Heart className="w-16 h-16 text-zinc-600 stroke-[1.5]" />
              <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full animate-ping" />
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-tektur font-bold text-white">
              Your wishlist is empty
            </h2>
            <p className="text-zinc-400 font-tektur text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
              Looks like you haven't added any items yet. Start exploring our latest collections!
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-tektur font-bold hover:bg-zinc-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Suggestions Section */}
          <div className="pt-12 border-t border-zinc-800/50">
            <p className="text-zinc-500 text-xs font-tektur uppercase tracking-[0.2em] mb-6">
              Popular Categories
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Men", "Women"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/category/${cat.toLowerCase().replace(" ", "-")}`)}
                  className="px-5 py-2 rounded-full border border-zinc-800 text-zinc-400 text-sm font-tektur hover:bg-zinc-900 hover:text-white hover:border-zinc-700 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">

    <div className="max-w-screen-2xl mx-auto px-6 py-10 ">
      <h1 className="text-2xl font-semibold mb-6 text-white font-tektur">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard
            key={item.product_variant_id}
            item={item}
            isWishlisted={true}
            onWishlistClick={(variantId) =>
              dispatch(removeFromWishlistAPI(variantId))
            }
            onClick={() => navigate(`/products/${item.sku || item.product_sku}`)}
          />
        ))}
      </div>
        </div>
    </div>
  );
};

export default Wishlist;
