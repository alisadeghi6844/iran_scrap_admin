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
    breadCrumb: "درخواست های بسته",
    component: lazy(() => import("../page/openRequest")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/close-request",
    breadCrumb: "درخواست های درحال پردازش",
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
  {
    path: "/category-management",
    breadCrumb: "مدیریت دسته بندی ها",
    component: lazy(() => import("../page/categoryManagement")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/blog-management",
    breadCrumb: "مدیریت مقالات",
    component: lazy(() => import("../page/blogManagement")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/blog-category-management",
    breadCrumb: "مدیریت دسته بندی مقالات",
    component: lazy(() => import("../page/blogCategoryManagement")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/role-management",
    breadCrumb: "مدیریت نقش ها",
    component: lazy(() => import("../page/roleManagement")),
    layout: "admin",
  },

  {
    path: "/product-price-management",
    breadCrumb: "مدیریت قیمت گذاری محصولات",
    component: lazy(() => import("../page/productPriceManagement")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/pages-management",
    breadCrumb: "مدیریت صفحات",
    component: lazy(() => import("../page/generalSetting")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
  },
  {
    path: "/faq-management",
    breadCrumb: "مدیریت سوالات متداول",
    component: lazy(() => import("../page/faqManagement")),
    layout: "admin",
    role: ["admin", "client", "reservation"],
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
  // {
  //   path: "/forget-password",
  //   breadCrumb: "فراموشی رمز عبور",
  //   layout: "login",
  //   component: lazy(() => import("../page/auth/ForgetPassword")),
  //   role: null,
  // },
];

export default routes;
