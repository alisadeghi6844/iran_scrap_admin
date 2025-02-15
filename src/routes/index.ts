import { lazy } from "react";

const routes = [
  {
    path: "/",
    breadCrumb: "صفحه اصلی (رزرواسیون تغذیه)",
    component: lazy(() => import("../page/foodReservation/homePage")),
    layout: "food_reservation",
    role: ["admin", "client", "reservation"],
    subRoutes: [
      {
        path: "reserve",
        breadCrumb: "رزرو غذا",
        component: lazy(() => import("../page/foodReservation/reserve")),
        layout: "food_reservation",
        role: ["admin", "client", "reservation"],
      },
      {
        path: "food-reserve-history",
        breadCrumb: "تاریخچه رزرو غذا",
        component: lazy(() => import("../page/foodReservation/foodReserveHistory")),
        layout: "food_reservation",
        role: ["admin", "client", "reservation"],
      },
      {
        path: "management",
        breadCrumb: "مدیریت رزرو غذا",
        layout: "food_reservation",
        role: ["admin", "reservation"],
        subRoutes: [
          {
            path: "client-reserve",
            breadCrumb: "مدیریت رزرو کاربران",
            component: lazy(
              () => import("../page/foodReservation/management/adminReserve")
            ),
            layout: "food_reservation",
            role: ["admin", "reservation"],
          },
          {
            path: "category",
            breadCrumb: "مدیریت دسته بندی ها",
            component: lazy(
              () => import("../page/foodReservation/management/category")
            ),
            layout: "food_reservation",
            role: ["admin"],
          },
          {
            path: "restaurant",
            breadCrumb: "مدیریت رستوران ها",
            component: lazy(
              () => import("../page/foodReservation/management/restaurant")
            ),
            layout: "food_reservation",
            role: ["admin"],
          },
          {
            path: "food",
            breadCrumb: "مدیریت غذا ها",
            component: lazy(
              () => import("../page/foodReservation/management/food")
            ),
            layout: "food_reservation",
            role: ["admin"],
          },
          {
            path: "appetizer",
            breadCrumb: "مدیریت پیش غذا",
            component: lazy(
              () => import("../page/foodReservation/management/appetizer")
            ),
            layout: "food_reservation",
            role: ["admin"],
          },
          {
            path: "foodShow",
            breadCrumb: "مدیریت نمایش غذا ",
            component: lazy(
              () => import("../page/foodReservation/management/foodShow")
            ),
            layout: "food_reservation",
            role: ["admin"],
          },
        ],
      },
    ],
  },
  {
    path: "account",
    breadCrumb: "مدیریت کاربران",
    layout: "food_reservation",
    role: ["admin"],
    subRoutes: [
      {
        path: "create-user",
        breadCrumb: "ساخت کاربر جدید",
        component: lazy(() => import("../page/account/createUser")),
        layout: "food_reservation",
        role: ["admin"],
      },
    ],
  },
  {
    path: "chat",
    breadCrumb: "پیام رسان",
    layout: "chat",
    role: ["admin", "client"],
    subRoutes: [
      {
        path: "dashboard",
        breadCrumb: "داشبورد",
        component: lazy(() => import("../page/chat/dashboard")),
        layout: "chat",
        role: ["admin", "client"],
      },
    ],
  },
  {
    path: "/change-password",
    breadCrumb: "تغییر رمز عبور",
    layout: "login",
    component: lazy(
      () => import("../container/features/account/ChangePasswordContent")
    ),
    role: null,
  },
];

export const privateRoutes = [
  {
    path: "/login",
    breadCrumb: "ورود",
    layout: "login",
    component: lazy(() => import("../page/auth/Login")),
    role: null,
  },
  {
    path: "/forget-password",
    breadCrumb: "فراموشی رمز عبور",
    layout: "login",
    component: lazy(() => import("../page/auth/ForgetPassword")),
    role: null,
  },
];

export default routes;
