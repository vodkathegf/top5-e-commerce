import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORY_URL = "http://localhost:3000/categories";

const initialState = {
  categories: [],
  selectedCategoryId: null,
  selectedCategory: "",
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get(CATEGORY_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesAdded: {
      reducer: (state, action) => {
        state.categories.push(action.payload);
      },
      prepare: (id, categoryName, seoUrl) => {
        return {
          id,
          categoryName,
          seoUrl,
        };
      },
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    selectCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectCategory, selectCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
