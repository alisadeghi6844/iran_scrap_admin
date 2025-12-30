import Typography from "../../../components/typography/Typography";
import { Link } from "react-router-dom";
import DynamicMenu from "../../../components/menu/vertical/DynamicMenu";
import { useSelector } from "react-redux";
import { selectGetUserProfileData } from "../../../redux/slice/account/AccountSlice";
import { useMemo } from "react";
import { filterMenuGroups } from "../../../utils/menuAccess";
import { IoClose } from "react-icons/io5";
import { desktopSidebarMenuData } from "./DesktopSidebar.menuData";

interface DesktopSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isMobile = false,
  onClose,
}) => {
  const userProfile = useSelector(selectGetUserProfileData);
  const userAccessMenus = userProfile?.accessMenus || [];

  // Filter menu data based on user access
  const filteredMenuData = useMemo(() => {
    return filterMenuGroups(desktopSidebarMenuData as any[], userAccessMenus);
  }, [userAccessMenus]);

  return (
    <div
      className={`${
        isMobile
          ? "w-full h-full bg-white"
          : "fixed right-0 z-40 bg-white border-l-2 border-dashed border-gray-300 top-0 min-h-screen w-full max-w-[15.5%]"
      }`}
    >
      <div className="flex items-center justify-between pb-4 lg:pb-8 pt-6 px-2">
        <Link
          to="/"
          className="flex items-center gap-x-2"
          onClick={isMobile ? onClose : undefined}
        >
          {/* <Image
            src="/images/core/logo1.svg"
            alt="ویرا"
            className="w-[55px] h-[55px]"
          /> */}
          <Typography className="font-bold text-base lg:text-lg text-primary">
            {import.meta.env.VITE_APP_COMPANY_NAME}
          </Typography>
        </Link>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <IoClose className="text-2xl text-gray-600" />
          </button>
        )}
      </div>
      <div
        className={`scroll-container ${
          isMobile ? "max-h-[85vh]" : "max-h-[89vh]"
        } overflow-y-auto`}
      >
        <DynamicMenu
          className="sidebar"
          data={filteredMenuData}
          onItemClick={isMobile ? onClose : undefined}
        />
      </div>
    </div>
  );
};

export default DesktopSidebar;
