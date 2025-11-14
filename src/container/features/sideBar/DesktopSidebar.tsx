import Typography from "../../../components/typography/Typography";
import { Link } from "react-router-dom";
import DynamicMenu from "../../../components/menu/vertical/DynamicMenu";
import { LuGitPullRequest } from "react-icons/lu";
import { LuPackageOpen } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdRule } from "react-icons/md";
import { SiPagespeedinsights } from "react-icons/si";
import { LuTicketPercent } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdPoll } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

import { MdProductionQuantityLimits } from "react-icons/md";

const DesktopSidebar = () => {
  const menuData: unknown = [
    {
      id: 1,
      isNew: false,
      menuTitle: "مدیریت درخواست ها",
      order: "1",
      role: ["admin", "client", "reservation"],
      notif: "",
      menus: [
        {
          path: "/",
          title: "همه درخواست ها",
          icon: <LuGitPullRequest className="text-2xl" />,
          id: 110,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },

        {
          path: "/product-request-status",
          title: "مدیریت وضعیت درخواست ها",
          icon: <MdProductionQuantityLimits className="text-2xl" />,
          id: 230,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/pending-orders-financial",
          title: "سفارشات در انتظار تایید مالی",
          icon: <LuPackageOpen className="text-2xl" />,
          id: 240,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/product-requests",
          title: "مدیریت درخواست‌های محصول",
          icon: <LuGitPullRequest className="text-2xl" />,
          id: 241,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
      ],
    },

    {
      id: 12,
      isNew: false,
      menuTitle: "فرم های پایه",
      order: "1",
      role: ["admin", "client", "reservation"],
      notif: "",
      menus: [
        {
          path: "/",
          title: "مدیریت کاربران",
          icon: <FaRegUser className="text-2xl" />,
          id: 2436552,
          isNew: false,
          subRoutes: [
            {
              path: "/role-management",
              title: "مدیریت نقش",
              icon: <MdRule className="text-2xl" />,
              id: 24362,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/users-management",
              title: "مدیریت کاربران",
              icon: <FiUsers className="text-2xl" />,
              id: 24389662,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/buyer-management",
              title: "مدیریت خریداران",
              icon: <MdProductionQuantityLimits className="text-2xl" />,
              id: 24384529662,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
          ],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/",
          title: "مدیریت صفحات ",
          icon: <SiPagespeedinsights className="text-2xl" />,
          id: 24323422262,
          isNew: false,
          subRoutes: [
            {
              path: "/pages-management",
              title: "مدیریت متن صفحات ",
              icon: <RiPagesLine className="text-2xl" />,
              id: 2432362,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/faq-management",
              title: "مدیریت سوالات متداول",
              icon: <FaRegQuestionCircle className="text-2xl" />,
              id: 24323262,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/blog-management",
              title: "مدیریت مقالات",
              icon: <RiBloggerLine className="text-2xl" />,
              id: 24012,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/blog-category-management",
              title: "مدیریت دسته بندی مقالات",
              icon: <BiCategoryAlt className="text-2xl" />,
              id: 2582,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
          ],
          notif: "",
          role: ["admin", "client", "reservation"],
        },

        {
          path: "/category-management",
          title: "مدیریت دسته بندی",
          icon: <MdOutlineCategory className="text-2xl" />,
          id: 2402,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },

        {
          path: "/ticket-management",
          title: "مدیریت تیکت ها",
          icon: <LuTicketPercent className="text-2xl" />,
          id: 240992,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },

        {
          path: "/survey-management",
          title: "مدیریت نظرسنجی ها",
          icon: <MdPoll className="text-2xl" />,
          id: 240993,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
      ],
    },

    {
      id: 162,
      isNew: false,
      menuTitle: "مدیریت محصولات",
      order: "1",
      role: ["admin", "client", "reservation"],
      notif: "",
      menus: [
        {
          path: "/product-management",
          title: "مدیریت محصولات",
          icon: <MdOutlineProductionQuantityLimits className="text-2xl" />,
          id: 250181,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/product-price-management",
          title: "مدیریت قیمت گذاری محصولات",
          icon: <MdOutlineProductionQuantityLimits className="text-2xl" />,
          id: 250182,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/purchase-price-management",
          title: "مدیریت قیمت خرید",
          icon: <MdOutlineProductionQuantityLimits className="text-2xl" />,
          id: 250188,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/view-pricing-management",
          title: "مشاهده قیمت گذاری",
          icon: <MdOutlineProductionQuantityLimits className="text-2xl" />,
          id: 250189,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/shipment-management",
          title: "محاسبه کرایه ناوگان",
          icon: <MdLocalShipping className="text-2xl" />,
          id: 250183,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          title: "اطلاعات پایه قیمت گذاری",
          icon: <LuTicketPercent className="text-2xl" />,
          id: 24000992,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
          subRoutes: [
            {
              path: "/pb-product-admin-management",
              title: "تعریف کالا",
              icon: <BsBoxSeam className="text-2xl" />,
              id: 250184,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/pb-brand-admin-management",
              title: "مدیریت برند",
              icon: <MdOutlineCategory className="text-2xl" />,
              id: 250185,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
            {
              path: "/pb-provider-admin-management",
              title: "تعریف تامین کنندگان",
              icon: <HiOutlineOfficeBuilding className="text-2xl" />,
              id: 250186,
              isNew: false,
              subRoutes: [],
              notif: "",
              role: ["admin", "client", "reservation"],
            },
          ],
        },

        {
          path: "/pb-port-admin-management",
          title: "تعریف محل بارگیری",
          icon: <MdLocalShipping className="text-2xl" />,
          id: 250187,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
      ],
    },
  ];
  return (
    <div className="fixed right-0 z-40 bg-white border-l-2 border-dashed border-gray-300 top-0 min-h-screen w-full max-w-[15.5%]">
      <Link to="/" className="pb-8 pt-6 px-2 flex items-center gap-x-2">
        {/* <Image
          src="/images/core/logo1.svg"
          alt="ویرا"
          className="w-[55px] h-[55px]"
        /> */}
        <Typography className="font-bold text-lg text-primary">
          {import.meta.env.VITE_APP_COMPANY_NAME}
        </Typography>
      </Link>
      <div className="scroll-container max-h-[89vh]">
        <DynamicMenu className="sidebar" data={menuData} />
      </div>
    </div>
  );
};

export default DesktopSidebar;
