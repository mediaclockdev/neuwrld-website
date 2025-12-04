import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds an item to the cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      // Convert the price string to a number.
      const priceNumber = parseFloat(newItem.price.replace(/[^\d.]/g, ""));

      // Check if an item with the same id already exists in the cart.
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        // Increase the quantity if the item exists.
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity set to 1.
        state.cartItems.push({ ...newItem, quantity: 1 });
      }

      // Recalculate total amount.
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
        return total + itemPrice * item.quantity;
      }, 0);
    },

    // Removes an item from the cart based on its id
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      // Recalculate total amount.
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
        return total + itemPrice * item.quantity;
      }, 0);
    },

    // Increase the quantity of a specific item in the cart.
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      // Recalculate total amount.
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
        return total + itemPrice * item.quantity;
      }, 0);
    },

    // Decrease the quantity of a specific item in the cart.
    // If the quantity reaches 0 (or 1 before subtracting), the item is removed.
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove the item if quantity would drop below 1.
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
        }
      }
      // Recalculate total amount.
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
        return total + itemPrice * item.quantity;
      }, 0);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
