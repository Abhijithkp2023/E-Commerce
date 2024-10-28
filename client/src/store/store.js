import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductsSlice from "../store/products-slice"
import shoppingProductSlice from "./shop/product-slice";




const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shoppProducts : shoppingProductSlice,
    }
})

export default store;