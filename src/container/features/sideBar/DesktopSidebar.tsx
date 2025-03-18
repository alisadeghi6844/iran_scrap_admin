import Typography from "../../../components/typography/Typography";
import { Link } from "react-router-dom";
import DynamicMenu from "../../../components/menu/vertical/DynamicMenu";
import { LuGitPullRequest } from "react-icons/lu";
import { LuPackageOpen } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";

import { MdProductionQuantityLimits } from "react-icons/md";

const DesktopSidebar = () => {
  const menuData: any = [
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
          title: "درخواست های جدید",
          icon: <LuGitPullRequest className="text-2xl" />,
          id: 110,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/open-request",
          title: "درخواست های باز",
          icon: <LuPackageOpen className="text-2xl" />,
          id: 160,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/close-request",
          title: "درخواست های بسته",
          icon: <BsBoxSeam className="text-2xl" />,
          id: 190,
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
          path: "/blog-management",
          title: "مدیریت مقالات",
          icon: <RiBloggerLine className="text-2xl" />,
          id: 24012,
          isNew: true,
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
    },
  ];
  return (
    <div className="fixed right-0 z-40 bg-white border-l-2 border-dashed border-gray-300 top-0 min-h-screen w-full max-w-[14.4%]">
      <Link to="/" className="pb-8 pt-6 px-4 flex items-center gap-x-2">
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
