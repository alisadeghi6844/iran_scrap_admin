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
