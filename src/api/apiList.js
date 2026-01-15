export const ALL_APi_LIST = {
  // auth //
  register: "verify-otp",
  login: "login",
  logout: "logout",
  userProfile: "user-profile",
  refreshtoken: "refresh-token",
  // non auth
  allCategories: "categories",
  productList: "product-listing",
  product_details: "product",
  advance_search: "products-autocomplete",

  dashboard: "home-landing",
  user: "getProfile",
  customer_Dash: "home-landing",

  // CART //
  addToCart: "move-to-cart",
  removeCart: "remove-from-cart",
  getCart: "my-cart",
  updateQuantity: "update-quantity",
  applyCoupon: "apply-coupon",
  couponlist: "coupon-list",

  // wishlist //
  addtoWishlist: "move-to-wishlist",
  getWishlist: "my-wishlist",
  removeFromWishlist: "move-or-remove-wishlist",

  // checkout //
  userAddress: "user-address",
  userAddressSave: "user-address",
  removeAdd: "remove-address",
};

export const BASE_URL =
  "https://maroon-crane-692077.hostingersite.com/nuworld_v3/api/v1/";
