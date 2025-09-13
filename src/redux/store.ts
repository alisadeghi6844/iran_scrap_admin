// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/account/AccountSlice";
import productRequestStatusSlice from "./slice/productRequestStatus/ProductStatusRequestSlice";
import usersSlice from "./slice/users/UsersSlice";
import productRequestOfferSlice from "./slice/productRequestOffer/ProductStatusRequestSlice";
import categorySlice from "./slice/category/CategorySlice";
import blogSlice from "./slice/blog/BlogSlice";
import blogCategorySlice from "./slice/blogCategory/BlogCategorySlice";
import productPriceSlice from "./slice/productPrice/ProductPriceSlice";
import generalSettingSlice from "./slice/generalSetting/GeneralSettingSlice";
import faqSlice from "./slice/faq/FaqSlice";
import roleManagementSlice from "./slice/roleManagement/RoleManagementSlice"; 
import ticketSlice from "./slice/ticket/TicketSlice";
import productSlice from "./slice/product/ProductSlice"; 
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
    productPrice: productPriceSlice,
    generalSetting: generalSettingSlice,
    faq: faqSlice,
    ticket: ticketSlice,
    product: productSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
