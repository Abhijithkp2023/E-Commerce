import axios from "axios";
import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProdcuts = createAsyncThunk(
  "Products/fetchAllProducts",
  async () => {
    const result = await axios.get("http://localhost:5000/api/shop/products/get");
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProdcuts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProdcuts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = true;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProdcuts.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false 
        state.productList = []
      });
  },
});

export default shoppingProductSlice.reducer;
