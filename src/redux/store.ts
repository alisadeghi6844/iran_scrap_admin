// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/account/AccountSlice";
import productRequestStatusSlice from "./slice/productRequestStatus/ProductStatusRequestSlice";
import usersSlice from "./slice/users/UsersSlice";
import productRequestOfferSlice from "./slice/productRequestOffer/ProductStatusRequestSlice";
import categorySlice from "./slice/category/CategorySlice";
import blogSlice from "./slice/blog/BlogSlice";
import blogCategorySlice from "./slice/blogCategory/BlogCategorySlice";
import roleManagementSlice from "./slice/roleManagement/RolemanagementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productRequestStatus: productRequestStatusSlice,
    users: usersSlice,
    productRequestOffer: productRequestOfferSlice,
    category: categorySlice,
    blog: blogSlice,
    blogCategory: blogCategorySlice,
    roleManagement: roleManagementSlice,
  },
});
