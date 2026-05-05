import React, { useEffect, useState } from "react";
import { getApi } from "../api/getApi";
import { ALL_APi_LIST } from "../api/apiList";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getApi(
        `${ALL_APi_LIST.myOrders}?per_page=10&filter=all`,
      );
      setOrders(res?.data || []);
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <OrdersSkeleton />;
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-700 font-medium font-tektur">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-tektur"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-tektur text-gray-50 mb-2">
            My Orders
          </h1>
          <p className="text-gray-100 font-tektur">
            Track and manage all your orders in one place
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden font-tektur"
              >
                {/* ORDER HEADER */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
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
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg font-tektur">
                          Order #{order.order_number}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {order.order_date}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <p className="font-bold text-2xl text-gray-900 font-tektur">
                        {order.order_total}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 font-tektur">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        {order.payment_method}
                      </p>
                    </div>
                  </div>
                </div>

                {/* STATUS SECTION */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 font-tektur">
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge label={order.order_status_label} />
                    <PaymentBadge label={order.payment_status} />
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="px-6 py-5 font-tektur">
                  <div className="space-y-4">
                    {order.order_products.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-4 pb-4 ${
                          index < order.order_products.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        {/* IMAGE */}
                        <div className="relative flex-shrink-0 group">
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-20 h-24 object-cover rounded-xl border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold font-tektur rounded-full flex items-center justify-center shadow-lg">
                            {item.quantity}
                          </div>
                        </div>

                        {/* INFO */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1 truncate font-tektur">
                            {item.product_name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {item.name}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md  font-tektur font-medium">
                              SKU: {item.sku}
                            </span>
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-tektur font-medium">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* PRICE */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-lg text-gray-900 font-tektur">
                            {item.sell_price}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 font-tektur">
                            Tax: {item.tax_amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 font-tektur">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                      <span className="font-medium font-tektur">Shipping:</span>
                      <span className="font-semibold text-gray-900 font-tektur">
                        {order.shipping_charge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 font-medium font-tektur">
                        Net Total:
                      </span>
                      <span className="font-bold text-lg text-blue-600 font-tektur">
                        {order.net_total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

const StatusBadge = ({ label }) => {
  const configs = {
    Confirmed: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    Delivered: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
    },
    Cancelled: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = configs[label] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.icon}
      {label}
    </span>
  );
};

const PaymentBadge = ({ label }) => {
  const isSuccess = label === "Success" || label === "Paid";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-tektur border ${
        isSuccess
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-yellow-100 text-yellow-700 border-yellow-200"
      }`}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        {isSuccess ? (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        )}
      </svg>
      Payment: {label}
    </span>
  );
};

const EmptyState = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
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
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
      <p className="text-gray-600 mb-6 font-tektur">
        You haven't placed any orders yet. Start shopping to see your orders
        here!
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-tektur">
        Start Shopping
      </button>
    </div>
  );
};

const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg mb-2" />
          <div className="h-5 w-72 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4">
                <div className="h-8 w-40 bg-gray-200 animate-pulse rounded-lg" />
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="h-24 bg-gray-100 animate-pulse rounded-xl" />
                <div className="h-24 bg-gray-100 animate-pulse rounded-xl" />
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
