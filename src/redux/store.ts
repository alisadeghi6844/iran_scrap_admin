// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/account/AccountSlice";
import foodCategorySlice from "./slice/foodReservation/management/category/CategoriesSlice";
import restaurantSlice from "./slice/foodReservation/management/restaurant/RestaurantSlice";
import foodSlice from "./slice/foodReservation/management/food/FoodSlice";
import foodShowSlice from "./slice/foodReservation/management/foodShow/FoodShowSlice";
import timeSlice from "./slice/time/TimeSlice";
import appetizerSlice from "./slice/foodReservation/management/appetizer/AppetizerSlice";
import foodReserveSlice from "./slice/foodReservation/management/foodReserve/FoodReserveSlice";
import adminFoodReserveSlice from "./slice/foodReservation/management/foodReserve/AdminReserveSlice";
import createUserSlice from "./slice/account/CreateUserSlice";
import usersChatSlice from './slice/chat/users/UsersChatSlice';
import socketSlice from './slice/chat/socket/socketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    foodCategory: foodCategorySlice,
    restaurant: restaurantSlice,
    food: foodSlice,
    foodShow: foodShowSlice,
    time: timeSlice,
    appetizer: appetizerSlice,
    foodReserve: foodReserveSlice,
    adminFoodReserve: adminFoodReserveSlice,
    createUser: createUserSlice,
    usersChat: usersChatSlice,
    socket: socketSlice,
  },
});
