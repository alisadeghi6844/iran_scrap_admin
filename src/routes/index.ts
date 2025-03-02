import { lazy } from "react";

const routes = [
  {
    path: "/",
    breadCrumb: "صفحه اصلی (مدیریت DG_FARM)",
    component: lazy(() => import("../page/homePage")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/open-request",
    breadCrumb: "درخواست های باز",
    component: lazy(() => import("../page/openRequest")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/close-request",
    breadCrumb: "درخواست های بسته",
    component: lazy(() => import("../page/closeRequest")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/product-request-status",
    breadCrumb: "مدیریت وضعیت درخواست ها",
    component: lazy(() => import("../page/productRequestStatus")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
];

export const privateRoutes = [
  // {
  //   path: "/login",
  //   breadCrumb: "ورود",
  //   layout: "login",
  //   component: lazy(() => import("../page/auth/Login")),
  //   role: null,
  // },
  // {
  //   path: "/forget-password",
  //   breadCrumb: "فراموشی رمز عبور",
  //   layout: "login",
  //   component: lazy(() => import("../page/auth/ForgetPassword")),
  //   role: null,
  // },
];

export default routes;
