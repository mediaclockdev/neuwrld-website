import React, { useEffect, useState } from "react";

import { Tag, Check, Gift, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { fetchCartAPI } from "../../../features/cart/cartSlice";
import CheckoutAddress from "../../../components/CheckoutAddress";
import {
  applyCoupon,
  fetchCoupons,
} from "../../../features/coupon/CouponSlice";
import {
  fetchAddressesAPI,
  addAddressAPI,
  removeAddressAPI,
} from "../../../features/address/addressSlice";
import StripePayment from "./StripPayment";
import { postApi } from "../../../api/postApi";

const Checkout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [stripeData, setStripeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { appliedCoupon } = useSelector((state) => state.coupon);

  const { error, success, discount } = useSelector((state) => state.coupon);
  const { coupons } = useSelector((state) => state.coupon);

  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressForm, setAddressForm] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    state_id: "",
    country_id: "",
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    city_name: "",
    primary: true,
  });
  const states = useSelector((state) => state.address.states);
  console.log("🗺️ STATES:", states);
  useEffect(() => {
    console.log("fetchCoupons dispatched");
    dispatch(fetchCoupons());
  }, [dispatch]);

  /* 🔍 CART STATE */
  const {
    items = [],
    summary = {},
    loading: cartLoading,
  } = useSelector((state) => {
    console.log("🛒 CART STATE:", state.cart);
    return state.cart;
  });

  /* 🔍 ADDRESS STATE */
  const addresses = useSelector((state) => state.address?.addresses ?? []);

  const { user } = useSelector((state) => state.auth);

  const defaultAddress =
    addresses.find((addr) => addr.primary) || addresses[0] || null;
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

  console.log("⭐ DEFAULT ADDRESS:", defaultAddress);

  /* 🔍 ITEMS & SUMMARY */
  // console.log("📦 CART ITEMS:", items);
  // console.log("💰 CART SUMMARY:", summary);
  // console.log("⏳ LOADING:", loading);

  // auto-fill non-ui fields
  useEffect(() => {
    if (!user) return;

    setAddressForm((prev) => ({
      ...prev,
      email: user.email,
      country_id: "VAp9Ya9nPX",
      primary: true,
    }));
  }, [user]);
  useEffect(() => {
    dispatch(fetchCartAPI());
    dispatch(fetchAddressesAPI());
  }, [dispatch]);

  // const handleCheckout = () => {
  //   if (!defaultAddress) {
  //     alert("Please select a shipping address");
  //     // navigate("/address");
  //     return;
  //   }
  //   // navigate("/payment");
  // };
  const handleAddressChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAddress = async () => {
    if (
      !addressForm.name ||
      !addressForm.phone ||
      !addressForm.address_line_1 ||
      !addressForm.state_id
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await dispatch(
        addAddressAPI({
          ...addressForm,
          primary: true,
        })
      ).unwrap();
      dispatch(fetchAddressesAPI());

      setShowAddressForm(false);
    } catch (error) {
      alert("Failed to save address");
    }
  };
  const handleDeleteAddress = (id) => {
    if (window.confirm("Remove this address?")) {
      dispatch(removeAddressAPI(id));
    }
  };
  const handleApplyCoupon = async () => {
    if (!promo?.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const res = await dispatch(
        applyCoupon({ coupon: { code: promo } })
      ).unwrap();

      if (res?.discount) {
        dispatch(fetchCartAPI(promo));
        toast.success("Coupon Applied 🎉", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(err || "Invalid coupon");
    }
  };

  const handleSelectCoupon = (coupon) => {
    setPromo(coupon.code);
    setSelectedCoupon(coupon.code);
  };
  const createOrder = async () => {
    const payload = {
      payment_method: 1,
      shipping_address: selectedAddress?.id,
      billing_address: selectedAddress?.id,
      coupon_id: appliedCoupon?.coupon_id ?? summary?.coupon_id ?? "",
      coupon_discount:
        appliedCoupon?.discount ?? summary?.coupon_discount ?? "",
    };

    const res = await postApi("checkout/process", payload);
    const orderNumber = res?.data?.order_number;

    if (!orderNumber) {
      throw new Error("Order creation failed");
    }

    return orderNumber;
  };

  const getStripeClientSecret = async (orderNumber) => {
    const res = await postApi("checkout/stripe/init", {
      order_number: orderNumber,
    });

    const clientSecret = res?.data?.payment_intent_client_secret;
    const paymentIntentId = res?.data?.payment_intent_id;

    if (!clientSecret || !clientSecret.startsWith("pi_")) {
      throw new Error("Invalid Stripe client secret");
    }

    return { clientSecret, paymentIntentId };
  };
  const handleCheckout = async () => {
    if (!selectedAddress?.id) {
      toast.error("Please select shipping address");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order
      const orderNumber = await createOrder();

      // 2️⃣ Init stripe
      const { clientSecret, paymentIntentId } = await getStripeClientSecret(
        orderNumber
      );

      // 3️⃣ Store for payment step
      setStripeData({
        clientSecret,
        paymentIntentId,
        orderNumber,
      });
    } catch (err) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping Address */}
            <CheckoutAddress
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              showAddressForm={showAddressForm}
              setShowAddressForm={setShowAddressForm}
              addressForm={addressForm}
              handleAddressChange={handleAddressChange}
              handleSaveAddress={handleSaveAddress}
              states={states}
              onDeleteAddress={handleDeleteAddress}
            />

            {/* Product List */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
              <div className="bg-gradient-to-r from-gray-50 to-white px-5 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Order Items ({items.length})
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div
                    key={item.product_variant_id}
                    className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full sm:w-24 h-32 sm:h-28 object-cover rounded-xl shadow-sm"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 break-words">
                        {item.product_name}
                      </h3>

                      {/* Dynamic Attributes */}
                      {item.attributes && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(item.attributes).map(
                            ([key, value]) => (
                              <span
                                key={key}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {key}:{" "}
                                <span className="ml-1 font-semibold">
                                  {value}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Quantity:</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                        </span>

                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          $
                          {Number(item.price.replace(/[^0-9.]/g, "")) *
                            item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6">
              <section className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 sm:px-6 py-5">
                  <h2 className="font-bold text-xl text-white flex items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Order Summary
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Coupon */}
                  <div className="w-full">
                    {/* Promo Code Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Have a promo code?
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            value={promo}
                            onChange={(e) =>
                              setPromo(e.target.value.toUpperCase())
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleApplyCoupon()
                            }
                            placeholder="Enter promo code"
                            className="w-full border border-gray-300 px-4 py-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base outline-none"
                          />
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap active:scale-95 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Success/Error Messages */}
                      {error && (
                        <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      )}

                      {success && (
                        <div className="mt-3 flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-green-700">{success}</p>
                        </div>
                      )}

                      {discount > 0 && (
                        <div className="mt-3 flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                          <Gift className="w-5 h-5 text-green-600" />
                          <p className="text-sm font-semibold text-green-700">
                            🎉 You saved ${discount.toFixed(2)}!
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Available Coupons from API */}
                    {coupons?.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gray-600" />
                          <h3 className="text-sm font-semibold text-gray-700">
                            Available Offers
                          </h3>
                        </div>

                        <div className="space-y-2">
                          {coupons.map((coupon) => (
                            <div
                              key={coupon.code}
                              onClick={() => handleSelectCoupon(coupon)}
                              className="group relative border border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                            >
                              <div className="flex justify-between items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white tracking-wide">
                                      {coupon.code}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    {coupon.description}
                                  </p>
                                </div>

                                <button className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors px-3 py-1.5 rounded-md group-hover:bg-blue-100">
                                  Apply
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price breakup */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <PriceRow label="Subtotal" value={summary?.raw_subtotal} />
                    <PriceRow label="Tax" value={summary?.raw_tax} />
                    <PriceRow
                      label="Promo Discount"
                      value={summary?.coupon_discount}
                      discount
                    />
                    <div className="border-t-2 border-gray-200 pt-3 mt-3">
                      <PriceRow
                        label="Total Payable"
                        value={summary?.raw_grand_total}
                        bold
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                  {stripeData && (
                    <StripePayment
                      key={stripeData.clientSecret}
                      stripeData={stripeData}
                      onSuccess={async () => {
                        await postApi("checkout/stripe/confirm", {
                          order_number: stripeData.orderNumber,
                          payment_intent_id: stripeData.paymentIntentId,
                        });

                        toast.success("Payment successful 🎉");
                         setStripeData(null);
                      }}
                    />
                  )}

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Secure checkout powered by encrypted payment
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceRow = ({ label, value, bold, discount }) => (
  <div
    className={`flex justify-between items-center ${
      bold
        ? "text-lg sm:text-xl font-bold text-gray-900"
        : "text-sm sm:text-base text-gray-700"
    }`}
  >
    <span className={discount ? "text-green-600 font-medium" : ""}>
      {label}
    </span>
    <span className={discount ? "text-green-600 font-semibold" : ""}>
      {discount && value > 0 ? "-" : ""}${Number(value).toFixed(2)}
    </span>
  </div>
);

export default Checkout;
