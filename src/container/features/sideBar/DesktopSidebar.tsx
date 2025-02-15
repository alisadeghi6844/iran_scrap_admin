import Image from "../../../components/image";
import Typography from "../../../components/typography/Typography";
import { Link } from "react-router-dom";
import DynamicMenu from "../../../components/menu/vertical/DynamicMenu";
import { FaHome } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbCookieFilled } from "react-icons/tb";
import { MdRestaurant } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { RiSlideshowLine } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiChatHistoryFill } from "react-icons/ri";

const DesktopSidebar = () => {
  const menuData: any = [
    {
      id: 123,
      isNew: false,
      menuTitle: "رزرواسیون تغذیه",
      order: "1",
      role: ["admin", "client", "reservation"],
      notif: "",
      menus: [
        {
          path: "/",
          title: "صفحه اصلی",
          icon: <FaHome className="text-2xl" />,
          id: 110,
          isNew: false,
          subRoutes: [],
          notif: "",
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/reserve",
          title: "رزرو غذا",
          icon: <IoFastFoodSharp className="text-2xl" />,
          id: 12,
          isNew: false,
          notif: "",
          subRoutes: [],
          role: ["admin", "client", "reservation"],
        },
        {
          path: "/food-reserve-history",
          title: "تاریخچه رزرو غذا",
          icon: <RiChatHistoryFill className="text-2xl" />,
          id: 122,
          isNew: false,
          notif: "",
          subRoutes: [],
          role: ["admin", "client", "reservation"],
        },
        {
          path: "",
          title: "مدیریت رزرواسیون",
          icon: <RiUserSettingsFill className="text-2xl" />,
          id: 13,
          isNew: false,
          notif: "",
          role: ["admin", "reservation"],
          subRoutes: [
            {
              path: "/management/client-reserve",
              title: "مدیریت رزرو کاربران",
              icon: <PiUsersThreeFill className="text-2xl" />,
              id: 131,
              isNew: false,
              notif: "",
              role: ["admin", "reservation"],
              subRoutes: [],
            },
            {
              path: "/management/category",
              title: "مدیریت دسته بندی ها",
              icon: <BiSolidCategoryAlt className="text-2xl" />,
              id: 122,
              isNew: false,
              notif: "",
              role: ["admin"],
              subRoutes: [],
            },
            {
              path: "/management/appetizer",
              title: "مدیریت پیش غذا",
              icon: <TbCookieFilled className="text-2xl" />,
              id: 129,
              isNew: false,
              notif: "",
              role: ["admin"],
              subRoutes: [],
            },
            {
              path: "/management/restaurant",
              title: " مدیریت رستوران ها",
              icon: <MdRestaurant className="text-2xl" />,
              id: 123,
              isNew: false,
              notif: "",
              role: ["admin"],
              subRoutes: [],
            },
            {
              path: "/management/food",
              title: " مدیریت غذا ها",
              icon: <MdFastfood className="text-2xl" />,
              id: 124,
              isNew: false,
              notif: "",
              role: ["admin"],
              subRoutes: [],
            },
            {
              path: "/management/foodShow",
              title: " مدیریت نمایش غذا",
              icon: <RiSlideshowLine className="text-2xl" />,
              id: 125,
              isNew: false,
              notif: "",
              role: ["admin"],
              subRoutes: [],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      isNew: false,
      menuTitle: "مدیریت کاربران",
      order: "1",
      notif: "",
      role: ["admin", "foodReservation"],
      menus: [
        {
          path: "/account/create-user",
          title: " ساخت کاربر جدید",
          icon: <RiUserAddFill className="text-2xl" />,
          id: 12012,
          role: "admin",
          isNew: false,
          notif: "",
        },
      ],
    },
    {
      id: 122,
      isNew: false,
      menuTitle: "پیام رسان",
      order: "1",
      notif: "",
      role: ["admin","client"],
      menus: [
        {
          path: "/chat/dashboard",
          title: "پیام رسان",
          icon: <IoChatboxEllipses className="text-2xl" />,
          id: 120102,
          role: ["admin","client"],
          isNew: false,
          notif: "5",
        },
      ],
    },
  ];
  return (
    <div className="fixed right-0 z-40 bg-white border-l-2 border-dashed border-gray-300 top-0 min-h-screen w-full max-w-[14.4%]">
      <Link to="/" className="pb-8 pt-6 px-4 flex items-center gap-x-2">
        <Image
          src="/images/core/logo1.svg"
          alt="ویرا"
          className="w-[55px] h-[55px]"
        />
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
