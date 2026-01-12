import React from "react";

const CheckoutAddress = ({
  defaultAddress,
  showAddressForm,
  setShowAddressForm,
  addressForm,
  handleAddressChange,
  handleSaveAddress,
  states,
  addresses,
  selectedAddress,
  setSelectedAddress,
  onDeleteAddress,
}) => {
  // ✅ auto-fill non-UI fields

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-5 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-gray-900">
            Shipping Address
          </h2>

          {defaultAddress && (
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setShowAddressForm(true)}
            >
              Change Address
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Address List */}
        {addresses?.length > 0 && !showAddressForm && (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`relative block cursor-pointer rounded-xl border p-4 transition ${
                  selectedAddress?.id === addr.id
                    ? "border-black bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Radio Button */}
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress?.id === addr.id}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 w-4 h-4 text-blue-600 "
                  />

                  {/* Address Details */}
                  <div className="flex-1">
                    <p className="font-semibold">{addr.name}</p>
                    <p className="text-sm text-gray-700">
                      {addr.address_line_1}
                      {addr.address_line_2 && `, ${addr.address_line_2}`}
                    </p>
                    <p className="text-sm text-gray-700">
                      {addr.city_name} – {addr.pincode}
                    </p>

                    {addr.primary && (
                      <span className="inline-block mt-2 text-xs text-green-700 font-medium">
                        Default address
                      </span>
                    )}
                  </div>

                  {/* Delete Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDeleteAddress(addr.id);
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove address"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </label>
            ))}
          </div>
        )}

        {/*  No Address */}
        {!defaultAddress && !showAddressForm && (
          <div className="text-center py-6">
            <p className="text-red-600 font-medium mb-4">
              No shipping address selected
            </p>
            <button
              onClick={() => setShowAddressForm(true)}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium"
            >
              + Add Shipping Address
            </button>
          </div>
        )}

        {/*  Add Address Form */}
        {showAddressForm && (
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name *"
              value={addressForm.name}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              name="phone"
              placeholder="Phone Number *"
              value={addressForm.phone}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              name="pincode"
              placeholder="Pincode *"
              value={addressForm.pincode}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              name="address_line_1"
              placeholder="Address Line 1 *"
              value={addressForm.address_line_1}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              name="address_line_2"
              placeholder="Address Line 2 (Optional)"
              value={addressForm.address_line_2}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              name="landmark"
              placeholder="Landmark (Optional)"
              value={addressForm.landmark}
              onChange={handleAddressChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                name="city_name"
                placeholder="City *"
                value={addressForm.city_name}
                onChange={handleAddressChange}
                className="w-full border px-4 py-3 rounded-lg"
              />

              {/* TEMP: state_id input (replace with dropdown later) */}
              <select
                name="state_id"
                value={addressForm.state_id}
                onChange={handleAddressChange}
                className="w-full border px-4 py-3 rounded-lg bg-white"
              >
                <option value="">Select State </option>

                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleSaveAddress}
                className="flex-1 bg-black text-white py-3 rounded-lg font-medium"
              >
                Save Address
              </button>

              <button
                onClick={() => setShowAddressForm(false)}
                className="flex-1 border py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutAddress;
