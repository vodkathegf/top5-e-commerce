import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productsAddedToCart: {
      reducer: (state, action) => {
        state.cart.push(action.payload);
      },
      prepare: (id, categoryId, productName, unitPrice) => {
        return {
          id,
          categoryId,
          productName,
          unitPrice,
          quantity: 1,
        };
      },
    },
    addToCart: (state, action) => {
      const productId = action.payload.id;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const product = {
          id: productId,
          productName: action.payload.productName,
          unitPrice: action.payload.unitPrice,
          quantity: ""
        };
        state.cart.push(product);
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload.id;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) existingItem.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload.id;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) existingItem.quantity -= 1;
      if (existingItem.quantity === 0) state.cart.splice(existingItem, 1);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
