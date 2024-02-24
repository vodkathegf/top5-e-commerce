import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_URL = "http://localhost:3000/products";

export const initialState = {
  products: [],
  productsSelectedByCategoryId: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(PRODUCT_URL);
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "products/fetchProductsByCategoryId",
  async (categoryId) => {
    try {
      let url = PRODUCT_URL;
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }
      const response = await axios.get(url);
      return [...response.data];
    } catch (error) {
      throw new Error(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsAdded: {
      reducer: (state, action) => {
        state.products.push(action.payload);
      },
      prepare: (
        id,
        categoryId,
        productName,
        quantityPerUnit,
        unitPrice,
        unitsInStock
      ) => {
        return {
          id,
          categoryId,
          productName,
          quantityPerUnit,
          unitPrice,
          unitsInStock,
        };
      },
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsSelectedByCategoryId = action.payload;
      })
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  productsAdded,
  setSelectedCategoryProducts,
} = productSlice.actions;

export default productSlice.reducer;
